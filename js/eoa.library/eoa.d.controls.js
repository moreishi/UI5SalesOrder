////////////////////////////////////////////////////////////////////////////
/////////////////////Desktop controlls//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

/*
// ================================================================================
//	Function for Desktop Shell
// ================================================================================
*/
function CreateDShell( pLogo, pTitle, pLogoutPage, pUsername )
{
	oShell = new sap.ui.ux3.Shell({				
		appIcon				:   pLogo,
		appTitle			:	pTitle,				
		headerItems			: 	[ new sap.ui.commons.Label({ text : pUsername }) ]					
	});
	
	if(pLogoutPage.trim() != ""){				
		oShell.attachLogout(function(){ window.location = pLogoutPage; });
	} else {
		oShell.setShowLogoutButton(false);
	}
			
	return oShell;
} 

/*
// ================================================================================
//	Function for Desktop Button
// ================================================================================
*/
function CreateDButton(pId, pLabel, pIcon){

	return new sap.ui.commons.Button(pId,{text:pLabel, icon : pIcon});
}

/*
// ================================================================================
//	Function for Desktop Label
// ================================================================================
*/
function CreateDLabel(pId, pText){			
	return new sap.ui.commons.Label(pId, { text: pText });
}

/*
// ================================================================================
//	Function for Desktop Text Field
// ================================================================================
*/
function CreateDTextField( pId, pContent ){
	return new sap.ui.commons.TextField(pId,{ value : pContent });
}
/*
// ================================================================================
//	Function for Desktop Text Area
// ================================================================================
*/
function CreateDTextArea( pId, pContent, pCols, pRows ){
	return new sap.ui.commons.TextArea({			
		id		:	pId,
		value	:	pContent,
		cols	:	pCols,
		rows	:	pRows
	});
}

/*
// ================================================================================
//	Function for Desktop Date Picker
// ================================================================================
*/
function CreateDDatePicker(pId){

	var datestamp = new Date();
	var day = datestamp.getDate();
	var monthstamp =  datestamp.getMonth()+1;
	var year = datestamp.getFullYear();
			
	return new sap.ui.commons.DatePicker(pId,{
					yyyymmdd	:	year+"0"+monthstamp+day
	
			});
}
/*
// ================================================================================
//	Function for Desktop Dialog Box
// ================================================================================
*/
//var oDialog = createDesktopDialog("oDialog",oLabel);
function CreateDDialog( pId, pContent){	
	return new sap.ui.commons.Dialog({id: pId , content : [ pContent ] });
}

/*
// ================================================================================
//	Function for Desktop Combo Box
// ================================================================================
*/
/*
function CreateDComboBox( pId, pModel, pPath, pKey, pText, pAddtionaltext){

	var temp_list 	= 	new sap.ui.core.ListItem();	
	var Combox 		= 	new sap.ui.commons.ComboBox(pId,{});	

		Combox.setModel(pModel);
		temp_list.bindProperty("key", ""+pKey+"");
		temp_list.bindProperty("text", ""+pText+"");
		temp_list.bindProperty("additionalText", ""+pAddtionaltext+"");

	var path = "/"+pPath+"";
		Combox.bindItems(""+pPath+"", temp_list);

	return Combox; 
}
*/
function CreateDComboBox( pId, pModel, pPath, pKey, pText, pAddtionaltext){

	var temp_list 	= 	new sap.ui.core.ListItem();	
	var Combox 		= 	new sap.ui.commons.ComboBox(pId,{});	

		Combox.setModel(pModel);
		temp_list.bindProperty("key", ""+pKey+"");
		temp_list.bindProperty("text", ""+pText+"");
		temp_list.bindProperty("additionalText", ""+pAddtionaltext+"");

	var path = "/"+pPath+"";
		Combox.bindItems(""+path+"", temp_list);

	return Combox; 
}


/*
// ================================================================================
//	Function for Desktop Panel
// ================================================================================
*/
function CreateDPanel(pText){
	
	return new sap.ui.commons.Panel({
					
					text	:	pText
	
	});

}

