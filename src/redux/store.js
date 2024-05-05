import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../components/Filters/FiltersSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
  },
})