// State management and local storage interaction
const state = {
    input: '',
    output: '',
    settings: {}
};

// Function to update state and save to local storage
function updateState(key, value) {
    state[key] = value;
    localStorage.setItem('appState', JSON.stringify(state));
}

// Function to load state from local storage
function loadState() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
        Object.assign(state, JSON.parse(savedState));
    }
}

// Initial state load
loadState();

// Expose state management functions
export { state, updateState, loadState };
