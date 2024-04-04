// Settings component
import { state, updateState } from './state.js';

const settingsComponent = (() => {
    const render = () => {
        const settingsElement = document.getElementById('settings');
        // Example settings form
        settingsElement.innerHTML = `
            <h2>Settings</h2>
            <form id="settingsForm">
                <label for="theme">Theme:</label>
                <select id="theme" name="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                <button type="submit">Save</button>
            </form>`;

        // Load current settings
        document.getElementById('theme').value = state.settings.theme || 'light';

        // Event listener for settings form
        document.getElementById('settingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const theme = document.getElementById('theme').value;
            updateState('settings', { ...state.settings, theme: theme });
            // Placeholder for applying theme
            console.log('Settings updated:', state.settings);
        });
    };

    return { render };
})();

export { settingsComponent };
