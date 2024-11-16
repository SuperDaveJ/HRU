enableNext = true;

/***** Use MA_fdbk for this interaction *****/

var triesLimit = 2;
var triesUser = 0;
var nUserCorrect = 0;

var fdbkIncorrect0  = "<p>Please answer the question.</p>"

function showCorrect() {
	var form = document.form1;
	for (i = 0; i < form.Quiz.length; i++) {
		form.elements[i].value = correctAnswer.charAt(i);
	}
}

function judgeInteraction() {
	var strFB = "";	
	var form = document.form1
	var userAnswer = ""
	
	//$("#submit").css("display", "none");
	//checks to see if the question has been attempted or not
	for (var i=0; i < form.Quiz.length; i++)  {
		userAnswer = userAnswer + form.Quiz[i].value;
	}		
	if (userAnswer.length != correctAnswer.length) {
		strFB = "w0";
	} else {
		triesUser = triesUser + 1;
		if (userAnswer == correctAnswer) { 
			//Correct
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				//Last Incorrect
				showCorrect();
				strFB = "w2";
				disableQ();
			} else {
				//First incorrect
				nIncorrect = 0;
				for (i = 0; i < form.Quiz.length; i++) {
					if (userAnswer.charAt(i) != correctAnswer.charAt(i)) {	
						//uncheck the incorrect ones
						form.Quiz[i].value = '';
						nIncorrect += 1;
					}
				}
				
				nUserCorrect = correctAnswer.length - nIncorrect;
				if (nIncorrect != correctAnswer.length) {
					strFB = "w1_2";
				} else {
					strFB = "w1_1";
				}
			}
		}
	}
	window.open(getPage() + "_fdbk.html?code="+strFB+"&xCorrect="+nUserCorrect, "Feedback");

	if (triesUser === triesLimit) {
		enableNext = true;
		$(".submit").addClass("disabled");
		showNext();
	}
}

function enableQ() {
	for (var i=0; i < document.form1.Quiz.length; i++) {					
		 document.form1.Quiz[i].disabled = false;
	}
}

function disableQ() {
	for (var i=0; i < document.form1.Quiz.length; i++) {					
		 document.form1.Quiz[i].disabled = "disabled";
	}
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");