// Navigation component
import { state, updateState } from './state.js';

const navComponent = (() => {
    const render = () => {
        const navbar = document.getElementById('navbar');
        navbar.innerHTML = `
            <ul>
                <li><strong>PicoUI</strong></li>
            </ul>
            <ul>
                <li><a href="#" data-mode="input">Input</a></li>
                <li><a href="#" data-mode="output">Output</a></li>
                <li><a href="#" data-mode="settings">Settings</a></li>
            </ul>`;

        // Event listeners for navigation links
        const links = navbar.querySelectorAll('a[data-mode]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const mode = link.getAttribute('data-mode');
                updateState('currentMode', mode);
                // Placeholder for component rendering based on mode
                console.log('Mode changed to:', mode);
            });
        });
    };

    return { render };
})();

export { navComponent };
