/*
* Enterprise Framework J@Du
* Copy Rights - Qatar Airways IT
* Module for J@du framework components
* @author Vijesh Aaniyam Veetil
*/

//currently empty. 
define([ 'jquery', 'jqueryui','mask'], function(jQuery, jqueryui,mask){
	console.log('Going to initialize Jadu...');
	/*function initializeLogger(){
	//can do some kind of initialization logic here
		window.log = log4javascript.getLogger();//creates logger as a global function
		var appender = new log4javascript.BrowserConsoleAppender();
		var layout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
		appender.setLayout(layout);
		log.addAppender(appender);		
	} */
	/**
	* Method for Date auto-complete functions.
	*/	
	jQuery.fn.dateAutoComplete = function(event, buffer, caretPos, opts,inputField){
		
		var navAgent = navigator.userAgent;		
		var browerType = navAgent.indexOf("Firefox") != -1 || navAgent.indexOf("Trident") != -1 || navAgent.indexOf("Chrome") !== -1;
		if (browerType) {			  
			if (Object.prototype.toString.call(buffer) === '[object Array]') {
			
				function chkYearValue(usrYr){				
					var yr = (dateTime.getFullYear().toString()).match(/.{1,2}/g);
					var valYr = "";
					if (usrYr.length === 4) {
						  valYr = usrYr;
					}else if(usrYr.length >= 3){
						 valYr = dateTime.getFullYear().toString();
					}else if (usrYr.length >= 2) {							
						if(dateTime.getFullYear().toString().indexOf(usrYr) > -1){
							valYr = dateTime.getFullYear().toString();										
						}else{										
							valYr = yr[0] + usrYr;
						}
					} else {
						valYr = dateTime.getFullYear().toString();
					}
					return valYr; //Return the Year String
				}
				function Monthfltr(indx) {
					var cleanString = indx.join('').replace(/[m]/g, "");
					var len = cleanString.length;
					var getUserMonth = indx.slice(0, len).join("");
					var start = 0;
					for (i = 0; i < monthAry.length; i++) {
						var getMonthAry = monthAry[i].slice(0, len),
							checkMon = getMonthAry.indexOf(getUserMonth);
						if (checkMon !== -1 && checkMon >= 0 && getMonthAry != "") {
							return monthAry[i];
						}
					}
					return curMonth; //Return the Month String
				}
				function chkTimeValue(usrtm,inpClass,hrs,min){
					var cusTime = "";
					var len = usrtm.length;
					if(inpClass !== false && len === 0){			
						cusTime = "00:00";
					}else if(len === 4){
						cusTime = usrtm;
					}else if(len === 2){
						cusTime = usrtm+":"+"00";
					}else{
						cusTime = hrs+":"+min;
					}

					return cusTime;
				}
				var targetElement = jQuery(inputField);
				var changeStatus = false;				
				var inpClass = jQuery(inputField).hasClass("setCustomTime");
				var dateTime = new Date(),dd = dateTime.getDate(),hh = dateTime.getHours(),mm = dateTime.getMinutes(),ss = dateTime.getSeconds();
				if (hh && hh < 10) { hh = ("0" + hh.toString());}
				if (mm && mm < 10) { mm = ("0" + mm.toString());}
				if (ss && ss < 10) { ss = ("0" + ss.toString());}
				
				var plStr = ["dd","mmm","yyyy","hh","mm","ss","t","hh:mm:ss","hh:mm"],
					pholder = opts.placeholder,
					pholderAry = pholder.split(/[\ -]+/),
					plFormat = [];
				for (var k = 0; k < plStr.length; k++) {
					var index = plStr.indexOf(pholderAry[k]);
					if (index > -1) {
						plFormat.push(pholderAry[k]);
					}
				}
				if (event.keyCode == jQuery.inputmask.keyCode.TAB) {					      
					var usrAddedDate = null,usrDate = null, monthAry = [],curMonth = null,usrAddedMonth = null,usrYear = null,usrYrAry = null;
					if (!isNaN(parseInt(buffer[0]))) {
						if ((!isNaN(parseInt(buffer[0]))) && (buffer[0] === "0") && (isNaN(parseInt(buffer[1])))) {
							usrDate = ("0" + dd).slice(-2);
						} else if (isNaN(parseInt(buffer[1]))) {
							usrDate = ("0" + buffer[0]);
						} else if (!isNaN(parseInt(buffer[1])) && !isNaN(parseInt(buffer[0]))) {
							usrDate = (buffer[0] + buffer[1]);
						} else if (isNaN(parseInt(buffer[1])) && isNaN(parseInt(buffer[0]))) {
							if (dd < 10) {
								usrDate = ("0" + dd);
							} else {
								usrDate = dd;
							}
						}
					}
					if (isNaN(parseInt(buffer[0]))) {
						if (dd < 10) {
							usrDate = ("0" + dd);
						} else {
							usrDate = dd;
						}
					}
					usrAddedDate = usrDate;
					monthAry = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
					curMonth = monthAry[(dateTime.getMonth()).toString()];
					usrAddedMonth = Monthfltr(buffer.slice(3, 6));

					if (usrAddedMonth === "mmm") { usrAddedMonth = curMonth; }					
					if (opts.placeholder == "mmm-yyyy") {
						usrAddedMonth = Monthfltr(buffer.slice(0, 2));
						if (caretPos === 1 || caretPos === 2) {
							targetElement.val(usrAddedMonth + dateTime.getFullYear().toString());
						} else if (caretPos === 4 || caretPos === 5 || caretPos === 6 || caretPos === 7) {
							usrYrAry = buffer.slice(4, 8);
							usrYear = usrYrAry.join("").replace(/[y]/g, "");				                   
							chkYear = chkYearValue(usrYear);
							targetElement.val(usrAddedMonth + chkYear);
						}
						changeStatus = true;
					} else if (opts.placeholder == "hh:mm:ss") {
						return true;
					} else {
						var chkmm = mm == 0 ? "00" : mm;
						var chkhh = hh == 0 ? "00" : hh;
						var chkss = ss == 0 ? "00" : ss;
						var chkTimePl = chkhh + ":" + chkmm;
						usrYrAry = buffer.slice(7, 11);
						usrYear = usrYrAry.join("").replace(/[y]/g, "");
						chkYear = chkYearValue(usrYear);
						
						chkTimePlAry = buffer.slice(12, 18);
						usrTime = chkTimePlAry.join("").replace(/[hm:]/g, "");
						chkTimePl = chkTimeValue(usrTime,inpClass,chkhh,chkmm);
						
						if (targetElement.value !== opts.placeholder) {
							var caretPosStartPoint = 0
						}
						if(caretPos === caretPosStartPoint){
							return true;
						}else if (caretPos === 1 || caretPos === 3) {
							if (plFormat.indexOf("hh:mm") != -1) {
								targetElement.val(usrAddedDate + usrAddedMonth + chkYear + chkTimePl);
							} else {
								targetElement.val(usrAddedDate + usrAddedMonth + chkYear);
							}
						} else if (caretPos === 3 || caretPos === 4 || caretPos === 5) {
							targetElement.val(usrAddedDate + usrAddedMonth + chkYear + chkTimePl);
						} else if (caretPos === 6 || caretPos === 7 || caretPos === 8 || caretPos === 9 || caretPos === 10 || caretPos === 12 || caretPos === 13|| caretPos === 14 || caretPos === 15|| caretPos === 16 || caretPos === 17) {
							targetElement.val(usrAddedDate + usrAddedMonth + chkYear + chkTimePl);
						}
						changeStatus = true;
					}
				}	
				
				if(changeStatus === true){
					targetElement.trigger("change");
				}					
			}
			
		}
	}
	
	/**
	* All the standard masks are defined here.
	*/
	function initializeMasks() {
		
		//Support for old API from meio mask		
		jQuery.fn.setMask = function (mask) {
			var ipMask = mask;
			if(mask['mask']) {
				mask['alias'] = mask['mask'];
				delete mask['mask'];				
			}
			if(mask['maxLength']) {
				mask['repeat'] = mask['maxLength'];
				delete mask['maxLength'];
			}
			//upgrade to inputmasks 3.x -- handling backward compatibility for alias 'decimal'
			if(mask['alias'] === 'decimal' && !mask['integerDigits']) {
				mask['integerDigits'] =  mask['repeat'] - mask['digits'];
			}
			
			if(mask['alias']) {
				ipMask = mask['alias'];
				mask = jQuery.extend({},mask);//make a copy, otherwise alias property won't be available for grid
				delete mask['alias'];//don't want the alias to go in as a dependent alias
			}
			this.inputmask(ipMask, mask);
		}		
		jQuery.inputmask.defaults.placeholder='';
		jQuery.inputmask.defaults.aliases.numerics.digits = 0;//so 'numeric' alias will not allow decimal points
		//jQuery.inputmask.defaults.aliases.numerics.digitsOptional = false;
		//jQuery.inputmask.defaults.aliases.numerics.placeholder = "0";
		jQuery.inputmask.defaults.aliases.numerics.allowPlus = false;
		jQuery.inputmask.defaults.aliases.numerics.allowMinus = false;
		//Custom mask definitions		
		jQuery.extend(jQuery.inputmask.defaults.definitions, {
			/*'A': { 
				validator: "[A-Za-z]",
				cardinality: 1,
				casing: "upper" //auto uppercasing
			},
			'#': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
				cardinality: 1,
				casing: "upper"				
			},
			'@': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9 ]",
				cardinality: 1,
				casing: "upper"
			},*/
			'^': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
				cardinality: 1,
				casing: "lower"				
			},
			'%': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9 ]",
				cardinality: 1,
				casing: "lower"
			},
			'`': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9 ]",
				cardinality: 1
			},
			'<': {
				validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
				cardinality: 1
			}
		});	
		//Custom aliases. This is what developers going to be used
		jQuery.extend(jQuery.inputmask.defaults.aliases, {
			'uppercase': {
				mask: "A",				
				greedy:false,
				repeat:'*'
			},
			'alpha':{
				mask: "a",				
				greedy:false,
				repeat:'*'
			},
			'alphnumsp':{
				mask: "`",				
				greedy:false,
				repeat:'*'
			},
			'alphanumeric':{
				mask: "<",				
				greedy:false,
				repeat:'*'
			},
			'upper-alphanumeric':{
				mask: "#",				
				greedy:false,
				repeat:'*'
			},
			'upper-alphnumsp':{
				mask: "u",
				definitions: {
					'u': { 
						validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9 ]",
						cardinality: 1,
						casing: "upper"                                                             
					}
				},
				greedy:false,
				repeat:'*'
			},
			'lower-alphanumeric':{
				mask: "^",				
				greedy:false,
				repeat:'*'
			},
			'lower-alphnumsp':{
				mask: "%",				
				greedy:false,
				repeat:'*'
			},
			'alpha-space':{
				mask: "a",
				definitions: {
					'a': { 
						validator: "[A-Za-z ]",
						cardinality: 1						
					}
				},
				greedy:false,
				repeat:'*'
			},
			'upper-alphaspace':{
				mask: "u",
				definitions: {
					'u': { 
						validator: "[A-Za-z ]",
						cardinality: 1,
						casing: "upper"
					}
				},
				greedy:false,
				repeat:'*'
			},
			'numeric':{
				mask: "9",				
				greedy:false,
				repeat:'*',
				rightAlign:true

			},
			'hour':{
				mask:"h"
			},
			'min':{
				mask:"s"
			},
			'upper-date': {
				mask: "1-M-y",
				placeholder: "dd-mmm-yyyy",
				yearrange: { minyear: 0000, maxyear: 9999 },
				alias:'upper-datetime',
				clearIncomplete:true,
				onKeyDown: function (e, buffer, caretPos, opts){ 
						if (e.keyCode == jQuery.inputmask.keyCode.ESCAPE){
						var curField = jQuery(this);curField.trigger("blur");setTimeout(function(){ curField.trigger("focus")},075);
						}				
					jQuery.fn.dateAutoComplete(e, buffer, caretPos, opts,this);
				}
			},
			'upper-monthyear': {
				mask: "M-y",
				placeholder: "mmm-yyyy",				
				alias:'upper-datetime',
				onKeyDown: function (e, buffer, caretPos, opts){ 	
						if (e.keyCode == jQuery.inputmask.keyCode.ESCAPE){
						var curField = jQuery(this);curField.trigger("blur");setTimeout(function(){ curField.trigger("focus")},075);
						}				
					jQuery.fn.dateAutoComplete(e, buffer, caretPos, opts,this);
				}
			},
			'upper-datetime': {
				mask: "1-M-y h:s",
				placeholder: "dd-mmm-yyyy hh:mm",
				yearrange: { minyear: 0000, maxyear: 9999 },
				clearIncomplete:true,
				alias:'datetime',
				leapday: "29-FEB-",
				mregex:new RegExp("(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)"),
				definitions: {
					'M': { 
	                    validator: function (chrs, buffer, pos, strict, opts) {
	                        var isValid = opts.mregex.test(chrs.toUpperCase());                        
	                        return isValid;
	                    },
	                    cardinality: 3,
						casing: "upper"
	                }
				},
				onKeyDown: function (e, buffer, caretPos, opts){ 
						if (e.keyCode == jQuery.inputmask.keyCode.ESCAPE){
						var curField = jQuery(this);curField.trigger("blur");setTimeout(function(){ curField.trigger("focus")},075);
						}
					jQuery.fn.dateAutoComplete(e, buffer, caretPos, opts,this);
				}
			}/*,
			'email':{
				alias: "Regex",
				regex: "([a-zA-Z][-a-zA-Z0-9_\\.]*[a-zA-Z0-9])+@([a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9])*[a-z]+\\.[a-zA-Z]{2,4}\\.[a-zA-Z]{2,2}"
			}*/

		});
	}
	
	//initializeLogger();
	initializeMasks();
	log.info('Jadu initialization completed...');
	return { 
		initialize: function(options) {
			
			//log.info('Jadu JS Framework initialized...'); 
		}
	}; 
}

); 