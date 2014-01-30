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

function deleteRule(index){
	rules.splice(index,1);
	writeRules();
}
function saveRule(index, rule){
	rules[index]=rule;
	console.log("Saved role"+index,rule);
	writeRules();
}

function writeRules(){
	chrome.storage.sync.set({'rules': rules}, function(data) {
    	if (typeof runtime !== "undefined" && typeof runtime.lastError !== "undefined"){
    		console.log("Error saving");
    	}
    	else
    	{
    		console.log("Save success");
    	}
  	});
}

function loadRules(){
	chrome.storage.sync.get("rules", function(data){
		if (data != null && data.rules != null){
			rules = data.rules;
		}
	});
}
function addRule(rule){
	if (typeof rule != "undefined" && typeof rule.query != "undefined"
		  && typeof rule.formula != "undefined" && typeof rule.css != "undefined"){
		return rules.push(rule);
	}
	else
	{
		return -1;
	}
}
function makeRule(query, formula, css){
	var r = {};
	r.query = query;
	r.formula = formula;
	r.css = css;
	addRule(r);
}

function getRule(index){
	return rules[index];
}

function getRules(){
	return rules;
}

var rules = [];
loadRules();
/*makeRule("*mail*","Mail:{title}!","body{background-color:red;}");
makeRule("*git*","Git related boo!","body{background-color:red !important;}");
*/
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForFormula);

