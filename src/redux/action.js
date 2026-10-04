import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  CREATE_STUDENT_REQUEST,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  MARK_STUDENT_ATTENDANCE_REQUEST,
  MARK_STUDENT_ATTENDANCE_SUCCESS,
  MARK_STUDENT_ATTENDANCE_FAILURE,
  MARK_STAFF_ATTENDANCE_REQUEST,
  MARK_STAFF_ATTENDANCE_SUCCESS,
  MARK_STAFF_ATTENDANCE_FAILURE,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAILURE,
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  GET_STAFF_FAILURE,
  GET_STAFF_BY_ID_REQUEST,
  GET_STAFF_BY_ID_SUCCESS,
  GET_STAFF_BY_ID_FAILURE,
  GET_CLASSES_REQUEST,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILURE,
  GET_CLASS_TIMETABLE_REQUEST,
  GET_CLASS_TIMETABLE_SUCCESS,
  GET_CLASS_TIMETABLE_FAILURE,
  GET_FEES_REQUEST,
  GET_FEES_SUCCESS,
  GET_FEES_FAILURE,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAILURE,
  GET_SALARIES_REQUEST,
  GET_SALARIES_SUCCESS,
  GET_SALARIES_FAILURE,
} from "./type";

import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_LOCAL_URL;

// ===============================
// ADMIN LOGIN
// ===============================
export const loginUser = (admin, navigate) => async (dispatch) => {
  const login_id = admin.username;
  const password = admin.password;
  console.log(admin);

  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(`${baseUrl}/v1/admin/login`, {
      login_id,
      password,
    });

    const { token } = response.data;

    console.log("Admin Login Response:", response.data);

    if (response.status === 200) {
      navigate("/dashboard");
    }

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.safeUser));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        userType: response.data.safeUser.role,
      },
    });

    // SUCCESS TOAST
    toast.success("Login successful", {
      description: "Welcome back to the admin dashboard.",
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";

    dispatch({
      type: LOGIN_FAILURE,
      payload: message,
    });

    // ERROR TOAST
    toast.error("Login failed", {
      description: message,
    });

    throw new Error(message);
  }
};

// ===============================
// STUDENT LOGIN
// ===============================
export const loginStudent = (loginId, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(`${baseUrl}/login/student`, {
      loginId,
      password,
    });

    const { token, userType, corpId } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
    localStorage.setItem("corpId", corpId);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        userType,
        corpId,
      },
    });

    // SUCCESS TOAST
    toast.success("Login successful", {
      description: "Welcome back!",
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Student login failed. Please check your credentials.";

    dispatch({
      type: LOGIN_FAILURE,
      payload: message,
    });

    // ERROR TOAST
    toast.error("Login failed", {
      description: message,
    });

    throw new Error(message);
  }
};

// ===============================
// STAFF / TEACHER LOGIN
// ===============================
export const loginStaff = (loginId, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(`${baseUrl}/login/staff`, {
      loginId,
      password,
    });

    const { token, userType, corpId } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
    localStorage.setItem("corpId", corpId);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        userType,
        corpId,
      },
    });

    // SUCCESS TOAST
    toast.success("Login successful", {
      description: "Welcome back!",
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Staff login failed. Please check your credentials.";

    dispatch({
      type: LOGIN_FAILURE,
      payload: message,
    });

    // ERROR TOAST
    toast.error("Login failed", {
      description: message,
    });

    throw new Error(message);
  }
};

// ===============================
// LOGOUT
// ===============================
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  localStorage.removeItem("corpId");

  dispatch({
    type: LOGOUT,
  });

  // LOGOUT TOAST
  toast.success("Logged out successfully");
};

// ============================================
// HELPER — AUTH CONFIG
// ============================================

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ============================================
// CREATE STAFF / TEACHER
// POST /staff/:corpId
// ============================================

export const createStaff = (corpId, staffData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_STAFF_REQUEST,
    });

    const response = await axios.post(
      `${baseUrl}/staff/${corpId}`,
      staffData,
      getAuthConfig(),
    );

    dispatch({
      type: CREATE_STAFF_SUCCESS,
      payload: response.data,
    });

    toast.success(response.data?.message || "Staff created successfully");

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create staff";

    dispatch({
      type: CREATE_STAFF_FAILURE,
      payload: message,
    });

    toast.error(message);

    throw new Error(message);
  }
};

// ============================================
// CREATE STUDENT
// POST /student/:corpId
// ============================================

export const createStudent = (corpId, studentData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_STUDENT_REQUEST,
    });

    const response = await axios.post(
      `${baseUrl}/student/${corpId}`,
      studentData,
      getAuthConfig(),
    );

    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: response.data,
    });

    toast.success(response.data?.message || "Student created successfully");

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create student";

    dispatch({
      type: CREATE_STUDENT_FAILURE,
      payload: message,
    });

    toast.error(message);

    throw new Error(message);
  }
};

