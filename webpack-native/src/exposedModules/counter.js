import React from 'react';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Webpack Native Counter</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>Add</button>
      </div>
      <div>
        <p>
          <strong>Count:</strong> {count}
        </p>
      </div>
    </div>
  );
};

export default Counter;
