import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const UploadStdAttendanceAction = createAsyncThunk(
  'UploadAttendance',
  async ({values, authKeyParam}) => {
    console.log('valuesUploadAttendance', values, authKeyParam);
    return axios
      .post(`${APIS.UploadAttendance}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
          s_auth_key: authKeyParam,
        },
      })
      .then(response => response.data);
  },
);

const UploadAttendanceSlice = createSlice({
  name: 'UploadAttendance',
  initialState,
  reducers: {
    clearAllStateTeacherAttendanceUpload: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(UploadStdAttendanceAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(UploadStdAttendanceAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(UploadStdAttendanceAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.result?.students?.students;
    });
  },
});

export const {clearAllStateTeacherAttendanceUpload} =
  UploadAttendanceSlice.actions;

export default UploadAttendanceSlice.reducer;
