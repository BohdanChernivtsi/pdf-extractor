import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const extractedData = ''
  const extractDataHandler = () => {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="file" id="avatar" name="avatar" accept="application/pdf" />
        <fieldset>
          <legend>Select how to output data:</legend>

          <div>
            <input type="radio" id="huey" name="drone" value="huey" checked />
            <label for="huey">Text</label>
          </div>

          <div>
            <input type="radio" id="dewey" name="drone" value="dewey" />
            <label for="dewey">TextArea</label>
          </div>
        </fieldset>
        <button onClick={extractDataHandler}>Extract data</button>
        <div>{extractedData}</div>

      </header>
    </div>
  );
}

export default App;
