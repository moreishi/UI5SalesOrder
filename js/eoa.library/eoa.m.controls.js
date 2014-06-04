////////////////////////////////////////////////////////////////////////////
/////////////////////Mobile controlls//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

/*
// ================================================================================
//	Function for Mobile Shell
// ================================================================================
*/
function CreateMShell(pBgImage, pBgOpacity){
	return new sap.m.Shell(
			{
				showLogout : false, 
				backgroundImage: pBgImage, 
				backgroundOpacity: pBgOpacity
			}
	);		
}

/*
// ================================================================================
//	Function for Mobile Page
// ================================================================================
*/
//var oPage = createMobileStandardPage("img/carlmenu4.png",sap.m.PageBackgroundDesign.Transparent,"Standard Page","");
function CreateMPage(pLogo, pBgDesign, pTitle, pURI){
		
	page = new sap.m.Page({
		backgroundDesign: pBgDesign,
		footer : new sap.m.Bar({
			contentLeft:[
							
							new sap.m.Button({
									icon : "sap-icon://nav-back",
									press : function() {
										window.location.href = pURI; 
									}
							})
							
							
						]
		})
	
	});
	
	customheader = new sap.m.Bar({
		contentLeft: [ new sap.m.Image({ src: pLogo , height:"40px"}) ],	
		contentMiddle: [ new sap.m.Label({text: pTitle}) ]
	});
	
	page.setCustomHeader(customheader);

	return	page;
}

/*
// ================================================================================
//	Function for Mobile Button
// ================================================================================
*/
//var oButton = createMobileButton("Save","","");
function CreateMButton(pId, pText, pIcon, pType, pWidth, pEnable){
	return new sap.m.Button(pId,{text:pText, icon : pIcon, type : pType, width: pWidth, enable: pEnable});
}

/*
// ================================================================================
//	Function for Mobile Dialog
// ================================================================================
*/
//var oDialog =  createMobileDialog("dialog","asdsa",true,testlabel,obtn2,obtn3);	
function CreateMDialog(pId, pTitle, pIcon, pContent, pBtnLeft, pBtnRight, pStretch){

	dialog = new sap.m.Dialog(pId,{		
		stretchOnPhone:pStretch,
		streach: pStretch,
		title: pTitle,
		icon: pIcon,
		content:[pContent],
		beginButton:pBtnLeft,
		endButton:pBtnRight
	});
	
	return dialog;
} 	


/*
// ================================================================================
//	Function for Mobile Dialog with List
// ================================================================================
*/
// example:  var dialogList = new DialogList ("Customer",customerList.getList());
var DialogList = function generateDialog(pName, pListContent){
	
	var pop = new sap.m.Dialog({
						title: "Choose " + pName,
						stretchOnPhone: true,
						stretch: true,
						content: [
							pListContent,
							new sap.m.Button({
								width: "100%",
								text: "Cancel",
								tap : function() {
									
									pop.close();
								}
							})
						]
						});
	return pop;		
}

/*
// ================================================================================
//	Function for Mobile Split Container
// ================================================================================
*/
//var oSplitContainer = Generate_SplitControl(oPage_main,oPage_secondary);
function CreateMSplitContainer(pMainPage, pSecondPage){

	splitcontrol = new sap.ui.unified.SplitContainer({ content: [pMainPage], secondaryContent: [pSecondPage]});
	
	listbutton = new sap.m.Button({icon:"sap-icon://list",
		press:function(){
			splitcontrol.setSecondaryContentWidth("250px");						
			if(!splitcontrol.getShowSecondaryContent()){
				splitcontrol.setShowSecondaryContent(true);
			} else {							
				splitcontrol.setShowSecondaryContent(false);
			}
		}
	});
		
	
	var split_bar = new sap.m.Bar({
		contentLeft: [ listbutton ],	
		contentMiddle: [ new sap.m.Label({text : "Sample Content" }) ]
	});
	pMainPage.setCustomHeader(split_bar);
	
	return splitcontrol;

}

