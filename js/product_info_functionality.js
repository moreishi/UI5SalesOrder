/*
// ================================================================================
// Press Event functions
// ================================================================================
*/
	function event_pressAndTap() {
		
	// ObjectListItem of Product	
		OLI_prodInfo.attachTap(function (oEvent) {
			//alert(oEvent.getSource().getAttributes());
			OH_prodInfo.setTitle(oEvent.getSource().getTitle());
			OH_prodInfo.setNumber(oEvent.getSource().getNumber());
			OH_prodInfo.setNumberUnit("MYR");
			OH_prodInfo_count.setText(oEvent.getSource().getNumberUnit());
			OH_prodInfo_count_ID.setText("Product No: " + oEvent.getSource().getAttributes()[1].getText()); 
		});
	
	}



/*
// ================================================================================
// Bind List using ObjectListItem template
// ================================================================================
*/
	function bind_prodInfoList() {
		
		sample_prodInfo = [
			{"prod_name" : "Twisted Pair Cable", "prod_price" : "0.00", "prod_unit": "per PC", "prod_id" : "100001"},
			{"prod_name" : "Radio Business", "prod_price" : "1225.00", "prod_unit": "per PC", "prod_id" : "100002"},
			{"prod_name" : "Motorradheim", "prod_price" : "2225.00", "prod_unit": "per PC", "prod_id" : "100003"}
		]
		
		// bind updated array to list
		BindData(sample_prodInfo, List_prodInfo, "records",  "");
		List_prodInfo.bindAggregation("items", {
				path: "/records",
				template: OLI_prodInfo
		});
		
		// set the value of the objectheader depending on the first item in the product objectlistitem
			OH_prodInfo.setTitle(sample_prodInfo[0].prod_name);
			OH_prodInfo.setNumber(sample_prodInfo[0].prod_price);
			OH_prodInfo.setNumberUnit("MYR");
			OH_prodInfo_count.setText(sample_prodInfo[0].prod_unit);
			OH_prodInfo_count_ID.setText("Product No: " + sample_prodInfo[0].prod_id); 		
		
	}