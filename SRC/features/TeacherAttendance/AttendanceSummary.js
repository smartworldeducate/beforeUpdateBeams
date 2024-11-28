import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const AttendanceSummaryAction = createAsyncThunk(
  'AttendanceSummary',
  async ({values, authKeyParam}) => {
    console.log('valuesAttendanceSummary', values);
    return axios
      .post(`${APIS.AttendanceSummary}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
          s_auth_key: authKeyParam,
        },
      })
      .then(response => response.data);
  },
);

const AttendanceSummarySlice = createSlice({
  name: 'AttendanceSummary',
  initialState,
  reducers: {
    clearAllStateAttendanceSummary: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(AttendanceSummaryAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(AttendanceSummaryAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(AttendanceSummaryAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.result;
    });
  },
});

export const {clearAllStateAttendanceSummary} = AttendanceSummarySlice.actions;

export default AttendanceSummarySlice.reducer;
