import * as React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { extractPdf } from './redux/async-thunk';
import { IExtractedDataSlice } from './redux/extracted-data.slice';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ContentDisplay from './components/content-display/ContentDisplay';
import FileUpload from './components/file-upload/FileUpload';

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
        <FileUpload
          radioSelected={radioSelected}
          handleRadioChange={handleRadioChange}
          handleFileChange={handleFileChange}
        />
        
        <Button variant="contained" disabled={!file} onClick={extractDataHandler} className='extract-button'>Extract data</Button>

        <ContentDisplay
          radioSelected={radioSelected}
          extractedData={extractedData}
          pdfContent={pdfContent}
          handlePdfChange={handlePdfChange}
        />

      </header>
    </div>
  );
}

export default App;
