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
  var rules = getRules();
  for (var i = 0; i < rules.length; i++){
  	  var r = rules[i];
	  var queryPattern = r.query.replace(/\*/g, '.*');
	  var queryRegex = new RegExp(queryPattern, 'i');

	  var result = url.match(queryRegex);
	  if (result == url){
	  	return r;
	  }
	}

  return 0;
}

function saveRule(index, rule){
	rules[index]=rule;
	console.log("Saved role"+index,rule);
}

function makeRule(query, formula, css){
	var r = {};
	r.query = query;
	r.formula = formula;
	r.css = css;
	rules.push(r);
}

function getRule(index){
	return rules[index];
}

function getRules(){
	return rules;
}

var rules = [];
makeRule("*mail*","Mail:{title}!","body{background-color:red;}");
makeRule("*git*","Git related boo!","body{background-color:red !important;}");

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForFormula);