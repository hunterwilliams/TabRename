function renameTitle(){
	if (document.title !== trenamenewtitle || document.title.indexOf(getPrefix()) != 0)
	{
		trenamenewtitle = getPrefix()+document.title;
		document.title = trenamenewtitle;
		setTimeout(renameTitle,1000);
	}
}

function getPrefix(){
	return trenameprefix;
}


function callback(message,sender,sendResponse){
	console.log("set prefix:"+message);
	trenameprefix = message;
	renameTitle();
}

trenameprefix = "";
trenamenewtitle = "";
chrome.runtime.onMessage.addListener(callback);
console.log("renamer loaded");