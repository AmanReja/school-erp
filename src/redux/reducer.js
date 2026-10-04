import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  // STUDENTS
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILURE,
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,

  // STAFF
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAILURE,
  GET_STAFF_BY_ID_REQUEST,
  GET_STAFF_BY_ID_SUCCESS,
  GET_STAFF_BY_ID_FAILURE,
} from "./type";
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialLoginState = {
  // =========================
  // AUTH
  // =========================
  loading: false,
  token: localStorage.getItem("token") || null,
  userType: storedUser.role || null,
  corpId: storedUser?.corpId || null,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),

  // =========================
  // STUDENTS
  // =========================
  students: [],
  student: null,

  studentsLoading: false,
  studentLoading: false,

  studentsError: null,
  studentError: null,

  // =========================
  // STAFF
  // =========================
  staff: [],
  staffDetails: null,

  staffLoading: false,
  staffDetailsLoading: false,

  staffError: null,
  staffDetailsError: null,
};

export const authReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    // =====================================================
    // LOGIN
    // =====================================================

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userType: action.payload.userType,
        corpId: action.payload.corpId || null,
        error: null,
        isAuthenticated: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // =====================================================
    // STUDENTS
    // =====================================================

    case GET_STUDENTS_REQUEST:
      return {
        ...state,
        studentsLoading: true,
        studentsError: null,
      };

    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        studentsLoading: false,
        students: action.payload || [],
        studentsError: null,
      };

    case GET_STUDENTS_FAILURE:
      return {
        ...state,
        studentsLoading: false,
        studentsError: action.payload,
      };

    // =====================================================
    // SINGLE STUDENT
    // =====================================================

    case GET_STUDENT_REQUEST:
      return {
        ...state,
        studentLoading: true,
        studentError: null,
      };

    case GET_STUDENT_SUCCESS:
      return {
        ...state,
        studentLoading: false,
        student: action.payload,
        studentError: null,
      };

    case GET_STUDENT_FAILURE:
      return {
        ...state,
        studentLoading: false,
        studentError: action.payload,
      };

    // =====================================================
    // STAFF
    // =====================================================

    case GET_STAFF_REQUEST:
      return {
        ...state,
        staffLoading: true,
        staffError: null,
      };

    case GET_STAFF_SUCCESS:
      return {
        ...state,
        staffLoading: false,
        staff: action.payload || [],
        staffError: null,
      };

    case GET_STAFF_FAILURE:
      return {
        ...state,
        staffLoading: false,
        staffError: action.payload,
      };

    // =====================================================
    // SINGLE STAFF
    // =====================================================

    case GET_STAFF_BY_ID_REQUEST:
      return {
        ...state,
        staffDetailsLoading: true,
        staffDetailsError: null,
      };

    case GET_STAFF_BY_ID_SUCCESS:
      return {
        ...state,
        staffDetailsLoading: false,
        staffDetails: action.payload,
        staffDetailsError: null,
      };

    case GET_STAFF_BY_ID_FAILURE:
      return {
        ...state,
        staffDetailsLoading: false,
        staffDetailsError: action.payload,
      };

    // =====================================================
    // LOGOUT
    // =====================================================

    case LOGOUT:
      return {
        ...initialLoginState,

        token: null,
        userType: null,
        corpId: null,

        isAuthenticated: false,

        students: [],
        student: null,
        staff: [],
        staffDetails: null,
      };

    // =====================================================
    // DEFAULT
    // =====================================================

    default:
      return state;
  }
};
