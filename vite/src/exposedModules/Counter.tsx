import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Vite Counter</h1>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>Add</Button>
      </div>
      <div>
        <Typography>
          <strong>Count:</strong> {count}
        </Typography>
      </div>
      <Divider />
    </div>
  );
};

export default Counter;
