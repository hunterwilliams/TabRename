function renameTitle(){
	var currentTitle = document.title;
	console.log("looking at tab");
	if (originalTitle == "" || currentTitle != getTitleFromFormula(originalTitle)){
		console.log("renamed tab");
		originalTitle = currentTitle;
		document.title = getTitleFromFormula(currentTitle);
		checkTitleAgain(1);
	}
	else
	{
		console.log("done");
	}
}

function checkTitleAgain(seconds){
	setTimeout(renameTitle,1000*seconds);
}

function getTitleFromFormula(title){
	return trenameformula.replace("{title}",title);
}

function getPrefix(){
	return trenameformula;
}

function callback(message,sender,sendResponse){
	console.log("set prefix:"+message);
	trenameformula = message;
	renameTitle();
}

trenameformula = "";
originalTitle = "";
chrome.runtime.onMessage.addListener(callback);
console.log("renamer loaded");