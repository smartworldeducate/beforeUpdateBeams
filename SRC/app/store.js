import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/users/userSlice';
import loginReducer from '../features/register/loginSlice';
import tagReducer from '../features/tags/tagSlice';
import singleTagReducer from '../features/tagsingle/singletagSlice';
import catReducer from '../features/category/allCatSlice';
import filterReducer from '../features/category/singleCatSlice';
import scanReducer from '../features/scan/scanSlice';
import LoginUserReducer from '../features/register/googleLoginSlice';
import userReducer from '../features/admin/adminSlice';
import googleReducer from '../features/register/googleLoginSlice';
import createReducer from '../features/createTag/createSlice';
import searchReducer from '../features/emplolyee/createSlice';
import reporteeReeducer from '../features/reportee/createSlice';
import employeeRerducer from '../features/allemoloyee/createSlice';
import currentEmpDateReducer from '../features/currntdataofemployee/createSlice';
import lineMangerReducer from '../features/lineManager/createSlice';
import salMonthReducer from '../features/salmonth/createSlice';
import empSalReducer from '../features/empSalary/createSlice';
import empMessageReducer from '..//features/message/createSlice';
import detailMessageReducer from '../features/detailMessage/createSlice';
import historyReducer from '../features/history/createSlice';
import appraisalReducer from '../features/appraisal/createSlice';
import bssChildReducer from '../features/childbss/createSlice';
import feedbackReducer from '../features/feeback/createSlice';
import ratingReducer from '../features/rating/createSlice';
import getRatingReducer from '../features/getallrating/createSlice';
import updateRatingReducer from '../features/updaterating/createSlice';
import utilityReducer from '../features/utility/createSlice';
import wfhReducer from '../features/wfh/createSlice';
import wfhInsertReducer from '../features/insertwfh/createSlice';
import timeLineReducer from '../features/timeline/createSlice';
import profileReducer from '../features/profile/createSlice';
import movementReducer from '../features/movement/createSlice';
import leaveBalanceReducer from '../features/balanceleave/createSlice';

import loginSliceReducer from '../features/loginSlice/loginSlice';
import profileSliceReducer, {
  initialState as userProfileInitialState,
} from '../features/profileSlice/profileSlice';
import financialSliceReducer from '../features/FinancialSlice/FinancialSlice';

import lastMonthSalarySliceReducer from '../features/FinancialSlice/LastMonthSalarySlice';

import salaryYearsSliceReducer from '../features/SalaryYearsSlice/SalaryYearsSlice';
import salaryHistoryWithYearsSliceReducer from '../features/SalaryYearsSlice/SalaryHistoryWithYearsSlice';
import appraisalYearsSliceReducer from '../features/AppraisalYearsSlice/AppraisalYearsSlice';
import objectiveYearsSliceReducer from '../features/AppraisalYearsSlice/ObjectivesYearsSlice';
import objectivesSliceReducer from '../features/ObjectivesSlice/ObjectivesSlice';

import DevelopmentAreaSliceReducer from '../features/AppraisalYearsSlice/DevelopmentAreaSlice';

import timelineSliceReducer from '../features/TimeLineSlice/TimeLineSlice';
import allReportessSliceReducer from '../features/ReporteeSectionSlice/AllReportessSlice';
import reporteeProfileSliceReducer from '../features/ReporteeSectionSlice/ReporteeProfileSlice';
import searchEmployeeSliceReducer from '../features/SearchEmployeeSlice/SearchEmployeeSlice';

import ratingSliceReducer from '../features/RatingAndFeedbackSlice/RatingSlice';
import updateRatingSliceReducer from '../features/RatingAndFeedbackSlice/UpdateRatingSlice';
import suggestionFeedbackSliceReducer from '../features/RatingAndFeedbackSlice/SuggestionFeedback';

import leaveBalanceSliceReducer from '../features/LeaveBalanceSlice/LeaveBalanceSlice';

import leaveHistorySliceReducer from '../features/LeaveBalanceSlice/LeaveHistorySlice';

import searchMessageSliceReducer from '../features/MessagesSlice/MessageSearchSlice';

