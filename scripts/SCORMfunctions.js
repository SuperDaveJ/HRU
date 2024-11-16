/***** Initialize variable *****/
var inLMS = true;			//Remember to change this to true for delivery
var reviewMode = false;		//change the style in content.css to hide comment links
var nLessons = 4;
var lessonStatus = "0000";
var menuURL = "../hr002_menu.html";
var bookmark = "";
var courseStatus = "";
var intendedClose = true;  	//page unload is intentional or not

/******************** Course SCORM Functions ***********************/
//The following three functions are on every page
function setVariables() {
	intendedClose = false;
}

function initializePage() {
	intendedClose = true;
	if (inLMS == true) { getSuspendData(); }
}

function callExitCourse() {
	if ( inLMS ) {
		if ( intendedClose ) {
			exitCourse();
		} else if ( blnLastPage ) {
			updateLessonStatus(2);
		}
	}
}

function toMenu() {
	if (inLMS == true) { getSuspendData(); }
	if (blnLastPage) {
		updateLessonStatus('2');
		doLMSSetValue( "cmi.core.lesson_location", "");
	}
}

function getPage() {
	//return current page file name in lower case without file extension.
	var strTemp = location.href;
	var iPos1 = strTemp.lastIndexOf("/") + 1;
	var iPos2 = strTemp.lastIndexOf(".");
	return strTemp.substring(iPos1, iPos2);
}

function getLesson() {
	//Returns an integer as lesson ID
	arrTemp = new Array();
	arrTemp = location.href.split("/");
	var strTemp = arrTemp[arrTemp.length-2];
	if ( strTemp.indexOf("M")==0 ) {
		return parseInt(strTemp.substring(3) );
	} else {
		return 0;
	}
}

function updateLessonStatus(lesStatus) {
	var iLes = getLesson();
	if ( iLes > 0 ) {
		lessonStatus = lessonStatus.substr(0,iLes-1) + lesStatus + lessonStatus.substr(iLes);
	}
	updateSuspendData();
	if ( lesStatus == 2 ) {
		if ( checkCourseStatus() ) { 
			doLMSSetValue("cmi.core.lesson_status", "passed"); 
		}
	}
}

function getLessonStatus(iLes) {	//returns an integer 0, 1, or 2.
	//iLes is from 1 to nLessons for this course
	var intTemp;
	intTemp = parseInt(lessonStatus.substr(iLes-1,1));
	if ( (intTemp < 0) || (intTemp > 2) ) return 0;
	else return intTemp;
}

function setCourseStatus(cStatus) {
	if (cStatus == "passed") {
        courseStatus = "passed";
		lessonStatus = "2222";
		updateSuspendData();
	}
    doLMSSetValue("cmi.core.lesson_status", cStatus);
}

function checkCourseStatus() {
  if (inLMS == true) {
	courseStatus = doLMSGetValue( "cmi.core.lesson_status" );
	if (courseStatus == "passed") {return true;}
	getSuspendData();
	for (i=1; i<=nLessons; ++i) {
		if (getLessonStatus(i) < 2) {
			courseStatus = "incomplete";
			return false;
		}
	}
	courseStatus = "passed";
	return true;
  }
}

function exitCourse() {
	if ( !exitPageStatus && inLMS ) {
		if (blnLastPage) { updateLessonStatus('2'); }
		startDate = getCookie("startTime");
		if (typeof(startDate) == "undefined") { startDate = 0; }
		if ( checkCourseStatus() ) {
			doLMSSetValue( "cmi.core.lesson_status", "passed" );
			doLMSSetValue("cmi.suspend_data", "");
		}
		saveBookmark();			//relative path;
		doLMSCommit();
		unloadPage();
	}
  	window.top.close();
}

function saveBookmark() {
  if ( inLMS  ) { 
	var strBookmark = "";

	if ( !blnLastPage && ( getPage().indexOf("menu") < 0) ) {
		strBookmark = "M1L"+ getLesson() + "/" + getPage() + ".html";
	} 
	doLMSSetValue( "cmi.core.lesson_location", strBookmark);
  }
}

function getSuspendData() {
    /***** SuspendData = lessonStatus *****/
	if ( inLMS ) {
		strTemp = doLMSGetValue("cmi.suspend_data");
		if ( (strTemp != "") && (typeof(strTemp) != "undefined") ) {
			lessonStatus = strTemp;
		} else {
			lessonStatus = "0000";
		}
	}
}

function updateSuspendData() {
  if ( inLMS ) {
	doLMSSetValue("cmi.suspend_data", lessonStatus);
  }

}

/******************** ADL SCO Functions ***********************/

var startDate;
var exitPageStatus = false;

function loadPage() {
    var result = doLMSInitialize();
   
	var status = doLMSGetValue( "cmi.core.lesson_status" );
	if (status == "not attempted") {
		// the student is now attempting the lesson
		doLMSSetValue( "cmi.core.lesson_status", "incomplete" );
	 }
  
	exitPageStatus = false;
	startTimer();
}

function doQuit() {
   doLMSSetValue( "cmi.core.exit", "" );

   computeTime();
   
   exitPageStatus = true;
   
   var result;

   result = doLMSCommit();

	// NOTE: LMSFinish will unload the current SCO.  All processing
	//       relative to the current page must be performed prior
	//		 to calling LMSFinish.   

   result = doLMSFinish();
}

