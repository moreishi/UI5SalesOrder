
var wsUrl_dynamic_CRUD = "php/dynamic_webservice.php";	
/*
// ================================================================================
// Original XNR function
// - currently no log function integrated because can't get the result variable 
//	due to random execution finish time.
// ================================================================================
*/

function createXMLHTTPRequest(){
	var XHR = new window.XMLHttpRequest();
	var serverAnswer;
	XHR.overrideMimeType = 'application/json;charset=UTF-8';
	XHR.open("POST", WebserviceUrl_Dynamic_CRUD, true);
	XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	XHR.onreadystatechange = function () 
	{			
		if(4 === XHR.readyState) {
			try {
				serverAnswer = JSON.parse(XHR.responseText);
			} catch(e) {
				serverAnswer = XHR.responseText;
			}			
			if(XHR.status == 200 && serverAnswer instanceof Object) {						
				//Create an object, with format acceptable by the generate Table function
				var returnedData = {
									column 	 : serverAnswer.header,
									keyfield : serverAnswer.keyfield,
									dataitem : serverAnswer.dataitem								
				}						
			} else {
				serverAnswer = {
					result : 'ERROR',
					status : XHR.status,
					message : XHR.statusText + "Error loading webservice"
				} 	
			}
		}
	}		
	return XHR;
}

			
function WSCall( record){
			
	
	var XHR = createXMLHTTPRequest();
	var data = JSON.stringify(record);					
	XHR.send(data);	
	console.log(XHR);
	return callResult;
}

/*
// ================================================================================
// New Jquery function
// ================================================================================
*/

function callservice( data, returnMessage, successAction, failAction, log, callback){	
	console.log(data);
	var message;
	
	$.post(wsUrl_dynamic_CRUD,{'data': data}, function(result)
	{
		if ( result.status == "01"){
			message = returnMessage[result.status];
			if (successAction && (typeof successAction == "function")) { successAction(); }			
		}else{			
			message = result.message;
			if (failAction && (typeof failAction == "function")) { failAction(); }
		}	
		if (message){
			sap.m.MessageToast.show(message);
		}
	
		//logging - Yuki
		if (jQuery.isEmptyObject(log) == false && (typeof log == "object"))
		{
			log.dataitem[0]["event"] = message;			
			$.post(wsUrl_dynamic_CRUD,{'data': log},function(result){
				//sap.m.MessageToast.show(result.message);
			});
		}
		callback(result);		
	})
	.fail(function() {
		//alert( "cannot connect to server" );
	});	
}

//===================================


