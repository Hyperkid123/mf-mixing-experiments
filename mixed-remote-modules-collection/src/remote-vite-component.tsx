import { useState } from 'react';
import { useCount, useDecrement, useIncrement } from 'shared-package';

const StateFullComponent = ({ title }: { title: string }) => {
  const count = useCount();
  const increment = useIncrement();
  const decrement = useDecrement();
  const [value, setValue] = useState('');
  return (
    <div>
      <h1>{title}</h1>
      <p>Statefull component</p>
      <div>
        <input
          placeholder="Type something"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <p>
          <strong>Value:</strong> {value}
        </p>
      </div>
      <hr />
      <div>
        <h2>Counter from singleton react context</h2>
        <p>
          <strong>Count:</strong> {count}
        </p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
};

export default StateFullComponent;
