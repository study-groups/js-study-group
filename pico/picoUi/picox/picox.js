//const picoDebug=(()=> true)();
const picoDebug=false;

class PicoX {
    constructor() {
        this.currentReaction = null;
        this.reactions = new Map();
        this.reactionFunctions = new Map();

    }

    observable(obj) {
        const picox = this;
        return new Proxy(obj, {
            get(target, key) {
                picoDebug && console.log(`Getting property ${key}`);
                if (picox.currentReaction) {
                    if (!picox.reactions.has(key)) {
                        picox.reactions.set(key, new Set());
                    }
                    picox.reactions.get(key).add(picox.currentReaction);
                }
                return target[key];
            },
            set(target, key, value) {
                if (target[key] === value) {
                    return true; // No value change, no need to trigger reactions
                }
               picoDebug && console.log(`Setting property ${key} to ${value}`);
                target[key] = value;
                if (picox.reactions.has(key)) {
                    picox.reactions.get(key).forEach(reaction => reaction());
                }
                return true;
            }
        });
    }


    reaction(observableFn, reactionFn) {
        this.currentReaction = reactionFn;
        observableFn();
        // Store the reaction function with a unique identifier
        const reactionId = Date.now()
        this.reactionFunctions.set(reactionId, reactionFn);
        this.currentReaction = null;
        return reactionId; // Return the identifier for later reference
    }

    removeReaction(reactionId) {
        const reactionFn = this.reactionFunctions.get(reactionId);
        if (reactionFn) {
            this.reactions.forEach(reactionsSet => {
                reactionsSet.delete(reactionFn);
            });
            this.reactionFunctions.delete(reactionId);
        }
    }

    reactionOLD(observableFn, reactionFn) {
        this.currentReaction = reactionFn; // Set current reaction to the reaction function
        observableFn(); // Run observable function to register the reaction
        this.currentReaction = null; // Clear current reaction
    }
}

/*
class PicoData {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class PicoObject {
    constructor(id, domId, type, data) {
        this.id = id;
        this.domId = domId;
        this.type = type;
        this.data = data;
    }
}
*/