// state.js
const picoState = (() => {
    let state = {}; // private variable

    function loadState() {
        const defaultState = { mode: 'input' };
        const stateKey = 'appState';

        try {
            const savedState = localStorage.getItem(stateKey);

            if (savedState) {
                const parsedState = JSON.parse(savedState);
                return parsedState;
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error('Error parsing state:', error);
            } else {
                console.error('Error loading state:', error);
            }
        }

        console.warn('No saved state found. Using default state.');
        return defaultState;
    }

    function saveState(state) {
        const stateKey = 'appState'; // Consistent key for localStorage
        try {
            const stateToSave = Object.keys(state).reduce((obj, key) => {
                obj[key] = state[key];
                return obj;
            }, {});

            localStorage.setItem(stateKey, JSON.stringify(stateToSave));
            console.log('Saved state to localStorage:', stateToSave);

        } catch (error) {
            console.error('Error saving state to localStorage:', error.message);
            console.error('Failed state:', state);
        }
    }

    function setState(newState) {
        Object.assign(state, newState);
        saveState();
    }

    // Load state when module is initialized
    state = loadState();

    // Reveal public methods
    return {
        loadState,
        saveState,
        setState
    };
})();
