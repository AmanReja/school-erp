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
} from "./type";

import { toast } from "sonner";


const baseUrl = import.meta.env.VITE_LOCAL_URL;


// ===============================
// ADMIN LOGIN
// ===============================
export const loginUser = (admin,navigate) => async (dispatch) => {
  const login_id = admin.username;
  const password = admin.password;
  console.log(admin);
  

  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const response = await axios.post(
      `${baseUrl}/v1/admin/login`,
      {
        login_id,
        password,
      }
    );

    const { token } = response.data;

    console.log("Admin Login Response:", response.data);

if (response.status===200) {
  navigate("/dashboard")
}


    localStorage.setItem("token", token);
    localStorage.setItem("userType", "ADMIN");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        userType: "ADMIN",
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
export const loginStudent =
  (loginId, password) => async (dispatch) => {

    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const response = await axios.post(
        `${baseUrl}/login/student`,
        {
          loginId,
          password,
        }
      );

      const {
        token,
        userType,
        corpId,
      } = response.data;

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
export const loginStaff =
  (loginId, password) => async (dispatch) => {

    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const response = await axios.post(
        `${baseUrl}/login/staff`,
        {
          loginId,
          password,
        }
      );

      const {
        token,
        userType,
        corpId,
      } = response.data;

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
      getAuthConfig()
    );

    dispatch({
      type: CREATE_STAFF_SUCCESS,
      payload: response.data,
    });

    toast.success(
      response.data?.message || "Staff created successfully"
    );

    return response.data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to create staff";

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
      getAuthConfig()
    );

    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: response.data,
    });

    toast.success(
      response.data?.message || "Student created successfully"
    );

    return response.data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to create student";

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

export const markStudentAttendance = (
  corpId,
  studentId,
  attendanceData
) => async (dispatch) => {

  try {
    dispatch({
      type: MARK_STUDENT_ATTENDANCE_REQUEST,
    });

    const response = await axios.post(
      `${baseUrl}/attendance/student/${corpId}/${studentId}`,
      attendanceData,
      getAuthConfig()
    );

    dispatch({
      type: MARK_STUDENT_ATTENDANCE_SUCCESS,
      payload: response.data,
    });

    toast.success(
      response.data?.message ||
        "Student attendance marked successfully"
    );

    return response.data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to mark student attendance";

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

export const markStaffAttendance = (
  corpId,
  staffId,
  attendanceData
) => async (dispatch) => {

  try {
    dispatch({
      type: MARK_STAFF_ATTENDANCE_REQUEST,
    });

    const response = await axios.post(
      `${baseUrl}/attendance/staff/${corpId}/${staffId}`,
      attendanceData,
      getAuthConfig()
    );

    dispatch({
      type: MARK_STAFF_ATTENDANCE_SUCCESS,
      payload: response.data,
    });

    toast.success(
      response.data?.message ||
        "Staff attendance marked successfully"
    );

    return response.data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to mark staff attendance";

    dispatch({
      type: MARK_STAFF_ATTENDANCE_FAILURE,
      payload: message,
    });

    toast.error(message);

    throw new Error(message);
  }
};