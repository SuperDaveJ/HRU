/* NOTE: line break is different in HTML, JavaScript, and Email */

var userText = "";
var courseTitle = "Navigating Real World Challenges";
var lessonNumber = "Lesson " + getLesson();

function sendEmail() {
	userText = $("#uInput").val();
	userText = userText.replace(/\r\n/g, "%0D").replace(/\n/g, "%0D").replace(/\r/g, "%0D");
	window.location.href = "mailto:?subject=" + courseTitle + " - " + lessonNumber + " Reflection Point&body="+userText;
}
  
function printUserInput() {
	userText = $("#uInput").val();
	userText = userText.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
	
	var popWin;

	popWin = window.open("", "Print", "toolbar=yes, menubar=yes, width=600, height=600, resizable=yes" );
	
	style = "../styles/popups.css";
	
	popWin.focus();
	if (popWin != null) {
		var strTemp = "";	
		strTemp	+= "<!DOCTYPE html><html><title>Print</title>";
		strTemp	+= "<link rel='stylesheet' type='text/css' href='" + style + "' />";
		strTemp	+= "<script type='text/javascript' src='../scripts/swapImage.js'></script>";
		strTemp	+= "<meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1'>";
		strTemp	+= "<style>body {background:#fff;} #contentArea {border:none;}</style>";
		strTemp	+= "</head> <body onload='window.print()'><div id='contentArea'>";
		strTemp	+= "<h1 class='popTitle'>" + courseTitle + " - " + lessonNumber + "</h1>";
		strTemp	+= "<div id='popText'>";
		strTemp	+= "<p class='b'>Reflection Point</p>";
		strTemp	+= userText;
		strTemp	+= "</div></div>";
		strTemp	+= "<div id='close'>"
		strTemp	+= "<a href='#' onclick='javascript:self.close();' onmouseover=\"swapImage(event, '../sysimages/close_1.png')\" onmouseout=\"swapImage(event, '../sysimages/close_0.png')\" onfocus=\"swapImage(event, '../sysimages/close_1.png')\" onblur=\"swapImage(event, '../sysimages/close_0.png')\"><img src='../sysimages/close_0.png' alt='close' /></a></div>";
		strTemp	+="</body></html>";
	
		popWin.document.write(strTemp);
		popWin.document.close();
	}
}
