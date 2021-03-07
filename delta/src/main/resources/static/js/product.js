var root_path='product';
var productGrid = null;
var loadDataIds = [];
var snackbarContainer = document.getElementById('snackbar-container');

function createProductGrid() {
	"use strict";
	productGrid =  $("#productGrid").jqGrid({
		colNames : ['','Name','Type'],
		jsonReader : {
			root:"productList"                                                                    
		},
		colModel: [
			{name : 'productId',align : "left",index : 'productId',width:80,hidden: true},
			{name : 'name',align : "left",index : 'name',sortable : false,width:80,editable: true,editrules: {required: true},editoptions: { style: "text-transform: uppercase" }},
			{name : 'type',align : "left",index : 'type',sortable : false,editable: true,width:80,editrules: {required: true},editoptions: { style: "text-transform: uppercase" }}
			],
			height : 262,
			sortorder: "desc",
			width : 600,
			caption: "Product Grid",
			sortIconsBeforeText: true,
			pager: 'productGridNav',
			rowNum: 5,
			viewrecords: true,
			position: "last"
	});
};

$(document).ready(function(){
	createProductGrid();
	addButtons(productGrid);
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
			var selId =  $('#productGrid').jqGrid('getGridParam','selrow');
			$('#productGrid').jqGrid('delRowData',selId);
		}
	});	
}

function addEventListners(){

	$("#go").click(function(){
		
		console.log('Go called!');
		
		var fd = getFormData(searchPanel);
		
		console.log(fd);
	
		$.ajax({
			  url: root_path+'/fetchProducts',
			  data: JSON.stringify(fd),
			  dataType: 'json',
			  processData: false,
			  contentType: "application/json; charset=utf-8",
			  type: 'POST',
			  success: function(data){
				  if(data && data.productList && data.productList.length > 0){
					  $("#productGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: data.productList }).trigger('reloadGrid');
					  loadDataIds = [];
					  for (var i = 0; i < data.productList.length; i++) {
						  loadDataIds.push(data.productList[i].productId);
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
		
		var gridData = $('#productGrid').jqGrid('getGridParam','data');
		
		var length = gridData.length;
		
		for (var i = 0; i < length; i++) {
			
			if(gridData[i].productId){
				
				gridData[i].curdIndicator = 'U';
				
				loadDataIds.splice(loadDataIds.indexOf(gridData[i].productId), 1);
				
			}
			else{
				gridData[i].curdIndicator = 'N';
			}
		}
		
		if(loadDataIds.length > 0){
			
			for(var i = 0 ; i < loadDataIds.length ; i++){
				gridData[length++] = {productId : loadDataIds[i] , curdIndicator : 'D'};
			}
		}
		
		console.log(gridData);
		
		var productListSO = new Object();
		productListSO.productList = gridData;
		
		$.ajax({
			  url: root_path+'/saveProduct',
			  data: JSON.stringify(productListSO),
			  dataType: 'json',
			  processData: false,
			  contentType: "application/json; charset=utf-8",
			  type: 'POST',
			  jopts:{smsg:'Saved successfully'},
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
