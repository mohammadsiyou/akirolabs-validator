import React from 'react';

import './App.css';
import SingleToken from './single-token/SingleToken';
import MultiTokens from './tokens/MultiTokens';

function App() {
  return (
    <div className='App'>
      <h1>Token Generation</h1>
      <SingleToken />
      <div className='margin' />
      <MultiTokens />
    </div>
  );
}

export default App;
