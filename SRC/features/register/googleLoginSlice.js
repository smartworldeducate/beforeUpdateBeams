import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginService} from '../register/googleLoginService';
export const loginUserHandle = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await loginService.loginHandle(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  user: '',
  isError: false,
  isSuccess: false,
  success: 0,
  isLoading: false,
  message: '',
};
export const loginUserSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUserHandle.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUserHandle.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = action.payload.message),
          (state.success = action.payload.success),
          (state.user = action.payload);
      })
      .addCase(loginUserHandle.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.success = 0),
          (state.message = action.error);
      });
  },
});

export default loginUserSlice.reducer;
