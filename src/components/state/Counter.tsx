import { useReducer } from "react";

type State = {
    count: number;
};

// type Action = {
//     type: string
//     payload?: number
// }

// #Kiểu Union:
// type Action =
//     | { type: 'increment'; payload?: number }
//     | { type: 'decrement'; payload?: number }
//     | { type: 'reset'; payload?: number };

// #Kiểu Literal Union:
type Action = {
    type: 'increment' | 'decrement' | 'reset'
    payload?: number
}

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { count: state.count + (action.payload || 1) };
        case 'decrement':
            return { count: state.count - (action.payload || 1) };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            useReducer Hook
            <h4>Count: {state.count}</h4>
            <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
                Increment by 10
            </button>
            <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>
                Decrement by 5
            </button>
            <button onClick={() => dispatch({ type: 'reset'})}>
                Reset 0
            </button>
        </div>
    );
}

export default Counter;