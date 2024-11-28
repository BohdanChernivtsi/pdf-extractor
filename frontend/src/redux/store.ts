import { configureStore } from '@reduxjs/toolkit'
import extractedDataReducer from './extracted-data.slice'

export default configureStore({
  reducer: {
    extractedData: extractedDataReducer
  }
})