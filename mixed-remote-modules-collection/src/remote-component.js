import React from 'react';
import { useState } from 'react';

const StateFullComponent = ({ title }) => {
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

const prepareComponent = (title) => {
  if (!title) {
    throw new Error('Title is required');
  }
  const Component = () => <StateFullComponent title={title} />;
  Component.displayName = 'StateFullComponent' + title.replace(/\s/g, '');
  return Component;
};

export default prepareComponent;
