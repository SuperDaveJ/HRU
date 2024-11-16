// JavaScript Document
var triesUser = 0;
var triesLimit = 2;
var makeBold;

var judgeInteraction = function() {
	var strFB;
	var ch = ""; 
	var strTemp = "";
	var ansUser = "";
	//NOTE: id=r#c#;
	for (var i=1; i<=nRows; i++) {
		ch = $("input[name='row"+i+"']:checked").attr("id");
		ansUser += (ch == undefined) ? " " : ch.substr(ch.length-1, 1);
	}

	if ( ($.trim(ansUser)).length == 0 ) {
		//strTemp = fdbkWrong0;
		strFB = "w0";
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			//strTemp = fdbkCorrect;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var r=1; r<=nRows; r++) {
					$("input[name='row"+r+"']").attr("checked", function(i, value) {
						if ( parseInt(ansCorrect.charAt(r-1))-1 == i ) return "checked";
						//else return "";
					});
				}
				//strTemp = fdbkWrong2;
				strFB = "w2";
				disableQ();
			} else {
				for (var r=1; r<=nRows; r++) {
					$("input[name='row"+r+"']").attr("checked", function(i, value) {
						return false;
					});
				
				}
				
				for (var r=1; r<=nRows; r++) {
					$("input[name='row"+r+"']").attr("checked", function(i, value) {
							
							var col = ansCorrect.charAt(r-1)
							//alert(ansCorrect+", "+(col-1)+", "+i)
						if ( parseInt(col)-1 ==  parseInt(ansUser.charAt(r-1))-1 && (col-1)==i) return "checked"; 
						//if ( parseInt(crow.charAt(j-1)) == l+1 ) return true;
						//else return false;
					});
				}
				strFB = "w1_2"
			}
		}
	}
	window.open(getPage() + "_fdbk.html?code="+strFB, "Feedback");
}

function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    $("input:radio").css("cursor", "default");
	$(".submit").addClass("disabled");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

//jQuery( function($) {
//  $("#qForm").append("<table id='qTable' width='" + widthTable + "px' cellspacing='0' cellpadding='2' border=0></table>");
//  myTr = "<tr><th width='" + widthCol0 + "px' align='center'" + makeBold + ">" + arrColTitle[0] + "</th>";
//  for (j=1; j<=nCols; j++) {
//	  myTr += "<th width='" + arrColWidth[j-1] + "' align='center'  " + makeBold + ">" + arrColTitle[j] + "</th>";
//  }
//  myTr += "</tr>";
//  $("#qTable").append(myTr);
//  
//  for (i=1; i<=nRows; i++) {
//	  myTr = "<tr><td class='gridLeft'>" + arrRowTitle[i] + "</td>";
//	  //get rid of the punctuation at the end if there is one
//	  chrTemp = arrRowTitle[i].substr(arrRowTitle[i].length-1,1);
//	  if ( (chrTemp == ".") || (chrTemp == "!") || (chrTemp == "?") ) 
//		  strTemp = arrRowTitle[i].substring(0, arrRowTitle[i].length-1);
//	  else strTemp = arrRowTitle[i];
//	  
//	  var strTempalt = strTemp
//	  strTempalt = strTempalt.replace(/<u>/g,"");
//	  strTempalt = strTempalt.replace(/<\/u>/g,"");
//	  for (j=1; j<=nCols; j++) {
//		  myTr += "<td align='center' valign='middle' >";
//		  myTr += "<input name='row" + i + "' id='r"+i+"c"+j+"' type='radio' title='Match " + strTempalt + " with " + arrColTitle[j] + ".";
//		  myTr += "' tabindex='" + ((i-1)*nCols + j) + "' /></td>";
//	  }
//	  myTr += "</tr>";
//      $("#qTable").append(myTr);
//  }
//  
//  $("input:radio").css("cursor", "pointer");
//});