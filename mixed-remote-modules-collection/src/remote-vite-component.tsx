import { useState } from 'react';
import { useCount, useDecrement, useIncrement } from 'shared-package';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const StateFullComponent = ({ title }: { title: string }) => {
  const count = useCount();
  const increment = useIncrement();
  const decrement = useDecrement();
  const [value, setValue] = useState('');
  return (
    <div>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      <Typography>Stateful component</Typography>
      <div>
        <TextField
          placeholder="Type something"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <Typography>
          <Typography variant="caption" component="strong">
            Value:
          </Typography>{' '}
          {value}
        </Typography>
      </div>
      <Divider />
      <div>
        <Typography component="h2" variant="h4">
          Counter from singleton react context
        </Typography>
        <Typography>
          <Typography variant="caption" component="strong">
            Count:
          </Typography>{' '}
          {count}
        </Typography>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>
    </div>
  );
};

export default StateFullComponent;
