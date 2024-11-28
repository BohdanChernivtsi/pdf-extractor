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
import { useState } from 'react';

function App() {
  const [file, setFile] = useState<any>(null);
  const [radioSelected, setRadioSelected] = React.useState('text');
  const extractedData = useSelector((state: { extractedData: IExtractedDataSlice} ) => state.extractedData)
  const dispatch = useDispatch()

  const extractDataHandler = () => {
    dispatch(extractPdf(file) as any)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioSelected((event.target as HTMLInputElement).value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Select how to extract data:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="text"
            name="radio-buttons-group"
            value={radioSelected}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="text" control={<Radio />} label="Text" />
            <FormControlLabel value="textArea" control={<Radio />} label="TextArea" />
          </RadioGroup>
        </FormControl>
        <button disabled={!file} onClick={extractDataHandler}>Extract data</button>
        { radioSelected == 'text' ?
        extractedData.data
        : <textarea name="postContent" value={extractedData.data}/>
        }

        { extractedData?.isLoading && <b>Loading...</b> }
        
        <div>{extractedData.isError && <p>Error happened</p> }</div>

      </header>
    </div>
  );
}

export default App;
