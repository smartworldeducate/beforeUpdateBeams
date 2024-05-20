import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  isLoading: true,
};

export const QRScannerListAction = createAsyncThunk(
  ' QRScannerList',
  async values => {
    console.log('valueseQRScaneerListApi', values);
    return axios
      .post(`${APIS.QRScannerListAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const QRScannerListSlice = createSlice({
  name: ' QRScannerList',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(QRScannerListAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(QRScannerListAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(QRScannerListAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
    });
  },
});

export const {clearAllState} = QRScannerListSlice.actions;

export default QRScannerListSlice.reducer;
