import { configureStore, createSlice } from '@reduxjs/toolkit'
import { extractPdf } from './async-thunk';

export interface IExtractedDataSlice {
    isLoading: boolean,
    data: string,
    isError: boolean
}

interface ReduxAction<T, P> {
    readonly type: T;
    readonly payload: P;
}

const extractedDataSlice = createSlice({
    name: "extractedData",
    initialState: {
     isLoading: false,
     data: '',
     isError: false
    },
    reducers: {},
    extraReducers: (builder) => {
     builder.addCase(extractPdf.pending, (state) => {
      state.isLoading = true;
     })
     builder.addCase(extractPdf.fulfilled, (state, action: ReduxAction<string, string>) => {
      state.isLoading = false;
      state.data = action.payload;
     })
     builder.addCase(extractPdf.rejected, (state) => {
      state.isError = true;
     })
    }
   });

export default extractedDataSlice.reducer