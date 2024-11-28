import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const TeacherClassesAction = createAsyncThunk(
  'TeacherClasses',
  async ({values, authKeyFromHomeAPIHere}) => {
    console.log('valuesTeacherClasses', values, authKeyFromHomeAPIHere);
    return axios
      .post(`${APIS.TeacherClasses}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
          s_auth_key: authKeyFromHomeAPIHere,
        },
      })
      .then(response => response.data);
  },
);

const TeacherClassesSlice = createSlice({
  name: 'TeacherClasses',
  initialState,
  reducers: {
    clearAllStateTeacherAttendance: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(TeacherClassesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(TeacherClassesAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(TeacherClassesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.result;
    });
  },
});

export const {clearAllStateTeacherAttendance} = TeacherClassesSlice.actions;

export default TeacherClassesSlice.reducer;
