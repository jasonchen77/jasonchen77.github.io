/*jshint esversion: 6 */
// @ts-check

import { draggablePoints } from "./libs/dragPoints.js";
import { RunCanvas } from "./libs/runCanvas.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [200, 400],
  [250, 450],
  [300, 450],
  [350, 450],
  [400, 400],
  [450, 150]

  /* [150,150],
  [450,150],
  [450,450],
  [150,450] */
];


function lerpX(u, p1, p2, p3, p4) {
  return curveP(u, p1, p2, p3, p4);
}

function lerpY(u, p1, p2, p3, p4) {
  return curveP(u, p1, p2, p3, p4);
}

function train(t, px1, px2, px3, px4, py1, py2, py3, py4){
  let x = lerpX(t, px1, px2, px3, px4);
  let y = lerpY(t, py1, py2, py3, py4);
  return [x, y];
}

function curveP(u, a, b, c, d){
    let t2 = u * u;
    let t3 = t2 * u;
    return a + (-a * 3 + u * (3 * a - a * u)) * u + (3 * b + u * (-6 * b + b * 3 * u)) * u + (c * 3 - c * 3 * u) * t2 + d * t3;
}

/**
 * Draw function - this is the meat of the operation
 *
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param, s) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  //draw water
  function drawWater(){
    context.save();
    context.fillStyle = "#4da6ff";
    context.fillRect(0, 550, canvas.width, 50);
    context.restore();
    //
    context.save();
    context.translate(0, 520);
    context.beginPath();
    context.moveTo(5,20);
    for(let x = 0; x<600; x+=30){
      context.bezierCurveTo(x+15, 5, x+15, 10, x+20, 20);
      context.bezierCurveTo(x+30, 35, x+30, 40, x+35, 20);
    }
    context.lineWidth = 10;
    context.fillStyle = "#4da6ff";
    context.strokeStyle = "#4da6ff";
    //context.fill();
    context.stroke();
    context.restore();
  }
  drawWater();

  //draw sky
  function curvePatterns(){
    context.save();
    context.beginPath();
    context.moveTo(5,20);
    for(let x = 0; x<600; x+=30){
      context.bezierCurveTo(x+15, 5, x+15, 10, x+20, 20);
      context.bezierCurveTo(x+30, 35, x+30, 40, x+35, 20);
    }
    context.lineWidth = 5;
    context.fillStyle = "#4da6ff";
    context.strokeStyle = "#4da6ff";
    context.fill();
    context.stroke();
    context.restore();
  }
  curvePatterns();

  //draw trees
  function tree(){
    context.save();
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(130,150);
    context.lineTo(70, 150);
    context.moveTo(100,130);
    context.lineTo(130,180);
    context.lineTo(70, 180);
    context.fillStyle = "green";
    context.fill();
    context.fillStyle = "brown";
    context.fillRect(90,180,20,30);
    context.restore();
  }
  context.save();
  tree();
  context.translate(-20,80);
  tree();
  context.translate(-20,120);
  tree();
  context.translate(0,80);
  tree();
  context.translate(500,0);
  tree();
  context.translate(-10,-120);
  tree();
  context.restore();

  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  // now, the student should add code to draw the track and train

  
  //Draw the curves
  context.save();
  context.beginPath();
  for(let i=0; i<thePoints.length; i++) {

    /* let p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])/3;
    let p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])/3;
    let p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])/3;
    let p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])/3; */

    let p1px;
    let p1py;
    let p2px;
    let p2py;
     
    if(i==0){
      p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[thePoints.length-1][0])*s;
      p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[thePoints.length-1][1])*s;
      p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])*s;
      p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])*s;
      context.moveTo(thePoints[i][0],thePoints[i][1]);
      context.bezierCurveTo(p1px,p1py,p2px,p2py,thePoints[i+1][0],thePoints[i+1][1]);
    }
    else if(i==thePoints.length-2){
      p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])*s;
      p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])*s;
      p2px = thePoints[i+1][0] - (thePoints[0][0] - thePoints[i][0])*s;
      p2py = thePoints[i+1][1] - (thePoints[0][1] - thePoints[i][1])*s;
      context.bezierCurveTo(p1px,p1py,p2px,p2py,thePoints[i+1][0],thePoints[i+1][1]);
    }
    else if(i==thePoints.length-1){
      p1px = thePoints[i][0] + (thePoints[0][0] - thePoints[i-1][0])*s;
      p1py = thePoints[i][1] + (thePoints[0][1] - thePoints[i-1][1])*s;
      p2px = thePoints[0][0] - (thePoints[1][0] - thePoints[i][0])*s;
      p2py = thePoints[0][1] - (thePoints[1][1] - thePoints[i][1])*s;
      context.bezierCurveTo(p1px,p1py,p2px,p2py,thePoints[0][0],thePoints[0][1]);
    }
    else{
      p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])*s;
      p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])*s;
      p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])*s;
      p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])*s;
      context.bezierCurveTo(p1px,p1py,p2px,p2py,thePoints[i+1][0],thePoints[i+1][1]);
    }
  }
  context.strokeStyle = "black";
  context.stroke();
  context.restore();



  //Draw the train

  function pointsXY(){
    let p1px;
    let p1py;
    let p2px;
    let p2py;
    let p1px2;
    let p1py2;
    let p2px2;
    let p2py2;

    for(let i=0; i<thePoints.length; i++){
      let u = param - Math.floor(param);
      if((param-i) < 1){
        if(i==0){
          p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[thePoints.length-1][0])*s;
          p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[thePoints.length-1][1])*s;
          p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])*s;
          p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])*s;

          p1px2 = thePoints[i+1][0] + (thePoints[i+2][0] - thePoints[0][0])*s;
          p1py2 = thePoints[i+1][1] + (thePoints[i+2][1] - thePoints[0][1])*s;
          p2px2 = thePoints[i+2][0] - (thePoints[i+3][0] - thePoints[i+1][0])*s;
          p2py2 = thePoints[i+2][1] - (thePoints[i+3][1] - thePoints[i+1][1])*s;

          let [x,y] = train(u,thePoints[i][0],p1px,p2px,thePoints[i+1][0],thePoints[i][1],p1py,p2py,thePoints[i+1][1]);
          let [x2,y2] = train(u,thePoints[i+1][0],p1px2,p2px2,thePoints[i+2][0],thePoints[i+1][1],p1py2,p2py2,thePoints[i+2][1]);
          
          return [x,y,x2,y2];
        }
        else if(i==thePoints.length-3){
          p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])*s;
          p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])*s;
          p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])*s;
          p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])*s;

          p1px2 = thePoints[i+1][0] + (thePoints[i+2][0] - thePoints[i][0])*s;
          p1py2 = thePoints[i+1][1] + (thePoints[i+2][1] - thePoints[i][1])*s;
          p2px2 = thePoints[i+2][0] - (thePoints[0][0] - thePoints[i+1][0])*s;
          p2py2 = thePoints[i+2][1] - (thePoints[0][1] - thePoints[i+1][1])*s;

          let [x,y] = train(u,thePoints[i][0],p1px,p2px,thePoints[i+1][0],thePoints[i][1],p1py,p2py,thePoints[i+1][1]);
          let [x2,y2] = train(u,thePoints[i+1][0],p1px2,p2px2,thePoints[i+2][0],thePoints[i+1][1],p1py2,p2py2,thePoints[i+2][1]);
  

          return [x,y,x2,y2];
        }
        else if(i==thePoints.length-2){
          p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])*s;
          p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])*s;
          p2px = thePoints[i+1][0] - (thePoints[0][0] - thePoints[i][0])*s;
          p2py = thePoints[i+1][1] - (thePoints[0][1] - thePoints[i][1])*s;

          p1px2 = thePoints[i+1][0] + (thePoints[0][0] - thePoints[i][0])*s;
          p1py2 = thePoints[i+1][1] + (thePoints[0][1] - thePoints[i][1])*s;
          p2px2 = thePoints[0][0] - (thePoints[1][0] - thePoints[i+1][0])*s;
          p2py2 = thePoints[0][1] - (thePoints[1][1] - thePoints[i+1][1])*s;

          let [x,y] = train(u,thePoints[i][0],p1px,p2px,thePoints[i+1][0],thePoints[i][1],p1py,p2py,thePoints[i+1][1]);
          let [x2,y2] = train(u,thePoints[i+1][0],p1px2,p2px2,thePoints[0][0],thePoints[i+1][1],p1py2,p2py2,thePoints[0][1]);
          

          return [x,y,x2,y2];
        }
        else if(i==thePoints.length-1){
          p1px = thePoints[i][0] + (thePoints[0][0] - thePoints[i-1][0])*s;
          p1py = thePoints[i][1] + (thePoints[0][1] - thePoints[i-1][1])*s;
          p2px = thePoints[0][0] - (thePoints[1][0] - thePoints[i][0])*s;
          p2py = thePoints[0][1] - (thePoints[1][1] - thePoints[i][1])*s;

          p1px2 = thePoints[0][0] + (thePoints[1][0] - thePoints[i-1][0])*s;
          p1py2 = thePoints[0][1] + (thePoints[1][1] - thePoints[i-1][1])*s;
          p2px2 = thePoints[1][0] - (thePoints[2][0] - thePoints[0][0])*s;
          p2py2 = thePoints[1][1] - (thePoints[2][1] - thePoints[0][1])*s;

          let [x,y] = train(u,thePoints[i][0],p1px,p2px,thePoints[0][0],thePoints[i][1],p1py,p2py,thePoints[0][1]);
          let [x2,y2] = train(u,thePoints[0][0],p1px2,p2px2,thePoints[1][0],thePoints[0][1],p1py2,p2py2,thePoints[1][1]);
         

          return [x,y,x2,y2];
        }
        else{
          p1px = thePoints[i][0] + (thePoints[i+1][0] - thePoints[i-1][0])*s;
          p1py = thePoints[i][1] + (thePoints[i+1][1] - thePoints[i-1][1])*s;
          p2px = thePoints[i+1][0] - (thePoints[i+2][0] - thePoints[i][0])*s;
          p2py = thePoints[i+1][1] - (thePoints[i+2][1] - thePoints[i][1])*s;

          p1px2 = thePoints[i+1][0] + (thePoints[i+2][0] - thePoints[i][0])*s;
          p1py2 = thePoints[i+1][1] + (thePoints[i+2][1] - thePoints[i][1])*s;
          p2px2 = thePoints[i+2][0] - (thePoints[i+3][0] - thePoints[i+1][0])*s;
          p2py2 = thePoints[i+2][1] - (thePoints[i+3][1] - thePoints[i+1][1])*s;

          let [x,y] = train(u,thePoints[i][0],p1px,p2px,thePoints[i+1][0],thePoints[i][1],p1py,p2py,thePoints[i+1][1]);
          let [x2,y2] = train(u,thePoints[i+1][0],p1px2,p2px2,thePoints[i+2][0],thePoints[i+1][1],p1py2,p2py2,thePoints[i+2][1]);
  

          return [x,y,x2,y2];
        }
      }
    }
  }
  context.save();
  let [x1,y1,x2p,y2p] = pointsXY();
  context.translate(x1,y1);
  context.rotate(-Math.PI/180*60);
  context.rotate(Math.atan2(y2p-y1,x2p-x1));
  context.translate(-x1,-y1);
  context.lineWidth = 6;
  context.fillStyle = "brown";
  context.fillRect(x1-12,y1-15,24,30);
  context.strokeRect(x1-12,y1-15,24,30);
  context.beginPath();
  context.moveTo(x1-12,y1+15);
  context.lineTo(x1+12,y1+15);
  context.lineTo(x1,y1+25);
  context.closePath();
  context.fill();
  context.beginPath();
  context.moveTo(x1,y1+25);
  context.lineTo(x1-15,y1+45);
  context.lineTo(x1+15,y1+45);
  context.closePath();
  context.fillStyle = "rgba(255, 255, 0, 0.5)";
  context.fill();
  context.fillStyle = "gray";
  context.beginPath();
  context.arc(x1,y1,5,0,Math.PI*2);
  context.closePath();
  context.fill();
  context.restore();
  
  

}

