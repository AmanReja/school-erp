import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { markStaffAttendance } from "../redux/action";
import { CalendarCheck, Save } from "lucide-react";

const StaffAttendance = () => {
  const dispatch = useDispatch();

  const [corpId, setCorpId] = useState("");
  const [staffId, setStaffId] = useState("");

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        markStaffAttendance(
          corpId,
          staffId,
          formData
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
            <CalendarCheck className="text-purple-600" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold dark:text-white">
              Staff Attendance
            </h1>

            <p className="text-sm text-gray-500">
              Mark teacher or staff attendance
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-5"
        >

          <div>
            <label className="label">Company ID</label>
            <input
              value={corpId}
              onChange={(e) => setCorpId(e.target.value)}
              placeholder="Enter company ID"
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Staff ID</label>
            <input
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter staff ID"
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="LATE">Late</option>
              <option value="LEAVE">Leave</option>
            </select>
          </div>

          <div>
            <label className="label">Remarks</label>

            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              placeholder="Optional remarks"
              className="input resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
          >
            <Save size={18} />
            Mark Attendance
          </button>

        </form>
      </div>

      <style>{`
        .label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #6b7280;
        }

        .input {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          outline: none;
          background: white;
          color: #111827;
        }

        .dark .input {
          background: #111827;
          border-color: #374151;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default StaffAttendance;