export const BASE_URL =
  'https://b2training.beaconhouse.net/beams_ci/index.php/api/';
export const config = {
  headers: {
    api_key: 'X5Ne0km78x2Q1ykny9FfcIK',
    api_secret: 'Q1X5NeknkyV5v6VkT78y9F',
  },
};

export const APIS = {
  LoginAPI: BASE_URL + 'login',
  ProfileAPI: BASE_URL + 'user_profile',
  FinancialAPI: BASE_URL + 'salaryEmpHistory',
  SalaryYearsAPI: BASE_URL + 'employee_years',
  SalaryHistoryWithYearsAPI: BASE_URL + 'salary_history_year',
  AppraisalYearsAPI: BASE_URL + 'selectAppraisal',
  ObjectivesYearsAPI: BASE_URL + 'apprasal_years',
  ObjectivesAPI: BASE_URL + 'objective',

  TimeLineAPI: BASE_URL + 'gettimeline',
  ReporteesAPI: BASE_URL + 'getReportee',

  GetRatingAPI: BASE_URL + 'get_rating',
  UpdateRatingAPI: BASE_URL + 'update_rating',
  SuggestionFeedbackAPI: BASE_URL + 'feedback',

  LeaveBalanceAPI: BASE_URL + 'balance_leave',
  LeaveHistoryAPI: BASE_URL + 'leave_history',

  SearchEmployeeAPI: BASE_URL + 'searchByName',

  MessagesAPI: BASE_URL + 'selectMesage',
  MessagesDetailAPI: BASE_URL + 'selectMesageDetail',

  MessagesReadAPI: BASE_URL + 'message_like',

  MessagesStatusLikeAPI: BASE_URL + 'status_like',
  FavouriteMessagesAPI: BASE_URL + 'get_favroit_messages',
  AddToFavouriteMessagesAPI: BASE_URL + 'add_to_favrit_message',
  ArchiveMessagesAPI: BASE_URL + 'get_archive_messages',
  AddToArchiveMessagesAPI: BASE_URL + 'add_to_archive_message',

  UtilityAPI: BASE_URL + 'utility',

  UtilityMiscLogAPI: BASE_URL + 'misc_utility_log',

  FinYearAPI: BASE_URL + 'fin_year',

  WorkFromHomeGetAPI: BASE_URL + 'wfh',
  WorkFromHomePostAPI: BASE_URL + 'wfhinsert',
};
