
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function CreateContent() {

    var oApp = new sap.m.App({});

    var oShell = new sap.m.Shell({
        showLogout : false,
        backgroundImage: "", 
        backgroundOpacity: 0.7
    });
    
    var oPageCustomer = PageCustomer(oApp);
    var oPageCustomerOrders = PageCustomerOrders(oApp);
    var oScSalesOrder = ScSalesOrder(oApp);

    oApp.addPage(oPageCustomer);
    oApp.addPage(oPageCustomerOrders);
    oApp.addPage(oScSalesOrder);

    oShell.setApp(oApp);
    oShell.placeAt("content");

}

function PageCustomer(_app) {

    var oBarHeaderMiddle = new sap.m.Bar({
        contentLeft: [ new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"}) ],
        contentRight: [ new sap.m.Button({icon: "sap-icon://home"}) ],
        contentMiddle: [ new sap.m.Label({text: "Select Customer"}) ]
    })

    var oSearchField = new sap.m.SearchField({ 
        layoutData: new sap.m.FlexItemData({growFactor: 2}),
        placeholder: "Search..." 
    });

    var oSearchSelect = new sap.m.Select({
        type: sap.m.SelectType.Default,
        items: [
            new sap.ui.core.Item({text: "Customer ID", key: ""}),
            new sap.ui.core.Item({text: "Customer Name", key: ""}),
            new sap.ui.core.Item({text: "Customer Area", key: ""}),
        ]
    });

    var oSearchBar = new sap.m.Bar({
        enableFlexBox: true,
        contentMiddle: [ oSearchField ],
        contentRight: [ oSearchSelect ]
    });

    var customerCount = 'Customers(' + oDataCustomer.length + ')';
    var oTable = createEntitlementTable(customerCount, _app);
    BindData(oDataCustomer, oTable, "records",  "");
    oTable.bindAggregation("items", {
            path: "/records",
            template: CLI_customers
    });

    var oPage = new sap.m.Page("customers", {
        customHeader: [ oBarHeaderMiddle ],
        content: [ oSearchBar, new sap.m.ObjectHeader({}), oTable ]
    });

    oPage.setCustomHeader(oBarHeaderMiddle);

    return oPage;
}

function PageCustomerOrders(_app) {

    var oBarHeaderMiddle = new sap.m.Bar({
        contentLeft: [ new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"}) ],
        contentRight: [ new sap.m.Button("", { icon: "sap-icon://home" }) ],
        contentMiddle: [ new sap.m.Label({text: "Customer"}) ]
    });

    var oBarFooter = new sap.m.Bar({
        contentLeft: [ new sap.m.Button({icon: "sap-icon://nav-back", press: function (oEvt) { _app.back(); } }) ],
    });

    oObjectHeader = new sap.m.ObjectHeader({numberUnit: "ID"});

    var oIconTabBar = new sap.m.IconTabBar({
        items: [ 
            new sap.m.IconTabFilter({icon: "sap-icon://cart", text: "Order", count: "0"}),
            new sap.m.IconTabFilter({icon: "sap-icon://hint", text: "Info", count: "0"}),
            new sap.m.IconTabFilter({icon: "sap-icon://cart", text: "Ship To", count: "0"})
        ]
    });

    var oPage = new sap.m.Page("customer_details",{
        content: [ oObjectHeader, oIconTabBar, new sap.m.Button({text: "Sample", press: function(oEvt) { 
            _app.to("SC_SO");
        }}) ]
    });

    oPage.setCustomHeader(oBarHeaderMiddle);
    oPage.setFooter(oBarFooter);


    return oPage;

}

function PageSalesOrder(_app) {

    var customHeader = new sap.m.Bar({
        contentLeft: [ 
            new sap.m.Button("", { icon: "sap-icon://menu2", press: function(oEvt) {
                oSC.setSecondaryContentWidth("251px");
                oSC.setShowSecondaryContent(!oSC.getShowSecondaryContent());
            } }),
            new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"}) 
        ],
        contentRight: [ new sap.m.Button("", { icon: "sap-icon://home" }) ],
        contentMiddle: [ new sap.m.Label({text: "Sales Order"}) ]
    })


    SOObjectHeader = new sap.m.ObjectHeader({
        title: "SO 10004",
        number: "1,200.00",
        numberUnit: "USD",
        statuses : [ 
            new sap.m.ObjectStatus({text: "Ordered: Feb 3, 2014", state: sap.ui.core.ValueState.None}),
            new sap.m.ObjectStatus({text: "Requested: Feb 3, 2014", state: sap.ui.core.ValueState.None}),
            new sap.m.ObjectStatus({text: "Status", state: sap.ui.core.ValueState.Success}),
            new sap.m.ObjectStatus({text: "", state: sap.ui.core.ValueState.Error})
        ],
        attributes: [ 
            SOObjectHeaderCompany = new sap.m.ObjectAttribute({active: true}),
            new sap.m.ObjectAttribute({text: "Sales Area"}) 
        ]
    });    // SET The FF: number, numberUnit, title

    //////////////////
    var customerCount = 'Customers(' + oDataCustomer.length + ')';
    var oTable = OrderItemList();
    BindData(oSalesOrder, oTable, "records",  "");
    oTable.bindAggregation("items", {
            path: "/records",
            template: CLI_Order_List
    });
    /////////////////

    var oBarFooter = new sap.m.Bar({
        contentLeft: new sap.m.Button({ icon: "sap-icon://nav-back", press: function(oEvt) { _app.back(); }}),
        contentMiddle: new sap.m.Button({ icon: "sap-icon://cart", text: "(0)" }),
        contentRight: new sap.m.Button({ icon: "sap-icon://add", })
    })

    var oPage = new sap.m.Page("sales_orders", {
        customHeader: customHeader,
        content: [ SOObjectHeader, oTable ],
        footer: oBarFooter
    });

    return oPage;
}

function PageSCSalesOrder(_app, _app_content) {
    

    var customHeader = new sap.m.Bar({
        contentLeft: [ oSOCustomerName = new sap.m.Label({}) ],
    });

    var customBarFooter = new sap.m.Bar({
        contentLeft: [ new sap.m.Button({icon: "sap-icon://action-settings"}) ],
    });

    var oObjectListItem = new sap.m.ObjectListItem({
        title: "{id}",
        number: "{total}",
        numberUnit: "{currency}",
        attributes: [ new sap.m.ObjectAttribute({text: "{company}"}) ],
        firstStatus: new sap.m.ObjectStatus({text: "{status}", state: "Success"}),
        type: "Active",
        press: function(oEvt) {

            SOObjectHeader.setTitle(oEvt.getSource().getTitle());
            SOObjectHeader.setNumber(oEvt.getSource().getNumber());
            SOObjectHeader.setNumberUnit(oEvt.getSource().getNumberUnit());
            SOObjectHeaderCompany.setText(oEvt.getSource().getAttributes()[0].getText());
            _app_content.to("sales_orders");

        }
    });

    var oList = new sap.m.List({});

    BindData(oMasterSO, oList, "menu", "");
    oList.bindAggregation("items", {
            path: "/menu",
            template: oObjectListItem
    });

    var oPage = new sap.m.Page("PageSCSalesOrder", {
        customHeader: customHeader,
        content: [
            new sap.m.Button({text: "Orders", width: "125px", press: function(oEvt) { _app.to("PageSCSalesOrder"); }, type: sap.m.ButtonType.Emphasized}),
            new sap.m.Button({text: "Products", width: "125px", press: function(oEvt) { _app.to("PageSCProducts"); }}),
            new sap.m.SearchField({placeholder: "search..."}),
            oList
        ],
        footer: customBarFooter
    });

    return oPage;

}

function PageSCProducts(_app, _app_content) {

    var customHeader = new sap.m.Bar({
        contentLeft: [ oPCustomerName = new sap.m.Label({ text: "Customer Name" }) ],   
    });

    var customBarFooter = new sap.m.Bar({
        contentLeft: [ new sap.m.Button({icon: "sap-icon://action-settings"}) ],
        contentMiddle: [],
        contentRight: []
    });

    var oObjectListItem = new sap.m.ObjectListItem({
        title: "{id}",
        number: "{price}",
        numberUnit: "{currency}",
        attributes: [ new sap.m.ObjectAttribute({text: "{product}"}) ],
        firstStatus: new sap.m.ObjectStatus({text: "{status}", state: "Success"}),
        type: "Active",
        press: function(oEvt) { 

            OH_prodInfo.setTitle(oEvt.getSource().getTitle());
            OH_prodInfo.setNumber(oEvt.getSource().getNumber());
            OH_prodInfo.setNumberUnit("USD");
            OH_prodInfo_count_ID.setText(oEvt.getSource().getAttributes()[0].getText()); 

            _app_content.to(Page_ADP_prodInfo);

        }
    });


    var oList = new sap.m.List({});

    BindData(oProducts, oList, "menu", "");
    oList.bindAggregation("items", {
            path: "/menu",
            template: oObjectListItem
    });

    var oPage = new sap.m.Page("PageSCProducts", {
        customHeader: customHeader,
        content: [
            new sap.m.Button({text: "Orders", width: "125px", press: function(oEvt) { _app.to("PageSCSalesOrder"); }}),
            new sap.m.Button({text: "Products", width: "125px", press: function(oEvt) { _app.to("PageSCProducts"); }, type: sap.m.ButtonType.Emphasized}),
            new sap.m.SearchField({placeholder: "search..."}),
            oList
        ],
        footer: customBarFooter
    });

    return oPage;

}

function PageProductDetail() {
        
    // ADP stands for AppDetailPage
    
    Page_ADP_prodInfo = CreateMPage("", sap.m.PageBackgroundDesign.Transparent, "Product","");
    Page_ADP_prodInfo.getFooter().removeAllContentLeft();
    
    Btn_prodInfo_menu = new sap.m.Button({icon:"sap-icon://menu2",
        press:function(){
            SContainer_prodInfo.setSecondaryContentWidth("250px");                      
            if(!SContainer_prodInfo.getShowSecondaryContent()){
                SContainer_prodInfo.setShowSecondaryContent(true);
            } else {                            
                SContainer_prodInfo.setShowSecondaryContent(false);
            }
        }
    });
    
    Btn_prodInfo_add = new sap.m.Button({icon:"sap-icon://add"});     
    Page_ADP_prodInfo.getFooter().addContentRight(Btn_prodInfo_add);    
    
    Bar_ADP_prodInfo = new sap.m.Bar({
        enableFlexBox: false,
        contentLeft: [Btn_prodInfo_menu, new sap.m.Image({ src:"image/logo/logo.png", width:"100px"})],
        contentMiddle: [ new sap.m.Label({text:"Product"}) ],        
        contentRight: [ new sap.m.Button({icon: "sap-icon://home"}) ]
    }); 

    Page_ADP_prodInfo.setCustomHeader(Bar_ADP_prodInfo);
    
    OH_prodInfo = new sap.m.ObjectHeader("OH_prodInfo",{
        statuses : [ 
            new sap.m.ObjectStatus({text : ""}),
            OH_prodInfo_count = new sap.m.ObjectStatus({text : "per piece"})
        ],
        attributes : [
            new sap.m.ObjectAttribute({text: ""}),
            OH_prodInfo_count_ID =  new sap.m.ObjectAttribute({active: true})
        ]
    });

    Page_ADP_prodInfo.addContent(OH_prodInfo);
    
    return Page_ADP_prodInfo;
}

// SPLIT CONTAINERS

function ScSalesOrder(_app) {
    
    var oAppContent = new sap.m.App("", {});
    var content_orders = PageSalesOrder(_app);
    var content_products = PageProductDetail();
    oAppContent.addPage(content_orders);
    oAppContent.addPage(content_products);

    var oAppSecond = new sap.m.App("", {});
    var secondaryContent_orders = PageSCSalesOrder(oAppSecond, oAppContent);
    var secondaryContent_products = PageSCProducts(oAppSecond, oAppContent);    
    oAppSecond.addPage(secondaryContent_orders);
    oAppSecond.addPage(secondaryContent_products);
    
    
    oSC = new sap.ui.unified.SplitContainer("SC_SO",{
        content: oAppContent,
        secondaryContent: oAppSecond,
        showSecondaryContent: true,
        secondaryContentWidth: "251px"
    });

    return oSC;
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function createEntitlementTable(_count_data, _app) {

    Table_entitlements = new sap.m.Table("Table_entitlements", {
        showNoData:false, 
        visible: true,
        headerText: [ _count_data ]
    });

    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Id",textAlign:"Center"}), visible: false}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Customer",textAlign:"Center"})}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Sales Area",textAlign:"Center"})}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"City",textAlign:"Center"})}));

    CLI_customers = new sap.m.ColumnListItem("CLI_customers", {type:'Inactive', type: "Navigation"});
    CLI_customers.addCell(new sap.m.Text({text : "{id}"}));
    CLI_customers.addCell(new sap.m.Text({text : "{customer}"}));
    CLI_customers.addCell(new sap.m.Text({text : "{sales_area}"}));
    CLI_customers.addCell(new sap.m.Text({text : "{city}"}));
    CLI_customers.attachPress(function(oEvt) {

        var _customer_name = oEvt.getSource().getBindingContext().getProperty("customer");
        var _customer_id = oEvt.getSource().getBindingContext().getProperty("id");

        oSOCustomerName.setText(_customer_name);
        oPCustomerName.setText(_customer_name);
        oObjectHeader.setTitle(_customer_name);
        oObjectHeader.setNumber(_customer_id);
        _app.to("customer_details");

    });

    return Table_entitlements;

}

