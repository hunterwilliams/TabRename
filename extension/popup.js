var background;
var RULES_DIV = "#js_rules"

document.addEventListener('DOMContentLoaded', function () {
  $( document ).ready(function() {
    console.log("dom loaded")
    background = chrome.extension.getBackgroundPage();
    showRelevantRules();
  });
});


function showRelevantRules(){
  var queries = background.getQueryList();
  $(RULES_DIV).html("");
  $(RULES_DIV).append("<table>")
  for (var i = 0; i < queries.length; i++){
    $(RULES_DIV).append("<tr>")
    showRule(queries[i]);
    $(RULES_DIV).append("</tr>")
  }
  $(RULES_DIV).append("</table");
}

function showRule(query){
    var rule = background.getRule(query);
    var html = "";
    html += "<td>";
    html += "<input type='text' value='"+query+"'/>";
    html += "</td><td>";
    html += "<input type='text' value='"+rule.formula+"'/>";
    html += "</td><td>";
    html += "<input type='text' value='"+rule.css+"'/>";
    html += "</td>";
    $(RULES_DIV).append(html);
}