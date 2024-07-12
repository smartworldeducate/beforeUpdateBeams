import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';
import {useSelector, useDispatch} from 'react-redux';

const initialState = {
  success: null,
  message: '',
  userDataViewAll: [],

  isLoading: true,
  pageOffset: 1,
  isEmptyData: false,
  dataLength: null,

  unReadLength: null,
};

export const NotificationsMessagesAction = createAsyncThunk(
  'Messages',
  async values => {
    console.log('valuesNotificationsMessages', values);
    return axios
      .post(`${APIS.NotificationsMessages}`, values, {
        headers: {
          api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
          api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.data);
  },
);

const NotificationsMessagesSlice = createSlice({
  name: 'Messages',
  initialState,
  reducers: {
    clearAllStateNotificationMessages: (state, action) => {
      //   state.policiesListAll = null;
      //   state.message = '';
    },
    increaseOffset: (state, action) => {
      state.pageOffset += 1;
    },
    clearViewAllNotificationsMessagesState: (state, action) => {
      console.log('clearViewAllMessagesState');
      state.userDataViewAll = [];
    },
    textColr: (state, action) => {
      console.log('payLoadMsgId', action.payload);
      const list = state.userDataViewAll;
      // console.log('list', list);
      const indx = list?.findIndex(item => item?.MSG_ID == action?.payload);

      if (indx !== -1) {
        console.log('payLoadValue', action.payload);
        state.userDataViewAll[indx].IS_READ_STATUS = 'Y';
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(NotificationsMessagesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(NotificationsMessagesAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(NotificationsMessagesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      //   state.userDataViewAll = action.payload.data;

      state.unReadLength = action.payload.unread_message_length;

      state.dataLength = action.payload.data?.length;

      state.userDataViewAll = [
        ...state.userDataViewAll,
        ...action.payload.data,
      ];
    });
  },
});

export const {
  clearAllStateNotificationMessages,
  increaseOffset,
  clearViewAllNotificationsMessagesState,
  textColr,
} = NotificationsMessagesSlice.actions;

export default NotificationsMessagesSlice.reducer;
