//Variables
var last_scrollpos_news, current_tab, header_height = document.getElementById('header').offsetHeight;
var tab_indic_left = document.getElementById('tab_' + 1).offsetLeft, tab_indic_width = document.getElementById('tab_'+ 1).offsetWidth;
var social_on = true;
var b_wth, b_hgt;
var all_w_d = document.getElementsByClassName('wide_div');
var all_w_d_l = all_w_d.length;
var z;
var cursorX, cursorY;

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
document.getElementById('content_1').style.width = b_wth;
getViewport();
setBandSize();
document.body.onscroll=scrollFuncP;

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

function setVisibleNotVisibleNotVisible(visible, not_visible1, not_visible2)
{
    document.getElementById('tab_indicator').style.transition = 'all 0.5s';
    var left = document.getElementById('tab_' + visible).offsetLeft;
    var width = document.getElementById('tab_'+ visible).offsetWidth;
    document.getElementById('tab_indicator').style.left = document.getElementById('nav_div').offsetLeft + left;
    document.getElementById('tab_indicator').style.width = width;
    document.getElementById('tab_indicator_m').style.left = left;
    document.getElementById('tab_indicator_m').style.width = width;
    document.getElementById('a_tab_' + visible).style.color = 'white';
    document.getElementById('a_tab_' + not_visible1).style.color = 'rgb(230,230,230)';
    document.getElementById('a_tab_' + not_visible2).style.color = 'rgb(230,230,230)';
    current_tab = visible;
    switch(visible)
    {	
        case 1:
            for(var i=1;i<=3;i++)
            {
                document.getElementById("content_" + i).style.left = b_wth*(i-1);
                document.getElementById("content_" + i).style.marginLeft = 0;
                document.getElementById('site_title').style.background = '#009688';
                document.getElementById('nav_div').style.background = '#009688';
                document.getElementById('header').className = 'no_shadow no_fixed';
                document.getElementById('nav_div').className = 'no_shadow';
                hideSocialFAB();
            }
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
            showSocialFAB();
            break;
    }			
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
function scrollFuncP(e) {
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
}

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
        document.getElementById("content_" + i).style.width = b_wth - 20;
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
    setVisibleNotVisibleNotVisible(current_tab, not_visible1, not_visible2)
}
updateAll();

function setBandSize()
{
    for (z=0;z<all_w_d_l;z++)
    {
     all_w_d[z].style.height = b_hgt * 0.8;
    }
}