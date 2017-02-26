/* 
 * <*Some text*> <- bold <b></b>
 * <\Some text\> <- italic <i></i>
 * <hSome texth> <- header n <hn></hn>
 *  Some text <- normal
 *  
 */

function textProcessing(){
	var text = document.getElementById("shit").value;
	//bold
	text = text.replace(/<\*/g, "<b>");
	text = text.replace(/\*>/g, "</b>");
	//italic
	text = text.replace(/<\\/g, "<i>");
	text = text.replace(/\\>/g, "</i>");
	//header
	text = text.replace(/<h/g, "<h3>");
	text = text.replace(/h>/g, "</h3>");
	
	text = text.replace(/\n/g, "<br>");
	return text;
}

function mainShit(){
	var text = textProcessing();
	document.getElementById("blogcontent").innerHTML = text;
}
