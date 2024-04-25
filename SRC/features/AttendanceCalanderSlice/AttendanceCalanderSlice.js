import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const AttendanceCalanderAction = createAsyncThunk(
  'AttendanceCalander',
  async values => {
    console.log('valuesAttendanceCalander', values);
    return axios
      .post(`${APIS.AttendaceCalanderAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const AttendanceCalanderSlice = createSlice({
  name: 'AttendanceCalander',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(AttendanceCalanderAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(AttendanceCalanderAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(AttendanceCalanderAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = AttendanceCalanderSlice.actions;

export default AttendanceCalanderSlice.reducer;