/*
// ================================================================================
//	Function for Desktop Tab Strip
// ================================================================================
*/
function CreateDTabStrips(pTabArray){
	
	var TabStrip = new sap.ui.commons.TabStrip({});
		
		for(var i = 0 ; i<pTabArray.length ; i++){
			
			temptab = new sap.ui.commons.Tab({
					
					title	:	new sap.ui.commons.Title({ text:""+pTabArray[i].TabTitle+"" }),
					tooltip	:	pTabArray[i].TabTitle
				
			});
			
			TabStrip.addTab(temptab);		
		}
	
	return TabStrip;

}

/*
// ================================================================================
//	Function for Desktop Forms
// ================================================================================
*/
function CreateDForm(pTitle, pLayout, pFformContainerArray){
	
	var Form = new sap.ui.layout.form.Form({
						
						title	:	new sap.ui.core.Title({text: ""+pTitle+""}),
						layout	:	pLayout
	
				}) 
		
		for(var i = 0 ; i<pFformContainerArray.length ; i++){ //Aljhun
			
			var tempFormContainer = new sap.ui.layout.form.FormContainer({
										title	: ""+pFformContainerArray[i].title+"",
	
									})

			Form.addFormContainer(tempFormContainer);
		}
		
			
	return Form;
}

/*
// ================================================================================
//	Function for Desktop Collection Item
// ================================================================================
*/

function CreateDCollection(pId, pTitle, pItemcollection){

	var collection = new sap.ui.ux3.Collection(pId,{

							title	:	pTitle,
	
				})
	
	for(var i = 0 ; i<pItemcollection.length; i++){
	
			collection.addItem(new sap.ui.core.Item({text : pItemcollection[i].text}));
			
	}
	
	return collection;
}

/*
// ================================================================================
//	Function for Desktop Collection Inspector
// ================================================================================
*/
function CreateDCollectionInspector(pId, pFitparent, pContent){

	return new sap.ui.ux3.CollectionInspector({
				
					fitParent	:	 pFitparent,
					content		:	[ pContent	]

	})

}

/*
// ================================================================================
//	Function for Desktop Thing Inspector
// ================================================================================
*/
function CreateDThingInspector(pFirstTitle, pSecondTitle, pType, pIcon, pUpdateAction, pData){
	
	var oTI = new sap.ui.ux3.ThingInspector({
	
			firstTitle				: pFirstTitle,
			secondTitle				: pSecondTitle,
			type					: pType,
			icon					: pIcon,
			updateActionEnabled		: false,
			favoriteActionEnabled	: false,
			followActionEnabled		: false,
			flagActionEnabled		: false
	});
	
	
	for(var i=0; i<pData.facet.length ; i++){
	
			oTI.addFacet(new sap.ui.ux3.NavigationItem({
			
								key 	:pData.facet[i].key,
								text 	:pData.facet[i].text
			}));
	
	}
	
	for(var i=0; i<pData.action.length ; i++){
	
			oTI.addAction(new sap.ui.ux3.ThingAction({
					
								id 			:pData.action[i].id,
								text 		:pData.action[i].text,
								tooltip		:pData.action[i].tooltip
					
				}));
	}
	  
	return oTI;
}

/*
// ================================================================================
//	Function for Thing Group
// ================================================================================
*/
function CreateDThingGroup(pText, pContent){

return new sap.ui.ux3.ThingGroup({
			title 	:	 pText,
			content	: [	pContent ]
		});
}

/*
// ================================================================================
//	Function for Radio Button Group 
// ================================================================================
*/
function CreateDRadioGrp(pId, pTooltip, pItems){

var RBG = new sap.ui.commons.RadioButtonGroup(pId,{
		tooltip : pTooltip,
	});
	
	for(var i=0 ;i<pItems.length ; i++){
	
			var oItem = new sap.ui.core.Item({
						
						text 	: pItems[i].text, 
						tooltip : pItems[i].tooltip,
						key 	: pItems[i].key
						
						});
					
			RBG.addItem(oItem);
	}

	return RBG;

}


