import React from 'react';

import { themeClass } from './index.css';
import Stake from './stake/Stake';

function App(): JSX.Element {


  return (
    <div className={`${themeClass}`}>
      <Stake />
    </div>
  );
}

export default App;