import messagesSliceReducer from '../features/MessagesSlice/MessagesSlice';
import MessageSliceHomePageReducer from '../features/MessagesSlice/MessageSliceHomePage';

import messageDetailSliceReducer from '../features/MessagesSlice/MessageDetailSlice';
import MessageLikeSliceReducer from '../features/MessagesSlice/MessageLikeSlice';

import MessageStatusLikeSliceReducer from '../features/MessagesSlice/MessageStatusLike';

import FavouriteMessageSliceReducer from '../features/MessagesSlice/FavouriteMessageSlice/FavouriteMessageSlice';

import AddToFavouriteMessageSliceReducer from '../features/MessagesSlice/FavouriteMessageSlice/AddToFavouriteMessageSlice';

import ArchiveMessageSliceReducer from '../features/MessagesSlice/ArchiveMessageSlice/ArchiveMessageSlice';

import UtilitySliceReducer from '../features/UtilitySlice/UtilitySlice';

import UtilityMiscLogSliceReducer from '../features/UtilitySlice/UtilityMiscLog';

import FinYearSliceReducer from '../features/FinYearSlice/FinYearSlice';

import WorkFromHomeGetSliceReducer from '../features/WorkFromHomeSlice/WorkFromHomeGet';

import WorkFromHomePostSliceReducer from '../features/WorkFromHomeSlice/WorkFromHomePost';

import AttendanceCalanderSliceReducer from '../features/AttendanceCalanderSlice/AttendanceCalanderSlice';

import LeaveTypeSliceReducer from '../features/LeaveTypeSlice/LeaveTypeSlice';

import ApplyLeaveSliceReducer from '../features/LeaveTypeSlice/ApplyLeaveSlice';

import OutstationSliceReducer from '../features/LeaveTypeSlice/OutstationSlice';

import AttendenceNotMarkedSliceReducer from '../features/LeaveTypeSlice/AttendenceNotMarkedSlice';

import LateArrivalSliceReducer from '../features/LeaveTypeSlice/LateArrivalSlice';

import EarlyLeavingSliceReducer from '../features/LeaveTypeSlice/EarlyLeavingSlice';

import ToilSliceReducer from '../features/LeaveTypeSlice/ToilSlice';

import QRScannerListSliceReducer from '../features/QRScannerListSlice/QRScannerListSlice';

import QRScanSliceReducer from '../features/QRScan/QRScan';

import FinanicialYearsForPFSliceReducer from '../features/FinanicialYearsForPFAndTaxSlice/FinanicialYearsForPFSlice';

import FinanicialYearsForTaxSliceReducer from '../features/FinanicialYearsForPFAndTaxSlice/FinanicialYearsForTaxSlice';

import FinanicialTaxPDFDownloadSliceReducer from '../features/FinanicialYearsForPFAndTaxSlice/FinancialTaxPDFDownloadSlice';

import FinanicialPFPDFDownloadSliceReducer from '../features/FinanicialYearsForPFAndTaxSlice/FinancialPFPDFDownloadSlice';

import DeviceInfoEmailSliceReducer from '../features/DeviceInfoEmailSlice/DeviceInfoEmailSlice';

import NotificationsMessagesSliceReducer from '../features/NotificationsMessagesSlice/NotificationsMessagesSlice';

import InspireSignupSliceReducer from '../features/Inspire50/InspireSignUpHTMLSlice';

import InspireSignupContinueSliceReducer from '../features/Inspire50/InspireSignupContinueSlice';

import InspireTrainingsSliceReducer from '../features/Inspire50/InspireTrainingsSlice';

import InspireAddTrainingSliceReducer from '../features/Inspire50/InspireAddTrainingSlice';

