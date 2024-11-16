// JavaScript Document for HTML5 Video
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var vid, ccOn; 
var firstTime = true;

function initializePlayer() {
	vid = document.getElementById("myVideo");
	
	if( isMobile.any() ) {
		//mobile device
		$("#myVideo").removeAttr("autoplay");
		$("#myVideo").attr("preload", "metadata");
		$("#vPlay").css("display", "block");
		$("#vPause").css("display", "none");
	} else {
		$("#myVideo").attr("autoplay", "autoplay");
		$("#vPlay").css("display", "none");
		$("#vPause").css("display", "block");
	}
}

function hideCC() {
	ccOn = false;
	vid.textTracks[0].mode = "hidden";
	vid.textTracks[0].mode = 0;	/* for IE and Safari */
}
function showCC() {
	ccOn = true;
	vid.textTracks[0].mode = "showing";
	vid.textTracks[0].mode = 2;	/* for IE and Safari */
}

//CDC changed their mind.  They don't want auto play anymore.
//window.onload = initializePlayer;
window.onload = hideCC;
vid = document.getElementById("myVideo");

function vidPlay() {
	/*
	if ( firstTime ) { 
		//showCC();
		$("#cc-text").css("display", "block");
		firstTime = false;
		ccOn = true;
	}
	*/
	vid.play();
	$("#vPlay").css("display", "none");
	$("#vPause").css("display", "block");
}

function vidPause() {
	vid.pause();
	$("#vPause").css("display", "none");
	$("#vPlay").css("display", "block");
}

function vidStop() {
	vid.currentTime = 0;
	vidPause();
}

ccOn = false;	//default to OFF
function toggleCC() {
	if ( ccOn ) {
		ccOn = false;
		vid.textTracks[0].mode = "hidden";
		vid.textTracks[0].mode = 0;	/* for IE and Safari */
		//$("#cc-text").css("display", "none");
	} else {
		ccOn = true;
		vid.textTracks[0].mode = "showing";
		vid.textTracks[0].mode = 2;	/* for IE and Safari */
		//$("#cc-text").css("display", "block");
	}
}

// Play Progress
$(vid).bind("timeupdate", function() {
	var timePercent = (this.currentTime / this.duration) * 100;
	$("#play-progress-bar").css({ width: timePercent + "%" })
});

// Load Progress for different browsers
$(vid).bind("progress", function(){
  	updateLoadProgress();
});
$(vid).bind("loadeddata", function(){
  	updateLoadProgress();
});
$(vid).bind("canplaythrough", function(){
  	updateLoadProgress();
});
$(vid).bind("playing", function(){
  	updateLoadProgress();
});

function updateLoadProgress() {
	if (vid.buffered.length > 0) {
	  var percent = (vid.buffered.end(0) / vid.duration) * 100;
	  $("#preload-bar").css({ width: percent + "%" })
	}
}

//Closed Captioning Code
/*  The following is not used anymore
var disp = document.getElementById("cc-text"); 
var track = document.getElementById("cctrack");

vid.addEventListener("loadedmetadata", function () { 
	document.getElementsByClassName("video-container")[0].style.width = vid.videoWidth + "px";  // make enclosure div width == video width 
	disp.style.top = (vid.style.top + (vid.videoHeight * .05)) + "px"; // set the text to appear at 5% from the top of the video 
	disp.style.left = vid.style.left;  // set the text to appear relative to the left edge of the video 
	disp.style.width = vid.videoWidth + "px"; // set text box to the width of the video 
}, false);

track.addEventListener("cuechange", function () { 
	var myTrack = this.track;             // track element is "this" 
	 var myCues = myTrack.activeCues;      // activeCues is an array of current cues.                                                    
	if (myCues.length > 0) { 
	  disp.innerText = myCues[0].text;   // write the text 
	} 
}, false);
*/