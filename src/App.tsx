import React from 'react';

import { themeClass, exampleStyle } from './index.css';

function App(): JSX.Element {


  return (
    <div className={`${themeClass}`}>
      <h1 className={`${exampleStyle}`}>Hello world!!</h1>
    </div>
  );
}

export default App;
