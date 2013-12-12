// Called when the url of a tab changes.
function checkForFormula(tabId, changeInfo, tab) {
	var rule = matchFormula(tab.url);
	if (rule != 0){
	    chrome.tabs.sendMessage(tabId, rule.formula);
	    if (rule.css != ""){
		    chrome.tabs.insertCSS(tabId,{
	    		code: rule.css
		    });
		}
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
	  	return getRule(query);
	  }
	}

  return 0;
}

function getQueryList(){
	return Object.keys(rules);
}

function getRule(query){
	return rules[query];
}

function makeRule(query, formula, css){
	var r = {};
	r.formula = formula;
	r.css = css;
	rules[query]=r;
}

function makeRule(query, formula){
	var r = {};
	r.formula = formula;
	r.css = "";
	rules[query]=r;
}

function getRules(){
	return rules;
}

var rules = {};
makeRule("*mail*","Mail:{title}!","body{background-color:red;}");
makeRule("*git*","Git related boo!");

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForFormula);