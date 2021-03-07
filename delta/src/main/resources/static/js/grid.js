/*
* Enterprise Framework J@Du
* Copy Rights - Qatar Airways IT
* JqGrid abstraction that handles CRUD operations out of the box
* @author Vijesh Aaniyam Veetil
*/
define(['jadu','jqgrid','jquery','miscwidgets'], function(jadu,jqgrid,jQuery,mWidgets) {

 var checkboxEle =  jQuery.fn.fmatter.checkbox;
 jQuery.fn.fmatter.checkbox =function(cval, opts) {		
		var existingCBox = checkboxEle(cval, opts);
		existingCBox = existingCBox.slice(0,6) + " class='jaduGridChk'"+ existingCBox.slice(6);
		return "<div class=\"jaduGridChkContainer\">" + existingCBox +"</div><div class=\"jaduGridChkUpLayer\"></div>";
};

return {


/**
* Base Editable Grid for Jadu framework. The data manipulation for CRUD operations is abstracted
* in this table.
* The default parameters for the grid also specified here
* @param tableId - id of the table element
* @param recordsProp (deprecated) - name of the array property in the root that has data for the table
* @param options - JqGrid specific options (major options are defaulted. only the additional and overrides are required)
* @author Vijesh Aaniyam Veetil
*/
create: function (tableId, options) {
	var gridWidth; 
	var defaultRowNum = 10;  
	var rootData = null,records = null,grid = null,parentRef = null,afterLoad = null,recordsProp="rows";	
	var ACTIONS = {NEW:"N",UPDATED:"U",DELETED:"D",CHILDCHG:"C",UPD_AND_CHILDCHG:"UC",BLANK:"B"};
	var modifyactions = [ACTIONS.NEW,ACTIONS.UPDATED,ACTIONS.DELETED,ACTIONS.CHILDCHG,ACTIONS.UPD_AND_CHILDCHG]; // "B" is not listed as it is temporary and ignored
	var currRow = 0, currCol =0;
	//it has always updated first and last edit cells
	var edtColMap;
	
	//former second argument 'recordsProp' is deprecated
	//this to give backward compatibility
	if(arguments.length === 3) {
		options = arguments[2];
	}

	var baseOptions = {  
		datatype:'jsonstring',
	    viewrecords: false,
        sortorder: "desc",
        multiselect: false,
		rowNum : defaultRowNum,
		pginput:false, // textfield for page number and pagesize combobox goes away
		recordtext:"", // records x of n display goes away
		
		pagerpos: 'right',
		pgtext:"",
		
        multiboxonly: true,
		cmTemplate: {editable: true},
		//shrinkToFit: false,
		cellEdit: false,
		scrollOffset: 0,
		height :'auto',
		loadui: 'disable',
		editurl: 'clientArray',
		cellsubmit: 'clientArray',
		autoencode:true,
		jsonReader : {
			root:"rows",
			page:"pageNumber",
			rows:"pageSize",
			total:function(obj){
				//Returns the total pages
				if(obj.totalPages && obj.totalPages !== 0)
					return obj.totalPages;
				var totalPages,recordSize;
				if(grid){
			    var page = grid.getGridParam('page');
				if(obj[options.jsonReader.root]){
				 recordSize=obj[options.jsonReader.root].length;
				}
				 if(recordSize>0){
					if(recordSize===grid.getGridParam("rowNum")){
						totalPages=page+1;
					}
					else{
						totalPages=page;
					}
				   }
				   else{
						totalPages=page;
				   } 
				}				   
				return totalPages;
			},                               
			records:"totalRecords",
			repeatitems: false                                                                     
		},
		prmNames: {
			page:"pageNumber",
			rows:"pageSize", 
			sort:"sortBy",
			order:"sortOrder"
		},
		beforeEditCell: function (rowid, cellname, value, iRow, iCol) {
			currRow = iRow;
			currCol = iCol;
		},	
		afterSaveCell: function (id,name,val,iRow,iCol){
			//log.debug("id="+id+" iRow="+iRow+" "+name+" = "+val);
			var record = records[iRow-1];
			//log.debug("record: "+JSON.stringify(record))
			var oldValue = record[name];
			if(oldValue !== val){
				setGridCrudIndicator(record,id,name,val);
			}
			var chkClass = grid.find('tr#'+id+' td:eq('+iCol+'):has(:checkbox)').hasClass('jaduGridChk');
		/*	if(chkClass !== true){
				grid.find('tr#'+id+' td:eq('+iCol+'):has(:checkbox)').append('<div class="jaduGridChkUpLayer"></div>').find(':checkbox').addClass('jaduGridChk').wrap('<div class="jaduGridChkContainer"></div>');
			}*/
			grid.triggerHandler("jaduGridAfterSaveCell", [id,name,val,iRow,iCol]);
			//moved to private setGridCrudIndicator function
			//TBD: remove this once setGridCrudIndicator reports no defects
			/*if(ACTIONS.NEW !== record["crudIndicator"] && oldValue !== val) {			
				if(!record.crudIndicator) {
					record.crudIndicator = '';
				}				
				if(record["crudIndicator"] === "B") {
					record["crudIndicator"] = ACTIONS.NEW;
				}
				else {
					if(record.crudIndicator.indexOf(ACTIONS.UPDATED) === -1) {
						record.crudIndicator = ACTIONS.UPDATED+record.crudIndicator;//already ACTIONS.CHILDCHG might be there, so prepending it
					}
					grid.setCell(id,name,'','x-grid-dirty-cell',''); 
					setDataChangeAction('E');
				}
			} 
			record[name] = val;*/
		},
		loadComplete: function (data) {
			gridWidth = options.width || jQuery(tableId).width() ;
			var hasFullPager = options.showFullPager;
			//
			if(hasFullPager){
			console.log("..............hasFullPager.............");
			var navigatorId = options.pager,			
				pagerWidth = jQuery(navigatorId+'_right .ui-pg-table').outerWidth(),
				infoWidth = jQuery(navigatorId+'_right .ui-paging-info').outerWidth();
			jQuery(navigatorId+'_right .pagerNavs').css("right", pagerWidth+infoWidth+10);
			jQuery(navigatorId+'_right .pagerNavs, '+navigatorId+'_right .ui-paging-info').show();
			}
			//log.debug("loadComplete: "+ JSON.stringify(data));
			if (data) {	
				if(data instanceof Array) {
					var tdata = new Object();
					tdata[recordsProp] = data;
					data = tdata;
				}
				if(afterLoad && afterLoad !== null) {
					afterLoad(data);
				}
					else{
					rootData = data;//saves the data from server
					if(grid && grid.getGridParam('dumpLoad')){
						if(rootData["rows"]){     // this is for the dumpload
							rootData[recordsProp]=rootData["rows"];
							delete rootData["rows"];
						}
						if(data["page"]){   // this is for the dumpload
							data["pageNumber"]=data["page"];
						}
					}
					records = rootData[recordsProp];					
				}
				
				//To store the page information from the request postData to the model object
				if(grid && grid.getGridParam('url') && grid.getGridParam('url') !== null){
					var postData = grid.getGridParam('postData');
					if(postData){
						data["pageNumber"] = postData.pageNumber;
					}
				}
				data["totalPages"] = jQuery.jgrid.getAccessor(data,baseOptions.jsonReader.total);

			}
			// For enabling and disabling the next previous buttons based on page number and total pages.
			if(options.pager && options.navButtons !== false){
				var pagerId = '_'+options.pager.slice(1);	
				
				if(pagerId && records){
						
						if(data){
							if(data["pageNumber"]===1 || data["pageNumber"] === 0 || !data["pageNumber"]) {

								jQuery("#prev"+pagerId).addClass('ui-state-disabled');
								
							} else {

								jQuery("#prev"+pagerId).removeClass('ui-state-disabled');
								
							}
							if(data["pageNumber"]===data["totalPages"] || data["pageNumber"] === 0 || !data["pageNumber"])  {

								jQuery("#next"+pagerId).addClass('ui-state-disabled');
								
							} else {

								jQuery("#next"+pagerId).removeClass('ui-state-disabled');
								
							}
						}

				}else {

					if(data && data["pageNumber"] > 1) {

					    jQuery("#prev"+pagerId).removeClass('ui-state-disabled');

						jQuery("#next"+pagerId).addClass('ui-state-disabled'); 

					 }else {

					    jQuery('#prev'+pagerId+', #next'+pagerId).addClass('ui-state-disabled');

					 }
				}
			}	

			if(grid){
				var isTopLevel = grid.getGridParam('isTopLevel');
				records = records || [];  
				
				//This logic is to check the parent grid record length is zero, if yes then related child grids will be cleared using the clearGridData()
				if(!data || data == null || records.length === 0){					
					var childRef = grid.getGridParam('hasMany');
					if(childRef && childRef.length > 0) {
						for(var i=0; i < childRef.length; i++){                                                                
						 childRef[i].container.clearGridData();                                                               
						}
					}
				}
				
				if(isTopLevel === true && (!data || data == null || records.length === 0) && data.pageNumber === 1) { 
					mWidgets.showFlashMessage('info','noRecords'); //there should be an 'info' type?
				}
				//as part of the checkbox double click issue fix
			}
			
		
			initializeDataModel();	
			setFirstRowSelection();
		},
		onPaging: function(pgButton) {
			var r= true;
			if(!grid.getGridParam('dumpLoad')){  // set this parameter to true to skip checkModifiedData() on click  of prev/next for dumpload
				if(checkModifiedData() && !(jQuery("#"+pgButton).hasClass("ui-state-disabled")) ) {//can't call the added methods here
					r=confirm("unSavedData");//TODO i18n
				}
			}
			return (r ? 'ok':'stop');			
		}
    }
	// Option to add full pager by adding option "showFullPager:true"
	if(options.showFullPager){
		options = jQuery.extend(true,{
				viewrecords: true,
				recordtext:'records'+": {0} - {1} of {2}",
				emptyrecords:'',
				pginput:true,
				pgtext:'page'+": {0} of {1}"
				},options);
	}
	options = jQuery.extend(true,baseOptions,options);// overrides with the options from the caller	
	
	//set the recordsProp using reader. 'datatype' may have to be considered in future
	recordsProp = options.jsonReader.root;
	
	//set the recordsProp using reader for dataType local
	if(options.datatype == "local"){
		if(options.localReader){
			recordsProp = options.localReader.root;
		}
	} 
	
	grid = jQuery(tableId).jqGrid(baseOptions);	
	
	grid.bindKeys({ 
		onEnter: null, 
		onSpace: null, 		
		scrollingRows : true 
	});
	
	grid.bind('jqGridSelectRow', function(e, rowid){
			log.debug(rowid+' jqGridSelectRow: '+new Date().getTime());
			if(rowid)
			loadChildData(rowid);
		}
	);
	
	//this call back is implemented to solve the data change detection issue
	//when the datatype is 'local' (where the local data is already updated by the time aftersavecell is called)
	grid.bind('jqGridBeforeSaveCell', function(e,id, name, val, iRow,iCol) {
			if(options.datatype === "local") {
				var record = records[iRow-1];
				var oldValue = record[name];
				if(oldValue !== val){
					setGridCrudIndicator(record,id,name,val);
				}
			}
		}
	);
	
	//when the grid is in cellEdit mode, the jqGridSelectRow is not fired. The following logic
	//is to done to make it happen
	grid.bind('jqGridBeforeSelectRow', function(e,rowid){	
			//cascadeStopEditing();
			if(grid.getGridParam('cellEdit') === true) {
				log.debug(rowid+' jqGridBeforeSelectRow: '+new Date().getTime());
				var selId = grid.getGridParam('selrow');
				if(rowid !== selId){
					cascadeStopEditing();
					grid.setSelection(rowid, true);					
				}
			}
			//Removed the temproary multiple row selection issue on onclicking the disabed button, since 
			//fix was added in the jqgrid main js file.			
		}
	);
	
	//Moved from afterEditcell to jqGridAfterEditCell event to avoid overrides
	grid.bind('jqGridAfterEditCell', function(e,rowid, cellname, value, iRow, iCol) {
			var lastColName = null;

			var cm = grid.getGridParam('colModel');
			var totalRow = grid.getGridParam("reccount");
			//console.log(cm);
			//Iterate and set the first/last Edit column info
			jQuery.each(cm, function(index,value) {
					if(value.editable)
					lastColName = value.name;
                   
 				});
			
			if(cellname == lastColName && iRow == totalRow ){
			
				var inputControl = grid.find('#' + (iRow) + '_' + cellname);
				
				inputControl.bind("keydown",function(e) {
					if (e.keyCode === 9 && !e.shiftKey) {  // Enter key:
						grid.triggerButton("A");
						return false;
					}
				
				});
			}
			
	});

	initialize();
	overrides();
	
	// Newly added methods to provide additional functionalities
	grid.extend({
		/**
		* Parent ref is used to set the parent record/control reference
		* Events will be notified to it. Typically it is used for hierarchical grids
		* but the parent can be any object as long as it provides the function implementation
		* @param parent - reference to the parent object/control
		*/
		addParentRef: function(parent) {
			parentRef = parent;
		},
		
		/**
		* Returns the underlying model data
		*/
		getModelData: function() {			
			return rootData;
		},
		/**
		* Returns the underlying model records
		*/
		getModelRecords: function() {			
			return records;
		},
		
		/**
		*To set the cell data
		*/
		setCellData: function(rowid,colName,ColVal,colClass,properties){
			colClass = colClass || {};
			properties = properties || {};
			var record = grid.getModelRecord(rowid);			
			if(record){
				var oldValue = record[colName];
				if(oldValue !== ColVal){
					setGridCrudIndicator(record,rowid,colName,ColVal);
					grid.setCell(rowid,colName,ColVal,colClass,properties);
				}
			}
		},
		/**
		* Returns the record from the data model for the given row index
		* @param iRow - 'index' of the grid row record
		*/
		getModelRecordByIndex: function(iRow){
			return records[iRow-1];			
		},
		/**
		* Returns the underlying model record based on property
		*/
		getModelRecordByProperty: function(propName,propVal) {
			var crrecord = null;
			if(propName && propVal){					
				jQuery.each( records, function(index,curRecord){
					if(curRecord[propName] === propVal){
						crrecord=curRecord;
						return false;
					}
				});				
			}			
			return crrecord;		
		},
		
		resetGridData: function(indata, dataOptions) {
			alert(" 'resetGridData' in JaduGrid is deprecated, use 'resetData' instead ");
			this.resetData(indata, dataOptions);
		},
		
		resetData: function(indata, dataOptions) {
			grid.clearGridData();
			if(dataOptions.url &&  dataOptions.url !== null) {				
				dataOptions.url = grid.getGridParam('baseUrl')+'&'+dataOptions.url;
				log.debug("url condition after reload "+JSON.stringify(dataOptions));
				afterLoad = doAfterLoadComplete(indata,false,dataOptions.childProp);
			}
			else {
				dataOptions["datastr"] = indata[dataOptions.childProp];
				
				//log.debug("data condition after reload "+JSON.stringify(dataOptions));
				afterLoad = doAfterLoadComplete(indata,true,dataOptions.childProp);
			}
			
			grid.setGridParam(dataOptions);

			var childData = indata[dataOptions.childProp];
			if(childData && childData != null){
				//Set the page number on the reload
				grid.trigger('reloadGrid', [{page: childData.pageNumber === 0 ? 1 : childData.pageNumber}]);
				//Set the url and datatype back so that pagination requests can work
				grid.setGridParam({url:grid.getGridParam('baseUrl')+'&'+dataOptions.childUrl,datatype:'json',lastpage:childData.totalPages});

			}else{

				grid.trigger('reloadGrid');

			}
			
		},
		
		/**
		* Function to load data in a grid based on a parent record. Once loaded data is attached to the corresponding property
		* in the parent record
		* @param parentRec -- the parent json object
		* @param childMeta -- data load meta data (similar to hasMany configuration except that 'container' prop is not required)
		*						e.g. {prop:'stockHistory', fKeys:"fromCspbranchId"}. The property baseUrl is required in grid param
		*/
		loadDataForParentRecord: function(parentRec, childMeta){
			var childUrl = jQuery.param(copySubProperties(parentRec, childMeta.fKeys));
			if (( parentRec[childMeta.prop] === null || typeof parentRec[childMeta.prop] === 'undefined') && parentRec["crudIndicator"] !== ACTIONS.NEW && parentRec["crudIndicator"] !== ACTIONS.BLANK) {
				log.debug("fetch mode "+childUrl);
				//jQuery.param(copySubProperties(parentRec, childMeta.fKeys))
				grid.resetData(parentRec, {url : childUrl,datatype : 'json',datastr : null, childProp : childMeta.prop});
			}
			else {
				log.debug("data already loaded mode ");
				grid.resetData(parentRec, {url:null,childUrl:childUrl,datatype:'jsonstring', childProp:childMeta.prop});
			}
		},
		
		getLastSelModelData: function() {
			alert('JaduGrid.getLastSelModelData() is deprecated, please use JaduGrid.getCurrentSelectedModelData() ');
			return this.getCurrentSelectedModelRecord();
		},
		/**
		* Returns the selected row's record from the data model
		*/
		getCurrentSelectedModelRecord: function() {
			var lastRow = grid.getGridParam('selrow');
			var record = null;
			if(lastRow) {
				var index = grid.getInd(lastRow);
				record = records[index-1];
			}
			return record;
		},
		onChildChange: function(changeInfo) {
	
			var isOk = true;
			if(changeInfo.crudIndicator === "datachange") {
				
				var curRec = grid.getCurrentSelectedModelRecord();
				if(!curRec.crudIndicator) {
					curRec.crudIndicator = '';
				}
				
				if(curRec.crudIndicator === ACTIONS.BLANK && changeInfo.type === 'E') {
					curRec.crudIndicator = ACTIONS.NEW;
				}				
				else if(curRec.crudIndicator !== ACTIONS.NEW && curRec.crudIndicator !== ACTIONS.BLANK && curRec.crudIndicator.indexOf(ACTIONS.CHILDCHG) === -1) {
					curRec.crudIndicator = curRec.crudIndicator + ACTIONS.CHILDCHG;
				}
			}
			else if(changeInfo.crudIndicator === "before-add") {
				
				log.debug('reccount '+grid.getGridParam('reccount'));
				if(grid.getGridParam('reccount') === 0) {
					isOk = false;
				}
			}
			
			if(isOk && parentRef) {
				isOk = parentRef.onChildChange(changeInfo);
			}
			return isOk;
		},
		onParentChange: function(changeInfo) {
			if(changeInfo.crudIndicator === "selectionchange") {
				grid.clearGridData();
				cascadeParentAction(changeInfo);
			}
		},
		/**
		* Saves the current data in a cell (helpful when tab out doesn't happen)
		*/
		stopEditing: function() {
			try {
				grid.saveCell(currRow, currCol);
				grid.triggerHandler("jaduGridAfterStopEditing", [grid.getGridParam('selrow'),currRow,currCol]);
				cascadeStopEditing();//let's do it to the child grids as well
			}
			catch(e){
				// exception happens when the grid is not in editable mode, nothing to do - ignores
			}
		},
		/**
		* Saves the current data in a cell (helpful when tab out doesn't happen)
		*/
		setCellEdit: function(isCellEdit, cascade) {
			
			grid.setGridParam({cellEdit:isCellEdit});
			if(cascade === true) {
				cascadeCellEdit(isCellEdit, cascade);
			}
			
		},
		/**
		* Returns the record from the data model for the given rowid
		* @param rowid - 'id' of the grid row record
		*/
		getModelRecord: function(id){
			var record = null;
			if(id!=null && (id+"").trim().length !=0){
				var index = grid.getInd(id);
				record = records[index-1];				
			}			
			return record;			
		},
		/**
		* Returns the number of records displayed in the grid
		*/
		getRecordCount:function() {
			return records ? records.length : 0;
		},
		/**
		* Call this method to add a new empty row to the top of the grid
		* grid.addNewRow({}) // default values can be initialized
		*/
		addNewRow: function(newrow,srcId,options) {	
			options = options || {};
			options.skipNewrecfun = options.skipNewrecfun || false;
			grid.stopEditing();
			if(parentRef && !parentRef.onChildChange({crudIndicator:"before-add"})) {
				log.debug('Parent container is not ready?!!!');
				return;
			}
			if(grid.hasBlankRecords()) {
				mWidgets.showFlashMessage('warning','emptyRecord');
				return;
			}
			
			initializeDataModel();
			var rowfn = grid.getGridParam('newrecfun');//let the dev create the row record
			if(rowfn && options.skipNewrecfun !== true) {
			     newrow = rowfn();
				 if(newrow === false)
					return;
			}			
						
			var cm = grid.getGridParam('colModel');
			//making sure all properties are there in the object
			jQuery.each(cm, function(index,value) {
				if(!newrow[value.name]){//if not already present
					newrow[value.name]=null;
				}
			});                    
            
			if(newrow["crudIndicator"] !== ACTIONS.NEW) {//If supplier set's it then ok
				newrow["crudIndicator"] = ACTIONS.BLANK;
			}
			//log.debug("newrow: "+JSON.stringify(newrow));
			var rowid = newrow.id || createNewRecordId();//"new"+(records.length + 1);
			newrow.tmpId = rowid; //tmpId for co-relating object after save
			var pos = grid.getGridParam('newrecpos') || "last";
			
			if(records.length === 0)
				pos = "first";

			if(!srcId && (pos === 'after' || pos=== 'before')) {
				srcId = grid.getGridParam('selrow');
			}

			if(srcId){
				grid.addRowData(rowid,newrow,pos,srcId);
			}
			else {
				grid.addRowData(rowid,newrow,pos);
			}

			// Adding checkbox wrapper and class for the newly added row.
		/*	var gridRowCheckbox = grid.find('tr#'+rowid+' td input[type=checkbox]');
			gridRowCheckbox.parent().append('<div class="jaduGridChkUpLayer"></div>');
			gridRowCheckbox.addClass('jaduGridChk').wrap('<div class="jaduGridChkContainer"></div>');	*/

			records.splice(grid.getInd(rowid)-1,0,newrow);	
			grid.resetSelection();
			grid.setSelection(rowid,true);			
			if(grid.getGridParam('displayMode') !== 'view'){//index table
				if(grid.getGridParam('cellEdit') === false){
					grid.setGridParam({cellEdit:true});	
				}
				grid.editCell(grid.getInd(rowid), (edtColMap.firstEdtColNum || 0),true);
			}			
			//Check the child grid for blank records, if yes don't allow
			//to set the parent for data change action.
			if(newrow["crudIndicator"] !== ACTIONS.BLANK){
				setDataChangeAction('A');
			}
			
			grid.triggerHandler("jaduGridAfterAddRow", [rowid]);
			setPagination();
		},
		/**
		* Deletes the currently selected records from the view and moves that to an internal property
		*/
		deleteSelRows: function(options) {
			options = options || {};
			grid.stopEditing();
			var ids = grid.getGridParam('selarrrow');//returns data only when multiselect=true (checkbox)
			if(!ids || ids.length === 0) {
				if(grid.getGridParam('selrow')){
					ids = new Array();
					ids.push(grid.getGridParam('selrow'));
				}else{
					return;
				}
			}
			if(options.skipDelrecfun !== true)
				var delfn = grid.getGridParam('delrecfun');//let the dev take some decision about deletion
			if(delfn && delfn(ids) === false) {
				 log.debug("'delrecfun' returned false...delete cancelled");
			     return;			
			}			
			//log.debug("ids: "+ids);
			//clone the the array(ids) - the original array is being modified by delRowData
			ids=ids.slice(0);
			var isExistingRecDeleted = false;
			for (var i = 0; i < ids.length; i++) {				
				var index = grid.getInd(ids[i]);
				//log.debug("ids[i] :"+ids[i]+", index: "+index);				
				if(grid.delRowData(ids[i])) {
					var dData = records[index-1];				
					if(typeof(dData.crudIndicator) === 'undefined' || (dData["crudIndicator"] !== ACTIONS.NEW && dData["crudIndicator"] !== ACTIONS.BLANK)) {
						if(!rootData.delData) {
							rootData["delData"] = new Array();
						}	
						dData["crudIndicator"] = ACTIONS.DELETED;						
						rootData.delData.push(dData);
						isExistingRecDeleted = true;
					}
					records.splice(index-1, 1);
				}
				else {
					log.warn("the record with id:"+ids[i]+" could not be deleted ");	
				}
			}
			grid.setSelection(grid.getDataIDs()[0],true);
			if(isExistingRecDeleted === true) {//if existing record deleted, propagate the action
				setDataChangeAction(ACTIONS.DELETED);
			}
			if(grid.getGridParam('reccount') === 0) {
				cascadeParentAction({crudIndicator:"selectionchange"})
			}
			grid.triggerHandler("jaduGridAfterDeleteRow", [ids]);
			setPagination();
		},
		/**
		* The method returns an array of records that have been modified, added or deleted
		* with the actions being "U","N","C","UC" or "D" correspondingly
		*/
		getCrudData: function() {
			var mData = new Array();
			//log.debug(rootData);
			jQuery.each( records, function(){
			  if (modifyactions.indexOf(this.crudIndicator) > -1) {
				mData.push(this);
			  }
			});
			
			if(rootData.delData && rootData.delData.length > 0) {
				mData = mData.concat(rootData.delData);
			}
			return mData;
		},	
		/**
		* Checks whether blank records exist or not
		*/
		hasBlankRecords: function() {
			var hasBlank = false;
			if(records !== null){
				jQuery.each( records, function(){
				  if (this.crudIndicator === ACTIONS.BLANK) {
					hasBlank = true;
					return false;//exit loop
				  }
				});
			}
			return hasBlank;
		},
		addCrudButtons: function() {
			alert("addCrudButtons is deprecated. Use addButtons(['A','E','D']) ");
			this.addButtons(['A','E','D']);
		},
		setMandatoryLabel: function(mandatoryField){
			jQuery.each(mandatoryField, function(index, value){
				grid.setLabel(value,"", "required");
			});
		},
		addButtons: function(buttons,extra) {
			var nav = grid.getGridParam('pager');
			var gn = grid.navGrid(nav,{edit:false,add:false,del:false,search:false,refresh:false});
			var currentGrid =  tableId.replace(/#| /g,"");
			
			if(buttons.indexOf('E') > -1) {				
				gn.navButtonAdd(nav,{
				   id: currentGrid+'E',
				   caption:"edit", buttonicon:"ui-icon-edit",
				   onClickButton: function(){ 
					 grid.setGridParam({cellEdit:true});
				   }
				});
			}
			if(buttons.indexOf('A') > -1) {
				gn.navButtonAdd(nav,{
				   id: currentGrid+'A',
				   caption:"add", buttonicon:"ui-icon-add", 
				   onClickButton: function(){
					 grid.addNewRow({});
				   }
				});
			}
			if(buttons.indexOf('D') > -1) {
				gn.navButtonAdd(nav,{
				   id: currentGrid+'D',
				   caption:"delete", buttonicon:"ui-icon-del", 
				   onClickButton: function(){ 
					  grid.deleteSelRows();
				   }
				});	
			}

			if(extra) {
				for (var i = 0, len = extra.length; i < len; i++) {
					var aButton = extra[i], captionData = aButton.caption;
					var trimedCaption = captionData.replace(/\s/g, '');
					gn.navButtonAdd(nav,{
					   id:currentGrid + (aButton.id || trimedCaption),
					   caption:aButton.caption, buttonicon:aButton.buttonicon || "", 
					   onClickButton: aButton.onClickButton
					});
				}
			}
		},
		/**
		*  Call this method to enable or disable grid navigation buttons
		*  Example :
		*  grid.setActionState(true) or grid.setActionState() or grid.setActionState(false)
		*  grid.setActionState({"A":false}) - Will disable the ADD Button
		*  grid.setActionState({"A":true}) - Will enable the ADD Button
		*  For Multiple Buttons Disable or Enabling
		*  grid.setActionState({"A":true,"E":true,"D":false,"Test":false,"Other":false});
		*
		**/
		setActionState : function(btnActionType,casecade,opts){			
			var curNavLeft = jQuery(grid.getGridParam('pager')+"_left"), //gets the pager left nav ex: #personGridNav_left
				uiStateDisabledClass = "ui-state-disabled";
			if(btnActionType === undefined){
				btnActionType = true;
			}
			if(casecade === undefined){
				casecade = false; //by default no cascading...
			}
			if(typeof btnActionType === "boolean"){
					var currButtons = curNavLeft.find("td.ui-pg-button")
					if(currButtons){
						if(btnActionType === false){					
							currButtons.addClass(uiStateDisabledClass);						
						}else if(btnActionType ===  true){						
							currButtons.removeClass(uiStateDisabledClass);										
						}
					}
					if(grid.getGridParam('cellEdit') !== btnActionType){
						grid.setGridParam({cellEdit : btnActionType });
					}				
			}else if(typeof btnActionType === "object"){
				
				jQuery.each( btnActionType, function(index, value){			
					var currBtnId = curNavLeft.find(tableId+index), 
						chkBtnDisableClass = currBtnId.hasClass(uiStateDisabledClass);
							if(curNavLeft.find(tableId+index).length !== 0){
								if(value === false && !chkBtnDisableClass){					
									currBtnId.addClass(uiStateDisabledClass);
								}else if(value === true && chkBtnDisableClass){
									currBtnId.removeClass(uiStateDisabledClass);
								}							
							}
						if(index === "E" && grid.getGridParam('cellEdit') !== value){
							grid.setGridParam({cellEdit : value });
						}		
				});
			}
			if(casecade === true) {
				var children = grid.getGridParam('hasMany');		
				if(children && children.length > 0) {
					for(var i=0; i < children.length; i++){
						children[i].container.setActionState(btnActionType,casecade,opts);				
					}
				}
			}
			
		},
		hasModifiedData: function() {
			return checkModifiedData();
		},
		/**
		*This method can be used for 
		*1. Get the Grid column names
		*2. To find out the first/last edit cells dynamically
		*3. CTRL + A  - Will add the new row at the bottom
		*4. DownArrow - Will add the new row to the bottom
		*5. Tab - Will add the new row to the bottom when in the last row and last column
		*6. Shift Tab - Will take you from one edited cell to another edited cell begin in the same row.
		*/
		setTaboutToLastEditCell: function(){			
			//To keep track of first/last Edit column names
			edtColMap={"firstEdtColNum":0, "lastEdtColName":null};
			var isFirstEditClmn=false;			
			//get colModel from grid 
			var cm = grid.getGridParam('colModel');
			//Iterate and set the first/last Edit column info
			jQuery.each(cm, function(index,value) {
				//to identify first editable column
				if(value.editable){
					if(!isFirstEditClmn){
						edtColMap.firstEdtColNum=index;						
						isFirstEditClmn=true;
					}	
					if(!value.hidden){			
						edtColMap.lastEdtColName=value.name;
						edtColMap.lastEdtColNum=index;
					}					
 				}
			});
			jQuery.each(cm, function(index,value) {			
				var currColName=value.name;
				var fcn=edtColMap.firstEdtColNum;
                var lcn=edtColMap.lastEdtColNum;
				if(currColName){				
					//Tab, Ctrl+A, down arrow key and Enter Data event
					var custDataEvent = [{
						type: 'keydown',
						fn: function (e) {							
							var key = e.charCode || e.keyCode;
							var JQtabid = "jQuery('" + tableId + "')";
							var totalRow = grid.getGridParam("reccount");														
							var currFieldCheck = $(this).is("input") || $(this).is("textarea") || $(this).is("select"), curNav = grid.getGridParam('pager');
							if(currFieldCheck){ //To check only input or TextArea Fields
								if (key === 9 && !e.shiftKey) { //To Check for Tab key pressed and not shift key
									//To Check for last column of row, curr column equals total column, curr row eqals to total row.									
									if((edtColMap.lastEdtColName === value.name || (cm[cm.length-1].editable === false)) && 
										(currCol === lcn) && (currRow === totalRow)){																			
										//	grid.triggerButton("A");										
										/*following editCell call is commented because when the Add is in disabled state it caused error. addRow set's the focus anyway [issue when last column is not editable -- rollback temporarily]*/
										//grid.editCell(grid.getInd(currRow), (edtColMap.firstEdtColNum || 0),true);
									}/*else if(( ($.isFunction(grid[0].p.isCellEditable)) && (!grid[0].p.isCellEditable.call(element, grid[0].p.colModel[index+1].name,currRow,index))) && (edtColMap.lastEdtColName === cm[index+1].name) && (cm[index+1].editable === true) ){ // defect fix 1284/1575
										grid.triggerButton("A");
										grid.editCell(grid.getInd(currRow), (edtColMap.firstEdtColNum || 0),true);
									}*/else if (edtColMap.lastEdtColName === value.name) { // To Check if it is the last column of each row
										setTimeout(JQtabid + ".editCell(" + currRow + "+1, " + fcn + ", true);", 100);
										grid.setSelection(grid.getDataIDs()[currRow], true); //set row selection in the new row									
									}
								}
                                if(e.shiftKey && key === 9 && edtColMap.firstEdtColNum === index && currRow!=1) { //To check if Shift and Tab combinations keys pressed
                                        log.debug("shift&&tab");                             
                                        setTimeout(JQtabid + ".editCell(" + currRow + "-1, " + lcn + ", true);", 100);                                                                                                                                    
								}else if ((e.ctrlKey && key === 65)) { // To Check the key Ctrl + A is pressed or not.							
									grid.triggerButton("A");
									return false; //returning false in order to disable native Ctrl+A (select all option)
								} else if ((e.ctrlKey && key === 68)) { // To Check the key Ctrl + D is pressed or not.									
									grid.triggerButton("D");
									return false; //returning false in order to disable native Ctrl+D (bookmark option)
								} else if (key === 40 && (currRow === totalRow) && !($(this).is("select")|| $(this).is("textarea") || $(this).parent('td').hasClass("lov-field")|| $(this).hasClass("ui-autocomplete-input"))) { // To Check if it is the last row and down arrow key is pressed or not.
									//log.debug("Down Arrow key is pressed");
									grid.triggerButton("A");
								}else if ((key == '83' ) && (e.ctrlKey || e.metaKey)){
									//Ctrl + s is not triggering when cell focus is true. work around code for triggering the save button click
								    jQuery(this).blur(); 

									jQuery("input").trigger(e); 
									return false;
								}else if ((key == '70' ) && (e.ctrlKey || e.metaKey)){
									//Ctrl + f is not triggering when cell focus is true. Work around code for triggering the go button click
									jQuery(this).blur(); 
									jQuery("input").trigger(e); 
									return false;
								}
							}
						}
					},
					{
						//Added for selecting the content on tab or on editing the field
						//Added by BA19548i(Babu A)
						type:"focus",fn:function(e) { jQuery(this).select();}
					}];
					var arrProperties=grid.getColProp(currColName);
					var edtopts=arrProperties.editoptions;
					
					if(edtopts){					
						dtevnts=edtopts.dataEvents;
						if(dtevnts){
							//append tabout dataevent to existed  dataevents
							dtevnts.push(custDataEvent[0]);
						}else {
							//add tabout dataevent to existed editoptions
							edtopts["dataEvents"]=custDataEvent;
						}
					}else {
							//add tabout dataevent with editoptions
							grid.setColProp(currColName, { editoptions: { dataEvents: custDataEvent } });
					}			
				}	

				
			});
			return true;
		},
		
		/**
		* All the general render manipulations are done in this function
		*/
		alterGridRendering: function () {
			//not an efficient/elegant solution. need to revisit
			
			//Manipulating grid navigator section			
			var navigatorId = grid.getGridParam('pager');
			//jQuery(navigatorId+'_right').remove();
			jQuery(navigatorId+'_center').remove();
			var navEle = jQuery(navigatorId);
			//navEle.find , .removeClass('ui-icon ui-icon-seek-next') , .removeClass('ui-icon ui-icon-seek-prev')
			//jQuery('.ui-paging-info').remove();
			navEle.find('.ui-icon.ui-icon-seek-first').remove();
			navEle.find('.ui-icon.ui-icon-seek-end').remove();
			navEle.find('.ui-icon-seek-prev').after('<span class="sh-seek-prev1">'+'previous'+'</span>'); // New add for jaduGrid 4.6.0
			navEle.find('.ui-icon-seek-next').after('<span class="sh-seek-next1">'+'next'+'</span>'); // New add for jaduGrid 4.6.0
			//navEle.find('.sh-seek-prev1').text(i18n.msg("JADU.previous"));
            //navEle.find('.sh-seek-next1').text(i18n.msg("JADU.next"));

            //navEle.find('.ui-icon.ui-icon-seek-next').parent().append("Next");//TODO i18n 
			//navEle.find('.ui-icon.ui-icon-seek-prev').parent().append("Previous");//TODO i18n
			
			var showNavButtons = grid.getGridParam('navButtons');
            if(showNavButtons !== undefined && showNavButtons === false) {
                        jQuery(navigatorId+'_right').remove();
            }
			var showFullPagerInfo = grid.getGridParam('showFullPager');
			if(showFullPagerInfo){
				jQuery(navigatorId+'_right').addClass("fullPager");
				jQuery(navigatorId+'_right table tr td:nth-child(4)').addClass("pagerNavs");
				jQuery(navigatorId+'_right .pagerNavs, '+navigatorId+'_right .ui-paging-info').hide();
			}
		},
		/**
		* Escapes the min/max height params from Grid
		*/
		forceGridHeight: function(){
			var forceHeight = grid.getGridParam('forceHeight');
			if(forceHeight){
				jQuery("#gbox_"+tableId.slice(1)).addClass("noFixHeight");
			}
		},
		/**
		* To set multi level group headers
		* Notes: it works only if the grid don't have multiselection and rownumbers( multiselection :false and rownumbers:false)
		* 			var grpheaders={		
		*				"headerdetails":{
		*						"firstlevel":{"headerone":["id",7,"maingroup"]}, /i.e from 'id' column to next 7 columns/
		*						"secondlevel":{"headerone" :["id",4,"group1"] / i.e from 'id' to 4 cols /,  "headertwo":["tax",3,"group2"]} /i.e from 'tax' to 3 columns/
		*				}
		*			};
		*/
		setMultiLevelGroupHeaders: function(groupheaders){		
			jQuery.each(groupheaders.headerdetails,function(levels,levelsObj){    
				jQuery.each(levelsObj,function(header,headerObj){					
					 grid.setGroupHeaders({
						useColSpanStyle: true, 
						//headerObj[0] - Start column name from colmodel
						//headerObj[1] - num of columsn under the header
						//headerObj[2] -  title of the header
						groupHeaders:[{startColumnName: headerObj[0], numberOfColumns:headerObj[1], titleText: headerObj[2]}]
					});   
				})
			
			})		
		},
		/**
		* Function to trigger button A or E or D
		*/
		triggerButton: function(actionId){
			var curNav = grid.getGridParam('pager');
			var currentGridId =  tableId.replace(/#| /g,"");
			jQuery(curNav+"_left").find("#"+currentGridId+actionId).click();
		},
		
		refreshData:function(params){
			grid.setGridParam({postData:null});//clear the postData
			var defParams = {datatype:'json', datastr:null};
			jQuery.extend(defParams,params); //merge the two
			grid.setGridParam(defParams);                                                
			grid.clearGrid();
			grid.setCellEdit(false, true);//custom function in JaduGrid that does setGridParam({cellEdit:value}
			grid.trigger('reloadGrid');
	    },
		
		/**
		*Clears the grid data. Similar to default clearGridData except that it
		*cascades  clearGridData  based on the 'hasMany' relationsship
		**/
		clearGrid: function (){
			grid.clearGridData(); //call? super clearGridData
			grid.triggerHandler("jaduAfterClearGrid");
			var childRef =grid.getGridParam('hasMany');
			 if(childRef && childRef.length > 0) {
				for(var i=0; i < childRef.length; i++){                                                                
				 childRef[i].container.clearGrid();                                                               
				}
			}	        
		},
		
		/**
 		 * Returns the selected row's rowId
		 */
		getCurrentSelectedRowId: function() {
			return grid.getGridParam('selrow');
		},
		
		/**
		 * Returns true if the grid has records in it
		 */
		isNotEmpty: function() {
			return grid.getRecordCount() > 0;
		},
		
		/**
		 * Get the rowId by the Index
		 * @param iRow : the index of record in a Grid, which starts with 1 in jqGrid.   
		 */
		getRowIdByIndex: function(iRow){
			return grid.getDataIDs()[iRow-1];
		},

		/**
		 * Rename the Grid Group Header
		 * @param startColumnName
		 * @param columnNumber
		 * @param newHeader
		 */
		renameGroupHeader: function(startColumnName, columnNumber, newHeader) {
			grid.destroyGroupHeader();		
			grid.setGroupHeaders({	
				useColSpanStyle: true,
				groupHeaders:[{startColumnName: startColumnName, numberOfColumns: columnNumber, titleText: newHeader}]
			});
		}
	});	
	grid.setTaboutToLastEditCell();
	grid.alterGridRendering();
	grid.forceGridHeight();
	

	//private functions	
	function setFirstRowSelection() {
		var mGrid = grid || jQuery(tableId);//grid reference may not yet be ready
		mGrid.setSelection(mGrid.getDataIDs()[0], true);
		var countR=mGrid.getDataIDs();
		if(grid && countR.length === 0 )	{                                                              
			cascadeParentAction({crudIndicator:"selectionchange"});						
		}
	}	

	/**
	* Notifies the parent of the data change
	*/
	function setDataChangeAction(type) {		
		var changeInfo = {};
		changeInfo.crudIndicator = "datachange";
		changeInfo.type = type;
		if(parentRef) {
			parentRef.onChildChange(changeInfo);	
		}			
	}	
	
	/**
	* Checks whether the grid has any CRUD data or not
	*/
	function checkModifiedData() {		
		grid.stopEditing();
		var modified = (rootData !=null && rootData.delData && rootData.delData.length > 0);//has deleted data		
		if(!modified && records !== null && records.length > 0){
			jQuery.each( records, function(){
			  if (modifyactions.indexOf(this.crudIndicator) > -1) {
				modified = true;
				return false;//just to exit the loop
			  }
			}); 
		}
		return modified;
	}
	
	

	/**
	* Closure function to take the data/ref to the loadcomplete callback function
	* @param dataRef - it will be reference to data location
	* @param loaded - whether the data is already loaded previously or not
	* @param childProp - property in the dataRef from/to which the data need to taken/set
	*/
	function doAfterLoadComplete(dataRef, loaded, childProp) {
		return function(cData) {		
			if(loaded && (grid.getGridParam('url') === null|| typeof grid.getGridParam('url')  === 'undefined')) {				
				var data = dataRef[childProp];
				if(data instanceof Array) {
					var tdata = new Object();
					tdata[recordsProp] = data;
					data = tdata;
					dataRef[childProp] = data;					
				}
				rootData = data;								
			}
			else {
				rootData = cData;
				dataRef[childProp] = rootData
			}				
			records = rootData[recordsProp];			
		}
	}	
	
	/**
	* Initializes the core data model property
	*/
	function initializeDataModel() {
		if(rootData === null || typeof rootData === 'undefined') {
			//log.debug(" no data in the grid ");
			//handles the case where grid is not loaded with data from server
			rootData = {};				
		}
		if(!rootData[recordsProp] || rootData[recordsProp] === null || typeof rootData[recordsProp] === 'undefined'){ // handles the case where recordsProp is not present or initialized
			records = rootData[recordsProp] = [];
		}
	}
	
	/**
	* Does the initialization for this grid
	*/
	function initialize() {
		//setting the parent reference to the child grids
		var children = grid.getGridParam('hasMany');		
		if(children && children.length > 0) {
			for(var i=0; i < children.length; i++){
				children[i].container.addParentRef(grid);				
			}
		}
		
		//to make the checkbox editor value change on cell click (double click issue)
		grid.delegate('td:has(:checkbox)','click', function(event){
			if(event.target.type !=='checkbox'){
				var tdEle = jQuery(this);
				setTimeout(function(){
					tdEle.children(':checkbox').click();
					//downside is that it triggers jqGridBeforeSelectRow event
				}
				,100);//wait for the editor to come so disabled state changes if applicable
			}
		});
		//Set label class and properties
		var cm = grid.getGridParam('colModel');
		jQuery.each(cm, function(index,value) {
			//to set headerOptions for label
			if(value.headerOptions){
				var className = (value.headerOptions.className)?value.headerOptions.className:"";
				var property = (value.headerOptions.properties)?value.headerOptions.properties:"";
				 grid.setLabel(value.name,"",className,property);	
			}
		});
	}
	
	/**
	* Calls stop editing to the child grids
	*/
	function cascadeStopEditing() {		
		var children = grid.getGridParam('hasMany');		
		if(children && children.length > 0) {
			for(var i=0; i < children.length; i++){
				children[i].container.stopEditing();				
			}
		}
	}
	
	
	/**
	* Calls stop editing to the child grids
	*/
	function cascadeCellEdit(isCellEdit, cascade) {
		var children = grid.getGridParam('hasMany');		
		if(children && children.length > 0) {
			for(var i=0; i < children.length; i++){
				children[i].container.setCellEdit(isCellEdit, cascade);				
			}
		}
	}
	
	/**
	* Calls stop editing to the child grids
	*/
	function cascadeParentAction(changeInfo) {
		var children = grid.getGridParam('hasMany');		
		if(children && children.length > 0) {
			for(var i=0; i < children.length; i++){
				children[i].container.onParentChange(changeInfo);				
			}
		}
	}
	
	/**
	* Loads the children data of the given row
	*/
	function loadChildData(rowid) {
		var selRec = grid.getModelRecord(rowid);//current parent grid selection
		grid.triggerHandler("jaduBeforeLoadChild", [rowid,selRec]);
		var selectionChangeFunc = grid.getGridParam('onSelectionChange');
		if(selectionChangeFunc) {
			selectionChangeFunc(rowid,selRec);
		}
		var children = grid.getGridParam('hasMany');
		log.debug(children+' loadChildData '+rowid);
		if(children && children.length > 0) {			
			for(var i=0; i < children.length; i++){
				var child = children[i];
				child.container.onParentChange({crudIndicator:"selectionchange"})
				log.debug("selected record: "+JSON.stringify(selRec));
				child.container.loadDataForParentRecord(selRec,child);
			}
		}	
	}
	
	
	function copySubProperties(rec, keys) {
		var newObj = {};
		var params = keys.split(",");
		for (var i=0; i < params.length ; i++) {
			newObj[params[i]] = rec[params[i]];
		}
		return newObj;
	}
	
	/**
	* To update the crudindicator
	*/
	function setGridCrudIndicator(record,id,name,val){		
		
		if(ACTIONS.NEW !== record["crudIndicator"]) {			
			if(!record.crudIndicator) {
				record.crudIndicator = '';
			}				
			if(record["crudIndicator"] === "B") {
				record["crudIndicator"] = ACTIONS.NEW;
				setDataChangeAction('E');//blank record now has data, change the parent action
			}
			else {
				if(record.crudIndicator.indexOf(ACTIONS.UPDATED) === -1) {
					record.crudIndicator = ACTIONS.UPDATED+record.crudIndicator;//already ACTIONS.CHILDCHG might be there, so prepending it
				}
				grid.setCell(id,name,'','x-grid-dirty-cell','');
				setDataChangeAction('E');
			}
		} 
		record[name] = val;		
	}
	
	
	/**
	* All the JqGrid method orrrides are put here
	*/
	function overrides() {
				
		//This code is avoid the scroll up issue, which exists only in chrome browser.
		var isChrome = !!window.chrome;           
		if(isChrome){
			grid.jqGrid.GridNav = function(){};
		}
		//log.debug('overrides...');
		//override clearGridData to clear JaduGrid specific variables		
		var orgClearData = grid.clearGridData;
		grid.clearGridData= function(clearfooter) {
			log.debug('clearing JaduGrid state...');
			var r = orgClearData.call(grid,clearfooter);				
			rootData = {};				
			records = [];
			afterLoad = null;
            setPagination();
			return r;
		};

	}
	
	/**
	* Creates the new row record id based on random number generation
	*/
	function createNewRecordId() {
		return Math.floor((Math.random()*9999)+1);
	}
	
	
	/**
	 * Sets the pagniation enabled/disabled state
	 */
	function setPagination(){
		var currPage=grid.getGridParam("page"),lastPage=grid.getGridParam("lastpage"),
			navId='_'+ grid.getGridParam('pager').slice(1);
		if(currPage=== 1){
			jQuery("#first"+navId+", #prev"+navId).addClass('ui-state-disabled');
		}else{
			jQuery("#first"+navId+", #prev"+navId).removeClass('ui-state-disabled');
		}
		if(currPage== lastPage || lastPage===0){
			jQuery("#next"+navId+", #last"+navId).addClass('ui-state-disabled');
		}else{
			jQuery("#next"+navId+", #last"+navId).removeClass('ui-state-disabled');
		}	
	}


	return grid;	
}
}
}
);