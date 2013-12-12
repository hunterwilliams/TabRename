function renameTitle(){
	if (document.title != getTitleFromFormula(document.title))
	{
		document.title = getTitleFromFormula(document.title);
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
	renameTitle();
}

trenameformula = "";
trenamenewtitle = "";
chrome.runtime.onMessage.addListener(callback);
console.log("renamer loaded");