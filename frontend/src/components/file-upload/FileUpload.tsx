import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import './FileUpload.css';

interface FileUploadAndRadioButtonsProps {
  radioSelected: string;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadAndRadioButtonsProps> = ({ 
  radioSelected, 
  handleRadioChange, 
  handleFileChange 
}) => {
  return (
    <div className='main-row'>
      <input 
        type="file" 
        accept=".pdf" 
        onChange={handleFileChange} 
      />

      <FormControl>
        <FormLabel className='demo-radio-buttons-group-label' id="demo-radio-buttons-group-label">
          Select how to extract data:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={radioSelected}
          onChange={handleRadioChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value="text" control={<Radio />} label="Text" />
          <FormControlLabel value="textArea" control={<Radio />} label="TextArea" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default FileUpload;
