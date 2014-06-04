
    function createContent() {
    /*
     |--------------------------------------------------------------------------
     | Split Container Apps
     |--------------------------------------------------------------------------
    */
    // Left App
        App_Master_prodInfo = new sap.m.App();
        App_Master_prodInfo.addPage(createAppMasterPage());
        
        
    // Right App
        App_Detail_prodInfo = new sap.m.App();
        App_Detail_prodInfo.addPage(createAppDetailPage());

        
    /*
     |--------------------------------------------------------------------------
     | Shell - container
     |--------------------------------------------------------------------------
    */

    
        Shell = CreateMShell("",0.7);
        //Shell.setAppWidthLimited(false);

        SContainer_prodInfo = new sap.ui.unified.SplitContainer({showSecondaryContent: true, content: [App_Detail_prodInfo], secondaryContent: [App_Master_prodInfo]});
        
        App = new sap.m.App();
        
        App.addPage(SContainer_prodInfo);
        
        Shell.setApp(App);
        Shell.placeAt("content");
    }
    

/*
// ================================================================================
// Split App - Master Page
// ================================================================================
*/

    function createAppMasterPage() {
        
        // AMP stands for AppMasterPage
    
        Page_AMP_prodInfo = new sap.m.Page("Page_AMP_prodInfo",{
            footer : new sap.m.Bar({
                contentLeft:[                       
                    Btn_prodInfo_settings = new sap.m.Button({
                            icon : "sap-icon://action-settings",
                            press : function() {
                                //
                            }
                    })
                ]
            })
        
        });
        
        Bar_prodInfo_name = new sap.m.Bar({
            enableFlexBox: false,
            contentLeft: [ new sap.m.Label({text:"Customer Name"})]
        });     
        Page_AMP_prodInfo.setCustomHeader(Bar_prodInfo_name);
        
        Bar_prodInfo_selections = new sap.m.Bar({
            enableFlexBox: false,
            contentLeft: [ Btn_prodInfo_Orders = new sap.m.Button({text: "Orders", width: "125px"}), Btn_prodInfo_Products = new sap.m.Button({text: "Products", width: "125px"}) ]
        }); 
        Page_AMP_prodInfo.setSubHeader(Bar_prodInfo_selections);
        
        SearchField_prodInfo = new sap.m.SearchField({});
        Page_AMP_prodInfo.addContent(SearchField_prodInfo);
        
        Page_AMP_prodInfo.addContent(createProductList());
        
        return Page_AMP_prodInfo;
    }

    
/*
// ================================================================================
// Split App - Detail Page
// ================================================================================
*/      
    function createAppDetailPage() {
        
        // ADP stands for AppDetailPage
        
        Page_ADP_prodInfo = CreateMPage("",sap.m.PageBackgroundDesign.Transparent,"Product","");
        Page_ADP_prodInfo.getFooter().removeAllContentLeft();
        
        Btn_prodInfo_menu = new sap.m.Button({icon:"sap-icon://menu",
            press:function(){
                SContainer_prodInfo.setSecondaryContentWidth("250px");                      
                if(!SContainer_prodInfo.getShowSecondaryContent()){
                    SContainer_prodInfo.setShowSecondaryContent(true);
                } else {                            
                    SContainer_prodInfo.setShowSecondaryContent(false);
                }
            }
        });
        
        Btn_prodInfo_add = new sap.m.Button({icon:"sap-icon://add",
            press:function(){
                //
            }
        });     
        Page_ADP_prodInfo.getFooter().addContentRight(Btn_prodInfo_add);
        
        
        Bar_ADP_prodInfo = new sap.m.Bar({
            enableFlexBox: false,
            contentLeft:  [Btn_prodInfo_menu, new sap.m.Image({ src:"image/logo/logo.png", width:"100px"})],
            contentMiddle:[new sap.m.Label({text:"Product"})],
            
            contentRight:[
            
                new sap.m.Button({  
                     icon: "sap-icon://home",
                     press: function(){
                      //window.location.href = MainPageLink; 
                     }
                })
            ]
        }); 
        Page_ADP_prodInfo.setCustomHeader(Bar_ADP_prodInfo);
        
        Page_ADP_prodInfo.addContent(createProductObjHeader());
        
        return Page_ADP_prodInfo;
    }

    
/*
// ================================================================================
// Product List using ObjectListItem template
// ================================================================================
*/
    function createProductList() {
        
        List_prodInfo = new sap.m.List("List_prodInfo", {});
        
        OLI_prodInfo = new sap.m.ObjectListItem("OLI_prodInfo", {
            type: "Active",
            title: "{prod_name}",
            number: "{prod_price}",
            numberUnit: "{prod_unit}",
            numberState : sap.ui.core.ValueState.None,
            attributes : [
                new sap.m.ObjectAttribute({text: ""}),
                OLI_prodInfo_ID = new sap.m.ObjectAttribute({text: "{prod_id}"})
            ]
        });

        return List_prodInfo;
    }

/*
// ================================================================================
// Product List using ObjectListItem template
// ================================================================================
*/
    function createProductObjHeader() {
        
        OH_prodInfo = new sap.m.ObjectHeader("OH_prodInfo",{
            title : "Product Name",
            number : "0.00",
            numberUnit : "MYR",
            numberState : sap.ui.core.ValueState.Success,
            statuses : [ 
                new sap.m.ObjectStatus({text : ""}),
                OH_prodInfo_count = new sap.m.ObjectStatus({text : "per PC"})
            ],
            attributes : [
                new sap.m.ObjectAttribute({text: ""}),
                OH_prodInfo_count_ID =  new sap.m.ObjectAttribute({text: "Product No: Product ID"})         
            ]
        });

        return OH_prodInfo;
    }