function CreateMSplitContainerII(pMainPage, pSecondPage){

	splitcontrol = new sap.ui.unified.SplitContainer({ content: pMainPage, secondaryContent: pSecondPage});
	
	listbutton = new sap.m.Button({icon:"sap-icon://list",
		press:function(){
			splitcontrol.setSecondaryContentWidth("250px");						
			if(!splitcontrol.getShowSecondaryContent()){
				splitcontrol.setShowSecondaryContent(true);
			} else {							
				splitcontrol.setShowSecondaryContent(false);
			}
		}
	});
		
	
	//var split_bar = new sap.m.Bar({
	//	contentLeft: [ listbutton ],	
	//	contentMiddle: [ new sap.m.Label({text : "Sample Content" }) ]
	//});
	//pMainPage[0].setCustomHeader(split_bar);
	
	return splitcontrol;

}


/*
// ================================================================================
//	Class for Mobile Standard List
// ================================================================================
*/
//var oStandardList =  createMobileStandardList(myData,"oModel_myTable1","myTable1","Title","Description","Info");
/*function createMobileStandardList(data,oModelName,oModel_Path,title,desc,info){

	var standard_list = new sap.m.List({});
	
	var template = new sap.m.StandardListItem({
		title 		: title,
		description : desc,
		type 		: "Navigation",
		info		: info,
		infoState	: "Success"		
	});
	
	standard_list.bindAggregation("items",{
		path : oModelName+">/"+oModel_Path,
		template : template,
		filters : []
	});	
	
	return standard_list;
}*/
var MStandardList = function (pName, pListMode, pModelID, pBindingPath, pBindTitle, pBindDesc, pBindInfo, pFilterItems){
	
	//visible only to MyClass objects.
	this.listMode;
	var _self = this;
	this.List = new sap.m.List({
		headerText : pName + " List",
	});
	
	this.template = new sap.m.StandardListItem({
			title 		: "{" + pModelID + ">" + pBindTitle +"}",
			description : "{" + pModelID + ">" + pBindDesc +"}",
			info		: "{" + pModelID + ">" + pBindInfo +"}",
			type		: "Navigation",
			infoState	: "Success",		
		});
	
	this.select = new sap.m.Select();
	
	this.subBar = new sap.m.Bar({ 
			enableFlexBox: true,
			contentMiddle: [ new sap.m.SearchField({
								placeholder: "Search " + pName +"...",									
								layoutData: new sap.m.FlexItemData({growFactor: 2}),
								liveChange: function(oEvent){
									_self.updateList( _self.select.getSelectedKey(), oEvent.getSource().getValue());
								}
							})
							],
			contentRight: [ this.select],
		});
	
	this.updateList = function(key,sPrefix){
			this.List.destroyItems();
			
			if (sPrefix != ','){
				var oFilter1 = new sap.ui.model.Filter(key, sap.ui.model.FilterOperator.Contains, sPrefix );

				// bind Aggregation
					this.List.bindAggregation("items", {
							path: pBindingPath,
							template: this.template,
							filters: [oFilter1]
					});
			}	
	}
	
	this.Vbox = new sap.m.VBox({
					 //alignItems :	"Center", // Baseline, Center, End, Inherit, Start, Stretch
					width: '100%',
					items	 :[this.subBar,this.List]
				})
	
	this.initial = function(){

		if (pListMode == "multi"){
			this.listMode = sap.m.ListMode.MultiSelect;
		}else{
			this.listMode = sap.m.ListMode.None;
		}
		
		this.List.setMode(this.listMode);
	
		for (var i = 0, len = pFilterItems.length; i < len; i++) {

			this.select.addItem( new sap.ui.core.Item({ text: "By " + pFilterItems[i].text, key: pFilterItems[i].key}) );
			//console.log( "column:"+ pFilterItems[i].text );
		}
		
		this.List.bindAggregation("items",
			{
				path: pBindingPath,
				template: this.template
			});
		
		
	}
	//function that able to use
	this.getList = function(){
	
		return this.List;
	}
	
	this.getTemplate = function(){
		return this.template;
	}
	
	this.getBox = function(){
		return this.Vbox;
	}
	
	this.initial();
}

