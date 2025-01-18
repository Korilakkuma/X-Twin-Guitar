/*
 *
 * MouseEvent.js
 *
 * This utility class defines event type for mouse (as static property)
 *
 * Copyright 2013@Tomohiro IKEDA
 *
 */
 
 
 
function MouseEvent(){
}

(function(){
    var click = '';
    var start = '';
    var move  = '';
    var end   = '';

    //Touch Panel ?
    if (/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) {
        click = 'tap';
        start = 'touchstart';
        move  = 'touchmove';
        end   = 'touchend';
    } else {
        click = 'click';
        start = 'mousedown';
        move  = 'mousemove';
        end   = 'mouseup';
    }

    MouseEvent.CLICK = click;
    MouseEvent.START = start;
    MouseEvent.MOVE  = move;
    MouseEvent.END   = end;
})();
