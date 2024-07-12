import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
  empTimeIn: null,
  empBirthday: null,
  userSearchAccess: null,
  leavesApplyForwardTo: [],
};

export const profileAction = createAsyncThunk('Profile', async values => {
  console.log('valuesempProfile', values);
  return axios
    .post(`${APIS.ProfileAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => response.data);
});

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    clearUserProfileState: (state, action) => {
      state.success = null;
      state.message = '';
      state.userData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(profileAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(profileAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(profileAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
      state.empTimeIn = action.payload.emp_in_time;
      state.empBirthday = action.payload.birth_mark;
      state.userSearchAccess = action.payload.users_search_access;
      state.leavesApplyForwardTo = action.payload.forward_to;
    });
  },
});

export const {clearAllState, clearUserProfileState} = ProfileSlice.actions;

export default ProfileSlice.reducer;
