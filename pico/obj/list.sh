cat <<EOF > js/PicoList.js
class PicoList {
    constructor() {
        this.elements = [];
        this.currentElement = null;
    }

    addElement(element) {
        this.elements.push(element);
        if (!this.currentElement) {
            this.setCurrentElement(element);
        }
    }

    setCurrentElement(element) {
        if (this.currentElement) {
            this.currentElement.unsetAsCurrent();
        }
        this.currentElement = element;
        element.setAsCurrent();
    }

    deleteCurrentElement() {
        if (this.currentElement) {
            const index = this.elements.indexOf(this.currentElement);
            if (index > -1) {
                this.elements.splice(index, 1);
                this.currentElement.destroy();
                this.currentElement = null;

                // Set the next element as current if available
                if (this.elements.length > 0) {
                    this.setCurrentElement(this.elements[0]);
                }
            }
        }
    }
}
EOF

cat <<EOF > js/PicoElement.js
class PicoElement extends PicoObject {
    constructor(id, type, msg) {
        super(id, type, msg);
        this.createStructure();
    }

    createStructure() {
        const element = document.getElementById(this.id);
        element.innerHTML = \`
            <div class="left-section">-</div>
            <div class="middle-section">\${this.msg}</div>
            <div class="right-section">+</div>
        \`;
    }

    setAsCurrent() {
        const element = document.getElementById(this.id);
        element.style.border = "2px solid blue";
    }

    unsetAsCurrent() {
        const element = document.getElementById(this.id);
        element.style.border = "none";
    }

    destroy() {
        const element = document.getElementById(this.id);
        if (element) {
            element.remove();
        }
    }
}
EOF