// ============================================
// MARK STUDENT ATTENDANCE
// POST /attendance/student/:corpId/:studentId
// ============================================

export const markStudentAttendance =
  (corpId, studentId, attendanceData) => async (dispatch) => {
    try {
      dispatch({
        type: MARK_STUDENT_ATTENDANCE_REQUEST,
      });

      const response = await axios.post(
        `${baseUrl}/attendance/student/${corpId}/${studentId}`,
        attendanceData,
        getAuthConfig(),
      );

      dispatch({
        type: MARK_STUDENT_ATTENDANCE_SUCCESS,
        payload: response.data,
      });

      toast.success(
        response.data?.message || "Student attendance marked successfully",
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to mark student attendance";

      dispatch({
        type: MARK_STUDENT_ATTENDANCE_FAILURE,
        payload: message,
      });

      toast.error(message);

      throw new Error(message);
    }
  };

// ============================================
// MARK STAFF ATTENDANCE
// POST /attendance/staff/:corpId/:staffId
// ============================================

export const markStaffAttendance =
  (corpId, staffId, attendanceData) => async (dispatch) => {
    try {
      dispatch({
        type: MARK_STAFF_ATTENDANCE_REQUEST,
      });

      const response = await axios.post(
        `${baseUrl}/attendance/staff/${corpId}/${staffId}`,
        attendanceData,
        getAuthConfig(),
      );

      dispatch({
        type: MARK_STAFF_ATTENDANCE_SUCCESS,
        payload: response.data,
      });

      toast.success(
        response.data?.message || "Staff attendance marked successfully",
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to mark staff attendance";

      dispatch({
        type: MARK_STAFF_ATTENDANCE_FAILURE,
        payload: message,
      });

      toast.error(message);

      throw new Error(message);
    }
  };

export const getStudents = (corpId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_STUDENTS_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/v1/admin/students/${corpId}`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_STUDENTS_SUCCESS,
      payload: response.data.data,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_STUDENTS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch students",
    });

    throw error;
  }
};

export const getStudent = (corpId, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_STUDENT_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/v1/admin/student/${corpId}/${id}`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_STUDENT_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_STUDENT_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch student",
    });

    throw error;
  }
};

// =====================================================
// STAFF
// =====================================================

export const getStaff =
  (corpId, role = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_STAFF_REQUEST,
      });

      const response = await axios.get(
        `${baseUrl}/v1/admin/staff/${corpId}`,
        getAuthConfig(),
      );

      dispatch({
        type: GET_STAFF_SUCCESS,
        payload: response.data.data,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: GET_STAFF_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch staff",
      });

      throw error;
    }
  };

export const getStaffById = (corpId, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_STAFF_BY_ID_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/staff/${corpId}/${id}`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_STAFF_BY_ID_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_STAFF_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch staff details",
    });

    throw error;
  }
};

// =====================================================
// CLASSES
// =====================================================

export const getClasses = (corpId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CLASSES_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/classes/${corpId}`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_CLASSES_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_CLASSES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch classes",
    });

    throw error;
  }
};

// =====================================================
// TIMETABLE
// =====================================================

export const getClassTimetable = (corpId, classId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CLASS_TIMETABLE_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/class/${corpId}/${classId}/timetable`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_CLASS_TIMETABLE_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_CLASS_TIMETABLE_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch timetable",
    });

    throw error;
  }
};

// =====================================================
// FEES
// =====================================================

export const getFees =
  (corpId, status = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_FEES_REQUEST,
      });

      const response = await axios.get(`${baseUrl}/fees/${corpId}`, {
        ...getAuthConfig(),
      });

      dispatch({
        type: GET_FEES_SUCCESS,
        payload: response.data.data,
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: GET_FEES_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch fees",
      });

      throw error;
    }
  };

// =====================================================
// EXPENSES
// =====================================================

export const getExpenses = (corpId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EXPENSES_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/expenses/${corpId}`,
      getConfig(),
    );

    dispatch({
      type: GET_EXPENSES_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch expenses",
    });

    throw error;
  }
};

// =====================================================
// SALARIES
// =====================================================

export const getSalaries = (corpId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SALARIES_REQUEST,
    });

    const response = await axios.get(
      `${baseUrl}/salaries/${corpId}`,
      getAuthConfig(),
    );

    dispatch({
      type: GET_SALARIES_SUCCESS,
      payload: response.data.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: GET_SALARIES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch salaries",
    });

    throw error;
  }
};
