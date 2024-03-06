

function el(id){
    return document.getElementById( id );
}

function clear_canv(){
    ctx.clearRect(0, 0, canv.width, canv.height);
}

function abs(x) {
    return Math.abs(x);
}

function acos(x) {
    return Math.acos(x);
}

function ctan(x) {
    return Math.cos(x)/Math.sin(x);
}

function acosh(x) {
    return Math.acosh(x);
}

function asin(x) {
    return Math.asin(x);
}

function asinh(x) {
    return Math.asinh(x);
}

function atan(x) {
    return Math.atan(x);
}

function ctan(x){ 
    return Math.cos(x)/Math.sin(x);
}

function cos(x) {
    return Math.cos(x);
}

function exp(x) {
    return Math.exp(x);
}

function log(x, y) {
    return Math.log(y)/Math.log(x);
}

function step(x,a) {
    return Math.pow(x,a);
}

function sign(x) {
    return Math.sign(x);
}

function sin(x) {
    return Math.sin(x);
}

function sqrt(x) {
    return Math.sqrt(x);
}

function tan(x) {
    return Math.tan(x);
}

function calc_minmax(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    var st = el('func').value;

    var x = x_left;
    var dx = (x_right - x_left)/200;
    var y = eval(st);
    var y_min = y;
    var y_max = y;

    for (num = 1; num < 200; num++){
        x = Number(x) + dx;
        y = eval(st);
        if (y> y_max) y_max = y;
        if (y< y_min) y_min = y;
    }

    el('y_min').value = y_min;
    el('y_max').value = y_max;
}

function get_params(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    y_down = el('y_down').value;
    y_up = el('y_up').value;
}

function x2canv(x){
    return 20+(x-x_left)*740/(x_right-x_left);
}

function y2canv(y){
    return 580-(y-y_down)*540/(y_up-y_down);
}

function draw_graph(){
    x_left = el('x_left').value;
    x_right = el('x_right').value;
    y_down = el('y_down').value;
    y_up = el('y_up').value;
    st = el('func').value;
    pen_color = el("pencolor").value;
    var width = 2;
    var g = 100;
    if (abs(x_right) === abs(x_left)){
    g = (x_right-x_left)*100; }
    if (abs(x_right) <= abs(x_left)){
        g = (x_right-x_left)*10000; }
    var dx = (x_right - x_left)/g;

    var x = x_left;
    var y = eval(st);
    var x_canv = x2canv(x);
    var y_canv = y2canv(y);

    ctx.beginPath();
    ctx.moveTo(x_canv, y_canv);
    ctx.lineWidth = width;
    ctx.strokeStyle = pen_color;

    var c = 0;
    var a;

    for (num = 1; num <g; num++){
        x = Number(x) + dx;
        y = eval(st);
        x_canv = x2canv(x);
        y_canv = y2canv(y);
        if (num === 1) {
            a = y;
        }
        //    if (Math.abs(Math.abs(a)-Math.abs(y)) > 100) {
        //        c = 1;
        //    }
        if (((a > 0 && y < 0) || (a<0 && y>0)) && (Math.abs(Math.abs(a)-Math.abs(y)) > 1)) {
            c = 1;
        }
        a = y;
        if (c === 0) {
        ctx.lineTo(x_canv, y_canv);
        } else {
            ctx.moveTo(x_canv, y_canv);
        }
        c = 0;
    }
    ctx.stroke();

    if (y_down <= 0){
    y0_canv = 300;
    if ((y_up >= 0) && (y_down<=0)) {
        y0_canv = y2canv(0);
    } else if(y_up < 0) {
        y0_canv = 10;
    } else if(y_down > 0) {
       y0_canv = 590; 
    }
    ctx.beginPath();
    ctx.moveTo(20, y0_canv);
    ctx.lineTo(756, y0_canv);
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    }
    if (x_left <= 0){
    x0_canv = 400;
    if ((x_right >= 0) && (x_left<=0)) {
        x0_canv = x2canv(0);
    } else if(x_right < 0) {
        x0_canv = 790;
    } else if(x_left > 0) {
        x0_canv = 10; 
    }
    ctx.beginPath();
    ctx.moveTo(x0_canv, 10);
    ctx.lineTo(x0_canv, 590);
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    }
}

function canv2x(x_canv){
    x = Number(x_left) + (x_canv-20)*(x_right - x_left)/740;
    return x.toString().substr(0,5);
}

function canv2y(y_canv){
    y = Number(y_down) + (580-y_canv)*(y_up - y_down)/540;
    return y.toString().substr(0,5);
}

function hndl_move(ev){
    var cRect = canv.getBoundingClientRect();
    var x_canv = Math.round(ev.clientX - cRect.left);
    var y_canv = Math.round(ev.clientY - cRect.top);
    var x = canv2x(x_canv);
    var y = eval(st)
    //var Y = y.toString().substr(0,5);
    var Y = canv2y(y_canv);
    var x_pi = x/3.14159;
    var y_pi = Y/3.14159;

    ctx.clearRect(656, 6, 200, 42);
    ctx.fillText("X: "+x+"; "+x_pi.toFixed(3)+"π", 658, 20);
    ctx.fillText("Y: "+Y+"; "+y_pi.toFixed(3)+"π", 658, 40);
}



function onLoadHandler(){
    canv = el('canv');
    canv.addEventListener("mousemove", hndl_move);
    ctx = canv.getContext('2d');
    ctx.font = "18px Arial";
    func_color = 'blue';
    get_params();
}

window.onload = onLoadHandler;