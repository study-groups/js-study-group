// Output component
import { state } from './state.js';

const outputComponent = (() => {
    const render = () => {
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `<h2>Output</h2><p>${state.output}</p>`;
    };

    return { render };
})();

export { outputComponent };
