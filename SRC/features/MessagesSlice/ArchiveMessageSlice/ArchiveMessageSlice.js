import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../../API/Apis';

const initialState = {
  success: null,
  message: '',
  userData: [],
  userDataViewAll: [],

  isLoading: true,
  pageOffset: 1,
  isEmptyData: false,
  dataLength: null,

  unReadLength: null,
};

export const archiveMessagesAction = createAsyncThunk(
  'ArchiveMessages',
  async values => {
    console.log('values', values);
    return axios
      .post(`${APIS.ArchiveMessagesAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const ArchiveMessagesSlice = createSlice({
  name: 'ArchiveMessages',
  initialState,
  reducers: {
    clearAllState: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    increaseOffset: (state, action) => {
      state.pageOffset += 1;
    },

    clearViewAllArchiveMessagesState: (state, action) => {
      console.log('clearViewAllArchiveMessagesState');
      state.userDataViewAll = [];
    },

    textColr: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const list = state.userDataViewAll;
      // console.log('list', list);
      const indx = list?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_READ = 'Y';
      }
    },

    pushObject: (state, action) => {
      // state.userData.push(...action.payload);
      // console.log('Received data:', action.payload);
      // state.userDataViewAll = state.userDataViewAll.filter(
      //   item => item.MSG_ID != action.payload,
      // );

      const indexToRemove = state.userDataViewAll.findIndex(
        item => item.MSG_ID === action.payload,
      );
      if (indexToRemove != -1) {
        state.userDataViewAll.splice(indexToRemove, 1);
      }
    },

    removeFromArchiveSlice: (state, action) => {
      // console.log('payLoadMsgId', action.payload);
      const listAll = state.userDataViewAll;
      const indexToRemove = listAll?.findIndex(
        item => item?.MSG_ID == action?.payload,
      );

      if (indexToRemove !== -1) {
        // console.log('payLoadValue', action.payload);
        state.userDataViewAll.splice(indexToRemove, 1);
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(archiveMessagesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(archiveMessagesAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(archiveMessagesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.data;
      // state.userDataViewAll = action.payload.data;

      // state.unReadLength = action.payload.unread_message_length;

      state.dataLength = action.payload.data.length;

      state.userDataViewAll = [
        ...state.userDataViewAll,
        ...action.payload.data,
      ];

      // if (state.userDataViewAll.length === 0) {
      //   console.log('length0');
      //   state.userDataViewAll = action.payload.data;
      // } else {
      //   state.userDataViewAll = [
      //     ...state.userDataViewAll,
      //     ...action.payload.data,
      //   ];
      // }
    });
  },
});

export const {
  clearAllState,
  increaseOffset,
  clearViewAllArchiveMessagesState,
  textColr,
  pushObject,
  removeFromArchiveSlice,
} = ArchiveMessagesSlice.actions;

export default ArchiveMessagesSlice.reducer;
