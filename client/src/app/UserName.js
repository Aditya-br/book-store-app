import { createSlice } from '@reduxjs/toolkit'

export const UserName = createSlice({
  name: 'username',
  initialState: {
    value:""
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { update } = UserName.actions
export default UserName.reducer
