import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: null,
  isLoading: false,
};

export const AttendenceNotMarkedAction = createAsyncThunk(
  'AttendenceNotMarked',
  async values => {
    console.log('valuesAttendenceNotMarked', values);
    return axios
      .post(`${APIS.AttendenceNotMarkedAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        },
      })
      .then(response => response.data);
  },
);

const AttendenceNotMarkedSlice = createSlice({
  name: 'AttendenceNotMarked',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(AttendenceNotMarkedAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(AttendenceNotMarkedAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(AttendenceNotMarkedAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = AttendenceNotMarkedSlice.actions;

export default AttendenceNotMarkedSlice.reducer;
