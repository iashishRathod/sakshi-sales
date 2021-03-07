var root_path='party';
var partyGrid = null;
var loadDataIds = [];
var snackbarContainer = document.getElementById('snackbar-container');

function createPartyGrid() {
	"use strict";
	partyGrid =  $("#partyGrid").jqGrid({
		colNames : ['','Name','Start Date','Email' , 'Phone'],
		jsonReader : {
			root:"partySOList"                                                                    
		},
		colModel: [
			{name : 'partyId',align : "left",index : 'partyId',width:80,hidden: true},
			{name : 'name',align : "left",index : 'name',width:80,editable: true,editrules: {required: true},editoptions: { style: "text-transform: uppercase" }},
			{name : 'startDate',align : "left",index : 'startDate',width:80,editable: true,editoptions: {
                dataInit: function (element) {
                    $(element).datepicker({
                        dateFormat: 'dd/mm/yy',
                    });
                }
            },editrules: {required: true}},
			{name : 'email',align:"left",index : 'email',sortable : false,editable: true,width:80,
            	editrules: {custom_func: validateEmail,custom: true},editoptions: { style: "text-transform: uppercase" }},
			{name : 'contactNumber',align : "left",index : 'contactNumber',sortable : false,editable: true,width:80,
            		editrules: {custom_func: validateContactNumber,custom: true}}
			],
			height : 262,
			sortorder: "desc",
			width : 600,
			caption: "Party Grid",
			sortIconsBeforeText: true,
			pager: 'partyGridNav',
			rowNum: 5
	});
	//setMandatoryLabel(['name','startDate'],partyGrid);
};

function validateEmail(value,column){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(isNotEmpty(value) && !re.test(value)){
		return [false, "Please enter valid email!"];
	}
	else{
		return [true, ""];
	}
}

function validateContactNumber(value,column){
	if(isNotEmpty(value) && (isNaN(value) || value.length > 10 || value.length < 10) ){
		return [false, "Please enter valid contact number!"];
	}
	else{
		return [true, ""];
	}
}

$(document).ready(function(){
	createPartyGrid();
	addButtons(partyGrid);
	addEventListners();
});


function addButtons (grid) {
	var nav = grid.getGridParam('pager');
	grid.inlineNav(nav,{edit:true,add:true,save:true,cancel:false});

	var gn = grid.navGrid(nav,{edit:false,add:false,del:false,search:false,refresh:false});
	gn.navButtonAdd(nav,{
		id: 'del_'+grid,
		caption:"", buttonicon:"ui-icon-trash", //ui-icon-trash
		onClickButton: function(){ 
			var selId =  $('#partyGrid').jqGrid('getGridParam','selrow');
			$('#partyGrid').jqGrid('delRowData',selId);
		}
	});	
}

function addEventListners(){

	$("#go").click(function(){

		console.log('Go called!');

		var fd = getFormData(searchPanel);
		var date = document.getElementById("startDate").value;
		if(date.length > 0){
			var splited = date.split("-");
			date = splited[2] +"/" + splited[1] +"/"+splited[0];
		}
		fd.startDate = date;
		console.log(fd);

		$.ajax({
			url: root_path+'/fetchParty',
			data: JSON.stringify(fd),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				if(data && data.partySOList && data.partySOList.length > 0){
					$("#partyGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: data.partySOList }).trigger('reloadGrid');
					loadDataIds = [];
					for (var i = 0; i < data.partySOList.length; i++) {
						loadDataIds.push(data.partySOList[i].partyId);
					}
				}
				else{
					showFlasMessage('info' , 'No Records found!',2000);
				}
			}
		});
	});

	$("#save").click(function(){

		console.log('save called!');

		var gridData = $('#partyGrid').jqGrid('getGridParam','data');

		var length = gridData.length;
		
		var errors = [];

		for (var i = 0; i < length; i++) {
			
			if(gridData[i].partyId){
				
				gridData[i].curdIndicator = 'U';
				
				loadDataIds.splice(loadDataIds.indexOf(gridData[i].partyId), 1);

			}
			else{
				gridData[i].curdIndicator = 'N';
			}
		}

		if(loadDataIds.length > 0){
			for(var i = 0 ; i < loadDataIds.length ; i++){
				gridData[length++] = {partyId : loadDataIds[i] , curdIndicator : 'D'};
			}
		}

		console.log(gridData);

		var partyListSO = new Object();
		partyListSO.partySOList = gridData;

		$.ajax({
			url: root_path+'/saveParty',
			data: JSON.stringify(partyListSO),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				showFlasMessage('success' , 'Saved Sucessfully!',2000);
				$( "#go" ).click();;
			}
		});
	});
}

function getFormData (containerId,options) {
	options = options || {};
	options.excVals = options.excVals || ['All'];
	options.trueVal = options.trueVal || 'Y';
	options.falseVal = options.falseVal || 'N';
	options.idPref = options.idPref || '';
	var inputData = options.tarObj || new Object();
	jQuery(containerId).find(options.group ? "[data-group='"+options.group+"']" :'input:text,input:radio, input:checkbox, select, textarea , span')
	.each(function() {
		var ele = jQuery(this);
		var val = ele.val();
		var tag = ele.get(0).tagName.toLowerCase();

		if(ele.is(':checkbox')) {
			val = options[ele.is(':checked')+'Val'];
		}
		if(tag  == 'span'){
			if(ele.attr('data-field') == "Y"){
				val = ele.text();
			}
		}

		if((isNotEmpty(inputData[this.id.substr(options.idPref.length)]) || isNotEmpty(val)) && options.excVals.indexOf(val) == -1) {
			inputData[this.id.substr(options.idPref.length)] = val;
		}
	});
	return inputData;
}

function isNotEmpty(x){
	return  (x !== undefined && x !== null && x.trim && x.trim().length > 0);
}
function showFlasMessage(type, msg, time){
    const para = document.createElement('P');
    para.classList.add('snackbar');
    para.innerHTML = `${msg} <span> &times </span>`;

    if(type ==='success'){
        para.classList.add('success');
    }
    else if(type ==='info'){
        para.classList.add('info');
    }

    snackbarContainer.appendChild(para);
    para.classList.add('fadeout');

    setTimeout(()=>{snackbarContainer.removeChild(para)}, time)

}