/*
// ================================================================================
//	Function for Mobile Input
// ================================================================================
*/
function CreateMInput(pId, pType, pValue,_pEditable, pPlaceholder){
	
	return new sap.m.Input(pId, {					
				 type		: pType,
				 value		: pValue,
				 editable	: _pEditable,
				 placeHolder: pPlaceholder
			
			});
}

/*
// ================================================================================
//	Function for Mobile Text
// ================================================================================
*/
function CreateMText(pId, pText, pWidth){
	
	return new sap.m.Text(pId,{
			   			
						text		: 	pText,
						width		:	pWidth
					
						
			   	
				});

}

/*
// ================================================================================
//	Function for Mobile TextArea
// ================================================================================
*/
function CreateMTextArea(pId, pPlaceholder, pRows, pWidth){

	return new sap.m.TextArea(pId,{
	
					placeholder : pPlaceholder,
					rows 		: pRows,
					width		: pWidth
					
				});

}
/*
// ================================================================================
//	Function for Mobile Label
// ================================================================================
*/
function CreateMLabel(pId, pText, pDesign, pTextAlign, pWidth){
	
	return new sap.m.Label(pId,{
						
						 text		:pText,
						 design		:pDesign,
						 textAlign	:pTextAlign,
						 width		:pWidth
					
					});

}
/*
// ================================================================================
//	Function for Mobile Object Header
// ================================================================================
*/
function CreateMobileObjectHeader(pId, pTitle, pNumber) {

	return new sap.m.ObjectHeader(pId,{
							
						title	:	pTitle,
						number	:	pNumber
						
					});

}

/*
// ================================================================================
//	Function for Mobile Icon TabBar
// ================================================================================
*/
function CreateMIconTabBar(pId, aTabItems, pVbox){
	
	TabBar = new sap.m.IconTabBar(pId,{content: pVbox});

		for(var i=0 ; i<aTabItems.length ; i++){
			
			tab_item = new sap.m.IconTabFilter({
				
				icon		: aTabItems[i].icon,
				iconColor	: aTabItems[i].iconColor,
				count		: aTabItems[i].count,
				text		: aTabItems[i].text,
				key			: aTabItems[i].key
				
				
			});
			
			tab_sep = new sap.m.IconTabSeparator();
		
			TabBar.addItem(tab_item).addItem(tab_sep);
			
		}
	
	return TabBar;

}

/*
// ================================================================================
//	Function for Mobile Tiles
// ================================================================================
*/
function CreateMStandardTiles(pId, pData){
	
	var TilesArray = [];

	for(var i = 0 ; i<pData.length ; i++){
	
		Tiles = new sap.m.StandardTile(pId,{
			icon		: pData[i].icon,		
			number 		: pData[i].number,
			numberUnit 	: pData[i].link,
			title 		: pData[i].description,
			info 		: pData[i].info,
			infoState 	: pData[i].infostate,
			press : function(oEvent){
				window.location = oEvent.oSource.getNumberUnit();
			}, 
		});
	
	TilesArray.push(Tiles);	
	
	
	}

	Tiles_Container = new sap.m.TileContainer("",{
		
		tiles : TilesArray
		
	});
	
	return Tiles_Container;
}

function CreateMStandardTilesII( pData){
	
	function handleTap(oEvent) {
		    var title = oEvent.oSource.getTitle();
			
			for (var i=0; i< pData.length; i++){
				if( pData[i].name == title){

					window.location = pData[i].path;
					
				}
			}
		}
		
	var tc = new sap.m.TileContainer({ height : "95%"});
		
	for (var i = 0; i < pData.length; i++) {
			
		tc.addTile(	
				new sap.m.StandardTile("tile" + i, {
		                icon : pData[i].imgpath,
		                number : pData[i].number,
		                numberUnit : pData[i].numberUnit,
		                title : pData[i].name,
		                info : pData[i].info,
						infoState : pData[i].infoState,
		                press : handleTap,
		                removable : false
		        })
		);
	}
	
	return tc;	
}
