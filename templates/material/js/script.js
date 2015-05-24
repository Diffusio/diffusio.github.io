//Variables
var last_scrollpos_news, current_tab=1, header_height = document.getElementById('header').offsetHeight;
var tab_indic_left = document.getElementById('tab_' + 1).offsetLeft, tab_indic_width = document.getElementById('tab_'+ 1).offsetWidth;
var social_on = true;
var b_wth, b_hgt;
var all_w_d = document.getElementsByClassName('wide_div');
var all_w_d_l = all_w_d.length;
var z;
var cursorX, cursorY;
var geocoder;
var pos = new Array();
var current_pos=0;
var map;
var address = "rue neuve conliege";
document.onkeydown = checkKey;
var mapOptions = {
  zoom: 17,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var marker;

//Initialisation
document.getElementById('tab_1').className = "selectedTab";
setVisibleNotVisibleNotVisible(1,2,3);
var tab_indic_left = document.getElementById('tab_' + 1).offsetLeft, tab_indic_width = document.getElementById('tab_'+ 1).offsetWidth;
document.getElementById('tab_indicator').style.left = document.getElementById('nav_div').offsetLeft + tab_indic_left;
document.getElementById('tab_indicator').style.width = tab_indic_width - 5;
document.getElementById('tab_indicator_m').style.left = tab_indic_left;
document.getElementById('tab_indicator_m').style.width = tab_indic_width;
document.getElementById('a_tab_' + 1).style.color = 'white';
document.getElementById('a_tab_' + 2).style.color = '#bdedf3';
document.getElementById('a_tab_' + 3).style.color = '#bdedf3';
document.getElementById('tab_indicator').style.transition = 'all 0s';
getViewport();
setBandSize();

//Fonctions
function getViewport() {


 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   b_wth = window.innerWidth,
   b_hgt = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    b_wth = document.documentElement.clientWidth,
    b_hgt = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   b_wth = document.getElementsByTagName('body')[0].clientWidth,
   b_hgt = document.getElementsByTagName('body')[0].clientHeight
 }
 return [b_wth, b_hgt];
}

function setIndicator()
{
    var left = document.getElementById('tab_' + current_tab).offsetLeft;
    var width = document.getElementById('tab_'+ current_tab).offsetWidth;
    document.getElementById('tab_indicator').style.left = document.getElementById('nav_div').offsetLeft + left;
    document.getElementById('tab_indicator').style.width = width;
    document.getElementById('tab_indicator_m').style.left = left;
    document.getElementById('tab_indicator_m').style.width = width;
}

function setVisibleNotVisibleNotVisible(visible, not_visible1, not_visible2)
{
    current_tab = visible;
    setIndicator();
    document.getElementById('tab_indicator').style.transition = 'all 0.5s';
    document.getElementById('a_tab_' + visible).style.color = 'white';
    document.getElementById('a_tab_' + not_visible1).style.color = 'rgb(230,230,230)';
    document.getElementById('a_tab_' + not_visible2).style.color = 'rgb(230,230,230)';
    switch(visible)
    {	
        case 1:
            for(var i=1;i<=3;i++)
            {
                document.getElementById("content_" + i).style.left = b_wth*(i-1);
                document.getElementById("content_" + i).style.marginLeft = 0;
            }
            document.getElementById('site_title').style.background = 'transparent';
            document.getElementById('nav_div').style.background = 'transparent';
            document.getElementById('header').style.background = 'transparent';
            document.getElementById('header').className = 'no_shadow';
            document.getElementById('nav_div').className = 'no_shadow';
            hideSocialFAB();
            document.body.style.overflowY = "hidden";
            document.getElementById("pres_progress").style.opacity = 1;
            break;
        case 2:
            document.getElementById("content_2").style.left = 0;
            document.getElementById("content_2").style.marginLeft = 0;
            document.getElementById("content_1").style.marginLeft = (-1)*b_wth;
            document.getElementById("content_3").style.left = b_wth;
            document.getElementById('site_title').style.background = '#e91e63';
            document.getElementById('nav_div').style.background = '#e91e63';
            document.getElementById('header').className = '';
            showSocialFAB();
            document.body.style.overflowY = "auto";
            document.getElementById("pres_progress").style.opacity = 0;
            break;
        case 3:
            document.getElementById("content_3").style.left = 0;
            document.getElementById("content_2").style.left = 0;
            document.getElementById("content_3").style.marginLeft = 0;
            document.getElementById("content_1").style.marginLeft = (-2)*b_wth;
            document.getElementById("content_2").style.marginLeft = -b_wth;
            document.getElementById('site_title').style.background = '#00BCD4';
            document.getElementById('nav_div').style.background = '#00BCD4';
            document.getElementById('header').className = '';
            document.body.style.overflowY = "auto";
            document.getElementById("pres_progress").style.opacity = 0;
            break;
    }	
    document.body.scrollTop = 0;
}

