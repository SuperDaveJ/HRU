/* jQuery based Multiple Choice Question with distractor specific feedback
 * C2 XZ - May 2014
 */
//needSuspendData = true;
enableNext = true;
 
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

var judgeInteraction = function() {
	var strFB;
	ansUser = $("input:radio:checked").attr("id");
	if (ansUser == undefined) {
		strFB = "w0";
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				/*
				$("input:radio").attr("checked", function(i, value) {
					if ( i == (ansCorrect.charCodeAt(0)-65) ) return "checked";
				});
				*/
				strFB = "w2";
				disableQ();
			} else {
				$("input:radio").attr("checked", false);
				strFB = "w1_" + (ansUser.charCodeAt(0)-64);
			}
		}
	}
	window.open(getPage() + "_fdbk.html?code="+strFB, "Feedback");

	if (triesUser === triesLimit) {
		enableNext = true;
		$(".submit").addClass("disabled");
		showNext();
	}
}

function enableQ() {
	$("input:radio").attr("disabled", false);
    $("input[name='mc']").css("cursor", "pointer");
}

function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    $("input").css("cursor", "default");
    $("label").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

/*
jQuery( function($) {
  for (var i=0; i<nItems; i++) {
	  myP = "<p class='rdck'><input name='mc' id='" + letters[i] + "' type='radio' />";
	  myP += "<label for='" + letters[i] + "'>" + letters[i] + ". " + distracters[i] + "</label></p>";
	  $("#qForm").append(myP);
  }
  
  $("input[name='mc']").css("cursor", "pointer");
});
*/