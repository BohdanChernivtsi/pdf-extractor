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
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [file, setFile] = useState<any>(null);
  const [pdfContent, setPdfContent] = useState<any>('');
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

  const handlePdfChange = (event: any) => {
    
  };

  useEffect(() => {
    if (extractedData && !extractedData.isError) {
      setPdfContent(extractedData.data)
    }
  }, [extractedData]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <FormControl>
          <FormLabel className='demo-radio-buttons-group-label' id="demo-radio-buttons-group-label">Select how to extract data:</FormLabel>
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
        
        <Button variant="contained" disabled={!file} onClick={extractDataHandler} className='extract-button'>Extract data</Button>

        { radioSelected == 'text' ?
        extractedData.data
        : <textarea value={pdfContent} onChange={handlePdfChange} rows={30} cols={50} className='extract-textArea'/>
        }

        { extractedData?.isLoading && <b>Loading...</b> }
        
        <div>{extractedData.isError && <p>Error happened</p> }</div>

      </header>
    </div>
  );
}

export default App;
