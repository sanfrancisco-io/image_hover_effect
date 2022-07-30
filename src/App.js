import React from 'react';
import Gallery from './components/Gallery';
import CustomCursor from './Custom';
import CursorManager from './Custom/CursorManager';

function App() {
  return (
    <>
      <CursorManager>
        <CustomCursor />
        <div className='main-container'>
          <Gallery />
        </div>
      </CursorManager>
    </>
  );
}

export default App;
