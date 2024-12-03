import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {APIS} from '../../API/Apis';

const gradientColors = [
  {status: 'PP', dark: ['#78E2CD', '#1AB394'], light: ['#D4E4F6', '#A8C6E7']},
  {status: 'PO', dark: ['#66E08A', '#259245'], light: ['#FFE4D6', '#FFB39D']},
  {status: 'T', dark: ['#F1B68F', '#FF6600'], light: ['#A8F3F2', '#A2E6DD']},
  {status: 'A', dark: ['#FF9EA8', '#ED5565'], light: ['#FFB9BC', '#FF888A']},
  {status: 'L', dark: ['#FFC88C', '#F8AC59'], light: ['#D3B1E5', '#C19BD7']},
  {status: 'E', dark: ['#7DBEFF', '#0076EC'], light: ['#D5F9A4', '#A9D36E']},
];

const initialState = {
  success: null,
  message: '',
  userData: [],
  userDataStudents: [],
  selectedUsersList: [],
  selectAll: false,
  isLoading: false,
  gradientColors: gradientColors,
  isAllowAttenUpload: false,
  tardyCase: false,
  absentCase: false,
  leaveCase: false,
  exemptedCase: false,
};

export const TeacherStudentsListAction = createAsyncThunk(
  'TeacherstudentsList',
  async ({values, authKeyParam}) => {
    console.log('valuesTeacherStudentsList', values);
    return axios
      .post(`${APIS.TeacherStudentsListAPI}`, values, {
        headers: {
          api_key: 'X5Ne0km7852Q1ykny9FfcIK5y9kVV5v6',
          api_secret: 'Q1X5NeknkyV5v6Vkm78y9FfcI0K5y952',
          s_auth_key: authKeyParam,
          app_version: 1,
        },
      })
      .then(response => response.data);
  },
);

const TeacherStudentsListSlice = createSlice({
  name: 'TeacherstudentsList',
  initialState,
  reducers: {
    clearAllStateTeacherAttendance: state => {
      state.success = null;
      state.message = '';
      state.userData = [];
      state.userDataStudents = [];
      state.selectedUsersList = [];
      state.selectAll = false;
      state.isAllowAttenUpload = false;
    },

    selectUser: (state, action) => {
      const userId = action.payload;
      const selectedUser = state.userDataStudents.find(
        user => user.student_id === userId,
      );

      if (selectedUser) {
        const userIndex = state.selectedUsersList.findIndex(
          user => user.student_id === userId,
        );

        if (userIndex === -1) {
          state.selectedUsersList.push(selectedUser);
        } else {
          state.selectedUsersList.splice(userIndex, 1);
        }
      }

      // Update selectAll status
      state.selectAll =
        state.selectedUsersList.length === state.userDataStudents.length;
    },

    selectAllUsers: (state, action) => {
      const {selectAll} = action.payload;

      if (selectAll) {
        state.selectedUsersList = [...state.userDataStudents];
      } else {
        state.selectedUsersList = [];
      }

      // Update selectAll state
      state.selectAll = selectAll;
    },

    setSelectAllTrue: state => {
      state.selectAll = true;
    },

    setSelectAllFalse: state => {
      state.selectAll = false;
    },

    // updateSelectedUsersStatus: (state, action) => {
    //   const {newStatus} = action.payload;

    //   state.selectedUsersList.forEach(user => {
    //     user.att_status = newStatus;
    //   });

    //   state.userDataStudents.forEach(user => {
    //     if (
    //       state.selectedUsersList.some(
    //         selectedUser => selectedUser.student_id === user.student_id,
    //       )
    //     ) {
    //       user.att_status = newStatus;
    //     }
    //   });

    //   state.isAllowAttenUpload = !state.userDataStudents.some(
    //     student => student.att_status === null,
    //   );
    // },

    updateSelectedUsersStatus: (state, action) => {
      const {newStatus, additionalFields} = action.payload;

      console.log('newStatusPayload', newStatus);
      console.log('additionalFieldsPayload', additionalFields);

      state.selectedUsersList.forEach(user => {
        user.att_status = newStatus;
        Object.assign(user, additionalFields);
      });

      state.userDataStudents.forEach(user => {
        if (
          state.selectedUsersList.some(
            selectedUser => selectedUser.student_id === user.student_id,
          )
        ) {
          user.att_status = newStatus;
          Object.assign(user, additionalFields);
        }
      });
      state.isAllowAttenUpload = !state.userDataStudents.some(
        student => student.att_status === null,
      );
    },

    clearSelectedUsersList: state => {
      state.selectedUsersList = [];
      state.selectAll = false;
    },

    changeAttendStatusSlice: (state, action) => {
      console.log('actionPayload', action?.payload);

      const {student_id, additionalFields} = action?.payload;
      console.log('additionalFields', additionalFields);

      const list = state.userDataStudents;
      const indx = list?.findIndex(item => item?.student_id === student_id);

      if (indx !== -1) {
        const student = state.userDataStudents[indx];
        const currentStatus = student.att_status;

        switch (currentStatus) {
          case null:
            student.att_status = 'PP';
            break;
          case 'PP':
            student.att_status = 'PO';
            break;
          case 'PO':
            student.att_status = 'T';
            break;
          case 'T':
            student.att_status = 'A';
            break;
          case 'A':
            student.att_status = 'L';
            break;
          case 'L':
            student.att_status = 'E';
            break;
          case 'E':
            student.att_status = 'PP';
            break;
          default:
            student.att_status = 'PP';
        }

        // Reset additional fields whenever the status changes
        student.att_action = null;
        student.remarks = null;
        student.tardiness = null;

        // Set the flag if status changed to 'T'
        // if (student.att_status === 'T') {
        //   student.statusChangedToT = true;
        // } else {
        //   student.statusChangedToT = false;
        // }
      }

      // Update overall state flags
      state.isAllowAttenUpload = !state.userDataStudents.some(
        student => student.att_status === null,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(TeacherStudentsListAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(TeacherStudentsListAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(TeacherStudentsListAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.userData = action.payload.result;
      state.userDataStudents = action.payload.result.students;

      state.isAllowAttenUpload = !state.userDataStudents.some(
        student => student.att_status === null,
      );

      // Update selectAll status
      state.selectAll =
        state.selectedUsersList.length === state.userDataStudents.length;
    });
  },
});

export const {
  clearAllStateTeacherAttendance,
  selectUser,
  clearSelectedUsersList,
  updateSelectedUsersStatus,
  changeAttendStatusSlice,
  selectAllUsers,
  setSelectAllTrue,
  setSelectAllFalse,
} = TeacherStudentsListSlice.actions;

export default TeacherStudentsListSlice.reducer;
