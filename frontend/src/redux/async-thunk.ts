import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const extractPdf = createAsyncThunk<string, React.ChangeEvent<HTMLInputElement>>('', async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    try {
      const response = await axios.post('http://localhost:3001/extract-pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Upload error:', error.response ? error.response.data : error);
    }
  })