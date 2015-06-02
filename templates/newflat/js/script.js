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
    if(document.body.scrollTop >= document.getElementById("content_1").offsetTop - 110)
    {
        document.getElementById('header').style.position = 'fixed';
        document.getElementById('header').style.top = '0';
        icons[0].style.display = 'none';
        icons[1].style.display = 'none';
        icons[2].style.display = 'none';
        document.getElementById('header').style.height = 'auto';
        document.getElementById('header').style.padding =' 5 10';
        tabs[0].style.width = 'auto';
        tabs[1].style.width = 'auto';
        tabs[2].style.width = 'auto';
    }
    else
    {
        document.getElementById('header').style.position = 'relative';
        document.getElementById('header').style.top = '60vh';
        icons[0].style.display = 'inline';
        icons[1].style.display = 'inline';
        icons[2].style.display = 'inline';
        document.getElementById('header').style.height = '40vh';
        
    }
    last_scroll_pos = document.body.scrollTop;
}

function scrollToTop()
{
    document.body.scrollTop = 0;
    last_scroll_pos = 0;
    document.getElementById('cover').style.top=0;   
}