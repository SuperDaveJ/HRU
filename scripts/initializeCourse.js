/***** This file is included in the index file only *****/

var intendedClose = false;

function initializeCourse() {
  if ( inLMS ) {
  	loadPage();	
	if (typeof(startDate) == "undefined") { startDate = new Date().getTime(); }
	setCookie("startTime", startDate);
	
	var entryStatus = doLMSGetValue( "cmi.core.entry" );
	if (entryStatus == "ab-initio") {
		//first time in the course
		//format: lessonStatus~pagesViewed
		doLMSSetValue( "cmi.suspend_data", lessonStatus );
		doLMSSetValue("cmi.core.lesson_location", "");
		doLMSSetValue( "cmi.core.lesson_status", "incomplete" ); 
		doLMSCommit();
	} else {
		//reentry
		courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
		bookmark = doLMSGetValue("cmi.core.lesson_location");
		if ( (bookmark == "301") || (bookmark == undefined) ) bookmark = "";
	}
  }
}