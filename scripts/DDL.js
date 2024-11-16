/* jQuery based Drop-Down list Question - C2 XZ - Aug. 2015 */
enableNext = true;
var triesUser = 0;
var triesLimit = 2;

var fdbkIncorrect0  = "<p>Please answer the question.</p>"

var judgeInteraction = function () {
	var strFB;
    var nUnanswered = 0;
    var nUserCorrect = nItems;
    var ansUser = "";

    arrUA = new Array(nItems + 1);
    for (var i = 1; i <= nItems; ++i) {
        ddlTemp = document.getElementById("list" + i);
        arrUA[i - 1] = ddlTemp.options[ddlTemp.selectedIndex].value;
        if (arrUA[i - 1] != ansCorrect.substr(i - 1, 1)) {
            if (triesUser == 0) {
                ddlTemp.options[0].selected = true;
            }
            nUserCorrect -= 1;
        }
        if (arrUA[i - 1] == "0") {
            nUnanswered += 1;
        }
    }
    ansUser = arrUA.join("");
    //alert("ansUser = " + ansUser);

    if (nUnanswered == nItems) {
        strFB = "w0";
    } else {
        triesUser += 1;
        if (ansUser == ansCorrect) {
            triesUser = triesLimit;
            strFB = "crt";
            disableQ();
        } else {
            if (triesUser == triesLimit) {
                for (var i = 1; i <= nItems; ++i) {
                    iTemp = parseInt(ansCorrect.substr(i - 1, 1));
                    ddlTemp = document.getElementById("list" + i);
                    ddlTemp.options[iTemp].selected = true;
                }

                strFB = "w2";
                disableQ();
            } else {
                if (nUserCorrect == 0) {
                    strFB = "w1_1";
                } else {
                    strFB = "w1_2";
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

function disableQ() {
    for (var i = 1; i <= nItems; ++i) {
        ddlTemp = document.getElementById("list" + i);
        ddlTemp.disabled = true;
    }
}

/********** disable context menu *************/
var message="This function is disabled!"; 
//document.oncontextmenu = new Function("alert(message); return false;");
