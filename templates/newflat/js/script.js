/*
 * Diffusio - Build presentation websites easily
 * Copyright (C) 2015 Pierre JACQUIER - Grégoire DUVAUCHELLE
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 2.1 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public 
License
 * along with this program. If not, see <http://www.gnu.org/licenses/>. 
*/
var last_scroll_pos = 0; 
var dS;
var y=document.getElementById('cover').style.top;

function update()  
{
        var icons = document.getElementsByClassName('tab_img');
        var tabs = document.getElementsByClassName('sub_tab');
        dS = (document.body.scrollTop - last_scroll_pos) * 0.2;
        y=document.getElementById('cover').style.top;
        y = parseInt(y);
        y -= dS;
        document.getElementById('cover').style.top = y;
        document.getElementById('cover').style.top -= parseInt(dS);
    if(document.body.scrollTop >= document.getElementById("content_1").offsetTop - 110 && document.body.scrollTop <= ( document.getElementById("content_2").offsetTop - document.getElementById('header_1').offsetHeight ))
    {
        document.getElementById('header_1').style.display = "block";
    }
    else
    {
        document.getElementById('header_1').style.display = "none";
    }
     if(document.body.scrollTop >= document.getElementById("content_1").offsetTop - 110)
        document.getElementById('h1_tabs').style.display = "block";
    else
        document.getElementById('h1_tabs').style.display = "none";
    if(document.body.scrollTop >= document.getElementById('content_2').offsetTop && document.body.scrollTop >= document.getElementById('content_2').offsetTop)
        document.getElementById('header_2').style.position = 'fixed';
    else
        document.getElementById('header_2').style.position = 'absolute';
    if(document.body.scrollTop > document.getElementById('content_2').offsetTop + document.getElementById('content_2').offsetHeight)
        document.getElementById('header_3').style.position = 'fixed';
    else
        document.getElementById('header_3').style.position = 'absolute';
    last_scroll_pos = document.body.scrollTop;
}

function scrollToTop()
{
    document.body.scrollTop = 0;
    last_scroll_pos = 0;
    document.getElementById('cover').style.top=0;   
}