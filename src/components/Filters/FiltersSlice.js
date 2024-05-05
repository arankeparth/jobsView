import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: {
        'roles': [],
        'numEmployees': null,
        'company': null,
        'location': null,
        'min_experience': null,
        'max_experience': null,
        'min_salary': null,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.value[action.payload['key']] = action.payload['value']
    },
  },
})

// Action creators are generated for each case reducer function
export const {setFilter} = filterSlice.actions

export default filterSlice.reducer