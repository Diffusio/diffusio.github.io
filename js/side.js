$(document).ready(function(){
	var side = $('.sideBar');
	var sideWidth = $('.sideBar').width() + 65;
	var sideClose = $('#sideClose');
	side.css({'left' : '-'+sideWidth+'px'});
	var filmWhite = $('.filmWhite');
	var bodyHeight = $('body').height() + 100;
	var bodyWidth = $('body').width() + 40;
	var body = $('body');
	
	var sideOpen = $("#sideOpen");
	var subPage = $(".subPage");
	filmWhite.hide();
	
	sideOpen.click(function(){
    side.css({'left' : '0px', 'transition':'0.5s', '-moz-transition':'0.5s', '-webkit-transition':'0.5s', '-o-transition':'0.5s', '-khtml-transition':'0.5s', '-ms-transition':'0.5s'});
    body.css({'overflow':'hidden'});
    filmWhite.show();
    filmWhite.css({'height':bodyHeight+'px','width':bodyWidth+'px'});
	});
	sideClose.click(function(){
    side.css({'left' : '-'+sideWidth+'px', 'transition':'0.5s', '-moz-transition':'0.5s', '-webkit-transition':'0.5s', '-o-transition':'0.5s', '-khtml-transition':'0.5s', '-ms-transition':'0.5s'});
    body.css({'overflow':'scroll-y'});
    filmWhite.hide();
	});
	subPage.click(function(){
    side.css({'left' : '-'+sideWidth+'px', 'transition':'0.5s', '-moz-transition':'0.5s', '-webkit-transition':'0.5s', '-o-transition':'0.5s', '-khtml-transition':'0.5s', '-ms-transition':'0.5s'});
    body.css({'overflow':'scroll-y'});
    filmWhite.hide();
	});
	filmWhite.click(function(){
    side.css({'left' : '-'+sideWidth+'px', 'transition':'0.5s', '-moz-transition':'0.5s', '-webkit-transition':'0.5s', '-o-transition':'0.5s', '-khtml-transition':'0.5s', '-ms-transition':'0.5s'});
    body.css({'overflow':'scroll-y'});
    filmWhite.hide();
	});
});