function OrderItemList() {

    Table_Order_List = new sap.m.Table("Table_Order_List", {
        showNoData:false, 
        visible: true,
    });
    
    Table_Order_List.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Id",textAlign:"Center"}) , hAlign: "Center", visible: false}));
    Table_Order_List.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Product",textAlign:"Center"}) , hAlign: "Center"}));
    Table_Order_List.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Qty",textAlign:"Center"}),hAlign: "Center"}));
    Table_Order_List.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Price",textAlign:"Center"}),hAlign: "Center"}));
    Table_Order_List.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Subtotal",textAlign:"Center"}),hAlign: "Center"}));

    CLI_Order_List = new sap.m.ColumnListItem("CLI_Order_List", {type:'Inactive', type: "Navigation"});
    CLI_Order_List.addCell(new sap.m.Text({text : "{id}"}));
    CLI_Order_List.addCell(new sap.m.Text({text : "{product}"}));
    CLI_Order_List.addCell(new sap.m.Text({text : "{qty}"}));
    CLI_Order_List.addCell(new sap.m.Text({text : "{price}"}));
    CLI_Order_List.addCell(new sap.m.Text({text : "{subtotal}"}));

    return Table_Order_List;

}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// var oDataCustomer = [
//     {"id": "10001", "customer" : "Caesar Ian Belza", "sales_area" : "Malabon, PH", "city" : "Cebu"},
//     {"id": "10002", "customer" : "Arturo Solito III", "sales_area" : "Malabon, PH", "city" : "Cebu"},
//     {"id": "10003", "customer" : "Joefe The Great", "sales_area" : "Malabon, PH", "city" : "Cebu"},
//     {"id": "10004", "customer" : "John Cabrera", "sales_area" : "Malabon, PH", "city" : "Cebu"}
// ];

