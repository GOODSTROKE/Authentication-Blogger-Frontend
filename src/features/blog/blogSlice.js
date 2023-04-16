import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    makeSearch: (state, action) => {
      state.search = action.payload
    },
  },
})

export const { makeSearch } = blogSlice.actions
export default blogSlice.reducer
