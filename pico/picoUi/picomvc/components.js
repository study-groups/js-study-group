// Components registry
import { navComponent } from './navComponent.js';
import { outputComponent } from './outputComponent.js';
import { settingsComponent } from './settingsComponent.js';

// Function to render all components
function renderComponents() {
    navComponent.render();
    outputComponent.render();
    settingsComponent.render();
}

export { renderComponents };
