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
  var rules = background.getRules();
  $(RULES_DIV).html("");
  $(RULES_DIV).append("<table>")
  for (var i = 0; i < rules.length; i++){
    $(RULES_DIV).append("<tr>")
    showRule(i);
    $(RULES_DIV).append("</tr>")
  }
  $(RULES_DIV).append("</table");
}

function showRule(index){
    var rule = background.getRule(index);
    var html = "";
    html += "<td>";
    html += "<input class='text-edit' data-id='"+index+"' type='text' value='"+rule.query+"'/>";
    html += "</td><td>";
    html += "<input class='text-edit' data-id='"+index+"' type='text' value='"+rule.formula+"'/>";
    html += "</td><td>";
    html += "<input class='text-edit' data-id='"+index+"' type='text' value='"+rule.css+"'/>";
    html += "</td>";
    $(RULES_DIV).append(html);
}