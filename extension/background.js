// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the url of a tab changes.
function seeIfFollowsRules(tabId, changeInfo, tab) {
	if (tab.url)

    chrome.tabs.sendMessage(tabId, "Title:");
};

function getPrefix(url){
  for (q : queries)
  var queryPattern = query.replace(/\*/g, '.*');
  var queryRegex = new RegExp(queryPattern, 'i');

  var result = str.match(queryRegex);
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(seeIfFollowsRules);
