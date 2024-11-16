// JavaScript Document
//C2 Technologies wma created on 09/2016
var triesUser = 0;
var triesLimit = 2;
//var arrCorrect = [];
var arrUser = new Array(Correct);
var arrOriPos = new Array();
var count = 0;

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

function openpopup(){
	window.open(getPage() + "_fdbk.html?code="+strFB+"&xCorrect="+count, "Feedback")
}

 $(function () {	
	$(".drag_item").draggable({drag: function (event, ui){ $(this).css("z-index", 10); drag_id = parseInt($(this).attr("id").substr($(this).attr("id").length-1,1));}, revert: function(dropped) {if(!dropped) $(this).css("z-index", 0); return !dropped; }
	});

  	$( ".drop_area" ).droppable({
			  
            drop: function( event, ui ) {
			  var target_id = parseInt($(this).attr("id").substr($(this).attr("id").length-1,1));
			  $("#drag"+drag_id).css("z-index", 0);
			  if (target_id==drag_id) {
				  $("#drag"+drag_id).draggable({revert: false });
				  //$("#drag"+drag_id).css({opacity: .3});
				  $("#drag"+drag_id).fadeOut(500)
			  	  strFB = "crt";
				  disableQ();
				  setTimeout(openpopup,1000);
				  
			  } else {
				$("#drag"+drag_id).css("z-index", 0);
			  	$("#drag"+drag_id).draggable({revert: true });
				 
			  }
			}

            
     });

}); 



 
 function disableQ() {$(".submit").addClass("disabled");  }