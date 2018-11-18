function SetButtonVisible() {

	var rolename;
	var count = 0;
	var currentUserRoles = Xrm.Page.context.getUserRoles();
	for (var i = 0; i < currentUserRoles.length; i++) 
	{
		rolename = getUserRoleName(currentUserRoles[i]); 
		
		if ((rolename == "Системный администратор") || (rolename == "Настройщик системы"))	{
			count = count + 1; 
		}

	}
	
	if (count >= 1) {
		Xrm.Page.getControl("WebResource_sampleHTMLWebResource").setVisible(true);
	}
	else {
		Xrm.Page.getControl("WebResource_sampleHTMLWebResource").setVisible(false);
	}
}

function getUserRoleName(Roleid) {

	var name;
	var req = new XMLHttpRequest();
	req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/roles?$select=name&$filter=roleid eq " + Roleid, false);
	req.setRequestHeader("OData-MaxVersion", "4.0");
	req.setRequestHeader("OData-Version", "4.0");
	req.setRequestHeader("Accept", "application/json");
	req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
	req.onreadystatechange = function () {
		if (this.readyState === 4) {
			req.onreadystatechange = null;
			if (this.status === 200) {
				var results = JSON.parse(this.response);
				for (var i = 0; i < results.value.length; i++) {
					name = results.value[i]["name"];
				}
			} else {
				Xrm.Utility.alertDialog(this.statusText);
			}
		}
	};
	
	req.send();
	return name;
}