function showSocialFAB()
{
    document.getElementById('FAB').style.right = 15;
}
function hideSocialFAB()
{
    document.getElementById('FAB').style.right = -75;
}
function toogleSocial()
{
    var social_wth = social_on ? '160px' : '50px';
    var social_radius = social_on ? '3px 25px 25px 3px' : '25px';
    var opacity = social_on ? '1' : '0';
    var color = social_on ? '#B93310' : '#F44336';
    document.getElementById('FAB').style.width = social_wth;
    document.getElementById('FAB').style.borderRadius = social_radius;
    document.getElementById('tw').style.opacity = opacity;
    document.getElementById('fb').style.opacity = opacity;
    document.getElementById('round_fab').style.backgroundColor = color;
    social_on = !social_on;
}

function mouse_position(e)
{
    cursorX = e.clientX;
    cursorY = e.clientY;
}
/*function scrollFuncP(e) {
        if ( typeof scrollFuncP.x == 'undefined' ) {
            scrollFuncP.x=document.body.scrollTop;
        }
        var diffX=scrollFuncP.x-document.body.scrollTop;
        if( diffX<0 ) {
          if(current_tab == 1)
            {
                document.getElementById('header').className = 'no_fixed no_shadow';	
            }
        } else if( diffX>0 ) {
            if(current_tab == 1)
            {
                document.getElementById('header').className = 'no_shadow';	
            }
        } else {
            // First scroll event
        }
        scrollFuncP.x=document.body.scrollTop;
}*/

function openCircleNews(id)
{
    document.getElementById('news_' + id).style.transition = "transform 0.6s, z-index 0s";
    document.getElementById('circle_news').style.top = cursorY + document.body.scrollTop;
    document.getElementById('circle_news').style.left = cursorX;
    document.getElementById('circle_news').style.opacity = 1;
    document.getElementById('news_' + id).style.zIndex = 160;
    document.body.style.overflow='hidden';
    document.getElementById('header2').style.top = 0;
    document.getElementById('news_' + id).style.maxHeight = document.documentElement.clientHeight - 50;
    document.getElementById('news_' + id).style.overflow = 'auto';
    function scrollFunc(e) {
        if ( typeof scrollFunc.x == 'undefined' ) {
            scrollFunc.x=document.getElementById('news_' + id).scrollTop;
        }
        var diffX=scrollFunc.x-document.getElementById('news_' + id).scrollTop;
        if( diffX<0 ) {
            document.getElementById('news_' + id).style.top=-50;
        } else if( diffX>0 ) {
            document.getElementById('news_' + id).style.top=0;
        } else {
            // First scroll event
        }
        scrollFunc.x=document.getElementById('news_' + id).scrollTop;
    }
    document.getElementById('news_' + id).onscroll=scrollFunc
    if(document.getElementById('news_'+id).getBoundingClientRect().top < 0)
    {
        document.getElementById('news_' + id).style.transform = 'translate3d(0,'+ (-document.getElementById('news_'+id).getBoundingClientRect().top + 50) + 'px,0)';
        document.getElementById('news_' + id).style.WebkitTransform = 'translate3d(0,'+ (-document.getElementById('news_'+id).getBoundingClientRect().top + 50) + 'px,0)';
    }
    else
    {
        document.getElementById('news_' + id).style.transform = 'translate3d(0,-'+ (document.getElementById('news_'+id).getBoundingClientRect().top - 50) + 'px,0)';
        document.getElementById('news_' + id).style.WebkitTransform = 'translate3d(0,-'+ (document.getElementById('news_'+id).getBoundingClientRect().top - 50) + 'px,0)';
    }
    document.getElementById('circle_news').style.transition = 'transform 0.5s';
    document.getElementById('FAB_close').style.transition = '0.6s 0.5s';
    document.getElementById('FAB_close').style.left = 45;
    document.getElementById('FAB_close').onclick = function (){closeCircleNews(id);};
    document.getElementById('circle_news').style.transform = 'scale(900)';
    document.getElementById('circle_news').style.WebkitTransform = 'scale(900)';
    document.getElementById('news_content_' + (id)).style.height = 'auto';
    document.getElementById('news_content_' + (id)).style.opacity = 1;
    var left_m = b_wth > 600 ? '8%' : "1.6%";
    document.getElementById('FAB_close').style.left = left_m;
    var all_read = document.getElementsByClassName('read_more');
    var read_lgt = all_read.length;
    var j;
    for(j=0;j<read_lgt;j++)
    {
        all_read[j].style.display = 'none';
    }
}
function closeCircleNews(id)
{
    document.getElementById('news_' + id).style.transform = 'translate3d(0,0px,0)';
    document.getElementById('news_' + id).style.WebkitTransform = 'translate3d(0,0px,0)';
    document.getElementById('circle_news').style.transition = 'transform 0.3s 0.3s';
    document.body.style.overflowY = 'auto';
    document.getElementById('header2').style.top = -150;
    document.getElementById('news_content_' + (id)).style.height = 0;
    document.getElementById('news_content_' + (id)).style.opacity = 0;
    document.getElementById('news_' + id).style.transition = "transform 0.6s, z-index 0s 0.6s";
    document.getElementById('news_' + id).style.zIndex = 2;
    document.getElementById('news_' + id).style.overflow = 'hidden';
    document.getElementById('FAB_close').style.transition = '0.5s';
    document.getElementById('FAB_close').style.left = '-75px';
    document.getElementById('circle_news').style.transform = 'scale(0.0033)';
    document.getElementById('circle_news').style.WebkitTransform = 'scale(0.0033)';
    var all_read = document.getElementsByClassName('read_more');
    var read_lgt = all_read.length;
    var j;
    for(j=0;j<read_lgt;j++)
    {
        all_read[j].style.display = 'block';
    }
}
function setContentWidth()
{
    b_wth = document.documentElement.clientWidth + 50;
    b_hgt = document.documentElement.clientHeight;
    for(var i=1;i<=3;i++)
    {
        document.getElementById("content_" + i).style.width = b_wth - 50;
        document.getElementById("content_" + i).style.left = b_wth*(i-1);
    }
}

