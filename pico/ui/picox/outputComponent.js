class OutputComponent {
    constructor(elementId, app) {
        this.element = document.getElementById(elementId);
        this.app = app;
        this.limit = 10;
        this.picoObjects = [];
        this.isRendering = false;
        this.lastRenderTime = performance.now();
        this.frameCount = 0;
        this.render = this.render.bind(this); // Bind once for performance
    }

    startRendering() {
        if (!this.isRendering) {
            this.isRendering = true;
            this.then = performance.now();
            requestAnimationFrame(this.render);
        }
    }

    stopRendering() {
        this.isRendering = false;
    }

    calculateFPS(now) {
        this.frameCount++;
        const deltaTime = now - this.lastRenderTime;
        if (deltaTime > 1000) {
            const fps = this.frameCount / (deltaTime / 1000);
            console.log(`FPS: ${fps}`);
            this.frameCount = 0;
            this.lastRenderTime = now;
        }
    }

    updateDOM(displayObjects) {
        this.element.innerHTML = `<div class="outputComponent"><article></article></div>`; // Clear the existing content
        const articleElement = this.element.querySelector('article');
        displayObjects.forEach(obj => {
            const newElement = document.createElement('div');
            newElement.textContent = obj.data ? `dT: ${obj.delta}, Type: ${obj.type}, x: ${obj.data.x}, y: ${obj.data.y}` : `dT: ${obj.delta}, Type: ${obj.type}, x: undefined, y: undefined`;
            articleElement.appendChild(newElement);
        });
    }

    render(now) {
        if (!this.isRendering) return;
        this.calculateFPS(now);
        const displayObjects = this.picoObjects.slice(-this.limit).map((obj, index, arr) => {
            obj.delta = index === 0 ? 0 : obj.id - arr[index - 1].id;
            return obj;
        });
        this.updateDOM(displayObjects);
        requestAnimationFrame(this.render);
    }

    updateObj(picoObj) {
        if (typeof picoObj !== 'object' || !picoObj.hasOwnProperty('id')) return;
        this.picoObjects.push(JSON.parse(JSON.stringify(picoObj)));
        if (this.picoObjects.length > this.limit) {
            this.picoObjects.shift();
        }
    }
}