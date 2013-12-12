// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the url of a tab changes.
function checkForPrefixes(tabId, changeInfo, tab) {
	var prefix = matchPrefix(tab.url);
	if (prefix != ""){
	    chrome.tabs.sendMessage(tabId, prefix);
	}
};

function matchPrefix(url){
  var queryList = getQueryList();
  for (var i = 0; i < queryList.length; i++){
  	  var query = queryList[i];
	  var queryPattern = query.replace(/\*/g, '.*');
	  var queryRegex = new RegExp(queryPattern, 'i');

	  var result = url.match(queryRegex);
	  if (result == url){
	  	return getPrefix(query);
	  }
	}

  return "";
}

function getQueryList(){
	return Object.keys(rules);
}

function getPrefix(query){
	return rules[query].prefix;
}

function makeRule(query, prefix){
	var r = {};
	r.prefix = prefix;
	rules[query]=r;
}

var rules = {};
makeRule("*mail*","Mail:");

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForPrefixes);