function updateAll()
{
    getViewport();
    setContentWidth();
    setBandSize();
    switch(current_tab)
    {
        case 1:
            not_visible1 = 2;
            not_visible2 = 3;
            break;
        case 2:
            not_visible1 = 1;
            not_visible2 = 3;
            break;
        case 3:
            not_visible1 = 1;
            not_visible2 = 2;
            break;
    }
    setVisibleNotVisibleNotVisible(current_tab, not_visible1, not_visible2);
    setIndicator();
    setPresIndic();
}
updateAll();

function setPresIndic()
{
    document.getElementById("pres_progress").style.top = b_hgt / 2  - document.getElementById("pres_progress").offsetHeight;   
}

function setBandSize()
{
    getViewport();
    all_w_d[0].style.height = b_hgt * 0.8;
    for (z=1;z<all_w_d_l;z++)
    {
        all_w_d[z].style.height = b_hgt;
    }
    pos[0] = 0;
    pos[1] = document.getElementById("w_d_1").offsetTop + document.getElementById("w_d_1").offsetHeight;
    pos[2] = document.getElementById("w_d_2").offsetTop + document.getElementById("w_d_2").offsetHeight;
}

function initialize() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    codeAddress();
}

function codeAddress() {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        if(marker)
          marker.setMap(null);
        marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            draggable: true
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}



