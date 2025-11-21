import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { LoadDetails } from "../Contexts/LoadDetails";

import {
  get_cms_assign,
  assignedCms,
  deleteAssignedCms,
  updateAssignedCms,
} from "../redux/action";

import { useDispatch, useSelector } from "react-redux";

const Getcommercial = () => {
  const { theme } = useContext(Theme);
  const { compid } = useParams();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const [createModelOpen, setCreateModelOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [packageId, setPackageId] = useState("");
  const [isediting, setIsediting] = useState(false);
  const [currentsrvid, setCurrentsrvid] = useState("");

  const [showPkgModal, setShowPkgModal] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);

  const cmsassigned = useSelector(
    (state) => state.cmsassign.cmsassign?.services

  );
  const cmsassigned1 = useSelector(
    (state) => state.cmsassign.cmsassign
  );
 
  console.log(38,cmsassigned1);

  // const cmsnotassigned = useSelector(
  //   (state) => state.cmsassign.cmsassign?.not_assigned_services
  // );

  useEffect(() => {
    dispatch(get_cms_assign(compid));
  }, [dispatch, compid]);

  // ========= RESET FORM =============
  const resetform = () => {
    setServiceId("");
    setPackageId("");
    setIsediting(false);
    setCurrentsrvid("");
  };

  // ========= ADD SUBMIT ============
  const handleSubmit = () => {
    const assigneddata = {
      service_id: serviceId,
      pkg_id: packageId,
    };

    dispatch(assignedCms(compid, assigneddata));
    setCreateModelOpen(false);
    resetform();
    
  };

  // ========= DELETE =============
  const handleDelete = (service_id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?"))
      return;

    dispatch(deleteAssignedCms(compid, service_id));
  };

  // ========= EDIT SETUP ==========
  const handeledit = (srv) => {
    setCurrentsrvid(srv.service_id);
    setServiceId(srv.service_id);
    setPackageId(srv.pkg_id);
    setIsediting(true);
    setCreateModelOpen(true);
  };

  // ========= UPDATE ============
  const handelUpdate = () => {
    const updatedData = {
      service_id: serviceId,
      pkg_id: packageId,
    };

    dispatch(updateAssignedCms(compid, currentsrvid, updatedData));
    setCreateModelOpen(false);
    resetform();
  };

  // MERGE BOTH LISTS IN ONE TABLE
  // const mergedData = [
  //   ...(cmsassigned || []),
  //   ...(cmsnotassigned || []),
  // ];
  // console.log(96,mergedData);

  return (
    <div
    className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
  }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-col gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">

          {/* =================== ASSIGN/EDIT MODAL =================== */}
          {createModelOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white w-[420px] rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
                
                <div className="px-5 py-3 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {isediting ? "Edit Service" : "Assign Service"}
                  </h2>
                  <button
                    onClick={() => {
                      setCreateModelOpen(false);
                      resetform();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✖
                  </button>
                </div>

                <div className="px-5 py-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Service ID
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded px-3 py-2 border"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      placeholder="Enter Service ID"
                    
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Package ID
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded px-3 py-2 border"
                      value={packageId}
                      onChange={(e) => setPackageId(e.target.value)}
                      placeholder="Enter Package ID"
                    />
                  </div>
                </div>

                <div className="px-5 py-3 border-t flex justify-end gap-3">
                  <button
                    onClick={() => setCreateModelOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                  {isediting ? (
                    <button
                      onClick={handelUpdate}
                      className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =================== PAGE HEADER =================== */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-[16px] font-semibold">CMS Services</h2>

            <div className="flex items-center gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-[220px] border border-gray-200 rounded-[10px] pl-3 pr-4 py-2 text-sm bg-gray-50"
              />

              <button
                onClick={() => {
                  setCreateModelOpen(true);
                  resetform();
                }}
                className="p-2 bg-violet-400 text-white px-[20px] rounded-2xl"
              >
                Assign CMS
              </button>
            </div>
          </div>

          {/* =================== ONE MERGED TABLE =================== */}
          <table className="w-full text-sm text-left">
            <thead
              className={`text-[11px] uppercase border-b border-t ${
                theme === "dark"
                  ? "text-gray-400 border-gray-600 bg-gray-700"
                  : "text-gray-400 border-gray-300 bg-[#fcfcfc]"
              }`}
            >
              <tr>
                <th className="px-4 py-4">Service ID</th>
                <th className="px-4 py-4">Service Name</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Package(s)</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="text-[12px] font-semibold">
              {cmsassigned.length > 0 ? (
                cmsassigned.map((srv, i) => (
                  <tr
                    key={i}
                    className={`border-b ${
                      theme === "dark"
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2">{srv.service_id}</td>
                    <td className="px-4 py-2">{srv.service_name}</td>

                    <td className="px-4 py-2">
                      {srv.assigned ? (
                        <span className="text-green-600">Assigned</span>
                      ) : (
                        <span className="text-red-500">Not Assigned</span>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      {srv.assigned ? (
                        `${srv.pkg_name} (${srv.pkg_id})`
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedPackages(srv.packages || []);
                            setShowPkgModal(true);
                          }}
                          className="text-blue-600 underline"
                        >
                          View Packages
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-2 flex gap-2">
                      {srv.assigned ? (
                        <>
                          <button
                            onClick={() => handeledit(srv)}
                            className="bg-gray-900 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(srv.service_id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Unassigned
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setServiceId(srv.service_id);
                            setIsediting(false);
                            setCreateModelOpen(true);
                          }}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* =================== PACKAGE MODAL =================== */}
          {showPkgModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white w-[500px] rounded-lg shadow-xl border border-gray-300">
                <div className="px-5 py-3 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Package Details
                  </h2>
                  <button
                    onClick={() => setShowPkgModal(false)}
                    className="text-gray-600 hover:text-black text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="px-5 py-4 max-h-[320px] overflow-y-auto">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-100 text-gray-600 text-xs uppercase border-b">
                      <tr>
                        <th className="px-3 py-2 border">#</th>
                        <th className="px-3 py-2 border">Package Name</th>
                        <th className="px-3 py-2 border">Package ID</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedPackages.length > 0 ? (
                        selectedPackages.map((pkg, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-3 py-2 border">{idx + 1}</td>
                            <td className="px-3 py-2 border">{pkg.pkg_name}</td>
                            <td className="px-3 py-2 border">{pkg.pkg_id}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center py-4 text-gray-400 border"
                          >
                            No Packages Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 border-t text-right">
                  <button
                    onClick={() => setShowPkgModal(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>
      </main>
    </div>
  );
};

export default Getcommercial;
