

// we do enable typescript type checking - see
// https://graphics.cs.wisc.edu/Courses/559-sp2020/pages/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

const armLength = 40;

let copterAngle = 1.5;
let copterXV = 2;
let copterYV = 2;
let copterXP = 400;
let copterYP = 300;

let speed = 1;
let clockwisePath = true;


window.onload = function () {
    // somewhere in your program (maybe not here) you'll want a line
    // that looks like:
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext("2d");

    let startBtn = document.getElementById("startButton");
    let stopBtn = document.getElementById("stopButton");
    let fasterBtn = document.getElementById("fasterButton");
    let slowerBtn = document.getElementById("slowerButton");
    let leftBtn = document.getElementById("leftButton");
    let rightBtn = document.getElementById("rightButton");
    let upBtn = document.getElementById("upButton");
    let downBtn = document.getElementById("downButton");

    startBtn.onclick = function() {
        speed = 1;
    };

    stopBtn.onclick = function() {
        speed = 0;
    };

    fasterBtn.onclick = function() {
        speed = speed + 1;
    };

    slowerBtn.onclick = function() {
        speed = speed - 1;
    };

    leftBtn.onclick = function() {
        copterXP = copterXP - 5;
    };

    rightBtn.onclick = function() {
        copterXP = copterXP + 5;
    };

    upBtn.onclick = function() {
        copterYP = copterYP - 5;
    };

    downBtn.onclick = function() {
        copterYP = copterYP + 5;
    };

    window.setInterval(function(){
        clockwisePath = !clockwisePath;
    }, 6000);

    function drawBody(){
        context.save();
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 10);
        context.arc(10, 10, 10, Math.PI, 0, true);
        context.lineTo(20,0);
        context.closePath();
        context.fillStyle = "blue";
        context.strokeStyle = "black";
        context.fill();
        context.stroke();
        context.restore();
    }

    function drawArm(){
        context.save();
        context.fillStyle = "green";
        context.strokeStyle = "black";
        context.fillRect(-2, 0, 5, armLength);
        context.beginPath();
        context.arc(1, armLength, 5, 0, Math.PI*2);
        context.fill();
        context.translate(1, armLength);
        context.rotate(performance.now()/40);
        context.fillStyle = "black";
        context.fillRect(-2, 0, 5, 20);
        context.fillRect(-2, 0, 5, -20);
        context.restore();
    }
    
    function drawQuadCopter(){
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Quadcopter 1
        context.save();
        context.translate(150,150);
        context.rotate((performance.now()/2000)*speed);
        context.translate(-150,-150);
        context.translate(100, 200);
        context.rotate(Math.PI);
        drawBody();
        context.translate(10, 10);
        context.rotate(Math.PI/4);
        for(let x = 0; x < 4; x++){
            drawArm();
            context.rotate(Math.PI/2);
        }
        context.restore();

        //Quadcopter 2
        context.save();
        context.translate(200,200);
        context.rotate((performance.now()/1000)*speed);
        context.translate(-200,-200);
        context.translate(300, 200);
        context.rotate(Math.PI/4);
        drawBody();
        context.translate(10, 10);
        context.rotate(Math.PI/4);
        for(let x = 0; x < 4; x++){
            drawArm();
            context.rotate(Math.PI/2);
        }
        context.restore();

        //Quadcopter 3
        context.save();
        //context.translate(200,200);
        //context.rotate((performance.now()/1000)*speed);
        //context.translate(-200,-200);
        context.translate(copterXP, copterYP);
        context.rotate(Math.PI);
        drawBody();
        context.translate(10, 10);
        context.rotate(Math.PI/4);
        for(let x = 0; x < 4; x++){
            drawArm();
            context.rotate(Math.PI/2);
        }
        context.restore();

       // context.rotate((-Math.PI/200)*speed);
        

        window.requestAnimationFrame(drawQuadCopter);
    }

    drawQuadCopter();
};