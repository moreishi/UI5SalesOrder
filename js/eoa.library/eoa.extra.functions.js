/*
// ================================================================================
// Special Functions
// ================================================================================
*/  

  /*
  |--------------------------------------------------------------------------
  | get Child No- Aljhun
  |--------------------------------------------------------------------------
  */ 
  
      function getSwtState(statDesc){
          
		if(statDesc!="Counted"){
			return false;
		}else{return true;}
	   
	   }
	   
   /*
  |--------------------------------------------------------------------------
  | get Child No- Aljhun
  |--------------------------------------------------------------------------
  */ 
  
      function getSwtStateB(statDesc){
          
		if(statDesc!="X"){
			return false;
		}else{return true;}
	   
	   }
 
	/*
	|--------------------------------------------------------------------------
	| get GLB Status Desc- Aljhun
	|--------------------------------------------------------------------------
	*/ 
 
     function getGlbStat(status){
         var statusdata=[]
 	
 		for(var i=0;i<GlbStatusData.length;i++){
 			
 			if(GlbStatusData[i].status==status){
 				
 				statusdata.push({
 					statusdesc	:GlbStatusData[i].description,
 					statusstate	: setStatState(GlbStatusData[i].description)
 				})
 				//log(statusdata,"Stat");
 				return statusdata;
 			}
 		
 		}
 		
 		if(statusdata.length==0){
 			statusdata.push({
 					statusdesc	: "",
 					statusstate	: setStatState("None")
 				})
 				
 			return statusdata;
 		}
 
     }
 
   /*
   |--------------------------------------------------------------------------
   | ValueHelp_AssetNumF - Aljhun
   |--------------------------------------------------------------------------
   */ 
   
       function setStatState(status){
           
           switch(status){
           
               case "Pending":
	 			return sap.ui.core.ValueState.Warning;
             break;
             
             case "Completed":
	 			return sap.ui.core.ValueState.Success;
             break;
             case "Withdraw":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		case "Counted":
	 			return sap.ui.core.ValueState.Success;
             break;
	 		
	 		case "Missing":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		case "Under Repair":
	 			return sap.ui.core.ValueState.Warning;
             break;
	 		
	 		case "Disposal":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		case "Disposal":
	 			return sap.ui.core.ValueState.Error;
             break;
	 		
	 		default:
	 			return sap.ui.core.ValueState.None;
           
           }
       
       
       
       }
  /*
  |--------------------------------------------------------------------------
  | get year - Aljhun
  |--------------------------------------------------------------------------
  */ 		
	function getEmpname(ID){

		for(var i=0;i<EmployeeData.length;i++){
		
			if(EmployeeData[i].emp_id==ID){
				return EmployeeData[i].fname;
			}
		}

	}	
	
  /*
  |--------------------------------------------------------------------------
  | get year - Aljhun
  |--------------------------------------------------------------------------
  */ 		
 	function getFullYear(date){
 
 		var datestamp = new Date(date);
 		var year = datestamp.getFullYear();
 
 		return year;
 	}
 	
   /*
   |--------------------------------------------------------------------------
   | get table items - Aljhun
   |--------------------------------------------------------------------------
   */    
		function get_TableItems(Table,ColumnName,index){
			var items ="";
			for(var i=0; i<Table.getColumns().length ; i++){
			
				if(Table.getColumns()[i].getHeader().getText().toLowerCase()== ColumnName.toLowerCase()){
					//for(var j=0;j<Table.getSelectedItems()[index].length;j++){
						items = Table.getSelectedItems()[index].getCells()[i].getText()
					//}
				}
				
			}
			return items;
		}
	
	
	/*
    |--------------------------------------------------------------------------
    | Bind Asset Master Header and Child Items- Alj
    |--------------------------------------------------------------------------
    */

        function Bind_HeaderChild(){
		
			var c = innerJoin(AssetMList, AssetCHList, function (AssetMList, AssetCHList) {
			 	//console.log("s")
				if (AssetCHList.assetnum === AssetMList.assetnum) {
				
			 		return {
			 			
			 			assetnum			:AssetCHList.assetnum,			
			 			assetsubnum			:AssetCHList.assetsubnum,			
			 			assetdesc			:AssetCHList.assetdesc,			
			 			companycode			:AssetCHList.companycode,			
			 			assetclass			:AssetCHList.assetclass,			
			 			assetsernum			:AssetCHList.assetsernum,			
			 			assetloc			:AssetCHList.assetloc,			
			 			assetphsyloc		:AssetCHList.assetphsyloc,		
			 			costcenter			:AssetCHList.costcenter,			
			 			capdate				:AssetCHList.capdate,				
			 			deacdate			:AssetCHList.deacdate,			
			 			assetcost			:AssetCHList.assetcost,			
			 			assetnetbkval		:AssetCHList.assetnetbkval,		
			 			assetquantity		:AssetCHList.assetquantity,		
			 			assetum				:AssetCHList.assetum,				
			 			assetnote			:AssetCHList.assetnote,			
			 			asseteffectdate		:AssetCHList.asseteffectdate,		
			 			assetduration		:AssetCHList.assetduration,		
			 			tag					:AssetCHList.tag,					
			 			image_id			:AssetCHList.image_id,			
			 			sys_id				:AssetCHList.sys_id,				
			 			status_description	:AssetCHList.status_description,
			 			status_state		:setStatState(AssetCHList.status_description),
			 			assetChild			:AssetCHList.assetChild
			 			
			 			
			 		};
			 	}
			 });

			 
			//log(c,"All")
			
			AssetMList=c;
		
			Bind_Verify_TB(AssetMList);
			Bind_AssetNum(AssetMList);
			//log(AssetMList,"Asset Joint List");
			
			
        }
		
					
		function innerJoin(a, b, select) {
			var m = a.length, n = b.length, c = [];

			for (var i = 0; i < m; i++) {
					var x = a[i];
					c.push(x);//<<-----------Add if Parent is to be included even without any child items..
				for (var j = 0; j < n; j++) { 	   // cartesian product - all combinations
					
					var y = select(x, b[j]);  	// filter out the rows and columns you want
						if (y) c.push(y);         // if a row is returned add it to the table
						
				}
				
			}

			return c;
		}
	
	
	
	
	
	
	
	/*
   |--------------------------------------------------------------------------
   | Attach Value Help to Element Input - Aljhun
   |--------------------------------------------------------------------------
   */  
		
		
     function Attach_MValueHelp(func_id,func_title,func_sProperty){
        
		
		var SelecDialog = new sap.m.SelectDialog(func_id,{
                title: func_title,
					search : function(oEvent){
								var filter = [];
								var sVal = oEvent.getParameter("value");
								if(sVal !== undefined) {
									//Get the bound items
									var itemsBinding = oEvent.getParameter("itemsBinding");
						   
									// create the local filter to apply
									var selectFilter = new sap.ui.model.Filter(func_sProperty, sap.ui.model.FilterOperator.Contains , sVal);
									filter.push(selectFilter);
								
									// and apply the filter to the bound items, and the Select Dialog will update
									itemsBinding.filter(filter);
								}
							},
					liveChange: function(oEvent){
									var filter = [];
									var sVal = oEvent.getParameter("value");
									var sEventType = oEvent.getParameter("eventType");
									if(sVal !== undefined) {
										//Get the bound items
										var itemsBinding = oEvent.getParameter("itemsBinding");
								
										// create the local filter to apply
										var selectFilter = new sap.ui.model.Filter(func_sProperty, sap.ui.model.FilterOperator.Contains , sVal);
										filter.push(selectFilter);
									
										// and apply the filter to the bound items, and the Select Dialog will update
										itemsBinding.filter(filter);
									}
								},
				});
			
				return SelecDialog;	
        }
		
		function Bind_ValueHelp(Dialog,Element,Model_VHelp,Model_sPath,func_pTitle,func_pDesc){
		
			// set model & bind Aggregation
			Dialog.setModel(Model_VHelp, Model_sPath);
				// attach close listener
			Dialog.attachConfirm(function(evt) {
					 var selectedItem = evt.getParameter("selectedItem");
					 if (selectedItem) {
						  Element.setValue(selectedItem.getDescription());
					 }
			});
				
			var temp = new sap.m.StandardListItem({
					 title		:"{"+ Model_sPath + ">"+func_pTitle +"}",
					 description:"{"+ Model_sPath + ">"+func_pDesc +"}",
					 active: true
				 })
				
				Element.attachValueHelpRequest(
				   function () {
					   Dialog.open(Element.getValue());
					   Dialog.setModel(Model_VHelp, Model_sPath);
					   Dialog.bindAggregation("items", {
						   path: ""+Model_sPath+">/"+Model_sPath+"", 
						   template: temp
					   });
				   }
			   );
			   
		
		
		}

	 /*
     |--------------------------------------------------------------------------
     | Attach Array JSON.stringify
     |--------------------------------------------------------------------------
     */ 		
	 	
	 	function log(data,title){
	 		console.log(JSON.stringify(title));
	 		console.log(JSON.stringify(data));
	 	}		