function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        if(current_tab==1)
        {
            movePresentation(current_pos - 1); 
        }
    }
    else if (e.keyCode == '40') {
       if(current_tab==1)
        {
           movePresentation(current_pos + 1); 
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
        switch(current_tab)
        {
            case 1:
                setVisibleNotVisibleNotVisible(3,1,3);
                break;
            case 2:
                setVisibleNotVisibleNotVisible(1,2,3);
                break;
            case 3:
                setVisibleNotVisibleNotVisible(2,1,3);
                break;
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
        switch(current_tab)
        {
            case 1:
                setVisibleNotVisibleNotVisible(2,1,3);
                break;
            case 2:
                setVisibleNotVisibleNotVisible(3,1,2);
                break;
            case 3:
                setVisibleNotVisibleNotVisible(1,3,2);
                break;
        }
    }
        return false;
}


 function MouseScroll (event) {
        if(current_tab = 1)
        {
            var rolled = 0;
            if ('wheelDelta' in event) {
                rolled = event.wheelDelta;
            }
            else {  // Firefox
                    // The measurement units of the detail and wheelDelta properties are different.
                rolled = -40 * event.detail;
            }
            
            if(rolled < 0)
                movePresentation(current_pos + 1); 
            else
                movePresentation(current_pos - 1); 
        }
        }

function Init () {
        // for mouse scrolling in Firefox
    var elem = document.getElementById("content_1");
    if (elem.addEventListener) {    // all browsers except IE before version 9
            // Internet Explorer, Opera, Google Chrome and Safari
        elem.addEventListener ("mousewheel", MouseScroll, false);
            // Firefox
        elem.addEventListener ("DOMMouseScroll", MouseScroll, false);
    }
    else {
        if (elem.attachEvent) { // IE before version 9
            elem.attachEvent ("onmousewheel", MouseScroll);
        }
    }
}
Init();


function movePresentation(pos_to_go)
{
    current_pos = pos_to_go;  
    var i;
    switch(pos_to_go)
       {
           case 0:
                smooth_scroll_to(document.body, pos[0], 600);
                document.getElementById("FAB_pres").style.opacity = 1;
                document.getElementById('header').style.background = "transparent";
                document.getElementById("pres_progress_0").getElementsByTagName("DIV")[0].style.background = "white";
                document.getElementById("pres_progress_1").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_2").getElementsByTagName("DIV")[0].style.background = "transparent";
               document.getElementById("indic_1").style.border = "solid white 1px"; 
               document.getElementById("indic_2").style.border = "solid white 1px"; 
               document.getElementById("indic_3").style.border = "solid white 1px"; 
                break;
           case 1:
                smooth_scroll_to(document.body, pos[1], 600);
                document.getElementById('header').style.background = "gray";
                document.getElementById("FAB_pres").style.opacity = 0;
                document.getElementById("pres_progress_0").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_1").getElementsByTagName("DIV")[0].style.background = "grey";
                document.getElementById("pres_progress_2").getElementsByTagName("DIV")[0].style.background = "transparent";
               document.getElementById("indic_1").style.border = "solid grey 1px"; 
               document.getElementById("indic_2").style.border = "solid grey 1px"; 
               document.getElementById("indic_3").style.border = "solid grey 1px"; 
                break;
           case 2:
                smooth_scroll_to(document.body, pos[2], 600);
                document.getElementById('header').style.background = "transparent";
                document.getElementById("FAB_pres").style.opacity = 0;
                document.getElementById("pres_progress_0").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_1").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_2").getElementsByTagName("DIV")[0].style.background = "white";
               document.getElementById("indic_1").style.border = "solid white 1px"; 
               document.getElementById("indic_2").style.border = "solid white 1px"; 
               document.getElementById("indic_3").style.border = "solid white 1px"; 
                break;
           case -1:
                smooth_scroll_to(document.body, pos[2], 600);
                document.getElementById('header').style.background = "transparent";
                document.getElementById("FAB_pres").style.opacity = 0;  
               current_pos = 2;
                document.getElementById("pres_progress_0").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_1").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_2").getElementsByTagName("DIV")[0].style.background = "white";
               document.getElementById("indic_1").style.border = "solid white 1px"; 
               document.getElementById("indic_2").style.border = "solid white 1px"; 
               document.getElementById("indic_3").style.border = "solid white 1px"; 
               break;
            case 3:
                smooth_scroll_to(document.body, pos[0], 600);
                document.getElementById('header').style.background = "transparent";
                document.getElementById("FAB_pres").style.opacity = 1;  
               current_pos = 0;
                document.getElementById("pres_progress_0").getElementsByTagName("DIV")[0].style.background = "white";
                document.getElementById("pres_progress_1").getElementsByTagName("DIV")[0].style.background = "transparent";
                document.getElementById("pres_progress_2").getElementsByTagName("DIV")[0].style.background = "transparent";
               document.getElementById("indic_1").style.border = "solid white 1px"; 
               document.getElementById("indic_2").style.border = "solid white 1px"; 
               document.getElementById("indic_3").style.border = "solid white 1px"; 
               break;
       }
        
}

function detectSwipe(el,func) {
      swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  //min x swipe for horizontal swipe
      var max_x = 40;  //max x difference for vertical swipe
      var min_y = 40;  //min y swipe for vertical swipe
      var max_y = 50;  //max y difference for horizontal swipe
      var direc = "";
      ele = document.body;
      ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX; 
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX; 
        swipe_det.eY = t.screenY;    
      },false);
      ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
          if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
          if(swipe_det.eY > swipe_det.sY) direc = "d";
          else direc = "u";
        }
    
        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
      },false);  
}

function findSwipeDirection(el,d)
{
    if(current_tab == 1)
    {
        if(d=="u")
             movePresentation(current_pos + 1);
        if(d=="d")
             movePresentation(current_pos - 1);
    }
    if(d=="l")
    {
        switch(current_tab)
        {
            case 1:
                setVisibleNotVisibleNotVisible(2,1,3);
                break;
            case 2:
                setVisibleNotVisibleNotVisible(3,1,3);
                break;
            case 3:
                setVisibleNotVisibleNotVisible(1,2,3);
                break;
        }   
    }
    if(d=="r")
    {
        switch(current_tab)
        {
            case 1:
                setVisibleNotVisibleNotVisible(3,1,3);
                break;
            case 2:
                setVisibleNotVisibleNotVisible(1,2,3);
                break;
            case 3:
                setVisibleNotVisibleNotVisible(2,1,3);
                break;
        }   
    }
}

detectSwipe("body",findSwipeDirection);

var smooth_scroll_to = function(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if(element.scrollTop != previous_top) {
                reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollTop === previous_top
                && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            previous_top = element.scrollTop;

            // schedule next frame for execution
            setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
    });
}
movePresentation(0);