function renameTitle(){
	if (document.title != getTitleFromFormula(trenamestarttitle))
	{
		trenamestarttitle = document.title;
		document.title = getTitleFromFormula(trenamestarttitle);
		setTimeout(renameTitle,1000);
	}
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
	trenamestarttitle = document.title;
	renameTitle();
}

trenameformula = "";
trenamestarttitle = "";
chrome.runtime.onMessage.addListener(callback);
console.log("renamer loaded");