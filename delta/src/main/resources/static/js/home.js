var root_path='home';


$(document).ready(function(){
	document.getElementById("replace").disabled = true;
	addEventListners();
});

function addEventListners(){

	$("#go").click(function(){

		console.log('Go called!');
		
		var fd = getFormData(searchPanel);
		console.log(fd);
		
		var mesOne = document.querySelector('#mes1');
		var mesTwo = document.querySelector('#mes2');
		
		mesOne.textContent = 'Loading...';
		mesTwo.textContent = '';

		$.ajax({
			url: root_path+'/getStockDetailsBySerialNumber',
			data: JSON.stringify(fd),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
			
				if(data){
					
					if(data.errorList && data.errorList.length > 0){
						mesOne.textContent = data.errorList[0];
						mesTwo.textContent = '';
					}
					else{
						mesOne.textContent = "Product is in warrenty!";
						mesTwo.textContent = 'Brand ' + data.brandName +" and product " + data.product +" has " + data.daysLeft +" days warrenty Left.";
						document.getElementById("replace").disabled = false;
					}
				}
			}
		});
	});
	
	$("#submit").click(function(){

		var fd = getFormData(popupForm);
		console.log(fd);
		
		$.ajax({
			url: root_path+'/updateSerialNumber',
			data: JSON.stringify(fd),
			dataType: 'json',
			processData: false,
			contentType: "application/json; charset=utf-8",
			type: 'POST',
			success: function(data){
				document.getElementById("popup-1").classList.remove("active");
			}
		});
	});

	$("#replace").click(function(){
		document.getElementById("popup-1").classList.toggle("active");
		document.getElementById("currSerialNumber").value = document.getElementById("serialNumber").value;
		document.getElementById("currSerialNumber").disabled = true;
	});
	$("#close").click(function(){
		document.getElementById("popup-1").classList.remove("active");
	});
	$("#clear").click(function(){
		document.getElementById("serialNumber").value ='';
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