function unloadPage() {
	if (exitPageStatus != true) {
		doQuit();
	}

	// NOTE:  don't return anything that resembles a javascript
	//		  string from this function or IE will take the
	//		  liberty of displaying a confirm message box.
}

function startTimer()
{
   startDate = new Date().getTime();
}

function computeTime()
{
   if ( startDate != 0 )
   {
      var currentDate = new Date().getTime();
      var elapsedSeconds = ( (currentDate - startDate) / 1000 );
      var formattedTime = convertTotalSeconds( elapsedSeconds );
   }
   else
   {
      formattedTime = "00:00:00.0";
   }
	//alert("formattedTime = " + formattedTime);
    doLMSSetValue( "cmi.core.session_time", formattedTime );
}

function convertTotalSeconds(ts) {
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;              //# of seconds in the total # of hours

   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1)
   {
      strWholeSec =  strSec.substring(0, strSec.indexOf("."));
      strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2)
   {
      strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length)
   {
      strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
      var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
      var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
      hour = "0"+hour;
   if ((new String(min)).length < 2)
      min = "0"+min;

   var rtnVal = hour+":"+min+":"+strSec;

   return rtnVal;
}


/****************** API Wrapper Functions *********************/
var _Debug = false;  // set this to false to turn debugging off
                     // and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;


// local variable definitions
var apiHandle = null;
var API = null;
var findAPITries = 0;

function doLMSInitialize()
{
   var api = getAPIHandle();
   if (api == null)
   {
      	alert("Error:\r\rUnable to locate the LMS's API Implementation.\nLMSInitialize was not successful.\nPlease let your administrator know.\n\nYour progress will not be tracked.");
      	return "false";
   }

   var result = api.LMSInitialize("");

   if (result.toString() != "true")
   {
      var err = ErrorHandler();
   }

   return result.toString();
}

function doLMSFinish()
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
      return "false";
   }
   else
   {
      // call the LMSFinish function that should be implemented by the API

      var result = api.LMSFinish("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }

   }

   return result.toString();
}

function doLMSGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
      return "";
   }
   else
   {
      var value = api.LMSGetValue(name);
      var errCode = api.LMSGetLastError().toString();
      if (errCode != _NoError)
      {
         // an error was encountered so display the error description
         var errDescription = api.LMSGetErrorString(errCode);
         //alert("LMSGetValue("+name+") failed. \n"+ errDescription);
         return "";
      }
      else
      {
         
         return value.toString();
      }
   }
}

function doLMSSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
      return;
   }
   else
   {
      var result = api.LMSSetValue(name, value);
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }
   }

   return;
}

function doLMSCommit()
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
      return "false";
   }
   else
   {
      var result = api.LMSCommit("");
      if (result != "true")
      {
         var err = ErrorHandler();
      }
   }

   return result.toString();
}

function doLMSGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralError;
   }

   return api.LMSGetLastError().toString();
}

function doLMSGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
   }

   return api.LMSGetErrorString(errorCode).toString();
}

function doLMSGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
   }

   return api.LMSGetDiagnostic(errorCode).toString();
}

function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error

   var api = getAPIHandle();
   if (api == null)
   {
      	//alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
      	return false;
   }
   else
   {
      var value = api.LMSGetValue("cmi.core.student_name");
      var errCode = api.LMSGetLastError().toString();
      if (errCode == _NotInitialized)
      {
         return false;
      }
      else
      {
         return true;
      }
   }
}

function ErrorHandler()
{
   var api = getAPIHandle();
   if (api == null)
   {
      //alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = api.LMSGetLastError().toString();
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.LMSGetErrorString(errCode);

      if (_Debug == true)
      {
         errDescription += "\n";
         errDescription += api.LMSGetDiagnostic(null);
         // by passing null to LMSGetDiagnostic, we get any available diagnostics
         // on the previous error.
      }

      //alert(errDescription);
   }

   return errCode;
}

function getAPIHandle()
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   }

   return apiHandle;
}

function findAPI(win)
{
   while ((win.API == null) && (win.parent != null) && (win.parent != win))
   {
      findAPITries++;
      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7) 
      {
         alert("Error finding API -- too deeply nested.");
        return null;
      }
      
      win = win.parent;

   }
   return win.API;
}

function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
   {
      theAPI = findAPI(window.opener);
   }
   if (theAPI == null)
   {
      	//alert("Unable to find an API adapter");
   }
   return theAPI
}

/******************** Cookie functions ********************/
function setCookie(name, value, expire){
	//add a path to make a cookie available cross file folders
	document.cookie = name + "=" + escape(value) + ((expire == null)?"":("; expires =" + expire.toGMTString())) + "; path=/"
}

function getCookie(Name) {
	var Mysearch = Name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(Mysearch);
		if (offset != -1){
			offset += Mysearch.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		}
	}
}

function deleteCookie (name) { 
	var exp = new Date();  
	exp.setTime (exp.getTime() - 10);  
	var cookieValue = getCookie (name);  
	document.cookie = name + "=" + cookieValue + "; expires=" + exp.toGMTString();
}
/*************** End of SCORM functions ********************/

