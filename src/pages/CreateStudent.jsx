import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../redux/action";
import { UserPlus, Save } from "lucide-react";

const CreateStudent = () => {
  const dispatch = useDispatch();

  const [corpId, setCorpId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    loginId: "",
    password: "",
    rollNumber: "",
    classId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createStudent(corpId, formData));

      setFormData({
        name: "",
        age: "",
        address: "",
        loginId: "",
        password: "",
        rollNumber: "",
        classId: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
              <UserPlus className="text-indigo-600" size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Create Student
              </h1>
              <p className="text-sm text-gray-500">
                Add a new student account
              </p>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="label">Student Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Roll Number</label>
              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Class ID</label>
              <input
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                placeholder="Enter class ID"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Login ID</label>
              <input
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                placeholder="Enter login ID"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="input"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows={3}
                className="input resize-none"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            <Save size={18} />
            Create Student
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

export default CreateStudent;