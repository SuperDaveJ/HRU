// JavaScript Document
//C2 Technologies wma created on 09/2016
var triesUser = 0;
var triesLimit = 2;
//var arrCorrect = [];
var arrUser = new Array(Correct);
var arrOriPos = new Array();

for (var i=0; i<nObj; i++) {
	//arrCorrect.push(Correct.substr(i,1)); //assign correct array
	arrOriPos[i] = new Array(2);
	$("#drag" + (i+1)).css("cursor", "pointer");
	arrOriPos[i][0] = $("#drag"+(i+1)).offset().left; //drag item orinianl position
	arrOriPos[i][1] = $("#drag"+(i+1)).offset().top;
}



for (var i=0; i<Correct; i++) {
	arrUser[i] = "";
}

 $(function () {	
	$(".drag_item").draggable({snap: ".drop_area", drag: function (event, ui){
			drag_id = parseInt($(this).attr("id").substr($(this).attr("id").length-1,1)); $(this).css("z-index", 10);},
			revert: function(dropped) {if(!dropped) $(this).css("z-index", 0); return !dropped;}
	});

	$( ".drop_area" ).droppable({

            drop: function( event, ui ) {
			  var target_id = parseInt($(this).attr("id").substr($(this).attr("id").length-1,1))-1;
			  $("#drag"+drag_id).css("z-index", "0");
			  if (arrUser[target_id]=="") {
				  $("#drag"+drag_id).draggable({revert: false });
			  	  arrUser[target_id] = drag_id;
				  $("#drag"+drag_id).offset({top:$(this).offset().top, left:$(this).offset().left});
			  }
			  //alert(arrUser)
			}

            
     });

}); 

var judgeInteraction = function()  {
	var strFB;
	var count = 0;
	var Unanswered = 0;
	
	$.each(arrUser, function(index,value){
		if (arrUser[index]==""){
			Unanswered += 1; 
		} else {
			var x=arrOriPos[value-1][0];// drag item offset
			var y=arrOriPos[value-1][1];
	
			if (value > Correct) { // if drag item is incorrect
				arrUser[index]="";
				$("#drag"+value).offset({top:y, left:x}); //.animate({top:y, left:x}, 500);
			} else count+=1;
		}
	});
	//alert(Unanswered+", "+Correct)
	
	if (Unanswered==Correct) {
		strFB = "w0";
	} else {
		triesUser += 1;
		
		if (count ==  Correct) {
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var i=1; i<= nObj; i++) {
					if (i<=Correct) {
						$("#drag"+i).offset({top:$("#target"+i).offset().top, left:$("#target"+i).offset().left});
					} else {
				   		$("#drag"+i).offset({top:arrOriPos[i-1][1], left:arrOriPos[i-1][0]});
					}
			  	}
				strFB = "w2";
		  		disableQ();
			} else {
				if (count == 0) {
					strFB = "w1_1";
				 } else {
					 strFB = "w1_2";
				 }
			}
		}	
			
	}		
	
	window.open(getPage() + "_fdbk.html?code="+strFB+"&xCorrect="+count, "Feedback");
 }
 
 function disableQ() {$(".submit").addClass("disabled")}