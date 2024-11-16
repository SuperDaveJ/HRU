/* jQuery based Multiple Answer Question - C2 XZ - May 2014 */
//needSuspendData = true;
enableNext = true;

var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I");

var judgeInteraction = function() {
	var strFB;
	var nUserCorrect = 0;
	
	ansUser = $("input:checkbox").map( function() {
		return (this[checked="checked"]) ? this.id : "";
	}).get().join("");
	if (ansUser == "") {
		strFB = "w0";
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				
				for (var i=0; i<nItems; i++) {
					$("input:checkbox[id='" + letters[i] + "']").attr("checked", false);
				}
				for (var i=0; i<ansCorrect.length; i++) {
					$("input:checkbox[id='" + ansCorrect.charAt(i) + "']").attr("checked", true);
				}
				
				strFB = "w2";
				disableQ();
			} else {
				for (var k=0; k<ansUser.length; k++) {
					uChar = ansUser.charAt(k);
					if (ansCorrect.indexOf(uChar)==-1) {
					  $("input:checkbox[id='" + uChar + "']").attr("checked", false);
					} else {
					  nUserCorrect++;
					}
				}
				if ( nUserCorrect == 0 ) {
					strFB = "w1_2";
				} else {
					strFB = "w1_2";
				}
			}
		}
	}
	window.open(getPage() + "_fdbk.html?code="+strFB+"&xCorrect="+nUserCorrect, "Feedback");

	if (triesUser === triesLimit) {
		enableNext = true;
		$(".submit").addClass("disabled")
		showNext();
	}
}

function disableQ() {
	$("input:checkbox").attr("disabled", "disabled");
    $("input").css("cursor", "default");
    $("label").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

/*
jQuery( function($) {
  for (var i=0; i<nItems; i++) {
	  myP = "<p class='rdck'><input name='ma' id='" + letters[i] + "' type='checkbox' />";
	  myP += "<label for='" + letters[i] + "'>" + letters[i] + ". " + distracters[i] + "</label></p>";
	  $("#qForm").append(myP);
  }
  
  $("input[name='ma']").css("cursor", "pointer");
});
*/