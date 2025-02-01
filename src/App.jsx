import React, { useState } from 'react';  // Import useState from React
import './App.css';
import Hero from './components/custom/Hero';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/*Hero 8*/}
      <Hero/>
    </>
  );
}

export default App;
