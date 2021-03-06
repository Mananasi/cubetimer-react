export default class StateMachine {
    /*

    {
        intitial: 'idle',
        states: {
            'idle': {
                next: 'inspection',
                function: () => {
                    // do things
                }
            },
            'inspection': {
                next: 'solving',
                function: () => {
                    // do things
                }
            },
            etc...
        }
    }
    */
    constructor({initial, states}) {
        let newStates = {};
        if(states === undefined) console.trace();
        for(const [key, value] of Object.entries(states)) {
            newStates[key] = {
                name: key,
                next: value.next,
                function: value.function
            };
        }
        this.defaultState = initial;

        this.states = newStates;
        this.currState = this.states[this.defaultState];

        this.currState.function();
        // console.log(this.currState);
    }

    static getDummyStatemachine() {
        return new StateMachine({
            initial: 'dummy',
            states: {
                'dummy': {
                    next: 'dummy',
                    function: () => {}
                }
            }
        });
    }

    runFunction() {
        this.currState.function();
    }

    nextState() {
        let nextState;
        if(typeof(this.currState.next) == 'function') {
            nextState = this.currState.next();
        } else {
            nextState = this.currState.next;
        }
        this.currState = this.states[nextState];
        this.currState.function();
    }

    getState() {
        return this.currState.name;
    }

    reset() {
        this.currState = this.states[this.defaultState];
        this.currState.function();
    }

}