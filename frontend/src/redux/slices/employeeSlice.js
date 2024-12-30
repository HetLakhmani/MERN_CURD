import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
  const response = await axios.get('http://localhost:5000/api/employees');
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      });
  },
});

export default employeeSlice.reducer;