function oDataCustomer() {

    var oServiceUrl = "http://175.139.197.17:8081/vm07/sap/opu/odata/sap/ZGW_CUSTOMER_SRV/";
    var oModel = new sap.ui.model.odata.ODataModel(oServiceUrl, true);
    var _data = [];
    oModel.read("GetCustData","","","", function(data) {

        for (var i = 0; i < data.results.length; i++) {
            var temp = data.results[i];
            _data.push({
                id: temp.Kunnr,
                customer: temp.Name1,
                sales_area: temp.ZvkorgName + "" + temp.ZvtwegName + "" + temp.ZspartName,
                city: temp.Ort01
            });
        };

        console.log(data);
        console.log(_data);

    }, function(data) {
        console.log("Error!");
    });

    return _data;

}

var oDataCustomer = oDataCustomer();

var oSalesOrder = [
    {"id": "12001", "product" : "Item 1", "price" : "10.00", "qty" : "2", "subtotal" : "20.00"},
    {"id": "12002", "product" : "Item 2", "price" : "20.00", "qty" : "2", "subtotal" : "40.00"},
    {"id": "12003", "product" : "Item 3", "price" : "30.00", "qty" : "2", "subtotal" : "60.00"},
    {"id": "12004", "product" : "Item 4", "price" : "40.00", "qty" : "2", "subtotal" : "80.00"},
];

