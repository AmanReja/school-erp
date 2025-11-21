import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation,useParams } from "react-router-dom";
import { Theme } from "../Contexts/Theme";
import { X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { LoadDetails } from "../Contexts/LoadDetails";
import {get_cms_assign,assignedCms,deleteAssignedCms,updateAssignedCms} from "../redux/action"
import { useDispatch, useSelector } from "react-redux";


const Notassigned = () => {
  const { theme } = useContext(Theme);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const {compid} = useParams()
  console.log(13,compid);

  const [searchTerm, setSearchTerm] = useState("");
  const { loadD, setLoadD } = useContext(LoadDetails);
  const [load, setLoad] = useState(false);


  const [iscmsassigned,setIscmsassigned]=useState(true)



  const [createModelOpen, setCreateModelOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [packageId, setPackageId] = useState("");


  const [isediting,setIsediting] =useState(false)

  const [currentsrvid,setCurrentsrvid]=useState("")

  // -----------------------------------------
  // ✅ DEMO MERCHANT ARRAY (No Redux)
  // -----------------------------------------




  const cmsassigndata = useSelector((state)=>state.cmsassign.cmsassign)
  const cmsnotassigned = useSelector((state)=>state.cmsassign.cmsassign?.not_assigned_services
  )
  const cmsassigned = useSelector((state)=>state.cmsassign.cmsassign?.assigned_services

  )
  console.log(54,cmsassigndata);







 useEffect(() => {
   dispatch(get_cms_assign(compid))
 
  
 }, [dispatch])
 

 const handleSubmit = () => {
  const assigneddata = {
    service_id: serviceId,
    pkg_id: packageId
  };

  console.log("POST DATA:", assigneddata);

dispatch(assignedCms(compid,assigneddata))

  // API CALL HERE
  // fetch("/api/assign", { method: "POST", body: JSON.stringify(payload) });

  setCreateModelOpen(false);
};


const handleDelete = (service_id) => {
  if (!window.confirm("Are you sure you want to delete this assignment?")) return;

  console.log("DELETE ID:", service_id);

  dispatch(deleteAssignedCms(compid,service_id));   // <--- redux action
};





  const handeledit = (srv)=>{
    setCurrentsrvid(srv.service_id)
    setServiceId(srv.service_id),
    setPackageId(srv.pkg_id)
  }

  const handelUpdate = ()=>{

    const upadtedassignedcms={
      service_id: serviceId,
      pkg_id: packageId
    }
    dispatch(updateAssignedCms(compid,currentsrvid,upadtedassignedcms))
  }


const resetform = ()=>{

  setServiceId("")
  setPackageId("")
  setIsediting(false)
}

  // -----------------------------------------
  // Search
  // -----------------------------------------

  // -----------------------------------------
  // Pagination


  // -----------------------------------------
  // Edit Merchant (LOCAL)
  // -----------------------------------------
 
  return (
    <div
      className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <main className="w-full h-full flex flex-col overflow-y-scroll">
        <section className="w-full flex flex-col sm:flex-row gap-[20px] mt-[20px] sm:min-h-[600px] 2xl:h-[780px] sm:h-[600px] px-[2px] sm:px-[20px]">
        {createModelOpen && (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white w-[420px] rounded-lg shadow-xl border border-gray-200 animate-fadeIn">

      {/* HEADER */}
      <div className="px-5 py-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{isediting?"Edit Service":"Submit Service"}</h2>
        <button
          onClick={() => {setCreateModelOpen(false),resetform()}}
          className="text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>

      {/* BODY */}
      <div className="px-5 py-4 flex flex-col gap-4">

        {/* Service ID */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Service ID</label>
          <input
            type="text"
            className="input border-gray-300 rounded px-3 py-2"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            placeholder="Enter Service ID"
          />
        </div>

        {/* Package ID */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Package ID</label>
          <input
            type="text"
            className="input border-gray-300 rounded px-3 py-2"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            placeholder="Enter Package ID"
          />
        </div>

      </div>

      {/* FOOTER */}
      <div className="px-5 py-3 border-t flex justify-end gap-3">
        <button
          onClick={() => setCreateModelOpen(false)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
{isediting? <button
          onClick={handelUpdate}
          className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>: <button
          onClick={handleSubmit}
          className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>}
       
      </div>

    </div>
  </div>
)}

          {/* TABLE START — NO CSS CHANGED */}
          <div
            className={`flex sm:w-[100%] w-full h-full flex-col rounded-xl overflow-y-auto border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-100 text-gray-800"
            }`}
          >
            <div className="flex justify-between items-center p-4 h-[60px] w-full">
              <h2 className="text-[16px] font-semibold"> {iscmsassigned?"Assigned Services":"Not Assigned Services"}</h2>

              <button
  onClick={() => { setIscmsassigned((prev)=>!prev); }}
  className="px-[20px] p-2 rounded-2xl text-white 
             bg-gradient-to-r from-gray-700 to-gray-500 
             shadow-md hover:shadow-lg transition-all 
             hover:from-gray-600 hover:to-gray-400 
             hover:scale-[1.03]"
>
 {iscmsassigned?"Switch to Unassigned":"Switch to Assigned"} 
</button>


              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search merchants..."
                  className="w-[220px] border outline-none border-gray-200 rounded-[10px] pl-10 pr-4 py-2 text-sm bg-gray-50"
                />

                <button
                  onClick={() => {setCreateModelOpen(true)}}
                  className="p-2 bg-violet-400 text-white px-[20px] rounded-2xl"
                >
                Assign Cms
                </button>
              </div>
            </div>
            {iscmsassigned? 
            
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
                <th className="px-4 py-4">Package ID</th>
                <th className="px-4 py-4">Package Name</th>
                <th className="px-4 py-4">Assigned</th>
                <th className="px-4 py-4">Service Active</th>
                <th className="px-4 py-4">Package Active</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
          
            <tbody className="text-[12px] font-semibold">
              {Array.isArray(cmsassigned) && cmsassigned.length > 0 ? (
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
                    <td className="px-4 py-2">{srv.pkg_id}</td>
                    <td className="px-4 py-2">{srv.pkg_name}</td>
                    <td className="px-4 py-2">{srv.assigned ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">{srv.service_active ? "Active" : "Inactive"}</td>
                    <td className="px-4 py-2">{srv.package_active ? "Active" : "Inactive"}</td>
          
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => {handeledit(srv),setIsediting(true),setCreateModelOpen(true)}}
                        className="bg-gray-900 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
          
                      <button
                        onClick={() => handleDelete(srv.service_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-400">
                    No assigned services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          :  <table className="w-full text-sm text-left">
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
      <th className="px-4 py-4">Assigned</th>
      <th className="px-4 py-4">Packages</th>
      
    </tr>
  </thead>

  <tbody className="text-[12px] font-semibold">
    {Array.isArray(cmsnotassigned) && cmsnotassigned.length > 0 ? (
      cmsnotassigned.map((srv, i) => (
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
          <td className="px-4 py-2">{srv.assigned ? "Yes" : "No"}</td>

          {/* Packages List */}
          <td className="px-4 py-2">
            {srv.packages?.length > 0
              ? srv.packages.map((p) => p.pkg_name).join(", ")
              : "No Package"}
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

}
         

            {/* Pagination - unchanged */}
            {/* <div
              className={`flex flex-col sm:flex-row justify-between items-center p-4 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, totalRecords)} of {totalRecords} entries
              </div>

              <div className="flex items-center gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  <ChevronsLeft size={16} />
                </button>

                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </button>

                {getPageNumbers().map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`min-w-[32px] h-8 rounded text-sm ${
                      p === currentPage ? "bg-violet-600 text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div> */}
          </div>

          {/* TABLE END */}
        </section>
      </main>

      {/* UPDATE MODAL (unchanged) */}
      {/* {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-2xl border shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Update Merchant</h2>
              <button onClick={() => setIsUpdateModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={updateFormData.name}
                onChange={handleUpdateInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="wallet_id"
                value={updateFormData.wallet_id}
                onChange={handleUpdateInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="email"
                value={updateFormData.email}
                onChange={handleUpdateInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="mobile_number"
                value={updateFormData.mobile_number}
                onChange={handleUpdateInputChange}
                className="border p-2 rounded"
              />
              <textarea
                name="address"
                value={updateFormData.address}
                onChange={handleUpdateInputChange}
                className="border p-2 rounded md:col-span-2"
              />
            </div>

            <div className="flex justify-end p-4 gap-3">
              <button onClick={() => setIsUpdateModalOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Notassigned;
