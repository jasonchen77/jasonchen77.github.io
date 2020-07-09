
// @ts-check
/* jshint -W069, esversion:6 */


class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {string} color - color
     * 
     */
    constructor(x, y, vx, vy, color = "blue") {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        //context.fillRect(-5, -5, 10, 10);
        if(this.vx==1 && this.vy ==0){
            context.rotate(90*Math.PI/180);
        }
        else if(this.vx==0 && this.vy==1){
            context.rotate(180*Math.PI/180);
        }
        else if(this.vx==-1 && this.vy==0){
            context.rotate(270*Math.PI/180);
        }
        else if(this.vx==1 && this.vy==-1){
            context.rotate(45*Math.PI/180);
        }
        else if(this.vx==1 && this.vy==1){
            context.rotate(135*Math.PI/180);
        }
        else if(this.vx==-1 && this.vy==1){
            context.rotate(225*Math.PI/180);
        }
        else if(this.vx==-1 && this.vy==-1){
            context.rotate(315*Math.PI/180);
        }
        context.beginPath();
        context.moveTo(10,0);
        context.lineTo(15, 20);
        context.lineTo(5, 20);
        context.closePath();
        context.fillStyle = this.color;
        context.strokeStyle = "black";
        context.fill();
        context.stroke();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        /*

        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
        */
        for(let i=0; i<flock.length; i++){
            if(Math.abs(flock[i].x - this.x)<30 && Math.abs(flock[i].y - this.y)<30){
                //this.vx = flock[i].vx;
                //this.vy = flock[i].vy;

                //Clockwise
                if((this.vx==1 && this.vy==0) && (flock[i].vx==0 && flock[i].vy==1)){
                    this.vy = 1;
                }
                else if((this.vx==0 && this.vy==1) && (flock[i].vx==-1 && flock[i].vy==0)){
                    this.vx = -1;
                }
                else if((this.vx==-1 && this.vy==0) && (flock[i].vx==0 && flock[i].vy==-1)){
                    this.vy = -1;
                }
                else if((this.vx==0 && this.vy==-1) && (flock[i].vx==1 && flock[i].vy==0)){
                    this.vx = 1;
                }
                //Counter-clockwise
                else if((this.vx==1 && this.vy==0) && (flock[i].vx==0 && flock[i].vy==-1)){
                    this.vy = -1;
                }
                else if((this.vx==0 && this.vy==-1) && (flock[i].vx==-1 && flock[i].vy==0)){
                    this.vx = -1;
                }
                else if((this.vx==-1 && this.vy==0) && (flock[i].vx==0 && flock[i].vy==1)){
                    this.vy = 1;
                }
                else if((this.vx==0 && this.vy==1) && (flock[i].vx==1 && flock[i].vy==0)){
                    this.vx = -1;
                }
                //Diagnals
                //Clockwise
                else if((this.vx==1 && this.vy==-1) && (flock[i].vx==1 && flock[i].vy==1)){
                    this.vx = 1;
                    this.vy = 0;
                }
                else if((this.vx==1 && this.vy==1) && (flock[i].vx==-1 && flock[i].vy==1)){
                    this.vx = 0;
                    this.vy = 1;
                }
                else if((this.vx==-1 && this.vy==1) && (flock[i].vx==-1 && flock[i].vy==-1)){
                    this.vx = -1;
                    this.vy = 0;
                }
                else if((this.vx==-1 && this.vy==-1) && (flock[i].vx==1 && flock[i].vy==-1)){
                    this.vx = 0;
                    this.vy = -1;
                }
                //Counter-clockwise
                else if((this.vx==1 && this.vy==-1) && (flock[i].vx==-1 && flock[i].vy==-1)){
                    this.vx = 0;
                    this.vy = -1;
                }
                else if((this.vx==-1 && this.vy==-1) && (flock[i].vx==-1 && flock[i].vy==1)){
                    this.vx = -1;
                    this.vy = 0;
                }
                else if((this.vx==-1 && this.vy==1) && (flock[i].vx==1 && flock[i].vy==1)){
                    this.vx = 0;
                    this.vy = 1;
                }
                else if((this.vx==1 && this.vy==1) && (flock[i].vx==1 && flock[i].vy==-1)){
                    this.vx = 1;
                    this.vy = 0;
                }

                

            }
            
        }
        
    }
}

function drawObstacle(context){
    context.save();
    context.fillStyle = "green";
    context.fillRect(500,500,100,100);
    context.restore();
}

