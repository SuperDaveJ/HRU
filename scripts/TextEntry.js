/* jQuery based Text Entry - C2 XZ - August 2015 */
//needSuspendData = true;
enableNext = true;
 
var triesUser = 0;
var triesLimit = 2;

var judgeInteraction = function() {
	var strFB;

	ansCorrect = ansCorrect.toLowerCase();
	ansCorrect2 = ansCorrect2.toLowerCase();
	ansCorrect3 = ansCorrect3.toLowerCase();
	ansUser = $("#ua").val();
	ansUser = $.trim(ansUser).toLowerCase();

	if (ansUser == "" || ansUser == undefined) {
		strFB = "w0";
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect || ansUser == ansCorrect2 || ansUser == ansCorrect3) {
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				strFB = "w2";
				disableQ();
			} else {
				strFB = "w1";
			}
		}
	}
	window.open(getPage() + "_fdbk.html?code="+strFB, "Feedback");

	if (triesUser === triesLimit) {
		enableNext = true;
		$(".submit").addClass("disabled")
		showNext();
	}
}

function enableQ() {
	$("input:text").attr("disabled", false);
    $("input[name='ua']").css("cursor", "pointer");
}

function disableQ() {
	$("input:text").attr("disabled", "disabled");
    $("input").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");
