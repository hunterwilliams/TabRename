var background;
var RULES_DIV = "#js_rules";
var ADD_RULE_BUTTON = "#j-add-rule";
var RULES_TABLE_BODY = "#js-rules-table-body";
var DELETE_BUTTON_CLASS = ".delete";

document.addEventListener('DOMContentLoaded', function () {
  $( document ).ready(function() {
    background = chrome.extension.getBackgroundPage();
    showRelevantRules();
  });
});


function showRelevantRules(){
  var rules = background.getRules();
  var html = "<tr><th><span id='j-add-rule' class='button plus'></span></th><th>Matches</th><th>Title</th><th>CSS</th></tr>";
  for (var i = 0; i < rules.length; i++){
    html+= showRule(i);
  }
  $(RULES_TABLE_BODY).html(html);
  $(DELETE_BUTTON_CLASS).click(pressDelete);
  $(ADD_RULE_BUTTON).click(pressAdd);
  $(".text-edit").focusout(saveRules);
  $(RULES_TABLE_BODY).removeClass("add-rule");

}

function showRule(index){
    var rule = background.getRule(index);
    var deleteButtonId = "rtext-delete-"+index;
    var html = "<tr>";
    html += "<td><div id='"+deleteButtonId+"' data-id='"+index+"' class='delete button'></div></td>";
    html += "<td>";
    html += "<input id='rtext-query-"+index+"' class='text-edit' data-id='"+index+"' data-type='1' type='text' value='"+rule.query+"'/>";
    html += "</td><td>";
    html += "<input id='rtext-form-"+index+"' class='text-edit' data-id='"+index+"' data-type='2' type='text' value='"+rule.formula+"'/>";
    html += "</td><td>";
    html += "<input id='rtext-css-"+index+"' class='text-edit' data-id='"+index+"' data-type='3' type='text' value='"+rule.css+"'/>";
    html += "</td></tr>";

    return html;
}

function pressAdd(){
  var html = "";
  var index = background.getRules().length;
  var saveButtonId = "rtext-save-"+index;
    html += "<tr><td><div id='"+saveButtonId+"' data-id='"+index+"' class='save button'></td>";
    html += "<td>";
    html += "<input id='rtext-query-"+index+"' class='text-edit' data-id='"+index+"' data-type='1' type='text' value='new rule'/>";
    html += "</td><td>";
    html += "<input id='rtext-form-"+index+"' class='text-edit' data-id='"+index+"' data-type='2' type='text'/>";
    html += "</td><td>";
    html += "<input id='rtext-css-"+index+"' class='text-edit' data-id='"+index+"' data-type='3' type='text'/>";
    html += "</td></tr>";
  $(RULES_TABLE_BODY).append(html);
  $("#"+saveButtonId).click(pressSave);
  $(RULES_TABLE_BODY).addClass("add-rule");

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
  var ruleId = $("#"+data.target.id).attr("data-id");
  console.log("deleting rule:"+ruleId);
  background.deleteRule(ruleId);
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