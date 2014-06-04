
function create_content() {

    var oApp = new sap.m.App({});
    var oShell = new sap.m.Shell({
        showLogout : false,
        backgroundImage: "", 
        backgroundOpacity: 0.7
    });

    oShell.setAppWidthLimited(false);
    
    var oPageCustomer = page_customer(oApp);
    var oPageCustomerDetail = page_customer_details(oApp);

    oApp.addPage(oPageCustomer);
    oApp.addPage(oPageCustomerDetail);
    oShell.setApp(oApp);
    oShell.placeAt("content");
    
}

function page_customer(_app) {

    var oBarHeaderMiddle = new sap.m.Bar({
        contentLeft: [ new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"}) ],
        contentRight: [ new sap.m.Button("", { icon: "sap-icon://home" }) ],
        contentMiddle: [ new sap.m.Label({text: "Select Customer"}) ]
    })

    var oSearchField = new sap.m.SearchField({ 
        layoutData: new sap.m.FlexItemData({growFactor: 2}),
        placeholder: "Search..." 
    });
    var oSearchSelect = new sap.m.Select({
        type: sap.m.SelectType.Default,
        items: [
            new sap.ui.core.Item({ text: "Customer ID", key: ""}),
            new sap.ui.core.Item({ text: "Customer Name", key: ""}),
            new sap.ui.core.Item({ text: "Customer Area", key: ""}),
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

    var oPage = new sap.m.Page({
        customHeader: [ oBarHeaderMiddle ],
        content: [ oSearchBar, new sap.m.ObjectHeader({}), oTable ]
    });

    oPage.setCustomHeader(oBarHeaderMiddle);

    return oPage;
}

function page_customer_details(_app) {

    var oBarHeaderMiddle = new sap.m.Bar({
        contentLeft: [ new sap.m.Image({src: "image/logo/logo.png", width: "100px", height: "37px"}) ],
        contentRight: [ new sap.m.Button("", { icon: "sap-icon://home" }) ],
        contentMiddle: [ new sap.m.Label({text: "Customer"}) ]
    })

    var oBarFooter = new sap.m.Bar({
        contentLeft: [ new sap.m.Button({icon: "sap-icon://nav-back", press: function (oEvt) { _app.back(); } }) ],
    })

    oObjectHeader = new sap.m.ObjectHeader({
        title: "",
        number: "",
        numberUnit: "ID",
    })

    var oIconTabBar = new sap.m.IconTabBar({
        items: [ 
            new sap.m.IconTabFilter({icon: "sap-icon://cart", text: "Order", count: "0"}),
            new sap.m.IconTabFilter({icon: "sap-icon://hint", text: "Info", count: "0"}),
            new sap.m.IconTabFilter({icon: "sap-icon://cart", text: "Ship To", count: "0"})
        ]
    });

    var oPage = new sap.m.Page("customer_details",{
        content: [ oObjectHeader, oIconTabBar ]
    });

    oPage.setCustomHeader(oBarHeaderMiddle);
    oPage.setFooter(oBarFooter);


    return oPage;

}

function createEntitlementTable(_count_data, _app) {

    Table_entitlements = sap.m.Table("Table_entitlements", {
        showNoData:false, 
        visible: true,
        headerText: [ _count_data ]
    });
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Id",textAlign:"Center"}) , hAlign: "Center", visible: false}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Customer",textAlign:"Center"}) , hAlign: "Center"}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"Sales Area",textAlign:"Center"}) , hAlign: "Center"}));
    Table_entitlements.addColumn(new sap.m.Column({header: new sap.m.Text({text:"City",textAlign:"Center"}),hAlign: "Center"}));

    CLI_customers = new sap.m.ColumnListItem("CLI_customers", {type:'Inactive', type: "Navigation"});
    CLI_customers.addCell(new sap.m.ObjectIdentifier({title: "{id}", text : "{id}"}));
    CLI_customers.addCell(new sap.m.ObjectIdentifier({title: "{customer}", text : "{customer}"}));
    CLI_customers.addCell(new sap.m.ObjectIdentifier({title: "{sales_area}", text : "{sales_area}"}));
    CLI_customers.addCell(new sap.m.ObjectIdentifier({title: "{city}", text : "{city}"}));
    CLI_customers.attachPress(function(oEvt) {

        //alert(oEvt.getSource().getCells()[0].getText());
        //alert(oEvt.getSource().getBindingContext().getProperty("id"));
        // alert(oEvt.getSource());

        var _customer_name = oEvt.getSource().getBindingContext().getProperty("customer");
        var _customer_id = oEvt.getSource().getBindingContext().getProperty("id")

        oObjectHeader.setTitle(_customer_name);
        oObjectHeader.setNumber(_customer_id);
        _app.to("customer_details");

    });

    return Table_entitlements;

}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

var oDataCustomer = [
    {"id": "10001", "customer" : "Caesar Ian Belza", "sales_area" : "Malabon, PH", "city" : "Cebu"},
    {"id": "10002", "customer" : "Arturo Solito III", "sales_area" : "Malabon, PH", "city" : "Cebu"},
    {"id": "10003", "customer" : "Joefe The Great", "sales_area" : "Malabon, PH", "city" : "Cebu"},
    {"id": "10004", "customer" : "John Cabrera", "sales_area" : "Malabon, PH", "city" : "Cebu"}
];