var oMasterSO = [
    {"id" : "130001", "company" : "Apple", "status" : "Complete", "currency" : "USD", "total" : "1,201.00"},
    {"id" : "130002", "company" : "IBM", "status" : "Complete", "currency" : "USD", "total" : "1,202.00"},
    {"id" : "130003", "company" : "Google", "status" : "Complete", "currency" : "USD", "total" : "1,203.00"},
    {"id" : "130004", "company" : "Yahoo!", "status" : "Complete", "currency" : "USD", "total" : "1,204.00"},
];

var oProducts = [
    {"id": "130001", "product": "A4 Tech Mouse", "qty": "2", "price": "1,201.00", "currency": "USD", "status": "In Stock"},
    {"id": "130002", "product": "Samsung S4", "qty": "0", "price": "1,202.00", "currency": "USD", "status": "No Stock"},
    {"id": "130003", "product": "iPhone 5C", "qty": "1", "price": "1,203.00", "currency": "USD", "status": "In Stock"},
    {"id": "130004", "product": "Gaxlaxy Tab 7.0", "qty": "3", "price": "1,204.00", "currency": "USD", "status": "In Stock"},
    {"id": "130005", "product": "DELL 32 LED Monitor", "qty": "6", "price": "1,205.00", "currency": "USD", "status": "In Stock"}
];