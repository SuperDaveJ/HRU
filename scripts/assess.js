// JavaScript Document
	var type = "mc";
	totalPages = 5;
	var strTest = getQueryValue('testP');
	enableNext = false;
	enableBack = false;
	//$(".back").hide();
	

	arrTemp = new Array();
	arrTemp = strTest.split("!");
	
	var t_qOrder = arrTemp[0];
	
	pgNumber = parseInt(arrTemp[1]) + 1;
	
	var group = arrTemp[2];
	var testType = arrTemp[3];
	var T_score = parseInt(arrTemp[4]);
	
	arrTemp = new Array();
	arrTemp = t_qOrder.split(",");
	
	var iTemp = arrTemp[pgNumber];
	
	strTest = t_qOrder+"!"+pgNumber+"!"+group+"!"+testType;
	var strTemp = (iTemp>9) ? iTemp : "0"+iTemp;
	//alert(testType);
	if (testType=="post") {
		$(".l-title").html("Post-Test");
	} else {
		$(".l-title").html("Pre-Test");
	}
	$(".courseTitle").html("Staffing Programs Overview");
	if (pgNumber<5) $(".pageTitle").html("Question "+ (pgNumber-1))

/************************* Query Functions ******************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}
/*********************** End of Query Functions **********************************/

function judgeInteraction() {

	var ansUser = "";
	if (type=="ma")	{
	 	ansUser= $("input:checkbox").map( function() {
			return (this[checked="checked"]) ? this.id : "";
		}).get().join("");
	}else{
		ansUser = $("input:radio:checked").attr("id");
	}

	if (ansUser == "" || ansUser == undefined) {
		alert("\nYou need to answer the question to continue.");

	} else {
		if (ansUser == ansCorrect) {
			T_score += 1;
		}
		
	
		if (pgNumber > (totalPages-2)) {
			nextURL = testType+"_end.html?testP="
		} else {
			nextURL = "q_" + group +"_"+strTemp + ".html?testP=" 
		}
		nextURL += strTest+"!"+T_score;
		//alert(T_score)

		//window.location.replace(nextURL);

		// window.location.href=nextURL;
		$(".submit").hide();
		showNext();		
		//$(".next").attr("href", nextURL);
	}
	
}

function showKey(e) {
  var evtobj = window.event ? event : e;
  var code = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
  var keyPressed = String.fromCharCode(code);
  if (code == 75) { //K key
	//alert("Question No. = " + (parent.iQ) + "\r\n Correct Answer = " + vCorrectAnswer);
  }
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");