window.onload = function () {
    /** @type Array<Boid> */
    let theBoids = [];

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        theBoids.forEach(boid => boid.draw(context));
        drawObstacle(context);
    }

    /**
  
     */
    let xyVelTF = false;
    let xyVelTF2 = false;
    for(let i=0; i<10; i++){
        let pnX = Math.random() < 0.5 ? -1 : 1;
        let pnY = Math.random() < 0.5 ? -1 : 1;
        let xValue = Math.floor(Math.random()*600);
        let yValue = Math.floor(Math.random()*600);
        let xVelocity = Math.floor(Math.random()*2)*pnX;
        let yVelocity = Math.floor(Math.random()*2)*pnY;
        if(xVelocity==0 && yVelocity==0 && xyVelTF == false){
            if(xyVelTF2==false){
                xVelocity = 1;
                xyVelTF = !xyVelTF;
                xyVelTF2 = !xyVelTF2;
            }
            else{
                xVelocity = -1;
                xyVelTF = !xyVelTF;
                xyVelTF2 = !xyVelTF2;
            }
        }
        else {
            if(xyVelTF2==false){
                yVelocity = 1;
                xyVelTF = !xyVelTF;
                xyVelTF2 = !xyVelTF2;
            }
            else{
                yVelocity = -1;
                xyVelTF = !xyVelTF;
                xyVelTF2 = !xyVelTF2;
            }
        }
        theBoids.push(new Boid(xValue,yValue,xVelocity,yVelocity));
    }

    /*
    theBoids.push(new Boid(100, 100));
    theBoids.push(new Boid(200, 200, -1, 0));
    theBoids.push(new Boid(300, 300, 0, -1));
    theBoids.push(new Boid(400, 400, 0, 1)); */

    /**
     * Handle the buttons
     */
 
    document.getElementById("add").onclick = function () {
        
        for(let i=0; i<10; i++){
            let pnX = Math.random() < 0.5 ? -1 : 1;
            let pnY = Math.random() < 0.5 ? -1 : 1;
            let xValue = Math.floor(Math.random()*600);
            let yValue = Math.floor(Math.random()*600);
            let xVelocity = Math.floor(Math.random()*2)*pnX;
            let yVelocity = Math.floor(Math.random()*2)*pnY;
            if(xVelocity==0 && yVelocity==0 && xyVelTF == false){
                if(xyVelTF2==false){
                    xVelocity = 1;
                    xyVelTF = !xyVelTF;
                    xyVelTF2 = !xyVelTF2;
                }
                else{
                    xVelocity = -1;
                    xyVelTF = !xyVelTF;
                    xyVelTF2 = !xyVelTF2;
                }
            }
            else {
                if(xyVelTF2==false){
                    yVelocity = 1;
                    xyVelTF = !xyVelTF;
                    xyVelTF2 = !xyVelTF2;
                }
                else{
                    yVelocity = -1;
                    xyVelTF = !xyVelTF;
                    xyVelTF2 = !xyVelTF2;
                }
            }
            theBoids.push(new Boid(xValue,yValue,xVelocity,yVelocity));
        }
    };
    document.getElementById("clear").onclick = function () {
        
        theBoids = [];
    };


    /**
     * The Actual Execution
     */
    function loop() {
        // change directions
        theBoids.forEach(boid => boid.steer(theBoids));
        // move forward
        let speed = Number(speedSlider.value);
        theBoids.forEach(function (boid) {
            boid.x += boid.vx * speed;
            boid.y += boid.vy * speed;
        });
        // make sure that we stay on the screen
        theBoids.forEach(function (boid) {
            /**
             * Students should replace this with collision code
             */
            /* boid.x = boid.x % canvas.width;
            boid.y = boid.y % canvas.height;
            if (boid.x < 0) boid.x += canvas.width;
            if (boid.y < 0) boid.y += canvas.height; */

            if(boid.x > canvas.width-20 || boid.x < 20){
                boid.vx = -boid.vx;
                boid.color = "red";
                setTimeout(function(){
                    boid.color = "blue";
                }, 500);
            }
            if(boid.y > canvas.height-20 || boid.y < 20){
                boid.vy = -boid.vy;
                boid.color = "red";
                setTimeout(function(){
                    boid.color = "blue";
                }, 500);
            }
            if(boid.x > (500-10) && boid.y > (500-10)){
                boid.vx = -boid.vx;
                boid.vy = -boid.vy;
                boid.color = "red";
                setTimeout(function(){
                    boid.color = "blue";
                }, 500);
            }
            

        });
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);

    }
    loop();
};