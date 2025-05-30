import { createSlice } from '@reduxjs/toolkit'

export const LoginName = createSlice({
  name: 'loginname',
  initialState: {
    value: ""
  },
  reducers: {
    update: (state, name) => {
      state.value=name.payload
    }
  }
})
export const {update} = LoginName.actions

export default LoginName.reducer