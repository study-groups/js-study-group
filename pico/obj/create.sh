# BGF for PicoObject.js
createPicoObjectJs() {
cat <<EOF > ./js/PicoObject.js
class PicoObject {
    constructor(id, type, msg) {
        this.pid = Date.now() + Math.random().toString().substr(2, 6);
        this.id = id;
        this.type = type;
        this.msg = msg;
    }

    update(msg) {
        this.msg = msg;
        const element = document.getElementById(this.id);
        if (element) {
            if (this.type === 'counter') {
                element.querySelector('.count').textContent = this.msg;
            } else {
                element.innerHTML = this.msg;
            }
        }
    }
}
EOF
}

# BGF for ReactiveFramework.js
createReactiveFrameworkJs() {
cat <<EOF > ./js/ReactiveFramework.js
class ReactiveFramework {
    constructor() {
        this.picoObjects = [];
        this.counter = 0;
        this.init();
    }

    init() {
        this.loadState();
        document.getElementById('addCounter').addEventListener('click', () => this.addCounter());
    }

    loadState() {
        const savedState = localStorage.getItem('countersState');
        console.log('Loaded state:', savedState); // Debugging line

        if (savedState) {
            const counters = JSON.parse(savedState);
            counters.forEach(counter => {
                console.log('Adding counter from saved state:', counter); // Debugging line
                this.addCounter(counter);
            });
        }
    }
    addCounter(counterState) {
        console.log('Counter added:', counterState); // Debugging line

        const counterId = counterState ? counterState.id : \`counter\${this.counter}\`;
        const count = counterState ? counterState.msg : '0';
        const counterHtml = \`
            <div id="\${counterId}" class="counter">
                <button class="dec">-</button>
                <div class="count">\${count}</div>
                <button class="inc">+</button>
            </div>
        \`;
        document.getElementById('app').innerHTML += counterHtml;

        const newCounter = new PicoObject(counterId, 'counter', count);
        this.picoObjects.push(newCounter);

        this.counter++;
        this.attachEventListeners();
        this.saveState();
    }

    attachEventListeners() {
        this.picoObjects.forEach(counterObj => {
            const counterElement = document.getElementById(counterObj.id);
            counterElement.querySelector('.inc').onclick = () => this.incrementCounter(counterObj);
            counterElement.querySelector('.dec').onclick = () => this.decrementCounter(counterObj);
        });
    }

    incrementCounter(counterObj) {
        counterObj.update(String(parseInt(counterObj.msg) + 1));
        this.saveState();
    }

    decrementCounter(counterObj) {
        counterObj.update(String(parseInt(counterObj.msg) - 1));
        this.saveState();
    }

    saveState() {
        const state = this.picoObjects.map(obj => ({ id: obj.id, msg: obj.msg }));
        localStorage.setItem('countersState', JSON.stringify(state));
    }
}
EOF
}

# BGF for main.js
createMainJs() {
cat <<EOF > ./js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const app = new ReactiveFramework();
});
EOF
}
