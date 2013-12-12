var background;
var RULES_DIV = "js_rules"

document.addEventListener('DOMContentLoaded', function () {
  console.log("dom loaded")
  background = chrome.extension.getBackgroundPage();
  showRelevantRules();
});


function showRelevantRules(){
  var queries = background.getQueryList();
  for (var i = 0; i < queries.length; i++){
    showRule(queries[i]);
  }
}

function showRule(query){
    var rule = background.getRule(query);
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.setAttribute("value",query);
    document.getElementById(RULES_DIV).appendChild(textbox);
    var textbox2 = document.createElement('input');
    textbox2.type = 'text';
    textbox2.setAttribute("value",rule.formula);
    document.getElementById(RULES_DIV).appendChild(textbox2);
    var textbox3 = document.createElement('input');
    textbox3.type = 'text';
    textbox3.setAttribute("value",rule.css);
    document.getElementById(RULES_DIV).appendChild(textbox3);
}