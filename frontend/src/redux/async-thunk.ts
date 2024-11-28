import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// export const extractPdf = createAsyncThunk<string, void>("fetchTodos", async () => {
//     return 'asd'
    
//     const response = await axios.get('localhost:3001/extract-pdf')
//     .then((response) => {
//         return response
//     });
//     return response.data;
//   },
    // axios.post('localhost:3001/extract-pdf', {
    //     pdfData: pdfData,
    //   })
    //   .then(function (response) {
    //     return response;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
//  );

export const extractPdf = createAsyncThunk<string, void>(
    'pdf/extract', 
    async () => {
      try {
        const response = await axios.get('http://localhost:3001/extract-pdf');
        console.log(response)
        return response.data;
      } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
          throw error.response?.data.message || 'PDF extraction failed';
        }
        throw error;
      }
    }
  );