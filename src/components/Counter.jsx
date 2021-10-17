import React, {useState} from 'react';

const Counter = () => {
    function increment() {
        setCount(count + 1);
    }
    function decrement() {
        setCount(count - 1)
    }

    const [count, setCount] = useState(0);
    return (
        <div>
            <h1 className="post" >{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Increment</button>
        </div>
    );
};

export default Counter;