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
  $(".text-edit").focusout(saveRules);
}

function showRule(index){
    var rule = background.getRule(index);
    var deleteButtonId = "rtext-delete-"+index;
    var html = "";
    html += "<td>";
    html += "<input id='rtext-query-"+index+"' class='text-edit' data-id='"+index+"' data-type='1' type='text' value='"+rule.query+"'/>";
    html += "</td><td>";
    html += "<input id='rtext-form-"+index+"' class='text-edit' data-id='"+index+"' data-type='2' type='text' value='"+rule.formula+"'/>";
    html += "</td><td>";
    html += "<input id='rtext-css-"+index+"' class='text-edit' data-id='"+index+"' data-type='3' type='text' value='"+rule.css+"'/>";
    html += "</td>";
    html += "<td><div id='"+deleteButtonId+"' data-id='"+index+"' class='delete-rule'></div></td>";

    $(RULES_DIV).append(html);
    $("#"+deleteButtonId).click(pressDelete);
}

function pressDelete(data){
  console.dir(data);
  background.deleteRule($("#"+data.target.id).attr("data-id"));
  showRelevantRules();
}

function saveRules(obj){
  var $target = obj.target;
  var index = $target.getAttribute("data-id");
  var query = $("#rtext-query-"+index).val();
  var form = $("#rtext-form-"+index).val();
  var css = $("#rtext-css-"+index).val();
  var rule = {query:query,formula:form,css:css};
  console.log("Saving rule"+index,rule);
  background.saveRule(index,rule);
}