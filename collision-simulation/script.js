class  CollisionSimulation{
    constructor(){
        this.cube1 = document.getElementById('cube1');
        this.cube2 = document.getElementById('cube2');
        this.massRatioSlider = document.getElementById('mass-ratio');
        this.velocitySlider = document.getElementById('initial-velocity');
        this.speedSlider = document.getElementById('animation-speed');

        this.m1 = 1;
        this.m2 = 100;
        this.v1 = 0;
        this.v2 = 0;
        this.x1 = 500;
        this.x2 = 750;
        this.initialVelocity = 1;
        this.animationSpeed = 1;

        this.collisionCount = 0;
        this.isRunning = false;
        this.animationId = null;
        
        this.wallPosition = 100;
        this.cube1Size = 40;
        this.cube2Size = 60;

        this.setupEventListeners();
        this.updateDisplay();
        this.resetSimulation(); 

    }

    setupEventListeners() {
        this.massRatioSlider.addEventListener('input', (e) => {
            this.m2 = parseFloat(e.target.value);
            document.getElementById('mass-ratio-display').textContent = this.m2;
            this.updateDisplay();
            this.resetSimulation();
        });


        this.velocitySlider.addEventListener('input', (e) => {
            this.initialVelocity = parseFloat(e.target.value);
            document.getElementById('initial-velocity-display').textContent = this.initialVelocity;
        });

        this.speedSlider.addEventListener('input', (e) => {
            this.animationSpeed = parseFloat(e.target.value);
            document.getElementById('animation-speed-display').textContent = this.animationSpeed + 'x';
        });
    }

    updateCube2Size(){
        const scale =  Math.min(1+ Math.log10(this.m2)*0.3 , 3);
        this.cube2Size = Math.max(40, 40 * scale);
        this.cube2.style.width = `${this.cube2Size}px`;
        this.cube2.style.height = `${this.cube2Size}px`;
    }

    resetSimulation(){
        this.isRunning=false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            
        }

        this.v1 = 0;
        this.v2 = -this.initialVelocity;
        this.x1 = 500;
        this.x2 = 750;
        this.collisionCount = 0;
        this.updatePositions();
        this.updateDisplay();
        this.updateCube2Size();
        this.lastTimestamp = null;
    }

    startSimulation() {
   if(!this.isRunning){
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.animate.bind(this));

   }

    }

    stopSimulation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

  animate(timestamp) {
    if (!this.isRunning) return;

    if (!this.lastTimestamp) this.lastTimestamp = timestamp;

    let dt = (timestamp - this.lastTimestamp) * 0.01 * this.animationSpeed;
    this.lastTimestamp = timestamp;

    // Limit large dt (e.g. tab switch, lag spike)
    dt = Math.min(dt, 5);

    const substeps = 10;
    const subDt = dt / substeps;

    for (let i = 0; i < substeps; i++) {
        // Move cubes
        this.x1 += this.v1 * subDt;
        this.x2 += this.v2 * subDt;

        // Cube1 hits wall
        if (this.x1 <= this.wallPosition + 4) {
            this.x1 = this.wallPosition + 4;
            if (this.v1 < 0) {
                this.v1 = -this.v1;
                this.collisionCount++;
                this.updateDisplay();
            }
        }

        // Cube2 hits wall (rare case)
        if (this.x2 <= this.wallPosition + 4) {
            this.x2 = this.wallPosition + 4;
            if (this.v2 < 0) {
                this.v2 = -this.v2;
                this.collisionCount++;
                this.updateDisplay();
            }
        }

        // Cube collision
        if (this.x2 <= this.x1 + this.cube1Size && this.v2 < this.v1) {
            const v1_new = ((this.m1 - this.m2) * this.v1 + 2 * this.m2 * this.v2) / (this.m1 + this.m2);
            const v2_new = ((this.m2 - this.m1) * this.v2 + 2 * this.m1 * this.v1) / (this.m1 + this.m2);

            this.v1 = v1_new;
            this.v2 = v2_new;

            this.x1 = Math.max(this.wallPosition + 4, this.x2 - this.cube1Size);

            this.collisionCount++;
            this.updateDisplay();
        }
    }

    // Exit condition
    if (this.v2 > this.v1 && this.v1 >= 0 && this.v2 >= 0) {
        this.isRunning = false;
        return;
    }

    this.updatePositions();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
}



    updatePositions(){
        this.cube1.style.left = `${this.x1}px`;
        this.cube2.style.left = `${this.x2}px`;
        
    }

    updateDisplay(){
        document.getElementById('collision-count').textContent = this.collisionCount;

        let piApprox = '-';
        if (this.m2 > 0) {
            piApprox = (this.collisionCount / Math.sqrt(this.m2)).toFixed(6);
        }
        document.getElementById('pi-approximation').textContent = piApprox;

        document.getElementById('velocity1').textContent = this.v1.toFixed(2);
        document.getElementById('velocity2').textContent = this.v2.toFixed(2);
         document.getElementById('pi-digit-approx').textContent = `~${(this.collisionCount).toString().charAt(0)}.${(this.collisionCount).toString().slice(1)}`;


    }
}

const simulation = new CollisionSimulation();

function startSimulation() {
    simulation.startSimulation();
}

function stopSimulation() {
    simulation.stopSimulation();
}
function resetSimulation() {
    simulation.resetSimulation();
}