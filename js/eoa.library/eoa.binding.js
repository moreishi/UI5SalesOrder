////////////////////////////////////////////////////////////////////////////
/////////////////////Binding Function//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

/*
// ================================================================================
//	Function for Bind Odata
//  If input parameter pControl then no need input ModelID
//		Else need to set ModelID
// ================================================================================
*/
function BindOData(pUrl, pControl, pEntitySetName,  pModelID)
{

		var sServiceUrl = host + pUrl;
		var readpath = pEntitySetName + "/";
		
		// create OData model instance with service URL and JSON format
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
		
		var Data= [];
		var Model = new sap.ui.model.json.JSONModel();

		oModel.read
		(
			readpath,
			"",
			"",
			"",
			function (oData, oResponse)
			{
					//convert to local table
					for (var i = 0; i < oData.results.length; i++) 
					{
						//loop row then loop columns
						var obj = {};
						for(field in oData.results[i]){
							if ( field != '__metadata' ){
								obj[field] = oData.results[i][field];
							}
						}
						Data[i] = obj;
					}
					
			},
			function(){alert("Read failed");}
		);
		
		var path = {};
		path[pEntitySetName] =  Data;
		Model.setData(path);
		
		if ( pControl){
			pControl.setModel(Model);
		}else{
			sap.ui.getCore().setModel(Model,pModelID);
		}
		//console.log(Model);
}

/*
// ================================================================================
//	Function for Bind data from server
//  If got pControl then no need ModelID
//		Else need to set ModelID
// ================================================================================
*/

function BindData(pData, pControl, pEntitySetName,  pModelID)
{
	var Model = new sap.ui.model.json.JSONModel();
	
	var path = {};
	path[pEntitySetName] =  pData;
	Model.setData(path);
	
	if ( pControl){
			pControl.setModel(Model);
	}else{
			sap.ui.getCore().setModel(Model,pModelID);
	}

}
