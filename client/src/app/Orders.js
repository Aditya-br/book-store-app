import { createSlice } from '@reduxjs/toolkit';

export const Orders = createSlice({
  name: 'orders',
  initialState: {
    value: []
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((order) => order._id !== action.payload);
    },
    removeall: (state) => {
      state.value = [];
    }
  }
});

export const { add,remove,removeall} = Orders.actions;

export default Orders.reducer;
