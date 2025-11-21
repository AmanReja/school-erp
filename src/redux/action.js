import { jwtDecode } from "jwt-decode";
export const LOGIN = "LOGIN";
export const CREATEMERCHANT = "CREATEMERCHANT";
export const GETDETAILS = "GETDETAILS";
export const DELETE_MERCHANT = "DELETE_MERCHANT";
export const UPDATE_MERCHANT = "UPDATE_MERCHANT";


// action types
export const GET_SETTLEMENTS = "GET_SETTLEMENTS";
export const GET_ALL_SETTLEMENTS = "GET_ALL_SETTLEMENTS";
export const CREATE_SETTLEMENT = "CREATE_SETTLEMENT";
export const UPDATE_SETTLEMENT = "UPDATE_SETTLEMENT";
export const DELETE_SETTLEMENT = "DELETE_SETTLEMENT";





export const GETTRANSACTIONS_BY_COMPANYID = "GETTRANSACTIONS_BY_COMPANYID";
export const UPDATE_TXN_STATUS = "UPDATE_TXN_STATUS";
export const UPDATE_TXN_DATA = "UPDATE_TXN_DATA";
export const GETALL_TXN_DATA = "GETALL_TXN_DATA";





export const PKG_MASTER_GET = "PKG_MASTER_GET";
export const PKG_MASTER_CREATE = "PKG_MASTER_CREATE";
export const PKG_MASTER_UPDATE = "PKG_MASTER_UPDATE";
export const PKG_MASTER_DELETE = "PKG_MASTER_DELETE";



export const SERVICELIST_GET = "SERVICELIST_GET";
export const SERVICELIST_CREATE = "SERVICELIST_CREATE";
export const SERVICELIST_UPDATE = "SERVICELIST_UPDATE";
export const SERVICELIST_DELETE = "SERVICELIST_DELETE";


export const PKG_CMS_MASTER_GET = "PKG_CMS_MASTER_GET";
export const PKG_CMS_MASTER_CREATE = "PKG_CMS_MASTER_CREATE";
export const PKG_CMS_MASTER_UPDATE = "PKG_CMS_MASTER_UPDATE";
export const PKG_CMS_MASTER_DELETE = "PKG_CMS_MASTER_DELETE";






export const GET_CMS_ASSIGN = "GET_CMS_ASSIGN";
export const ASSIGNED_CMS = "ASSIGNED_CMS";
export const DELETE_ASSIGNED_CMS = "DELETE_ASSIGNED_CMS";
export const UPDATE_ASSIGNED_CMS = "UPDATE_ASSIGNED_CMS";








const baseUrl = "http://192.168.1.45:3000";

