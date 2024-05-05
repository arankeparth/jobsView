import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: {
        'roles': [],
        'numEmployees': null,
        'company': null,
        'location': null,
        'workstyle': null,
        'min_experience': null,
        'max_experience': null,
        'min_salary': null,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      // Fetching the key and value from the individual filter and setting those values in the final filter
      state.value[action.payload['key']] = action.payload['value']
    },
  },
})


export const {setFilter} = filterSlice.actions

export default filterSlice.reducer