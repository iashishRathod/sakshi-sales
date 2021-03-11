var root_path='stock';
var stockGrid = null;
var serialGrid = null;
var loadDataIds = [];
var brandSelect = '';
var productSelect = '';
var brandNameList = [];
var brandProductList = [];
var stockIdValues = [];
var snackbarContainer = document.getElementById('snackbar-container');

function createStockGrid() {
	"use strict";
	stockGrid =  $("#stockGrid").jqGrid({
		colNames : ['','Brand Name','Product', 'Stock In','Allocated','Available','Total',''],
		colModel : [
			{name : 'stockId',align : "left",index : 'stockId',hidden:true},
			{name : 'brandName',align : "left",index : 'brandName',sortable : false,width:80,editable: true,edittype: 'select', formatter: 'select',
					editoptions: { value: brandSelect,
                        dataInit: function (elem) {
                            var temp = $(elem).value;
							var index = brandNameList.indexOf(temp);
							var productList = brandProductList[index];
							if(productList && productList.length > 0){
								productSelect = '';
								for(var i = 0 ; i < productList.length ; i++){
									productSelect +=  productList[i] +":"+productList[i] +";";
								}
	                            
								stockGrid.setColProp('product', { editoptions: { value: productSelect} });
							}
                        },
                        dataEvents: [
                            {
                                type: 'change',
                                fn: function(e) {
                                    var temp = this.value;
                                    var res = '';
                                    var index = brandNameList.indexOf(temp);
        							var productList = brandProductList[index];
        							if(productList && productList.length > 0 ){
        								for (var id in productList) {
        									if (productList.hasOwnProperty(id)) {
        										res += '<option role="option" value="' + productList[id] +
        										'">' + productList[id] + '</option>';
        									}
        								}
        							}
        							else{
        								var v = 'No prodcuts Found';
        								res += '<option role="option" value="' + v +
										'">' + v + '</option>';
        							}
                                    var row = $(e.target).closest('tr.jqgrow');
                                    var rowId = row.attr('id');
                                    $("select#" + rowId + "_product", row[0]).html(res);
                                }
                            }
                        ]
                    },editrules: {required: true}},
			{name : 'product',align : "left",index : 'product',sortable : false,editable: true,width:80,edittype: 'select', formatter: 'select',
					editoptions:{value:productSelect},editrules: {required: true}},
			{name : 'stockInDate',align : "left",index : 'stockInDate',sortable : false,width:80,editable: true, editoptions: {
						dataInit: function (element) {
							$(element).datepicker({
								dateFormat: 'dd/mm/yy',
							});
						}
					},editrules: {required: true}},
			{name : 'allocated',align:"left",index : 'allocated',sortable : false,editable: false,width:80},
			{name : 'inStock',align : "left",index : 'inStock',sortable : false,editable: false,width:80},
			{name : 'qty',align : "left",index : 'qty',sortable : false,editable: true,width:80,editrules: {required: true}},
			{name : 'stockSerialSO',align : "left",index : 'stockSerialSO',hidden:true}
			],
			sortorder: "desc",
			caption: "Stock Grid",
			pager: 'stockGridNav',
			rowNum: 10,
			viewrecords: true,
			add:true,
			height : 262,
			width : 600,
			onCellSelect: function(rowid, icol, cellcontent, e) { 

				$('#serialGrid').jqGrid('clearGridData');

				var curr = stockGrid.jqGrid("getRowData", rowid);

				if(curr && curr.stockId){

					var val = stockIdValues[loadDataIds.indexOf(parseInt(curr.stockId))];

					if(val){
						$("#serialGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: val}).trigger('reloadGrid');
					}
				}
			}
	});
};

function createSerialGrid() {
	"use strict";
	serialGrid =  $("#serialGrid").jqGrid({
		colNames : ['Serial Number' , 'Allocated','Remarks'],
		colModel: [
			{name : 'serialNumber',align : "left",index : 'serialNumber',sortable : false,editable: true,width:80},
			{name : 'inStock',align : "left",index : 'inStock',sortable : false,editable: true,width:80},
			{name : 'remarks',align : "left",index : 'remarks',sortable : false,editable: true,width:80}
			],
			sortorder: "desc",
			caption: "Serial Grid",
			sortIconsBeforeText: true,
			pager: 'serialGridNav',
			rowNum: 10,
			viewrecords: true,
			height : 262,
			width : 600
	});
};

$(document).ready(function(){

	var brand = document.getElementById("brandName").options;
	
	for(var i = 1 ; i < brand.length ; i++){
		brandSelect +=  brand[i].innerText +":"+brand[i].innerText +";";
	}
	
	brandSelect = brandSelect.slice(0,-1);
	
	var val = document.getElementById("productName").options;
	
	for(var i = 1 ; i < val.length ; i++){
		productSelect +=  val[i].innerText +":"+val[i].innerText +";";
	}
	
	productSelect = productSelect.slice(0,-1);	
	
	var obj = new Object();
	
	$.ajax({
		url: root_path+'/getBrandSpecificDetails',
		data: JSON.stringify(obj),
		dataType: 'json',
		processData: false,
		contentType: "application/json; charset=utf-8",
		type: 'POST',
		success: function(data){
			
			if(data.brandNameList && data.brandNameList.length > 0){
				brandNameList = data.brandNameList;
				brandProductList = data.brandProductList;
			}
		}
	});

	createStockGrid();
	addButtons(stockGrid);
	createSerialGrid();
	addEventListners();
});

function addButtons (grid) {
	var nav = grid.getGridParam('pager');
	grid.inlineNav(nav,{edit:true,add:true,save:true,cancel:false},
			{editCaption: "The Edit Dialog",recreateForm: true,closeAfterEdit: true,viewPagerButtons: false,errorTextFormat: function (data) {return 'Error: ' + data.responseText}},
			{closeAfterAdd: true,recreateForm: true,errorTextFormat: function (data) {return 'Error: ' + data.responseText}});

	var gn = grid.navGrid(nav,{edit:false,add:false,del:false,search:false,refresh:false});
	gn.navButtonAdd(nav,{
		id: 'del_'+grid,
		caption:"", buttonicon:"ui-icon-trash", //ui-icon-trash
		onClickButton: function(){ 
			var selId =  $('#stockGrid').jqGrid('getGridParam','selrow');
			$('#stockGrid').jqGrid('delRowData',selId);
			$('#serialGrid').jqGrid('clearGridData');
		}
	});	
}

function addEventListners(){

	$("#go").click(function(){
		
		$('#stockGrid').jqGrid('clearGridData');
		$('#serialGrid').jqGrid('clearGridData');

		console.log('Go called!');

		var fd = getFormData(searchPanel);
		console.log(fd);

		$.ajax({
			url: root_path+'/fetchStockDetails',
			data: JSON.stringify(fd),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				if(data && data.stockSOList && data.stockSOList.length > 0){
					loadDataIds = [];
					stockIdValues=[];
					for(var i = 0 ; i < data.stockSOList.length ; i++){
						loadDataIds.push(data.stockSOList[i].stockId);
						stockIdValues.push(data.stockSOList[i].stockSerialSO);
					}
					$("#stockGrid").jqGrid('setGridParam', { datatype: 'jsonstring',datastr: data.stockSOList }).trigger('reloadGrid');
				}
				else{
					showFlasMessage('info' , 'No Records found!',2000);
				}
			}
		});
	});

	$("#save").click(function(){

		console.log('save called!');

		var gridData = $('#stockGrid').jqGrid('getGridParam','data');

		var length = gridData.length;

		for (var i = 0; i < length; i++) {

			if(gridData[i].stockId){

				gridData[i].curdIndicator = 'U';

				loadDataIds.splice(loadDataIds.indexOf(gridData[i].stockId), 1);

			}
			else{
				gridData[i].curdIndicator = 'N';
			}
		}

		if(loadDataIds.length > 0){

			for(var i = 0 ; i < loadDataIds.length ; i++){
				gridData[length++] = {stockId : loadDataIds[i] , curdIndicator : 'D'};
			}
		}

		console.log(gridData);

		var stockListSO = new Object();
		stockListSO.stockSOList = gridData;

		$.ajax({
			url: root_path+'/saveStockDetails',
			data: JSON.stringify(stockListSO),
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
		document.getElementById("productName").value = 'ALL';
		document.getElementById("inUse").value = 'ALL';
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