export const login = (admin,setLoading,navigate) => async (dispatch) => {
  try {
    console.log("Admin credentials:", admin);
    setLoading(true);

    const res = await fetch(`${baseUrl}/v1/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
      credentials: "include",
    });

    const data = await res.json();
   

    if (res.status===200) {
      alert("login successfull")
     
      setLoading(false);
      navigate("/dashboard/merchant");
      localStorage.setItem("token", data.token);
    }

    if(res.status===404){
      alert("invald credentials")
    }

 
    
   

  
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.error("Login error:", error);
    alert("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


export const createMerchant = (formData, setStep) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("Creating merchant:", formData);

  try {
    const res = await fetch(`${baseUrl}/v1/admin/marchent/entity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if (res.status === 201) {
      alert("Merchant created successfully");
      setStep(1);
      dispatch(getDetails())
      // Dispatch the created merchant data
      dispatch({ type: CREATEMERCHANT, payload: data });
    } else if (res.status === 403) {
      alert("Permission denied");
    } else {
      alert(data.message || "Failed to create merchant");
    }

  } catch (error) {
    alert("Error creating merchant: " + error.message);
  }
};

export const getDetails = (currentPage, itemsPerPage,searchTerm,setLoad) => async (dispatch) => {
  const token = localStorage.getItem("token");

  setLoad(true)

  try {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", currentPage);
    if (itemsPerPage) params.append("limit", itemsPerPage);
    if (searchTerm) params.append("search", searchTerm);
   
 

    const res = await fetch(`${baseUrl}/v1/admin/marchent/entity?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();
    
  setLoad(false)

    if (res.ok) {
      dispatch({ type: GETDETAILS, payload: data });
    } else {
      alert(data.message || "Failed to fetch merchants");
    }
  } catch (error) {
    alert("Error fetching merchants: " + error.message);
    
  setLoad(true)
  }
};


export const updateMerchant = (id, updatedData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  
  try {
    const res = await fetch(`${baseUrl}/v1/admin/marchent/entity/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    
    if (res.ok) {
      // Include the ID in payload for reducer to identify which merchant to update
      dispatch({ 
        type: UPDATE_MERCHANT, 
        payload: { 
          id: id, // or use corp_id if that's what you're using
          ...updatedData,
          ...data.data // include any returned data from API
        } 
      });
      alert("Merchant updated successfully");
      if (res.status === 403) {
        alert("Permission denied");
      }
    } else {
      alert(data.message || "Failed to update merchant");
    }

if(res.status===401){
  window.location.href="/"
}

  } catch (error) {
    alert("Error updating merchant: " + error.message);
  }
};

export const deleteMerchant = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  
  try {
    const res = await fetch(`${baseUrl}/v1/admin/marchent/entity/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
    });

    if(res.status===401){
      window.location.href="/"
      return
      
    }
    if (res.ok) {
      dispatch({ 
        type: DELETE_MERCHANT, 
        payload: id // assuming you're using corp_id as identifier
      });
      alert("Merchant deleted successfully");

    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete merchant");
    } 
 
  } catch (error) {
    alert("Error deleting merchant: " + error.message);
  }
};


// actions/settlement.js (or wherever you put them)
export const getSettlements = (company_id,searchTerm,searchStatus) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(195,searchStatus);



  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm?.toLowerCase()  );
  if (searchStatus) params.append("search",  searchStatus );

 
 

  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement/${company_id}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
  if (!res.ok) {
    // handle error
    console.error("Error fetching settlements:", data);
    return;
  }
  dispatch({ type: GET_SETTLEMENTS, payload: data });
};
export const getallSettlements = (searchTerm,searchStatus,page,parPage) => async (dispatch) => {

   console.log(251,searchStatus);

  const token = localStorage.getItem("token");
  console.log(195,searchStatus);




const params =new URLSearchParams()
  if (searchTerm) params.append("search", searchTerm  );
  if (searchStatus) params.append("status",  searchStatus );
  if (parPage) params.append("limit",  parPage );
  if (page) params.append("page",  page );

 
 

  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement-all?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
  if (!res.ok) {
    // handle error
    console.error("Error fetching settlements:", data);
    return;
  }
  dispatch({ type: GET_ALL_SETTLEMENTS, payload: data });
};

export const createSettlement = (formData,corp_id) => async (dispatch) => {

 
  const token = localStorage.getItem("token");
  console.log(formData,172);
  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement/${corp_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if(res.status===201){
    alert("settlement created")
    
  }
  if (res.status === 403) {
    alert("Permission denied");
  }
  if (res.status===400) {
    alert("settlement account is already exist")
    return
  }
  dispatch({ type: CREATE_SETTLEMENT, payload: data });
};

export const updateSettlement = (account_number,company_id, updatedData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement/${company_id}/${account_number}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
  if (res.status === 403) {
    alert("Permission denied");
  }
  if (!res.ok) {
    console.error("Error updating settlement:", data);
    return;
  }


  dispatch({ type: UPDATE_SETTLEMENT, payload: { account_number,company_id, data } });
};

export const deleteSettlement = (account_number,company_id) => async (dispatch) => {
  console.log(207,company_id,account_number);
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement/${company_id}/${account_number}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
  if (res.status === 403) {
    alert("Permission denied");
  }
  if (!res.ok) {
    const err = await res.json();
    console.error("Error deleting settlement:", err);
    return;
  }

  dispatch({ type: DELETE_SETTLEMENT, payload: company_id });
};




// ---------------- CREATE TRANSACTION ----------------


// ---------------- GET ALL TRANSACTIONS ----------------



export const getTransactions_by_companyid = (corpid,searchTerm,searchStatus,page,limit,downloadexcl=false,setLoad,startDate,
  endDate) => async (dispatch) => {



  setLoad(true)

  const token = localStorage.getItem("token");
  console.log(195,downloadexcl);



  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm  );
  if (searchStatus) params.append("status",  searchStatus );
  if (page) params.append("page",  page );
  if (limit) params.append("limit",  limit );
  if (startDate) params.append("start_date",  startDate );
  if (endDate) params.append("end_date",  endDate );
  if(downloadexcl) params.append("download", "excel");
 

 
 

  const res = await fetch(`${baseUrl}/v1/admin/payout/logs/${corpid}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });

  setLoad(false)
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
 
  if (!res.ok) {
    // handle error
    setLoad(true)
    console.error("Error fetching settlements:");
    return;
  }

  if (downloadexcl==true) {
    const blob = await res.blob();
    const fileURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "payout_logs.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }
  const data = await res.json();
  dispatch({ type: GETTRANSACTIONS_BY_COMPANYID, payload: data });
};



export const getall_txn_data = (searchTerm,searchStatus,page,limit,downloadexcl=false,setLoad,startDate,
  endDate) => async (dispatch) => {



  setLoad(true)

  const token = localStorage.getItem("token");
  console.log(195,downloadexcl);



  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm  );
  if (searchStatus) params.append("status",  searchStatus );
  if (page) params.append("page",  page );
  if (limit) params.append("limit",  limit );
  if (startDate) params.append("start_date",  startDate );
  if (endDate) params.append("end_date",  endDate );
  if(downloadexcl) params.append("download", "excel");
 

 
 

  const res = await fetch(`${baseUrl}/v1/admin/marchent/all-Transaction?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });

  setLoad(false)
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
 
  if (!res.ok) {
    // handle error
    setLoad(true)
    console.error("Error fetching settlements:");
    return;
  }
  if (downloadexcl==true) {
    const blob = await res.blob();
    const fileURL = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "payout_logs.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return; 
  }
  const data = await res.json();
  dispatch({ type: GETALL_TXN_DATA, payload: data });
};


export const update_Txn_status = (company_id,txn_id,updateddata,setUpdateload) => async (dispatch) => {


  console.log(459,company_id,txn_id,updateddata,setUpdateload);







  setUpdateload(true)

  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/v1/admin/payout/logs/${company_id}/${txn_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
      
    },
    body:JSON.stringify(updateddata)
  });

  setUpdateload(false)
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
 
  if (res.status===200) {
    

   
   alert("updated")
  }
 
  const data = await res.json();
  dispatch({ type: UPDATE_TXN_STATUS, payload: data.updated
  });
};
export const update_Txn_data = (txn_id,updateddata,setUpdateload) => async (dispatch) => {


  console.log(459,txn_id,updateddata,setUpdateload);







  setUpdateload(true)

  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/v1/admin/payout/logs/${txn_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
      
    },
    body:JSON.stringify(updateddata)
  });

  setUpdateload(false)
  
  if(res.status===401){
    window.location.href="/"
    return
    
  }
 
  if (res.status===200) {
   

   
   alert("updated")
  }
 
  const data = await res.json();
  // console.log(609,data);
  dispatch({ type: UPDATE_TXN_DATA, payload: data.updated
  });
};

// ---------------- HANDEL PKG MASTER ----------------///



// ---------------- GET ALL PACKAGES ----------------
export const getPkgMasters = (searchTerm, page, limit,status,start_date,end_date) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (status) params.append("status", status);
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      console.error("Error fetching packages:", data);
      alert(data.message || "Failed to fetch package masters");
      return;
    }

    dispatch({ type: PKG_MASTER_GET, payload: data.data });
  } catch (error) {
    alert("Error fetching package masters: " + error.message);
  }
};

// ---------------- CREATE PACKAGE ----------------
export const createPkgMaster = (formData) => async (dispatch) => {
  console.log(formData);
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("pkg",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 201) {

    
      
      
      dispatch({ type: PKG_MASTER_CREATE, payload: data.data });

      dispatch(getPkgMasters())
      
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const deletePkgMaster = (pkgid) => async (dispatch) => {
console.log(722,pkgid);
 
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/${pkgid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     
    });

    const data = await res.json();
    console.log("pkgdelete",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {

    
      
      
      dispatch({ type: PKG_MASTER_DELETE, payload: data.data });

      dispatch(getPkgMasters())
   
      
    


    } else {
      // alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const updatePkgMaster = (pkgid,updateddata) => async (dispatch) => {
console.log(769,pkgid,updateddata);
 
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/${pkgid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(updateddata)
     
    });

    const data = await res.json();
    console.log("pkgdelete",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {

    
      
      
      dispatch({ type: PKG_MASTER_UPDATE, payload: data });

      dispatch(getPkgMasters())
   
      
    


    } else {
      // alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};









////////PACKAGE_CMS_MASTER//////////





export const getPkg_cms_Masters = (searchTerm, page, limit,status,downloadexcl=false) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (searchTerm) params.append("search", searchTerm);
  if (status) params.append("type", status);
  if (limit) params.append("limit", limit);
  if(downloadexcl) params.append("download", "excel");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (downloadexcl==true) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "PKG_CMS_DATA.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      return; 
    }


    const data = await res.json();

    if (!res.ok) {
      console.error("Error fetching packages:", data);
      alert(data.message || "Failed to fetch package masters");
      return;
    }

    dispatch({ type: PKG_CMS_MASTER_GET, payload: data });
  } catch (error) {
    alert("Error fetching package masters: " + error.message);
  }
};

// ---------------- CREATE PACKAGE ----------------
export const create_Pkg_cms_Master = (ranges,service_id,pkg_id) => async (dispatch) => {
  // console.log("883 CMS",commerciallist);
  const token = localStorage.getItem("token");

  const datarow = {
    pkg_id,
    service_id,
    ranges
  };

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datarow),
    });

    const data = await res.json();
    console.log("pkg",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 201) {

    
      
      
      dispatch({ type: PKG_CMS_MASTER_CREATE, payload: data });

      dispatch(getPkg_cms_Masters())
      // setCreatemodelopen(false)
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const update_Pkg_cms_Master = (id,formData) => async (dispatch) => {
  console.log("863 CMS",formData);
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("pkg",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {

    
      
      
      dispatch({ type: PKG_CMS_MASTER_UPDATE, payload: data });

      dispatch(getPkg_cms_Masters())
    
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const delete_Pkg_cms_Master = (id) => async (dispatch) => {
  console.log("906 CMS id",id);
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    
    });

    const data = await res.json();
    console.log("pkg",data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {

    
      
      
      dispatch({ type: PKG_CMS_MASTER_DELETE, payload: data });

      dispatch(getPkg_cms_Masters())
    
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};











export const createService = (formData, setCreateModalOpen) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("SERVICE CREATE", data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 201) {
      dispatch({ type: SERVICELIST_CREATE, payload: data.data });
      dispatch(getServiceList());
      setCreateModalOpen(false);
    } else {
      alert(data.message || "Failed to create service");
    }
  } catch (error) {
    alert("Error creating service: " + error.message);
  }
};

//////////update service///////


export const updateService = (serviceId, formData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/services/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("SERVICE UPDATE", data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      dispatch({ type: SERVICELIST_UPDATE, payload: data });
      dispatch(getServiceList());
      // setUpdateModalOpen(false);
    } else {
      alert(data.message || "Failed to update service");
    }
  } catch (error) {
    alert("Error updating service: " + error.message);
  }
};


/////////delete///////


export const deleteService = (serviceId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/services/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("SERVICE DELETE", data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      dispatch({ type: SERVICELIST_DELETE, payload: serviceId });
      dispatch(getServiceList());
    } else {
      alert(data.message || "Failed to delete service");
    }
  } catch (error) {
    alert("Error deleting service: " + error.message);
  }
};


////get servicelist/////



export const getServiceList = (searchTerm, page, limit,status) => async (dispatch) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (status) params.append("status", status);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  try {
    const res = await fetch(`${baseUrl}/v1/admin/services?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("SERVICE GET", data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      dispatch({ type: SERVICELIST_GET, payload: data });
    } else {
      alert(data.message || "Failed to fetch service list");
    }
  } catch (error) {
    alert("Error fetching services: " + error.message);
  }
};





/////get marchent by corp id////
export const get_cms_assign = (corp_id,currentPage,itemsPerPage,searchTerm) => async (dispatch) => {
  const token = localStorage.getItem("token");



  try {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", currentPage);
    if (itemsPerPage) params.append("limit", itemsPerPage);
    if (searchTerm) params.append("search", searchTerm);
   
 

    const res = await fetch(`${baseUrl}/v1/admin/cms/assign/${corp_id}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();
    

    if (res.ok) {
      dispatch({ type: GET_CMS_ASSIGN, payload: data.data });
    } else {
      alert(data.message || "Failed to fetch merchants");
    }
  } catch (error) {
    alert("Error fetching merchants: " + error.message);

  }
};



export const assignedCms = (corp_id,formData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/cms/assign/${corp_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("CMS ASSIGNED", data.data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

     
    if (res.status === 201) {
      dispatch({ type: ASSIGNED_CMS, payload: data });
      dispatch(get_cms_assign());
      // setCreateModalOpen(false);

      // window.location.href=""
    } else {
      alert(data.message || "Failed to create service");
    }
  } catch (error) {
    // alert("Error creating service: " + error.message);
  }
};





export const updateAssignedCms = (company_id,service_id, formData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/cms/assign/${company_id}/${service_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("CMS UPDATED", data.data.old_service_id);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      dispatch({ type: UPDATE_ASSIGNED_CMS, payload: data.data.old_service_id });
      dispatch(get_cms_assign());
      // window.location.href=""
    } else {
      alert(data.message || "Failed to update CMS assignment");
    }
  } catch (error) {
    alert("Error updating service: " + error.message);
  }
};




export const deleteAssignedCms = (company_id,service_id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/cms/assign/${company_id}/${service_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("CMS DELETED", data);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }
    console.log(1324,data);

    if (res.status === 200) {
      dispatch({ type: DELETE_ASSIGNED_CMS, payload: data.service.id});
    await  dispatch(get_cms_assign());
      // window.location.href=""
    } else {
      alert(data.message || "Failed to delete CMS assignment");
    }
  } catch (error) {
    alert("Error deleting service: " + error.message);
  }
};










