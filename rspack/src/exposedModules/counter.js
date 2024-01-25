import React from 'react';
import Button from '@mui/material/Button';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>RSPACK Counter</h1>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>Add</Button>
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
