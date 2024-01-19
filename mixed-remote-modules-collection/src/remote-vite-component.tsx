import { useState } from 'react';

const StateFullComponent = ({ title }: { title: string }) => {
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
    </div>
  );
};

export default StateFullComponent;
