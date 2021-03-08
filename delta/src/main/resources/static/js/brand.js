var root_path='brand';
var brandGrid = null;
var partyGrid = null;
var productGrid = null;
var loadDataIds = [];
var prevId = null;
var productSelect = '';
var partySelect = '';
var snackbarContainer = document.getElementById('snackbar-container');

function createBrandGrid() {
	"use strict";
	brandGrid =  $("#brandGrid").jqGrid({
		colNames : ['','Name','Description' , 'Email','',''],
		colModel: [
			{name : 'brandId',align : "left",index : 'brandId',hidden:true},
			{name : 'name',align : "left",index : 'name',sortable : false,width:80,editable: true,editrules: {required: true},
				editoptions: { style: "text-transform: uppercase" },formatter: function (cellValue, opts, rowObject) { return cellValue ? cellValue.toUpperCase() : ''; }},
			{name : 'desc',align : "left",index : 'desc',sortable : false,editable: true,width:80,editoptions: { style: "text-transform: uppercase" },
				formatter: function (cellValue, opts, rowObject) { return cellValue ? cellValue.toUpperCase() : ''; }},
			{name : 'email',align:"left",index : 'email',sortable : false,editable: true,width:80,editrules: {custom_func: validateEmail,custom: true},
			editoptions: { style: "text-transform: uppercase" },formatter: function (cellValue, opts, rowObject) { return cellValue ? cellValue.toUpperCase() : ''; }},
			{name : 'partyNames',align : "left",index : 'partyNames',hidden:true},
			{name : 'productNames',align : "left",index : 'productNames',hidden:true}
			],
			sortorder: "desc",
			caption: "Brand Grid",
			sortIconsBeforeText: true,
			pager: 'brandGridNav',
			rowNum: 5,
			viewrecords: true,
			add:true,
			height : 262,
			width : 600,
			afterAddRow: function(rowid){
				
				if(isNotEmpty(prevId)){

					if(prevId != rowid){

						var rowData = brandGrid.jqGrid("getRowData", prevId);

						var partyData = partyGrid.jqGrid('getGridParam','data');

						if(partyData.length > 0){

							rowData.partyNames = "";

							for(var i = 0 ; i < partyData.length ; i++){
								rowData.partyNames = rowData.partyNames + partyData[i].name +",";
							}
							
							$(brandGrid).setCell(prevId,"partyNames",rowData.partyNames.slice(0, -1),{},{});
						}

						var productData = productGrid.jqGrid('getGridParam','data');

						if(productData.length > 0){

							rowData.productNames = "";

							for(var i = 0 ; i < productData.length ; i++){
								rowData.productNames = rowData.productNames + (productData[i].name) +",";
							}
							$(brandGrid).setCell(prevId,"productNames",rowData.productNames.slice(0, -1),{},{});
						}

						var curr = brandGrid.jqGrid("getRowData", rowid);

						$('#partyGrid').jqGrid('clearGridData');
						$('#productGrid').jqGrid('clearGridData');

						if(curr.partyNames){
							
							var temp = [];
							var splited = curr.partyNames.split(",");
							
							for(var i = 0 ; i < splited.length ; i++){
								var obj = new Object();
								obj.name = splited[i];
								temp[i] = obj;
							}
							
							$("#partyGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
						}

						if(curr.productNames){
							
							var temp = [];
							var splited = curr.productNames.split(",");
							
							for(var i = 0 ; i < splited.length ; i++){
								var obj = new Object();
								obj.name = splited[i];
								temp[i] = obj;
							}
							
							$("#productGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
						}

					}
				}
				else {

					var curr = brandGrid.jqGrid("getRowData", rowid);

					if(curr.partyNames){
						var temp = [];
						var splited = curr.partyNames.split(",");
						
						for(var i = 0 ; i < splited.length ; i++){
							var obj = new Object();
							obj.name = splited[i];
							temp[i] = obj;
						}
						$("#partyGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
					}

					if(curr.productNames){
						var temp = [];
						var splited = curr.productNames.split(",");
						
						for(var i = 0 ; i < splited.length ; i++){
							var obj = new Object();
							obj.name = splited[i].split("_")[0];
							obj.type = splited[i].split("_")[1];
							temp[i] = obj;
						}
						$("#productGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
					}
				}

				prevId = rowid.rowid;
			
			},
			onCellSelect: function(rowid, icol, cellcontent, e) { 

				if(isNotEmpty(prevId)){

					if(prevId != rowid){

						var rowData = brandGrid.jqGrid("getRowData", prevId);

						var partyData = partyGrid.jqGrid('getGridParam','data');

						if(partyData.length > 0){

							rowData.partyNames = "";

							for(var i = 0 ; i < partyData.length ; i++){
								rowData.partyNames = rowData.partyNames + partyData[i].name +",";
							}
							
							$(brandGrid).setCell(prevId,"partyNames",rowData.partyNames.slice(0, -1),{},{});
						}

						var productData = productGrid.jqGrid('getGridParam','data');

						if(productData.length > 0){

							rowData.productNames = "";

							for(var i = 0 ; i < productData.length ; i++){
								rowData.productNames = rowData.productNames + (productData[i].name) +",";
							}
							$(brandGrid).setCell(prevId,"productNames",rowData.productNames.slice(0, -1),{},{});
						}

						var curr = brandGrid.jqGrid("getRowData", rowid);

						$('#partyGrid').jqGrid('clearGridData');
						$('#productGrid').jqGrid('clearGridData');

						if(curr.partyNames){
							
							var temp = [];
							var splited = curr.partyNames.split(",");
							
							for(var i = 0 ; i < splited.length ; i++){
								var obj = new Object();
								obj.name = splited[i];
								temp[i] = obj;
							}
							
							$("#partyGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
						}

						if(curr.productNames){
							
							var temp = [];
							var splited = curr.productNames.split(",");
							
							for(var i = 0 ; i < splited.length ; i++){
								var obj = new Object();
								obj.name = splited[i];
								temp[i] = obj;
							}
							
							$("#productGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
						}

					}
				}
				else {

					var curr = brandGrid.jqGrid("getRowData", rowid);

					$('#partyGrid').jqGrid('clearGridData');
					$('#productGrid').jqGrid('clearGridData');

					if(curr.partyNames){
						var temp = [];
						var splited = curr.partyNames.split(",");
						
						for(var i = 0 ; i < splited.length ; i++){
							var obj = new Object();
							obj.name = splited[i];
							temp[i] = obj;
						}
						$("#partyGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
					}

					if(curr.productNames){
						var temp = [];
						var splited = curr.productNames.split(",");
						
						for(var i = 0 ; i < splited.length ; i++){
							var obj = new Object();
							obj.name = splited[i].split("_")[0];
							obj.type = splited[i].split("_")[1];
							temp[i] = obj;
						}
						$("#productGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: temp }).trigger('reloadGrid');
					}
				}

				prevId = rowid;
			}
	});
};

function createPartyGrid() {
	"use strict";
	partyGrid =  $("#partyGrid").jqGrid({
		colNames : ['Name' ],
		colModel: [
			{name : 'name',align : "left",index : 'name',sortable : false,editable: true,width:80,edittype: 'select', formatter: 'select',
                editoptions:{value: partySelect}}
			],
			sortorder: "desc",
			caption: "Party Grid",
			sortIconsBeforeText: true,
			pager: 'partyGridNav',
			rowNum: 5,
			viewrecords: true,
			height : 150,
			width : 400
	});
};

function createProductGrid() {
	"use strict";
	productGrid =  $("#productGrid").jqGrid({
		colNames : ['Name'],
		colModel: [
			{name : 'name',align : "left",index : 'name',sortable : false,editable: true,width:80,edittype: 'select', formatter: 'select',
                editoptions:{value: productSelect}}
			],
			sortorder: "desc",
			caption: "Product Grid",
			sortIconsBeforeText: true,
			pager: 'productGridNav',
			rowNum: 5,
			viewrecords: true,
			height : 150,
			width : 400
	});
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

$(document).ready(function(){
	
	var prd = document.getElementById("productName").options;
	
	for(var i = 1 ; i < prd.length ; i++){
		productSelect +=  prd[i].innerText +":"+prd[i].innerText +";";
	}
	
	productSelect = productSelect.slice(0,-1);
	
	var val = document.getElementById("partyName").options;
	
	for(var i = 1 ; i < val.length ; i++){
		partySelect +=  val[i].innerText +":"+val[i].innerText +";";
	}
	
	partySelect = partySelect.slice(0,-1);
	
	
	createBrandGrid();
	addButtons(brandGrid);
	createPartyGrid();
	addButtons(partyGrid);
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
			var selId =  $(grid.selector).jqGrid('getGridParam','selrow');
			$(grid.selector).jqGrid('delRowData',selId);
			if(grid.selector == '#brandGrid'){
				$('#partyGrid').jqGrid('clearGridData');
				$('#productGrid').jqGrid('clearGridData');
			}
		}
	});	
}

function addEventListners(){

	$("#go").click(function(){

		console.log('Go called!');
		
		$('#partyGrid').jqGrid('clearGridData');
		$('#productGrid').jqGrid('clearGridData');
		$('#brandGrid').jqGrid('clearGridData');

		var fd = getFormData(searchPanel);
		console.log(fd);

		$.ajax({
			url: root_path+'/fetchBrand',
			data: JSON.stringify(fd),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				if(data && data.brandSOList && data.brandSOList.length > 0){
					$("#brandGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: data.brandSOList }).trigger('reloadGrid');
					loadDataIds = [];
					for (var i = 0; i < data.brandSOList.length; i++) {
						loadDataIds.push(data.brandSOList[i].brandId);
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

		var gridData = $('#brandGrid').jqGrid('getGridParam','data');
		var selId =  $('#brandGrid').jqGrid('getGridParam','selrow');
		var curr = brandGrid.jqGrid("getRowData", selId);
		
		if(curr){

			var productData = productGrid.jqGrid('getGridParam','data');

			if(productData){

				var productNames = "";

				for(var i = 0 ; i < productData.length ; i++){
					productNames = productNames + (productData[i].name) +",";
				}
				
				$(brandGrid).setCell(selId,"productNames",productNames.slice(0, -1),{},{});
			}

			var partyData = partyGrid.jqGrid('getGridParam','data');

			if(partyData){

				var partyNames = "";

				for(var i = 0 ; i < partyData.length ; i++){
					partyNames = partyNames + partyData[i].name +",";
				}
				$(brandGrid).setCell(selId,"partyNames",partyNames.slice(0, -1),{},{});
			}
		}
		
		var length = gridData.length;
		
		var errors = [];

		for (var i = 0; i < length; i++) {
			
			if(gridData[i].brandId){

				gridData[i].curdIndicator = 'U';

				loadDataIds.splice(loadDataIds.indexOf(gridData[i].brandId), 1);

			}
			else{
				gridData[i].curdIndicator = 'N';
			}
		}
		if(loadDataIds.length > 0){

			for(var i = 0 ; i < loadDataIds.length ; i++){
				gridData[length++] = {brandId : loadDataIds[i] , curdIndicator : 'D'};
			}
		}

		console.log(gridData);

		var brandListSO = new Object();
		brandListSO.brandSOList = gridData;

		$.ajax({
			url: root_path+'/saveBrand',
			data: JSON.stringify(brandListSO),
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
	
	$("#clear").click(function(){
		document.getElementById("brandName").value = 'ALL';
		document.getElementById("email").value = '';
		document.getElementById("productName").value = 'ALL';
		document.getElementById("partyName").value = 'ALL';
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