/*
// ================================================================================
//	Function for Generate Table 
// ================================================================================
*/
function CreateDTable(pData, pModel, pModelPath){		
	//Initialize the List and Columns		
	var oTable = new sap.ui.table.Table(pModelPath);						
		oTable.setModel(pModel);
		oTable.bindRows("/"+pModelPath+"");
		oTable.setVisibleRowCount(pData.dataitem.length);
	
	//Get the column names and put into the list as headers			
	for(colName in pData.column){				
		var colDesc = pData.column[colName];			
		var colum_label = new sap.ui.commons.Label({text:colDesc,textAlign:"Center"});
		var colum_data = new sap.ui.commons.TextField({editable:false,textAlign:"Center"});
		
		colum_data.bindProperty("value",""+colName+"").bindProperty("placeholder",""+colName+"");
		
		//Bind the list, column template, and data	
		oTable.addColumn(new sap.ui.table.Column({
			label	: colum_label,
			template: colum_data			
		}));
	}
	
	return	oTable;	
} 

/*
// ================================================================================
//	Function for Generate Table II - for generating table that have columns whose template is image
// ================================================================================
*/
function CreateDTableII(pData, pModel, pModelPath, pImageColumns){//joefe
	//Initialize the List and Columns		
	var oTable = new sap.ui.table.Table(pModelPath);						
		oTable.setModel(pModel);
		oTable.bindRows("/"+pModelPath+"");
		oTable.setVisibleRowCount(pData.dataitem.length);
	
	//Flag checker if the column is designated to an image type 
	var flag = false;
	
	//Get the column names and put into the list as headers			
	for(colName in pData.column){				
		var colDesc = pData.column[colName];			
		var colum_label = new sap.ui.commons.Label({text:colDesc,textAlign:"Center"});
		var colum_data = new sap.ui.commons.TextField({editable:false,textAlign:"Center"});
		
		//Set the flag to true if it matches to the value of the pImageColumns array
		for(var x = 0; x < pImageColumns.length; x++){
			if(colName == pImageColumns[x]) {
				flag = true;
				x = pImageColumns.length; // top stop the loop
			}
		}
		
		//Bind the list, column template and data
		if (flag){
			var column_image = new sap.ui.commons.Image().bindProperty("src", "status");
			oTable.addColumn(new sap.ui.table.Column({
				name	: ""+colName+"", //name is needed for mass update
				label	: colum_label,
				template: column_image,
				hAlign	: "Center"	
			}));
		} else{
			colum_data.bindProperty("value",""+colName+"").bindProperty("placeholder",""+colName+"");
			oTable.addColumn(new sap.ui.table.Column({
				name	: ""+colName+"", //name is needed for mass update
				label	: colum_label,
				template: colum_data
			}));
		}
		
		flag = false; // reset the flag value for the next loop
	}
	
	return	oTable;	
} 


/*
// ================================================================================
//	Function for Generate Table 
// ================================================================================
*/

var Dtable = function(){
	
	//Initialize the List and Columns		
	this.oTable = new sap.ui.table.Table();
	this.oTable.oModelId = "";
	this.oTable.ModelPath = "";
	
	//method
	this.oTable.setColumn = function( aColumns, pEditBoolean){
		var Model;
		if ( this.oModelId ){
			Model = this.oModelId + ">";
		}else{
			Model = "";
		}
		this.destroyColumns();
		for(var colName in aColumns ){
			
			var colDesc = aColumns[colName];
			var colData = new sap.ui.commons.TextField({editable: pEditBoolean,textAlign:"Center"});
			
			colData.bindProperty("value", Model + colName).bindProperty("placeholder", colName);
			
			//Bind the list, column template, and data	
			this.addColumn(new sap.ui.table.Column({
				label	: new sap.ui.commons.Label({text: colDesc,textAlign:"Center"}),
				template: colData,
				sortProperty: colName,
				filterProperty: colName,				
			}));
		}
	}
	
	//method
	this.oTable.setBind = function( pModelId, pModelPath){
		this.oModelId = pModelId;
		this.ModelPath = pModelPath; 
		
		var Model,dataSize;
		if ( pModelId ){
			Model = pModelId + ">";
			dataSize = sap.ui.getCore().getModel(pModelId).length;
		}else{
			Model = "";
			dataSize = this.oModels.length;
		}
		console.log(this);
		this.bindRows( Model +"/" + pModelPath);
		
		this.setVisibleRowCount(dataSize);
	}
	
	this.oTable.getSelectedRow = function(){
		
		var data = this.getBinding("rows").oModel.oData[this.ModelPath];
		if (this.getSelectedIndex()) {
			return data[this.getSelectedIndex()];
		}
	}
	
	return this.oTable;
} 