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
  const [servicename, setServicename] = useState("");
  const [packageId, setPackageId] = useState("");
  const [isediting, setIsediting] = useState(false);
  const [currentsrvid, setCurrentsrvid] = useState("");

  const [showPkgModal, setShowPkgModal] = useState(false);
  const [viewmodelopen, setViewmodelopen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedcmstoshowcharges,setselectedcmstoshowcharges] =useState([])
  console.log(31,selectedcmstoshowcharges);

  const cmsassigned = useSelector(
    (state) => state.cmsassign.cmsassign?.services

  );
  const cmsassigned2 = useSelector(
    (state) => state.cmsassign.cmsassign

  );
  console.log(42,cmsassigned2);
  const allpkg = useSelector(
    (state) => state.cmsassign.cmsassign?.allPkgs


  );

  console.log(40,allpkg);
  const cmsassigned1 = useSelector(
    (state) => state.cmsassign.cmsassign
  );
 
  console.log(38,cmsassigned1);


  console.log(50,selectedPackages);

  

  // const cmsnotassigned = useSelector(
  //   (state) => state.cmsassign.cmsassign?.not_assigned_services
  // );

  useEffect(() => {
    dispatch(get_cms_assign(compid));
  }, [dispatch, compid]);

  // ========= RESET FORM =============
  const resetform = () => {
    setServiceId("");
    setServicename("")
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
    setPackageId(srv.pkg.pkg_id);
    console.log(105,srv.pkg.pkg_id);
    setServicename(srv.service_name)
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
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20">
    <div className="bg-white w-[420px] rounded-xl shadow-2xl animate-fadeIn">

      {/* Header */}
      <div className="px-5 py-3 flex justify-between items-center shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800">
          {isediting ? "Edit Service" : "Assign Service"}
        </h2>

        <button
          onClick={() => {
            setCreateModelOpen(false);
            resetform()
           
          }}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✖
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-3">

        {/* Service Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">
            Service Name
          </label>
          <input
            type="text"
            className="bg-gray-50 rounded-lg px-3 py-2 text-xs 
                       shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-gray-200"
            value={servicename}
            onChange={(e) => setServicename(e.target.value)}
            placeholder="Enter Service ID"
          />
        </div>

        {/* Package ID */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">
            Package ID
          </label>
          <input
            type="text"
            className="bg-gray-50 rounded-lg px-3 py-2 text-xs 
                       shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-gray-200"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            onClick={() => setShowPkgModal((prev) => !prev)}
            placeholder="Enter Package ID"
          />
        </div>

        {/* Package Dropdown */}
        {showPkgModal && (
          <div className="flex flex-col bg-white rounded-lg 
                          shadow-md max-h-[120px] overflow-y-auto text-xs">
            {allpkg.map((p, i) => (
              <div
                key={i}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setPackageId(p.pkg_id);
                  setShowPkgModal(false);
                }}
              >
                {p.pkg_id} - {p.pkg_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex justify-end gap-2 shadow-inner">
        <button
          onClick={() => setCreateModelOpen(false)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 
                     text-xs px-4 py-2 rounded-lg shadow-sm"
        >
          Cancel
        </button>

        {isediting ? (
          <button
            onClick={handelUpdate}
            className="bg-gray-900 hover:bg-gray-700 text-white 
                       text-xs px-4 py-2 rounded-lg shadow"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-gray-900 hover:bg-gray-700 text-white 
                       text-xs px-4 py-2 rounded-lg shadow"
          >
            Assign
          </button>
        )}
      </div>
    </div>
  </div>
)}


          {/* =================== PAGE HEADER =================== */}
          <div className="flex justify-between items-center p-4 rounded-xl 
                bg-gradient-to-r from-violet-50 to-purple-50 
                shadow-md border border-gray-100">

  {/* LEFT — Logo + Title */}
  <div className="flex items-center gap-3">

    {/* Logo */}
    <div className="w-10 h-10 rounded-xl bg-violet-500 
                    flex items-center justify-center text-white shadow">
      {/* Simple CMS Logo */}
      <span className="font-bold text-lg">C</span>
    </div>

    {/* Title + Subtitle */}
    <div>
      <h2 className="text-[18px] font-semibold text-gray-800">
        CMS Services
      </h2>
      <p className="text-xs text-gray-500">
        Manage and assign CMS service configurations
      </p>
    </div>
  </div>

  {/* RIGHT — Search + Action */}
  <div className="flex items-center gap-4">

    {/* Search */}
    <div className="relative flex justify-center items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search services..."
        className="w-[220px] rounded-xl pl-9 pr-4 py-2 text-sm 
                   bg-white border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-violet-300
                   shadow-sm"
      />

      {/* Search Icon */}
      <span className="absolute left-3 top-2.5 text-gray-400">
      <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>

    {/* Action Button */}
    {/* <button
      onClick={() => {
        setCreateModelOpen(true);
        resetform();
      }}
      className="bg-violet-500 hover:bg-violet-600 
                 text-white text-sm px-5 py-2 rounded-xl 
                 shadow transition"
    >
      + Assign CMS
    </button> */}
  </div>
</div>


          {/* =================== ONE MERGED TABLE =================== */}
          <table className="w-full text-sm text-left">
    <thead
      className={`text-[11px] uppercase font-semibold ${
        theme === "dark"
          ? "bg-gray-700 text-gray-300 border-b border-gray-600"
          : "bg-gray-50 text-gray-600 border-b border-gray-200"
      }`}
    >
      <tr>
        <th className="px-5 py-4">Service ID</th>
        <th className="px-5 py-4">Service Name</th>
        <th className="px-5 py-4">Status</th>
        <th className="px-5 py-4">Active Pkg</th>
        <th className="px-5 py-4">View Charges</th>
        <th className="px-5 py-4">Actions</th>
      </tr>
    </thead>

    <tbody className="text-[12px] font-medium">
      {cmsassigned.length > 0 ? (
        cmsassigned.map((srv, i) => (
          <tr
            key={i}
            className={`transition-all duration-200 ${
              i % 2 === 0
                ? theme === "dark"
                  ? "bg-gray-800"
                  : "bg-white"
                : theme === "dark"
                ? "bg-gray-750"
                : "bg-gray-50"
            } hover:bg-violet-50 hover:scale-[1.01] ${
              theme === "dark" ? "hover:bg-gray-700" : ""
            }`}
          >
            <td className="px-5 py-3">{srv.service_id}</td>
            <td className="px-5 py-3">{srv.service_name}</td>
           

            <td className="px-5 py-3">
              {srv.assigned ? (
                <span className="text-green-600 font-semibold bg-green-100 px-2 py-[2px] rounded-full text-[11px]">
                  Assigned
                </span>
              ) : (
                <span className="text-red-500 font-semibold bg-red-100 px-2 py-[2px] rounded-full text-[11px]">
                  Not Assigned
                </span>
              )}
            </td>
            <td className="px-5 py-3 flex pl-[35px]">
              {srv.assigned&& <span className="bg-violet-400 rounded-2xl p-2 text-white border-violet-500 border">
              {
            
            srv.pkg?.pkg_id
            
           } </span>}
           
             </td>
            <td className="px-5 py-3"
            >
              {srv.assigned? <button  onClick={()=>{setViewmodelopen(true),setselectedcmstoshowcharges(srv?.cms)}} className=" underline text-blue-500  p-1">View Charges </button>:""}
            
            </td>

            {/* <td className="px-5 py-3">
              {srv.assigned ? (
                <span className="text-gray-700 dark:text-gray-300">
                  {srv.pkg_name} ({srv.pkg_id})
                </span>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPackages(srv.packages || []);
                    setShowPkgModal(true);
                  }}
                  className="text-violet-600 hover:text-violet-800 underline"
                >
                  View Packages
                </button>
              )}
            </td> */}

            <td className="px-5 py-3 flex gap-2">
              {srv.assigned ? (
                <>
                  <button
                    onClick={() => handeledit(srv)}
                    className="bg-gray-900 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(srv.service_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition"
                  >
                    Unassign
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setServiceId(srv.service_id);
                    setServicename(srv.service_name)
                    setIsediting(false);
                    setCreateModelOpen(true);
                  }}
                  className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded-md text-xs transition"
                >
                  Assign
                </button>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="5"
            className="text-center py-6 text-gray-400 text-sm"
          >
            No services found
          </td>
        </tr>
      )}
    </tbody>
  </table>
          {/* =================== PACKAGE MODAL =================== */}
          {viewmodelopen && (
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20">
    <div className="bg-white w-[500px] rounded-lg shadow-2xl">
      
      <div className="px-5 py-4 max-h-[320px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase shadow-sm">
            <tr>
              <th className="px-3 py-2 text-left">Amount</th>
              <th className="px-3 py-2 text-left">Target Range</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Merchant Charges</th>
            </tr>
          </thead>

          <tbody>
            {selectedcmstoshowcharges.length > 0 ? (
              selectedcmstoshowcharges.map((c, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2">₹{c.amount}</td>
                  <td className="px-3 py-2">₹{`${c.fromval} - ₹${c.toval}`}</td>
                  <td className="px-3 py-2">{c.type}</td>
                  <td className="px-3 py-2">₹{c.mch}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-400"
                >
                  No Packages Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 text-right shadow-inner">
        <button
          onClick={() => setViewmodelopen(false)}
          className="bg-gray-700 text-white text-xs px-4 py-2 rounded-md shadow hover:bg-gray-800"
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
