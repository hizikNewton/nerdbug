// Define the action types
type Action = { type: 'increment' } | { type: 'decrement' };

// Define the reducer function
const dataReducer = (state: number, action: Action): number => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

/* 
// Define the initial state
const initialState = 0;

// Component using useReducer
const Counter: React.FC = () => {
  // useReducer returns the current state and a dispatch function
  const [count, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

 */export default dataReducer;
