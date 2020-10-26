import React from 'react';

import StoreProvider from './store/StoreProvider';

import './App.scss';

const App = () => {
  return (
    <StoreProvider>
      <header>Hello world</header>
    </StoreProvider>
  )
};

export default App;