// Called when the url of a tab changes.
function checkForFormula(tabId, changeInfo, tab) {
	var formula = matchFormula(tab.url);
	if (formula != ""){
	    chrome.tabs.sendMessage(tabId, formula);
	}
};

function matchFormula(url){
  var queryList = getQueryList();
  for (var i = 0; i < queryList.length; i++){
  	  var query = queryList[i];
	  var queryPattern = query.replace(/\*/g, '.*');
	  var queryRegex = new RegExp(queryPattern, 'i');

	  var result = url.match(queryRegex);
	  if (result == url){
	  	return getFormula(query);
	  }
	}

  return "";
}

function getQueryList(){
	return Object.keys(rules);
}

function getFormula(query){
	return rules[query].formula;
}

function makeRule(query, formula){
	var r = {};
	r.formula = formula;
	rules[query]=r;
}

var rules = {};
makeRule("*","Mail:{title}");

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForFormula);