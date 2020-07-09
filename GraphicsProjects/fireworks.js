

// @ts-check



/* jshint -W069, esversion:6 */

window.onload = function() {
    
    /** @type {HTMLCanvasElement} */
    let canvas52 = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas"));
    let context52 = canvas52.getContext('2d');

    let mouseXP = -20;
    let mouseYP = 500;

    let dots = [];

    let beginTime = performance.now();

    canvas52.onclick = function(event) {
        rValue = Math.random()*255;
        gValue = Math.random()*255;
        bValue = Math.random()*255;
        xCircleValue = Math.random()*600;
        yCircleValue = 400;

        mouseXP = event.clientX;
        mouseYP = event.clientY;
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        mouseXP -= box.left;
        mouseYP -= box.top;

        beginTime = performance.now();
    };

    let rValue = Math.random()*255;
    let gValue = Math.random()*255;
    let bValue = Math.random()*255;
    let xCircleValue = Math.random()*600;
    let yCircleValue = 400;

    function drawCircle(x, y, rValue, gValue, bValue) {
        context52.fillStyle = `rgb(${rValue},${gValue},${bValue})`;
        context52.beginPath();
        context52.arc(x, y, 5, 0, Math.PI*2);
        context52.fill();

    }

    function box52Animate() {
        context52.clearRect(0,0,canvas52.width, canvas52.height);

        if (Math.abs(xCircleValue - mouseXP)<= 10){
            xCircleValue = mouseXP;
        }
        else if (xCircleValue < mouseXP) {
            xCircleValue = xCircleValue + ((mouseXP-xCircleValue)/60);
        }
        else if (xCircleValue > mouseXP) {
            xCircleValue = xCircleValue - ((xCircleValue - mouseXP)/60);
        }
        
        if (yCircleValue <= mouseYP){
            yCircleValue=mouseYP;
        }
        else{
            yCircleValue = yCircleValue - ((yCircleValue - mouseYP)/40);
        }

        
        if (Math.abs(xCircleValue - mouseXP)<=10 && Math.abs(yCircleValue - mouseYP)<=10) {
            
            let vx = (Math.random()-0.5)*5;
            let vy = (Math.random()-0.5)*5;
            dots.push({"x":mouseXP,"y":mouseYP,"vx":vx,"vy":vy,"s":5});

        }
        dots.forEach(function(dot){
            dot.y -= dot.vy;
            dot.x -= dot.vx;
        });
    
        dots = dots.filter(
            dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvas52.width)&&(dot.y<canvas52.height))
            );

        dots.forEach(function(dot){
            context52.fillStyle = `rgb(${rValue},${gValue},${bValue})`;
            let w = dot.s*2;
            context52.fillRect(dot.x-dot.s,dot.y-dot.s,w,w);
        });

        drawCircle(xCircleValue, yCircleValue, rValue, gValue, bValue);
        
        if ((performance.now()-beginTime)>7000){
            xCircleValue = -100;
            yCircleValue = -100;
        }

        window.requestAnimationFrame(box52Animate);
    }
    box52Animate();
};