/**
 * Setup stuff - make a "window.onload" that sets up the UI and starts
 * the train
 */
let oldOnLoad = window.onload;
window.onload = function() {
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));
  let context = canvas.getContext("2d");
  // we need the slider for the draw function, but we need the draw function
  // to create the slider - so create a variable and we'll change it later
  let slider; // = undefined;

  // Tension slider
  let tensionSlider = /** @type {HTMLInputElement} */ (document.getElementById("tension"));
  let s = Number(tensionSlider.value);
  tensionSlider.onchange = function(){
    s = Number(tensionSlider.value);
  };
  // note: we wrap the draw call so we can pass the right arguments
  function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length, s);
  }
  // create a UI
  let runcavas = new RunCanvas(canvas, wrapDraw);
  // now we can connect the draw function correctly
  slider = runcavas.range;

  // this is a helper function that makes a checkbox and sets up handlers
  // it sticks it at the end after everything else
  // you could also just put checkboxes into the HTML, but I found this more
  // convenient
  function addCheckbox(name, initial = false) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    document.getElementsByTagName("body")[0].appendChild(checkbox);
    checkbox.id = name;
    checkbox.onchange = wrapDraw;
    checkbox.checked = initial;
    let checklabel = document.createElement("label");
    checklabel.setAttribute("for", name);
    checklabel.innerText = name;
    document.getElementsByTagName("body")[0].appendChild(checklabel);
  }
  // note: if you add these features, uncomment the lines for the checkboxes
  // in your code, you can test if the checkbox is checked by something like:
  // document.getElementById("simple-track").checked
  // in your drawing code
  //
  // lines to uncomment to make checkboxes
  // addCheckbox("simple-track",false);
  // addCheckbox("arc-length",true);
  // addCheckbox("bspline",false);

  // helper function - set the slider to have max = # of control points
  function setNumPoints() {
    runcavas.setupSlider(0, thePoints.length, 0.05);
  }

  setNumPoints();
  runcavas.setValue(0);

  // add the point dragging UI
  draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);
};
