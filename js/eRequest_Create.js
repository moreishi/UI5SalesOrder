
function createContent(){
    //page
    var Page_eRequest = new sap.m.Page("Page_eRequest",{ backgroundDesign:"Standard", enableScrolling: true });
    //page - title
    var HdrBar_eRequest = new sap.m.Bar({
        contentLeft: [ new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"})],
        contentMiddle: [ new sap.m.Label({ text: "eRequest" })],
        contentRight: [ new sap.m.Button("oBtn_home_eRequest",{ icon: "sap-icon://home", press: function(){ window.location.href = "eRequest_Main.html"; } }) ]
    });
        Page_eRequest.setCustomHeader(HdrBar_eRequest);
    //page - footer
    var FooterBar_eRequest = new sap.m.Bar({        
        contentRight: [ 
            oBtn_save_eRequest = new sap.m.Button("oBtn_save_eRequest",{ icon: "sap-icon://save" , 
                press:function(){
                    oDialog_Confirmation_CreateRequest.open();              
                }           
            }),
            oBtn_decline_eRequest = new sap.m.Button("oBtn_decline_eRequest",{ icon: "sap-icon://decline", 
                press:function(){ 
                    window.location.href="";                    
                }
            }),
            oBtn_add_eRequest = new sap.m.Button("oBtn_add_eRequest",{ visible:false, icon: "sap-icon://add", 
                press:function(){ 
                    window.location.href="";                    
                }
            })          
        ]
    });
        Page_eRequest.setFooter(FooterBar_eRequest);
    //content - object header
    var oHdr_eRequest = new sap.m.ObjectHeader("oHdr_eRequest",{
        title: "Ben",       
        number : get_ClientDate()
    });
        Page_eRequest.addContent(oHdr_eRequest);
    //content - panel form
    var oPanel_eRequest = new sap.m.Panel("oPanel_eRequest",{ 
        headerText: "Ticket Information:", 
        content: [
            new sap.ui.layout.form.SimpleForm({
                minWidth : 512,
                maxContainerCols: 2,
                editable: true,
                content:[     
                        
                        // column 1
                        new sap.ui.core.Title({text:""}),

                            new sap.m.VBox({items: [                                                        
                                new sap.m.HBox({items: [ 
                                                        oLbl_Application = new sap.m.Label({text:"Application"}).addStyleClass('simpleForm_oLbl'),  
                                                        oInput_Application = new sap.m.Select({}).addStyleClass('simpleForm_oSelect') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                                new sap.m.HBox({items: [ 
                                                        oLbl_Assigned_To = new sap.m.Label({text:"Assigned To"}).addStyleClass('simpleForm_oLbl'),  
                                                        oInput_Assigned_To = new sap.m.Input({value: "" }).addStyleClass('simpleForm_oInput') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                                new sap.m.HBox({items: [ 
                                                        oLbl_Need_by_Date = new sap.m.Label({text:"Need by Date"}).addStyleClass('simpleForm_oLbl'),    
                                                        oInput_Need_by_Date = new sap.m.DateTimeInput({type: sap.m.InputType.Date, displayFormat: "yyyy-MM-dd", valueFormat: "yyyy-MM-dd"}).addStyleClass('simpleForm_oInput') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                                
                            ]}),
                    
                        // column 2                            
                        new sap.ui.core.Title({text:""}),
                            
                            new sap.m.VBox({items: [                                                                
                                new sap.m.HBox({items: [ 
                                                        oLbl_Type = new sap.m.Label({text:"Type"}).addStyleClass('simpleForm_oLbl'),                    
                                                        oInput_Type = new sap.m.Select({}).addStyleClass('simpleForm_oSelect') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                                new sap.m.HBox({items: [ 
                                                        oLbl_Severity = new sap.m.Label({text:"Severity"}).addStyleClass('simpleForm_oLbl'),            
                                                        oInput_Severity = new sap.m.Select({}).addStyleClass('simpleForm_oSelect') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                                new sap.m.HBox({items: [ 
                                                        oLbl_Priority = new sap.m.Label({text:"Priority"}).addStyleClass('simpleForm_oLbl'),            
                                                        oInput_Priority = new sap.m.Select({}).addStyleClass('simpleForm_oSelect') 
                                ]}).addStyleClass('simpleForm_oHBox'),
                            ]}),                                        
                ] 
            })
        ]  
    }); 
        Page_eRequest.addContent(oPanel_eRequest);
    
    //content - panel text editor
    var oPanel_eRequest_TextEditor = new sap.m.Panel("oPanel_eRequest_TextEditor",{ 
            headerText: "Description:",     
    });
    //title
    var oSForm_Title = new sap.ui.layout.form.SimpleForm({
        minWidth : 512,
        maxContainerCols: 2,
        editable: true,
        content:[               
            new sap.ui.core.Title({text:""}),                       
            oTitle_HBox = new sap.m.HBox({items: [ 
                oLbl_Title = new sap.m.Label({text:"Title"}).addStyleClass('simpleForm_oLbl'),  
                oInput_Title = new sap.m.Input({}).addStyleClass('simpleForm_oInput') 
            ]}).addStyleClass('simpleForm_oHBox')
        ]
    });     
        oPanel_eRequest_TextEditor.addContent(oSForm_Title);
    //text editor   
    var oMatrix = new sap.ui.commons.layout.MatrixLayout({});
    var oHTML = new sap.ui.core.HTML("iFRM");  
    var oString_html = "<div id='container_editor1'>" +
                            "<form>" +
                                "<textarea name='editor1' id='editor1' rows='10' cols='80'>" + 
                                    "" +
                                "</textarea>" +
                            "</form>" +
                        "</div>" ;
            
    oHTML.setContent(oString_html);
    oMatrix.createRow(oHTML);
        oPanel_eRequest_TextEditor.addContent(oMatrix);
        Page_eRequest.addContent(oPanel_eRequest_TextEditor);
        
    //shell and app declaration
    Shell = CreateMShell("",0.7);
    Shell.setAppWidthLimited(false);    
    App = new sap.m.App();
    
    App.addPage(Page_eRequest);
    
    Shell.setApp(App);              
    Shell.placeAt("content");

    //Creating Dialog Boxes             
        oDialog_Confirmation_CreateRequest = new sap.m.Dialog("oDialog_Confirmation_CreateRequest",{    
            icon: "sap-icon://notification",
            title: "Confirmation",
            stretchOnPhone: true,
            stretch: false,
            content: [ new sap.m.Label({text:"Are you confirm to create request?"}) ],
            endButton:  new sap.m.Button({
                            text:"Cancel", 
                            icon: "sap-icon://decline", 
                            type: sap.m.ButtonType.Reject, 
                            press: function(){ 
                                oDialog_Confirmation_CreateRequest.close(); 
                            } 
                        }),
            beginButton: new sap.m.Button({
                            text:"OK", 
                            icon: "sap-icon://accept", 
                            type: sap.m.ButtonType.Accept, 
                            press: function(){                              
                
                                oDialog_Confirmation_CreateRequest.close(); 
                                
                                var editor_data = CKEDITOR.instances.editor1.getData();
                                    editor_data = editor_data.replace(/\"/g,"'");
                                
                                var create_record = {
                                    action      : "CREATE_MULTIPLE",
                                    table       : "erequest",
                                    item        : [{
                                                    id          : "",
                                                    app_id      : oInput_Application.getSelectedItem().getKey(),
                                                    pernr       : oInput_Assigned_To.getValue(),
                                                    needby_date : oInput_Need_by_Date.getValue(),
                                                    type        : oInput_Type.getSelectedItem().getKey(),
                                                    severity    : oInput_Severity.getSelectedItem().getKey(),
                                                    priority    : oInput_Priority.getSelectedItem().getKey(),
                                                    title       : oInput_Title.getValue(),
                                                    description : editor_data,
                                                    created_by  : UI5Storage.get("username")
                                                }]
                                };
                                
                                callservice(create_record, "", "", "", "",  function(result){
                                    if(result.return.status == "01"){
                                        sap.m.MessageToast.show("Request has been created");                            
                                        
                                        //disable the form
                                        oInput_Application.setEnabled(false);
                                        oInput_Assigned_To.setEnabled(false);
                                        oInput_Need_by_Date.setEnabled(false);
                                        oInput_Type.setEnabled(false);
                                        oInput_Severity.setEnabled(false);
                                        oInput_Priority.setEnabled(false);
                                        oInput_Title.setEnabled(false);
                                        
                                        //disable the text editor
                                        CKEDITOR.instances.editor1.setReadOnly(true);
                                        
                                        //set the footer buttons
                                        oBtn_save_eRequest.setVisible(false);
                                        oBtn_decline_eRequest.setVisible(false);
                                        oBtn_add_eRequest.setVisible(true);
                                        
                                    } else {
                                        sap.m.MessageToast.show("Failed to create request");
                                    }
                                }); 
                            } 
                        })
            
        });
}


/*
|--------------------------------------------------------------------------
| Bind Drop Down - (Application , Type, Severity, Priority) John
|--------------------------------------------------------------------------
*/      

    function Bind_DropDown(){

        //var getAssetClass = {
        //  action: "READ",
        //  language: "EN",
        //  table: "eammassetcls",          
        //  field: ["eammassetcls.ANLKL","eammassetcls.TXK20"],
        //  where: "eammassetcls.status = '01'"     
        //};
        //
        //callservice( getAssetClass, "", "", "" , "",  function(result){
        //  if(result.return.status == "01" || result.return.status == "02") {
                
                //Application Drop Down
                var result = {
                    dataitem : [
                        {"id":"APP001" , "desc":"Test App 1"},
                        {"id":"APP002" , "desc":"Test App 2"},
                        {"id":"APP003" , "desc":"Test App 3"}
                    ]
                };
                
                local_application = [];
                for(i=0; i < result.dataitem.length; i++){
                    local_application.push({
                        item_id : result.dataitem[i].id,
                        item_desc : result.dataitem[i].desc
                    });
                }
                            
                oInput_Application.destroyItems();
                
                for(i=0; i < local_application.length; i++){     
                    Item_Application = new sap.ui.core.ListItem("Item_Application_"+i);
                    Item_Application.setKey(local_application[i].item_id);
                    Item_Application.setText(local_application[i].item_id + " - " + local_application[i].item_desc);
                    
                    oInput_Application.addItem(Item_Application);              
                }

                //Type Drop Down
                var result = {
                    dataitem : [
                        {"id":"TYPE001" , "desc":"Test 1"},
                        {"id":"TYPE002" , "desc":"Test 2"},
                        {"id":"TYPE003" , "desc":"Test 3"}
                    ]
                };
                
                local_type = [];
                for(i=0; i < result.dataitem.length; i++){
                    local_type.push({
                        item_id : result.dataitem[i].id,
                        item_desc : result.dataitem[i].desc
                    });
                }
                            
                oInput_Type.destroyItems();
                
                for(i=0; i < local_type.length; i++){     
                    Item_Type = new sap.ui.core.ListItem("Item_Type_"+i);
                    Item_Type.setKey(local_type[i].item_id);
                    Item_Type.setText(local_type[i].item_id + " - " + local_type[i].item_desc);
                    
                    oInput_Type.addItem(Item_Type);              
                }   

                //Severity Drop Down
                var result = {
                    dataitem : [
                        {"id":"S001" , "desc":"Low"},
                        {"id":"S002" , "desc":"Medium"},
                        {"id":"S003" , "desc":"High"}
                    ]
                };
                
                local_severity = [];
                for(i=0; i < result.dataitem.length; i++){
                    local_severity.push({
                        item_id : result.dataitem[i].id,
                        item_desc : result.dataitem[i].desc
                    });
                }
                            
                oInput_Severity.destroyItems();
                
                for(i=0; i < local_severity.length; i++){     
                    Item_Severity = new sap.ui.core.ListItem("Item_Severity_"+i);
                    Item_Severity.setKey(local_severity[i].item_id);
                    Item_Severity.setText(local_severity[i].item_id + " - " + local_severity[i].item_desc);
                    
                    oInput_Severity.addItem(Item_Severity);              
                }               

                //Priority Drop Down
                var result = {
                    dataitem : [
                        {"id":"P001" , "desc":"Low"},
                        {"id":"P002" , "desc":"Medium"},
                        {"id":"P003" , "desc":"High"}
                    ]
                };
                
                local_priority = [];
                for(i=0; i < result.dataitem.length; i++){
                    local_priority.push({
                        item_id : result.dataitem[i].id,
                        item_desc : result.dataitem[i].desc
                    });
                }
                            
                oInput_Priority.destroyItems();
                
                for(i=0; i < local_priority.length; i++){     
                    Item_Priority = new sap.ui.core.ListItem("Item_Priority_"+i);
                    Item_Priority.setKey(local_priority[i].item_id);
                    Item_Priority.setText(local_priority[i].item_id + " - " + local_priority[i].item_desc);
                    
                    oInput_Priority.addItem(Item_Priority);              
                }               
            //}
        //});   
        
    }
    
/*  
|--------------------------------------------------------------------------
| Client Date - Joefe
|--------------------------------------------------------------------------
*/
    
    function get_ClientDate(){
        d = new Date();

        day = d.getDate();
                day = day < 10 ? '0'+String(day) : day;
        month = parseInt(d.getMonth()) + 1;
                month = month < 10 ? '0'+String(month) : String(month);
        year = d.getFullYear();

        var monthArr = new Array();
            monthArr['01']="January";
            monthArr['02']="February";
            monthArr['03']="March";
            monthArr['04']="April";
            monthArr['05']="May";
            monthArr['06']="June";
            monthArr['07']="July";
            monthArr['08']="August";
            monthArr['09']="September";
            monthArr['10']="October";
            monthArr['11']="November";
            monthArr['12']="December";
        
        month = monthArr[month];
    
        return  day+' '+ month  +' '+ year;
    }    
