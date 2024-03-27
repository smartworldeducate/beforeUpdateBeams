import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: false,
};

export const LoginAction = createAsyncThunk('Login', async values => {
  console.log('valuesMy', values);
  return axios
    .post(`${APIS.LoginAPI}`, values, {
      headers: {
        api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
        api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
      },
    })
    .then(response => response.data);
});

const LoginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    logoutSuccess: (state, action) => {
      state.success = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase(LoginAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(LoginAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(LoginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState, logoutSuccess} = LoginSlice.actions;

export default LoginSlice.reducer;