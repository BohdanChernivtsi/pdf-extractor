import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { extractPdf } from './redux/async-thunk';
import { IExtractedDataSlice } from './redux/extracted-data.slice';

function App() {
  const extractedData = useSelector((state: { extractedData: IExtractedDataSlice} ) => state.extractedData)
  const dispatch = useDispatch()

  const extractDataHandler = () => {
    const data = null
    dispatch(extractPdf() as any)
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" id="avatar" name="avatar" accept="application/pdf" />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Select how to extract data:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="text"
            name="radio-buttons-group"
          >
            <FormControlLabel value="text" control={<Radio />} label="Text" />
            <FormControlLabel value="textArea" control={<Radio />} label="TextArea" />
          </RadioGroup>
        </FormControl>
        <button onClick={extractDataHandler}>Extract data</button>
        {extractedData?.isLoading && <><b>Loading...</b></>}
        <div>{extractedData.isError ? <p>Error happened</p> : extractedData.data}</div>

      </header>
    </div>
  );
}

export default App;
