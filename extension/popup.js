var background;
var RULES_DIV = "#js_rules"
var ADD_RULE_BUTTON = "#j-add-rule";
var RULES_TABLE = "#js-rules-table";

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
  $(RULES_DIV).append("<table id='js-rules-table'>")
  for (var i = 0; i < rules.length; i++){
    $(RULES_DIV).append("<tr>")
    showRule(i);
    $(RULES_DIV).append("</tr>")
  }
  $(RULES_DIV).append("</table");
  $(ADD_RULE_BUTTON).click(pressAdd);
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

function pressAdd(){
  var html = "";
  var index = background.getRules().length;
  var saveButtonId = "rtext-save-"+index;
  html += "<td>";
    html += "<input id='rtext-query-"+index+"' class='text-edit' data-id='"+index+"' data-type='1' type='text' value='new rule'/>";
    html += "</td><td>";
    html += "<input id='rtext-form-"+index+"' class='text-edit' data-id='"+index+"' data-type='2' type='text'/>";
    html += "</td><td>";
    html += "<input id='rtext-css-"+index+"' class='text-edit' data-id='"+index+"' data-type='3' type='text'/>";
    html += "</td>";
    html += "<td><div id='"+saveButtonId+"' data-id='"+index+"' class='save-rule'></td>";
  $(RULES_TABLE).append(html);
  $("#"+saveButtonId).click(pressSave);
}

function pressSave(data){
  console.dir(data);
  var index = $("#"+data.target.id).attr("data-id");
  var rule = getRuleByIndex(index);
  background.addRule(rule);
  background.writeRules();
  showRelevantRules();
}

function pressDelete(data){
  console.dir(data);
  background.deleteRule($("#"+data.target.id).attr("data-id"));
  showRelevantRules();
}

function saveRules(obj){
  var $target = obj.target;
  var index = $target.getAttribute("data-id");
  var rule = getRuleByIndex(index);
  console.log("Saving rule"+index,rule);
  background.saveRule(index,rule);
}

function getRuleByIndex(index){
  var q = getQueryForRule(index);
  var f = getFormulaForRule(index);
  var c = getCssForRule(index);
  return {query:q,formula:f,css:c};
}

function getQueryForRule(index){
  return $("#rtext-query-"+index).val();
}

function getFormulaForRule(index){
  return $("#rtext-form-"+index).val();
}

function getCssForRule(index){
  return $("#rtext-css-"+index).val();
}