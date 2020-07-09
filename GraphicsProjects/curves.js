// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw the spiral - account for the checkbox and slider
 **/
window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext("2d");

    let checkbox1 = /** @type {HTMLInputElement} */ (document.getElementById("checkbox1"));
    let slider1 = /** @type {HTMLInputElement} */ (document.getElementById("slider1"));

    context.fillStyle = "blue";
    context.strokeStyle = "blue";

    function spiral(u){
        return [200+u*180*Math.cos(2*Math.PI*4*u), 
            200+180*u*Math.sin(2*Math.PI*4*u)];
    }

    function drawDots(functS, step){
        context.save();
        for(let u=0; u<=1; u+=step){
            let [x, y] = functS(u);
            context.beginPath();
            context.arc(x,y,3,0,2*Math.PI);
            context.fill();
        }
        context.restore();
    }

    function drawLines(functS, step){
        context.save();
        context.beginPath();

        for(let u=0; u<=1; u+=step){
            let [x, y] = functS(u);
            if(u==0){
                context.moveTo(x,y);
            }
            else{
                context.lineTo(x,y);
            }
        }
        context.stroke();
        context.restore();
    }

    let sliderValue = Number(slider1.value);    
    slider1.onchange = function(){
        sliderValue = Number(slider1.value);
        context.clearRect(0,0,canvas.width,canvas.height);
        if(checkbox1.checked){
            drawLines(spiral, sliderValue);
        }
        else{
            drawDots(spiral, sliderValue);
        }
        
    };

    checkbox1.onclick = function(){
        if(checkbox1.checked){
            context.clearRect(0,0,canvas.width,canvas.height);
            drawLines(spiral, sliderValue);
        }
        else{
            context.clearRect(0,0,canvas.width,canvas.height);
            drawDots(spiral, sliderValue);
        }
    };
    
};