export const store = configureStore({
  reducer: {
    register: authReducer,
    login: loginReducer,
    getAllTags: tagReducer,
    singleTag: singleTagReducer,
    getAllCats: catReducer,
    getCatFilter: filterReducer,
    scanar: scanReducer,
    userLogin: LoginUserReducer,
    userList: userReducer,
    googleUser: googleReducer,
    createtag: createReducer,
    searchEmp: searchReducer,
    reportee: reporteeReeducer,
    allEmployee: employeeRerducer,
    currntEmpAttanence: currentEmpDateReducer,
    getLineManger: lineMangerReducer,
    getSalMonth: salMonthReducer,
    getEmpSalary: empSalReducer,
    empMessageState: empMessageReducer,
    detailMessageState: detailMessageReducer,
    selectHistory: historyReducer,
    appraisalState: appraisalReducer,
    childState: bssChildReducer,
    feedBackState: feedbackReducer,
    ratingState: ratingReducer,
    getallRating: getRatingReducer,
    updateRatingState: updateRatingReducer,
    utilityState: utilityReducer,
    wfhState: wfhReducer,
    wfhInsertState: wfhInsertReducer,
    timeLineState: timeLineReducer,
    profileState: profileReducer,
    movementState: movementReducer,
    leaveBalanceState: leaveBalanceReducer,

    // mine

    loginStore: loginSliceReducer,
    profileStore: profileSliceReducer,

    financialStore: financialSliceReducer,

    LastMonthSalaryStore: lastMonthSalarySliceReducer,

    salaryYearsStore: salaryYearsSliceReducer,
    salaryHistoryWithYearsStore: salaryHistoryWithYearsSliceReducer,
    appraisalYearsStore: appraisalYearsSliceReducer,
    objectiveYearsStore: objectiveYearsSliceReducer,
    objectivesStore: objectivesSliceReducer,

    developmentAreaStore: DevelopmentAreaSliceReducer,

    timeLineStore: timelineSliceReducer,
    allReporteesStore: allReportessSliceReducer,
    reporteeProfileStore: reporteeProfileSliceReducer,
    searchEmployyeStore: searchEmployeeSliceReducer,
    ratingStore: ratingSliceReducer,
    updateRatingStore: updateRatingSliceReducer,

    suggestionFeedbackStore: suggestionFeedbackSliceReducer,
    leaveBalanceStore: leaveBalanceSliceReducer,

    leaveHistoryStore: leaveHistorySliceReducer,

    searchMessagesStore: searchMessageSliceReducer,

    messagesStore: messagesSliceReducer,

    MessageSliceHomePageStore: MessageSliceHomePageReducer,

    messageDetailStore: messageDetailSliceReducer,
    messageLikeStore: MessageLikeSliceReducer,

    messageStatusLikeStore: MessageStatusLikeSliceReducer,

    favouriteMessageStore: FavouriteMessageSliceReducer,

    addToFavouriteMessageStore: AddToFavouriteMessageSliceReducer,

    archiveMessageStore: ArchiveMessageSliceReducer,

    utilityStore: UtilitySliceReducer,

    utilityMiscLogStore: UtilityMiscLogSliceReducer,

    finYearStore: FinYearSliceReducer,
    WorkFromHomeGetStore: WorkFromHomeGetSliceReducer,
    WorkFromHomePostStore: WorkFromHomePostSliceReducer,

    AttendanceCalanderStore: AttendanceCalanderSliceReducer,

    LeaveTypeStore: LeaveTypeSliceReducer,
    ApplyLeaveStore: ApplyLeaveSliceReducer,

    OutstationStore: OutstationSliceReducer,

    AttendenceNotMarkedStore: AttendenceNotMarkedSliceReducer,

    LateArrivalStore: LateArrivalSliceReducer,

    EarlyLeavingStore: EarlyLeavingSliceReducer,

    ToilStore: ToilSliceReducer,

    QRScanStore: QRScanSliceReducer,
    QRScannerListStore: QRScannerListSliceReducer,

    FinancialYearsPFStore: FinanicialYearsForPFSliceReducer,
    FinancialYearsTaxStore: FinanicialYearsForTaxSliceReducer,

    FinanicialTaxPDFDownloadStore: FinanicialTaxPDFDownloadSliceReducer,
    FinanicialPFPDFDownloadStore: FinanicialPFPDFDownloadSliceReducer,

    DeviceInfoEmailStore: DeviceInfoEmailSliceReducer,

    NotificationsMessagesStore: NotificationsMessagesSliceReducer,

    InspireSignupStore: InspireSignupSliceReducer,

    InspireSignupContinueStore: InspireSignupContinueSliceReducer,

    InspireTrainingsStore: InspireTrainingsSliceReducer,

    InspireAddTrainingStore: InspireAddTrainingSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const rootReducer = combineReducers({
//   register: authReducer,
//   login: loginReducer,
//   getAllTags: tagReducer,
//   singleTag: singleTagReducer,
//   getAllCats: catReducer,
//   getCatFilter: filterReducer,
//   scanar: scanReducer,
//   userLogin: LoginUserReducer,
//   userList: userReducer,
//   googleUser: googleReducer,
//   createtag: createReducer,
//   searchEmp: searchReducer,
//   reportee: reporteeReeducer,
//   allEmployee: employeeRerducer,
//   currntEmpAttanence: currentEmpDateReducer,
//   getLineManger: lineMangerReducer,
//   getSalMonth: salMonthReducer,
//   getEmpSalary: empSalReducer,
//   empMessageState: empMessageReducer,
//   detailMessageState: detailMessageReducer,
//   selectHistory: historyReducer,
//   appraisalState: appraisalReducer,
//   childState: bssChildReducer,
//   feedBackState: feedbackReducer,
//   ratingState: ratingReducer,
//   getallRating: getRatingReducer,
//   updateRatingState: updateRatingReducer,
//   utilityState: utilityReducer,
//   wfhState: wfhReducer,
//   wfhInsertState: wfhInsertReducer,
//   timeLineState: timeLineReducer,
//   profileState: profileReducer,
//   movementState: movementReducer,
//   leaveBalanceState: leaveBalanceReducer,

//   // mine

//   loginStore: loginSliceReducer,
//   profileStore: profileSliceReducer,
//   financialStore: financialSliceReducer,
//   salaryYearsStore: salaryYearsSliceReducer,
//   salaryHistoryWithYearsStore: salaryHistoryWithYearsSliceReducer,
//   appraisalYearsStore: appraisalYearsSliceReducer,
//   objectiveYearsStore: objectiveYearsSliceReducer,
//   objectivesStore: objectivesSliceReducer,

//   timeLineStore: timelineSliceReducer,
//   allReporteesStore: allReportessSliceReducer,
//   reporteeProfileStore: reporteeProfileSliceReducer,
//   searchEmployyeStore: searchEmployeeSliceReducer,
//   ratingStore: ratingSliceReducer,
//   updateRatingStore: updateRatingSliceReducer,

//   suggestionFeedbackStore: suggestionFeedbackSliceReducer,
//   leaveBalanceStore: leaveBalanceSliceReducer,
//   messagesStore: messagesSliceReducer,

//   MessageSliceHomePageStore: MessageSliceHomePageReducer,

//   messageDetailStore: messageDetailSliceReducer,
//   messageLikeStore: MessageLikeSliceReducer,

//   messageStatusLikeStore: MessageStatusLikeSliceReducer,

//   favouriteMessageStore: FavouriteMessageSliceReducer,

//   addToFavouriteMessageStore: AddToFavouriteMessageSliceReducer,

//   archiveMessageStore: ArchiveMessageSliceReducer,

//   utilityStore: UtilitySliceReducer,

//   utilityMiscLogStore: UtilityMiscLogSliceReducer,

//   finYearStore: FinYearSliceReducer,
//   WorkFromHomeGetStore: WorkFromHomeGetSliceReducer,
//   WorkFromHomePostStore: WorkFromHomePostSliceReducer,
// });

// Root reducer with state reset logic
// const rootReducerWithReset = (state, action) => {
//   if (action.type === 'RESET_APP_STATE') {
//     // Reset each slice state to its initial state
//     const resetState = {};
//     Object.keys(state).forEach(key => {
//       resetState[key] = rootReducer(undefined, {type: ''});
//     });
//     state = resetState;
//   }
//   return rootReducer(state, action);
// };

// export const store = configureStore({
//   reducer: rootReducerWithReset,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
