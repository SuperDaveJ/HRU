/*************** Course CONTENT functions ********************/

/***** Initialize variables *****/
var blnLastPage = false;
var enableNext = true;
var enableBack = true;
var hasAudio = false;
var autoPlay = false;
var hasSwitchableImg = false;
var itemsViewed = "0";
var needSuspendData = false;
var infoPanelVisible = false;

/**************** Course Comment Tool ****************/
var vpPath = "http://prod.c2ti.com/CommentTool/";	//path to comment tool

function addComment() {
	comWin = window.open(vpPath + "addComment.asp?uID=NA&cID=HR002&mID=1&lID="+getLesson() + "&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + "reviewComments.asp?uID=NA&cID=HR002&mID=1&lID="+getLesson() + "&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}
/**************** End of Comment Tool ****************/

function exitConfirm(){
	if (confirm("Do you wish to exit the course? Your progress will be saved.")==true) {
		exitCourse();
	}
}

function showNext() {
	enableNext = true;
	$(".next").show();
	$(".next").removeClass("disabled");
	$(".next").attr({tabindex: "", href: nextURL});
}

function hideNext() {
	enableNext = false;
	$(".next").hide();//css("visibility", "hidden");
	//(".next").addClass("disabled");
	//$(".next").attr({ tabindex: "-1", href: "javascript: return false;" });
}

function hideBack() {
	enableBack = false;
	$(".back").hide();
	//$(".back").addClass("disabled");
	//$(".back").attr({ tabindex: "-1", href: "javascript: return false;" });
}

function checkStatus(iTerm) {
    //iTerm start from 1.  itemsViewed needs to be defined in content page.
    itemsViewed = itemsViewed.substring(0, iTerm - 1) + "1" + itemsViewed.substring(iTerm);
    if (itemsViewed.indexOf('0') == -1) {
        showNext();
    }
}

/***** Image link functions *****/
function swapImage( evt, imgURL ) {
	var e = evt || window.evt;
	var node;
	if ( e.target ) {
		node = e.target;
	} else {
		node = e.srcElement;
	}
    if (node) {
	    if (node.tagName == "IMG") {
			node.src = imgURL;
		} else {
			node.getElementsByTagName("img")[0].src = imgURL;
		}
	}
	return false;
}

/*
function offHighlight( id, imgId, imgType ) {
	
	//alert(itemsViewed)

	if (itemsViewed.substr(id-1,1) == "1") {
		$("#"+imgId).attr("src", "images/" +imgId + "_2." + imgType); 
	} else {
		$("#"+imgId).attr("src", "images/" +imgId + "_0." + imgType); 
	}
}
function onHighlight( imgId, imgType ) {
	$("#"+imgId).attr("src", "images/" +imgId + "_2." + imgType); 
}
function setVisited( id, imgId, imgType ) {
	checkStatus( id );
	$("#"+imgId).attr("src", "images/" +imgId + "_2." + imgType); 
}
*/
function offHighlight( id, imgId, imgType ) {
	
	//alert(itemsViewed)

	if (itemsViewed.substr(id-1,1) == "1") {
		$("#"+imgId).attr("src", "images/" +imgId + "_selected." + imgType); 
	} else {
		$("#"+imgId).attr("src", "images/" +imgId + "." + imgType); 
	}
}
function onHighlight( imgId, imgType ) {
	$("#"+imgId).attr("src", "images/" +imgId + "_selected." + imgType); 
}
function setVisited( id, imgId, imgType ) {
	checkStatus( id );
	$("#"+imgId).attr("src", "images/" +imgId + "_selected." + imgType); 
}

/***** end of Image link functions *****/

/***** code used to fix old version of IE's image problem, need imgSizer.js *****/
function addLoadEvent(func) {
	var oldonload = window.onload;

	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

function togNav(){
		//alert();
		//$(".nav").slideToggle("fast");
		if (!infoPanelVisible){
			$(".navSlide").animate({right: "245"}, 1000);
			$( ".nav" ).show().animate({right: "0"}, 1000);
			infoPanelVisible = true;	
		}else {		
			$( ".navSlide" ).animate({right: "0"}, 1000);
			$( ".nav" ).animate({right: "-245"}, 1000);
			setTimeout(function() {
    			$( ".nav" ).hide();
			}, 1000);
			
			infoPanelVisible = false;	
		}

	}
/*********** Enable Next button - disabled for interactions ****************/
/*
document.onkeydown = function(e) {
  var evtobj = window.event ? event : e;
  var code = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
  var keyPressed = String.fromCharCode(code);
  if (code == 39) { //right arrow key
	showNext();
  }
}
*/

if ( inLMS ) {
	window.onunload = callExitCourse;
}

$(document).ready(function () {


	addLoadEvent(function () {
        imgSizer.collate();
    });
	
	$("img").attr("title", function() { return this.alt; } );

	if ( needSuspendData || blnLastPage ) {
		initializePage();
	}
	

	$(".pgNumber").html( "Page " + pgNumber + " of " + totalPages );
	$(".prompt").html( strPrompt );
	
	if (!enableNext) $(".next").addClass("disabled");
	if (!enableBack)$(".back").addClass("disabled");
	

	
    //alert("page "+nextURL)
	
	$(".menu").attr("href", menuURL);
    $(".menu").on("click", toMenu);
	
	if (nextURL!="") $(".next").attr("href", nextURL);
	if (backURL!="") $(".back").attr("href", backURL);
	
	
	/* I don't remember why this block of code
	if (blnLastPage && (getLesson() == nLessons) ) {
		//Exit the course and open the link in a new window.
		$(".next").attr("target", "_blank");
		//$(".next").on("click", exitCourse);
		$(".next").click( function() {
			intendedClose = true;
			exitCourse();
		});
	}
	*/
	
	/* HTML 5 Video Captions - Turn Off by Default */
    var video = document.querySelector('#myVideo'); // get the video element
	if (video != null && typeof video != "undefined") {
		var tracks = video.textTracks; // one for each track element
		var track = tracks[0]; // corresponds to the first track element
		track.mode = 'hidden';
		
		$("#myVideo").on('click', function() {
			if (this.paused == false) {
				this.pause();
			} else {
				this.play();
			}
		});
	}
	
		$('.playA').on('click', function() {
		  if ($('#AudioElement').get(0).paused == false) {
			  $('#AudioElement').get(0).pause();
		  } else {
			  $('#AudioElement').get(0).play();
		  }
		});

    $("a").each(function () {
        if ($(this).hasClass("unavailable")) {
            $(this).attr({ tabindex: "-1", href: "javascript: return false;" });
            if ($(this).hasClass("next")) {
				$(this).css("visibility", "hidden");
            }
            if ($(this).hasClass("back")) {
				$(this).css("visibility", "hidden");
            }
        }
    });
	
	
	
  }).keydown(function(e) {
	  if (e.which == 37) { // left     
		  window.location.href = backURL;
	  } else if (e.which == 39) { // right     
		  window.location.href = nextURL;
	  }

});
