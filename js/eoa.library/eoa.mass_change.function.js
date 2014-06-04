	//start of code added by John 02-25-2014 04:21PM
	
	function set_Buttons_DisplayMode(){
		if(oButton_New) 	oButton_New.setEnabled(false);
		if(oButton_Edit) 	oButton_Edit.setEnabled(false);
		if(oButton_Del) 	oButton_Del.setEnabled(false);
		//if(oButton_Lock) 	oButton_Lock.setEnabled(false);
		
		oButton_MassChange.setEnabled(false).setText("Mass Change"); 
		clickFlag_MassChange = false;
	}
	
	function set_MassChange_On(){
		//change the text of button from "Mass Change" to "Save Changes"
		oButton_MassChange.setText("Save Changes");						
		
		//Flag MassChange is enabled
		clickFlag_MassChange = true;
		
		//disable the other buttons
		if(oButton_New) 	oButton_New.setEnabled(false);
		if(oButton_Edit) 	oButton_Edit.setEnabled(false);
		if(oButton_Del) 	oButton_Del.setEnabled(false);
		//if(oButton_Lock) 	oButton_Lock.setEnabled(false);
	    
		//Make the textfields editable
		set_TextField_Editable_On();
	}
	
	function set_MassChange_Off(){	
		//change the text of button from "Save Changes" to "Mass Change"
		oButton_MassChange.setText("Mass Change");
	
		//Flag MassChange is disabled
		clickFlag_MassChange = false;
		
		//enable the other buttons
		if(oButton_New) 	oButton_New.setEnabled(true);
		if(oButton_Edit) 	oButton_Edit.setEnabled(true);
		if(oButton_Del) 	oButton_Del.setEnabled(true);
		//if(oButton_Lock) 	oButton_Lock.setEnabled(true);
			
		//Make the textfields not editable
		set_TextField_Editable_Off();
	}
	
	function set_TextField_Editable_On(){
	
		//set textfield to editable except for status column and primary key
		for(i = 0 ; i<oTable.getColumns().length; i++){
			if(oTable.getColumns()[i].getVisible() == true){
				//var tmp_field = oTable.getColumns()[i].getLabel().getText();
				var tmp_field = oTable.getColumns()[i].getName();				
					 if(tmp_field == "status") {}
				else if(tmp_field == "password") {} 
				else if(tmp_field == "creation_date"){}
				else if(tmp_field == "creation_time") {}
				else if(tableData.keyfield.indexOf(tmp_field) >= 0) {}
				else {					
					//var colum_data = new sap.ui.commons.TextField({editable:true,textAlign:"Center"}).bindProperty("value",""+oTable.getColumns()[i].getLabel().getText()+"").addStyleClass("editable_textfield");
					var colum_data = new sap.ui.commons.TextField({editable:true,textAlign:"Center"}).bindProperty("value",""+tmp_field+"").addStyleClass("editable_textfield");
					oTable.getColumns()[i].setTemplate(colum_data);
				}				
			}
		}		
						
	}
	
	function set_TextField_Editable_Off(){
	
		//set textfield to not editable except for status column and primary key
		for(i = 0 ; i<oTable.getColumns().length; i++){
			if(oTable.getColumns()[i].getVisible() == true){
				//var tmp_field = oTable.getColumns()[i].getLabel().getText();
				var tmp_field = oTable.getColumns()[i].getName();
					 if(tmp_field == "status") {}
				else if(tmp_field == "password") {} 
				else if(tmp_field == "creation_date"){}
				else if(tmp_field == "creation_time") {}
				else if(tableData.keyfield.indexOf(tmp_field) >= 0) {}
				else {
					//var colum_data = new sap.ui.commons.TextField({editable:false,textAlign:"Center"}).bindProperty("value",""+oTable.getColumns()[i].getLabel().getText()+"").removeStyleClass("editable_textfield");
					var colum_data = new sap.ui.commons.TextField({editable:false,textAlign:"Center"}).bindProperty("value",""+tmp_field+"").removeStyleClass("editable_textfield");
					oTable.getColumns()[i].setTemplate(colum_data);
				}
				
			}
		}
		
	}
	
	function revertChanges(Path){	
		tableData = JSON.stringify(backup_tableData);
		tableData = JSON.parse(tableData);
		
		var oModel = new sap.ui.model.json.JSONModel();
		var myData = {};
			myData[Path] = tableData.dataitem;
		oModel.setData(myData);
		oTable.setModel(oModel);
		oTable.bindRows("/"+Path+"");
		oTable.setVisibleRowCount(tableData.dataitem.length); 		
	}
	
	function getRecordChanges(tmp_backup,tmp_data){
		//initialize container for the recordChanges
		var tmp_list = new Array();	
		
		//find records with changes
		for(i = 0 ; i < tmp_data.dataitem.length ; i++){
			var item_Index = tmp_data.dataitem[i];
			var tmp_record = {};

			for(var tmp_var in tmp_data.column){
				tmp_record[tmp_var] = item_Index[tmp_var];
			}	
			
			//Add only modified records
			if(checkRecord(tmp_record,tmp_backup)){
			
				//convert the image location for status to number '01' or '02'
				switch(tmp_record.status){
					case "image/Message_Icon_Success.png":	tmp_record.status = "01"; break;
					case "image/Message_Icon_Error.png":  tmp_record.status = "02"; break;
				}
				//add record to the list				
				tmp_list.push(tmp_record);					
			} 			
		}	
		
		//Store the list to global variable to be accessed by other functions - this is the array passed to the webservice
		var returnedData = JSON.stringify(tmp_list);			
		return JSON.parse(returnedData);		
	}
	
	function checkRecord(tmp_record,tmp_backup){	
		//initialize return to true
		var bReturn = true;

		//return false if all values are empty for all fields			
		var ctr = 0;
		var empty_ctr = 0;	
		
		for(var tmp_var in tmp_backup.column){							
			ctr++;
			
			if(tmp_record[tmp_var] == ""){
				empty_ctr++;			
			}				
			
		}			
		if(empty_ctr == ctr){				
			bReturn = false;				
		}	

		//return false if record is found in backup
		if(bReturn && tmp_backup.dataitem.length > 0){
			for(var i=0; i < tmp_backup.dataitem.length ; i++){
				var same_values_ctr = 0;
				var ctr = 0;					
				
				//return false if all values for all properties is found in backup
				for(var tmp_var in tmp_backup.column){
					ctr++;													
					if(tmp_record[tmp_var] == tmp_backup.dataitem[i][tmp_var]){
						same_values_ctr++;					
					}						
				}			
				
				//return false if all values are same for all fields meaning it has no changes
				if(same_values_ctr == ctr){					
					bReturn = false;
					i = tmp_backup.dataitem.length;
				}					
			}			
		} 
		
		return bReturn;
	}
	
	
	function MassUpdate(_code, _keyfields, _recordChanges, _application_id){
				
		sap.m.MessageToast.show("Saving changes");
		
		//format the record to be passed to the webservice          
		var record = {
			code    :  _code,
			action  :   "UPDATE",
			keyfield : _keyfields, 
			dataitem : _recordChanges
		};

		var log = {
					code    :  "glbteventlog",
					action  :  "CREATE",
					keyfield : ["id"], 
					dataitem : 
					[{
						"user_id" : UI5Storage.get("username"),
						"app_id" : _application_id,
						"actiontype" : "A005",
						"action_by" : UI5Storage.get("username")
					}]
				  };
				  
		//Added by John - log message for mass update
		var message;				
		if(_recordChanges.length == 1){
			message =  { "01" : "Record was updated successfully" };
		} else {
			message =  { "01" : "Records were updated successfully" };
		}
		
		//Call web service function
		callservice( record, message, "", "" , log,  function(result){
			
			if(result.status=="01"){
				rebind_table();				
			} 			
		});	
		
	};
	
	//end of code added by John 02-25-2014 04:21PM