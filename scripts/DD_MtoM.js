// JavaScript Document
//C2 Technologies wma created on 09/2016
var triesUser = 0;
var triesLimit = 2;
var arrCorrect = [];
var arrUser = new Array(nObj);
var arrOriPos = new Array();

for (var i=0; i<nObj; i++) {
	arrCorrect.push(Correct.substr(i,1)); //assign correct array
	arrOriPos[i] = new Array(2);
	arrUser[i] = "";
	$("#drag" + (i+1)).css("cursor", "pointer");
	arrOriPos[i][0] = $("#drag"+(i+1)).offset().left; //drag item orinianl position
	arrOriPos[i][1] = $("#drag"+(i+1)).offset().top;
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
				  $("#drag"+drag_id).offset({top:$(this).offset().top, left:$(this).offset().left});
			  	  arrUser[target_id] = drag_id;
			  }
			  //alert(arrUser)
			}

            
     });

}); 

var judgeInteraction = function()  {
	var strFB;
	var count = 0;
	var Unanswered = true;
	
	$.each(arrUser, function(index,value){
		//alert(this)
		if (arrUser[index] == ""){
			Unanswered = false; 
			return false; 
		} 
	});

//	
	//check results
	//alert(arrUser.toString().replace(/,/g,''))
	if (!Unanswered) {
		strFB = "w0";
	} else {
		triesUser += 1;
		if (arrUser.toString().replace(/,/g,"") == Correct) { //correct
			//alert("Correct");
			triesUser = triesLimit;
			strFB = "crt";
			disableQ();
		} else {
			if (triesUser == triesLimit) { //second incorrect
			  //alert("Second Incorrect");
			  	$.each(arrCorrect, function(index,value){
				  var x=$("#target"+(index+1)).offset().left;// target item offset
				  var y=$("#target"+(index+1)).offset().top;
				  $("#drag"+value).offset({top:y, left:x}); //set correct answer
			  	});
			  	strFB = "w2";
		  		disableQ();
			} else {
//
				//alert("first incorrect")
				$.each(arrUser, function(index,value){
					var x=arrOriPos[index][0];// drag item offset
					var y=arrOriPos[index][1];
						
					if (arrCorrect[index]!=value) { // if not correct, move the incorrect item back
						arrUser[index]="";
						$("#drag"+(index+1)).offset({top:y, left:x}); //.animate({top:y, left:x}, 500);
					} else count+=1;
				});
//				
				if (count == 0) {
					strFB = "w1_1";
				 } else {
					 strFB = "w1_2";
				 }
				
			} 
		}
			
	}
		
		//alert(strFB)
	
	window.open(getPage() + "_fdbk.html?code="+strFB+"&xCorrect="+count, "Feedback");
 }
 
 function disableQ() {$(".submit").addClass("disabled")}