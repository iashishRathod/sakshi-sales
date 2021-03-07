var root_path='invoice';
var invoiceGrid = null;
var brandSelect = '';
var productSelect = '';
var serailNumberSelect = '';
var brandNameList = [];
var brandPartyList = [];
var brandProductList = [];
var pre = [];
var serialNumberList = [];

function createInvoiceGrid() {
	"use strict";
	invoiceGrid =  $("#invoiceGrid").jqGrid({
		colNames : ['Brand Name','Product', 'Serial Number' , 'Qty' , 'Amount'],
		jsonReader : {
			root:"invoiceSOList"                                                                    
		},
		colModel: [
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
	                            
	                            invoiceGrid.setColProp('product', { editoptions: { value: productSelect} });
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
			{name : 'product',align:"left",index : 'product',sortable : false,editable: true,width:80,edittype: 'select',
                    	editoptions: { value: productSelect,
                            dataInit: function (elem) {
                                var temp = $(elem).value;
                                var rowid = $('#invoiceGrid').jqGrid('getGridParam','selrow');
                            	var curr = invoiceGrid.jqGrid("getRowData", rowid);
                                var data = curr.brandName +'_' +temp;
    							var index = pre.indexOf(data);
    							var serials = serialNumberList[index];
                            },
                            dataEvents: [
                                {
                                    type: 'change',
                                    fn: function(e) {
                                        var res = '';
                                        var temp = this.value;
                                        var rowid = $('#invoiceGrid').jqGrid('getGridParam','selrow');
                                    	var curr = invoiceGrid.jqGrid("getRowData", rowid);
                                        var data = curr.brandName +'_' +temp;
            							var index = pre.indexOf(data);
            							var serials = serialNumberList[index];
            							if(serials && serials.length > 0 ){
            								for (var id in serials) {
            									if (serials.hasOwnProperty(id)) {
            										res += '<option role="option" value="' + serials[id] +
            										'">' + serials[id] + '</option>';
            									}
            								}
            							}
            							else{
            								var v = 'No Stock Found';
            								res += '<option role="option" value="' + v +
    										'">' + v + '</option>';
            							}
                                        var row = $(e.target).closest('tr.jqgrow');
                                        var rowId = row.attr('id');
                                        $("select#" + rowId + "_serialNumbers", row[0]).html(res);
                                    }
                                }
                            ]
                        },editrules: {required: true}},
			 {name: 'serialNumbers', index: 'serialNumbers', width: 200, align: 'center', editable: true, formatter: 'select', edittype: 'select', 
						editoptions: {value: serailNumberSelect,
                    dataInit: function (elem) {
                    	setTimeout(function () {
                            $(elem).multiselect({
                                minWidth: 100, //'auto',
                                selectedList: 100,
                                checkAllText: "all",
                                uncheckAllText: "no",
                                open: function () {
                                    var $menu = $(".ui-multiselect-menu:visible");
                                    $menu.width("auto");
                                    return;
                                },
                                close : function(){
                                	var values = this.selectedOptions;
                                	if(values && values.length > 0){
                                		var val = '';
                                		for(var i = 0 ; i < values.length ; i++){
                                			val += values[i].innerText  +",";
                                		}
                                	}
                                	var rowid = $('#invoiceGrid').jqGrid('getGridParam','selrow');
                                	var rowData = $('#invoiceGrid').jqGrid('getRowData', rowid);
                                	rowData.serialNumbers = val.slice(0,-1);
                                	var size = rowData.serialNumbers.split(",").length;
                                	invoiceGrid.setCell(rowid,"qty",size,{},{});
                                }
                            });
                        }, 50);
                    },
                    multiple: true,
                },editrules: {required: true}},
			{name : 'qty',align : "left",index : 'qty',sortable : false,editable: false,width:80},
			{name : 'amount',align : "left",index : 'amount',sortable : false,editable: false,width:80}
			],
			height : 262,
			sortorder: "desc",
			width : 600,
			caption: "Invoice Grid",
			sortIconsBeforeText: true,
			pager: 'invoiceGridNav',
			rowNum: 5
	});
};

$(document).ready(function(){
	
	var obj = new Object();	
	$.ajax({
		url: 'stock/getBrandSpecificDetails',
		data: JSON.stringify(obj),
		dataType: 'json',
		processData: false,
		contentType: "application/json; charset=utf-8",
		type: 'POST',
		success: function(data){
			
			if(data.brandNameList && data.brandNameList.length > 0){
				brandNameList = data.brandNameList;
				brandPartyList = data.brandPartyList;
				brandProductList = data.brandProductList;
				pre = data.brandProuducts;
				serialNumberList = data.serialNumberList;
			}
		}
	});
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
			var selId =  $('#invoiceGrid').jqGrid('getGridParam','selrow');
			$('#invoiceGrid').jqGrid('delRowData',selId);
		}
	});	
}

function addEventListners(){

	$("#load").click(function(){
		
		var party = document.getElementById("partyName").value;
		var invoiceDate = document.getElementById("invoiceDate").value;
		
		if((!isNotEmpty(party) || party == 'ALL' ) || !isNotEmpty(invoiceDate)){
			
			var error = '';
			
			if(!isNotEmpty(party) || party == 'ALL'){
				error += 'Please select Party';
			}
			
			if(!isNotEmpty(invoiceDate)){
				error += error.length == 0 ? 'Please Select Date' : '\nPlease Select Date'; 
			}
			alert(error);
		}
		else{

			brandSelect = '';
			productSelect = '';
			for(var i = 0 ;i < brandPartyList.length ; i++){
				if(brandPartyList[i].indexOf(party) >= 0){
					brandSelect +=  brandNameList[i] +":"+brandNameList[i] +";";
					
					if(brandProductList && brandProductList[i] && brandProductList[i].length > 0){
						var list = brandProductList[i];
						for(var k = 0 ; k < list.length ; k++){
							productSelect +=  list[k] +":"+list[k] +";";
						}
					}
				}
			}
			brandSelect = brandSelect.slice(0,-1);
			productSelect = productSelect.slice(0,-1);	
			
			if(brandSelect.length > 0 && productSelect.length > 0 ){
				var index = pre.indexOf(brandSelect.split(";")[0].split(':')[0] +"_"+productSelect.split(";")[0].split(':')[0]);
				if(index > -1){
					var nums = serialNumberList[index];
					for(var i = 0 ; i < nums.length ; i++){
						serailNumberSelect +=  nums[i] +":"+nums[i] +";";
					}
					serailNumberSelect = serailNumberSelect.slice(0,-1);
				}
			}
			
			createInvoiceGrid();
			addButtons(invoiceGrid);
		}
	});

	$("#save").click(function(){

		console.log('save called!');

		var gridData = $('#invoiceGrid').jqGrid('getGridParam','data');
		var party = document.getElementById("partyName").value;
		var date = document.getElementById("invoiceDate").value;

		var length = gridData.length;

		for (var i = 0; i < length; i++) {
			gridData[i].curdIndicator = 'N';
		}

		console.log(gridData);

		var invoiceListSO = new Object();
		invoiceListSO.partySOList = gridData;

		$.ajax({
			url: root_path+'/saveInvoice',
			data: JSON.stringify(partyListSO),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				//$( "#go" ).click();;
			}
		});
	});
	
	$("#clear").click(function(){
		document.getElementById("partyName").value = 'ALL';
		document.getElementById("invoiceDate").value = '';
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