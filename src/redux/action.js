// import { toast } from "sooner";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
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
export const PKG_CMS_MASTER_GET_BY_PKG_ID = "PKG_CMS_MASTER_GET_BY_PKG_ID";
export const PKG_CMS_MASTER_CREATE_BY_PKG_ID = "PKG_CMS_MASTER_CREATE_BY_PKG_ID";
export const PKG_CMS_MASTER_CREATE = "PKG_CMS_MASTER_CREATE";
export const PKG_CMS_MASTER_UPDATE = "PKG_CMS_MASTER_UPDATE";
export const PKG_CMS_MASTER_DELETE = "PKG_CMS_MASTER_DELETE";



export const DISPUTE_CREATE = "DISPUTE_CREATE";
export const DISPUTE_UPDATE = "DISPUTE_UPDATE";
// export const DISPUTE_GET = "DISPUTE_GET";
export const DISPUTE_GET_BY_CORPID = "DISPUTE_GET_BY_CORPID";
export const GETALL_DISPUTE = "GETALL_DISPUTE";


export const GET_CMS_ASSIGN = "GET_CMS_ASSIGN";
export const ASSIGNED_CMS = "ASSIGNED_CMS";
export const DELETE_ASSIGNED_CMS = "DELETE_ASSIGNED_CMS";
export const UPDATE_ASSIGNED_CMS = "UPDATE_ASSIGNED_CMS";




export const VERIFY_OTP = "VERIFY_OTP";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SENDOTP = "SENDOTP";



export const ADMINDETAILS = "ADMINDETAILS";
export const UPDATE_ADMIN_DETAILS = "UPDATE_ADMIN_DETAILS";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";


export const GET_MERCHENT_ENTITY = "GET_MARCHENT_ENTITY";
export const GET_MERCHENT_ENTITY_DELETED = "GET_MERCHENT_ENTITY_DELETED";
export const DELETE_ENTITY = "DELETE_ENTITY";




export const GETALL_FUND = "GETALL_FUND";
export const GET_FUNDS_BY_CORPID = "GET_FUNDS_BY_CORPID";


export const GET_VIRTUALFUNDS_BY_CORPID = "GET_VIRTUALFUNDS_BY_CORPID";
export const GET_VIRTUALFUNDS = "GET_VIRTUALFUNDS";


export const FUND_TRANSFER = "FUND_TRANSFER";

export const GET_ENTITY_IP_DETAILS = "GET_ENTITY_IP_DETAILS";
export const UPDATE_ENTITY_IP = "UPDATE_ENTITY_IP";
export const GET_TOKEN_VALIDITY = "GET_TOKEN_VALIDITY";

export const GET_WALLET_LEDGER = "GET_WALLET_LEDGER";









export const GET_DISPUTE_OPEN="GET_DISPUTE_OPEN";
export const GET_DISPUTE_UNDER_REVIEW ="GET_DISPUTE_UNDER_REVIEW";
export const GET_DISPUTE_RESOLVED="GET_DISPUTE_RESOLVED";
export const GET_DISPUTE_REJECTED="GET_DISPUTE_REJECTED";












// "http://192.168.1.45:3000"

// "https://acs.busybox.in"



const baseUrl = import.meta.env.VITE_LOCAL_URL;
console.log(baseUrl);


export const login = (admin,setLoading,navigate) => async (dispatch) => {
  try {
   
    setLoading(true);

    const res = await fetch(`${baseUrl}/v1/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
      credentials: "include",
    });

    const data = await res.json();
   

    if (res.status===200) {
      // alert("login successfull");
      toast.success("login Successfull")
     
      setLoading(false);
      navigate("/dashboard/merchant");
      localStorage.setItem("token", data.token);
    }

    if(res.status===401){

      toast.error("Wrong Password")
    
    }
    if(res.status===404){

      toast.error("Invalid Credentials")
     
    }

 
    
   

  
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.error("Login error:", error);
    toast.error("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


export const createMerchant = (formData, setStep) => async (dispatch) => {
  const token = localStorage.getItem("token");
 

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

export const getDetails = (currentPage, itemsPerPage,searchTerm) => async (dispatch) => {
  const token = localStorage.getItem("token");


 
 
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
    
  

    if (res.ok) {
      dispatch({ type: GETDETAILS, payload: data });
    } else {
      alert(data.message || "Failed to fetch merchants");
    }
  } catch (error) {
    alert("Error fetching merchants: " + error.message);
    

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
    console.log(200,data);

    if (res.status === 403) {
      alert("Permission denied");
    }
    
    if (res.status===200) {
  
      alert("Merchant updated successfully");
      dispatch(getDetails())
      
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
      toast.success("Merchant deleted successfully");

    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to delete merchant");
    } 
 
  } catch (error) {
    alert("Error deleting merchant: " + error.message);
  }
};


// actions/settlement.js (or wherever you put them)
export const getSettlements = (company_id,searchTerm,searchStatus) => async (dispatch) => {
  const token = localStorage.getItem("token");
 



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



  const token = localStorage.getItem("token");
  




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
    toast.success("Settlement Created")
    
  }
  if (res.status === 403) {
    toast.error("Permission denied");
  }
  if (res.status===400) {
    toast.error("Settlement account is already exist")
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
    toast.error("Permission denied");
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
    toast.error("Permission denied");
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
    

   
   toast.success("Status Updated")
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
   

   
   toast.success("Status Updated")
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

  console.log(704,status);

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
      toast.error(data.message || "Failed to create package");
      
    }
  } catch (error) {
    toast.error("Error creating package: " + error.message);
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





// export const getPkg_cms_Masters = (searchTerm, page, limit,status,downloadexcl=false) => async (dispatch) => {
//   const token = localStorage.getItem("token");

//   const params = new URLSearchParams();
//   if (page) params.append("page", page);
//   if (searchTerm) params.append("search", searchTerm);
//   if (status) params.append("type", status);
//   if (limit) params.append("limit", limit);
//   if(downloadexcl) params.append("download", "excel");

//   try {
//     const res = await fetch(`${baseUrl}/v1/admin/pkg/cms?${params.toString()}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.status === 401) {
//       window.location.href = "/";
//       return;
//     }

//     if (downloadexcl==true) {
//       const blob = await res.blob();
//       const fileURL = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = fileURL;
//       link.setAttribute("download", "PKG_CMS_DATA.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       return; 
//     }


//     const data = await res.json();

//     if (!res.ok) {
//       console.error("Error fetching packages:", data);
//       alert(data.message || "Failed to fetch package masters");
//       return;
//     }

//     dispatch({ type: PKG_CMS_MASTER_GET, payload: data });
//   } catch (error) {
//     alert("Error fetching package masters: " + error.message);
//   }
// };
export const getPkg_cms_Masters_packageid = (searchTerm, page, limit,status,downloadexcl=false,pkg_id,service_id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  // pkg/cms/:service_id/:pkg_id
  console.log("940",service_id,pkg_id);

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (searchTerm) params.append("search", searchTerm);
  if (status) params.append("type", status);
  if (limit) params.append("limit", limit);
  if(downloadexcl) params.append("download", "excel");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${service_id}/${pkg_id}?${params.toString()}`, {
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

    dispatch({ type: PKG_CMS_MASTER_GET_BY_PKG_ID, payload: data });
  } catch (error) {
    alert("Error fetching package masters: " + error.message);
  }
};

// ---------------- CREATE PACKAGE ----------------
export const create_Pkg_cms_Master_packageid = (ranges,pkgid,serviceid) => async (dispatch) => {
  // console.log("883 CMS",commerciallist);
  const token = localStorage.getItem("token");

  const datarow = {
    pkgid,
    serviceid,
    ranges
  };

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${serviceid}/${pkgid}`, {
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

    
      
      
      dispatch({ type: PKG_CMS_MASTER_CREATE_BY_PKG_ID, payload: data });

      dispatch(
        getPkg_cms_Masters_packageid(
          "",
          1,
          10,
          "",
          false,
          pkgid,
          serviceid
        )
      );
      // setCreatemodelopen(false)
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const update_Pkg_cms_Master = (id,formData,serviceid,pkgid) => async (dispatch) => {
  console.log("863 CMS",formData);
  console.log("sr CMS",serviceid);
  console.log("pk CMS",pkgid);
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${serviceid}/${pkgid}/${id}`, {
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

   
        dispatch(
          getPkg_cms_Masters_packageid(
            "",
            1,
            10,
            "",
            false,
            pkgid,
            serviceid
          )
        )
    
      
    


    } else {
      alert(data.message || "Failed to create package");
      
    }
  } catch (error) {
    alert("Error creating package: " + error.message);
  }
};
export const delete_Pkg_cms_Master = (id,service_id,pkg_id) => async (dispatch) => {
  console.log("906 CMS id",id);
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/pkg/cms/${service_id}/${pkg_id}/${id}`, {
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

      dispatch(
        getPkg_cms_Masters_packageid(
          "",
          1,
          10,
          "",
          false,
          pkg_id,
          service_id
        )
      )
  
    
      
    


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
      dispatch(get_cms_assign(corp_id));
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
      dispatch({ type: UPDATE_ASSIGNED_CMS, payload: data });
      dispatch(get_cms_assign(company_id));
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
      // dispatch({ type: DELETE_ASSIGNED_CMS, payload: data.service.id});
    await  dispatch(get_cms_assign(company_id));
      // window.location.href=""
    } else {
      alert(data.message || "Failed to delete CMS assignment");
    }
  } catch (error) {
    alert("Error deleting service: " + error.message);
  }
};







/////otp////

export const send_otp =
  (forgetpassemail, seterror, navigate, setLoad) => async (dispatch) => {
    setLoad(true);

    const res = await fetch(`${baseUrl}/v1/admin/forgot-password/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgetpassemail }),
    });

    const data = await res.json();

    if (res.status === 200) {
      navigate("/otpverification");

      setLoad(false);
    } else {
      seterror(true);
      setLoad(false);
    }
    dispatch({ type: "SENDOTP", payload: data });
  };
export const verify_otp =
  (otp, setLoad, setError, navigate) => async (dispatch) => {
    setLoad(true);

    const res = await fetch(`${baseUrl}/v1/admin/forgot-password/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otp }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("otp verified");
      setLoad(false);

      navigate("/resetpass");
    } else {
      setLoad(false);
      setError(true);
    }
    dispatch({ type: "VERIFY_OTP", payload: data });
  };



  export const forgotpassword =
  (uppassword, navigate, setLoad, setError) => async (dispatch) => {
    if (window.confirm("Are you sure you want to update your password")) {
      setLoad(true);

      const res = await fetch(`${baseUrl}/v1/admin/forgot-password/reset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: uppassword }),
      });

      if (res.status === 200) {
        alert("password hasbeen updated");

        navigate("/");
        setLoad(false);
      }
      if (res.status === 400) {
        setLoad(false);
        setError("verified email not found");
      }

      const data = await res.json();
      dispatch({ type: "FORGOT_PASSWORD", payload: data });
    }
  };





  ///admin detail...


  export const admin_details = () => async (dispatch) => {
    const token = localStorage.getItem("token");
  
  
  
    try {
     
  
      const res = await fetch(`${baseUrl}/v1/admin/details`, {
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
        dispatch({ type: ADMINDETAILS, payload: data });
      } else {
        alert(data.message || "Failed to fetch merchants");
      }
    } catch (error) {
      alert("Error fetching merchants: " + error.message);
  
    }
  };
  

  export const update_admin_details = (updatedinfo) => async (dispatch) => {
    const token = localStorage.getItem("token") || {};
    const res = await fetch(`${baseUrl}/v1/admin/update-details`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedinfo),
    });
  
    // if (res.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/";
    //   return;
    // }
  
    if (res.status === 200) {
      alert("user details updated");
  
     dispatch(admin_details())
    }
  
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
  
    dispatch({ type: "UPDATE_ADMIN_DETAILS", payload: data });
  };
  


  export const updatePassword =
  (updatedpass) => async (dispatch) => {
    if (window.confirm("Are you sure you want to update your password")) {
     
      const token = localStorage.getItem("token") || {};

      const res = await fetch(`${baseUrl}/v1/admin/forgot-password/current`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword:updatedpass}),
      });

      if (res.status === 200) {
        alert("password hasbeen updated");

      
      }
     
      const data = await res.json();
      dispatch({ type: "UPDATE_PASSWORD", payload: data });
    }
  };




  export const getmarchentent_by_companyid =(companyId,status)=> async (dispatch)=>{
    console.log("status",status);

    const token = localStorage.getItem("token") || {};

    const params = new URLSearchParams();

    if (status) params.append("status",status)

    const res = await fetch(`${baseUrl}/v1/admin/callback/${companyId}?${params.toString()}`,{
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

    })

    
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();
    console.log(1582,data);
    if (res.status===200) {

      console.log(data);
      
     
    }

    dispatch({ type: GET_MERCHENT_ENTITY, payload: data });

  } 
  export const getmarchentent_by_companyid_deleted =(companyId)=> async (dispatch)=>{
    

    const token = localStorage.getItem("token") || {};

    const params = new URLSearchParams();

    // if (status) params.append("status",status)

    const res = await fetch(`${baseUrl}/v1/admin/callback/${companyId}/deleted`,{
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

    })

    
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    const data = await res.json();
    console.log(1582,data);
    if (res.status===200) {

      console.log(data);
      
     
    }

    dispatch({ type: GET_MERCHENT_ENTITY_DELETED, payload: data });

  } 



  
  export const delete_entity =
  (companyId,status) => async (dispatch) => {
 
    

    try {
      if (window.confirm("Are you sure to delete this entity")) {
     

        const res = await fetch(`${baseUrl}/v1/admin/callback/${companyId}/${status}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        
        });
  
        if (res.status === 200) {
          // alert("Entity Hasbeen Deleted");
  
          dispatch(getmarchentent_by_companyid(companyId))
  
        }
        if (res.status === 400) {
      // console.log(err.message);
        }
  
        const data = await res.json();
        
      }
    } catch (error) {
      alert(error)
    }
 
  };



  
  export const getall_fund = (
  page,
  perpage,
  search,
  fundstatus,
  searchdate_start,
  searchdate_end,
  downloadexcl = false // Added parameter
) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (perpage) params.append("limit", perpage);
    if (search) params.append("search", search);
    
    // Logic to handle "All" status similar to dispute function
    if (fundstatus && fundstatus.toLowerCase() !== "all") {
        params.append("status", fundstatus);
    }
    
    if (searchdate_start) params.append("start_date", searchdate_start);
    if (searchdate_end) params.append("end_date", searchdate_end);

    if (downloadexcl) params.append("download", "excel");
    
    // Often APIs require an export flag to return a buffer instead of JSON
   

    const res = await fetch(`${baseUrl}/v1/admin/fund-requests?${params.toString()}`, {
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

    // --- Excel Download Logic Start ---





    if (downloadexcl===true) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute(
        "download",
        `ManualFund_Report_${searchdate_start || "all"}-${searchdate_end || "all"}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return;
    }
    // --- Excel Download Logic End ---

    const data = await res.json();
    dispatch({ type: "GETALL_FUND", payload: data });

  } catch (error) {
    console.error("Fund Fetch Error:", error);
  }
};






export const update_fund_status = (company_id,request_id, formData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(formData);

  try {
    const res = await fetch(`${baseUrl}/v1/admin/fund-requests/${company_id}/${request_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    // console.log("CMS UPDATED", data.data.old_service_id);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      // dispatch({ type: UPDATE_ASSIGNED_CMS, payload: data });
      dispatch(getall_fund());
      alert("sucess")
      // window.location.href=""
    } else {
      // alert(data.message || "Failed to update CMS assignment");
    }
  } catch (error) {
    // alert("Error updating service: " + error.message);
  }
};
export const update_fund_status_by_corp = (company_id,request_id, formData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log(formData);

  try {
    const res = await fetch(`${baseUrl}/v1/admin/fund-requests/${company_id}/${request_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    // console.log("CMS UPDATED", data.data.old_service_id);

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    if (res.status === 200) {
      // dispatch({ type: UPDATE_ASSIGNED_CMS, payload: data });
      dispatch(get_funds_by_Corpid(company_id));
      alert("sucess")
      // window.location.href=""
    } else {
      // alert(data.message || "Failed to update CMS assignment");
    }
  } catch (error) {
    // alert("Error updating service: " + error.message);
  }
};







export const get_funds_by_Corpid = (corp_id,page,perpage,search,fundstatus,searchdate_start,searchdate_end,downloadexcl=false) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};


  const params =new URLSearchParams();
  if (page) params.append("page", page);
  if (perpage) params.append("limit", perpage);
  if (search) params.append("search", search);
  if (fundstatus) params.append("status", fundstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);
  if (downloadexcl) params.append("download", "excel");


  const res = await fetch(`${baseUrl}/v1/admin/fund-requests/${corp_id}?${params.toString()}`, {
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


   if (downloadexcl===true) {
      // res.blob() is critical here (equivalent to responseType: 'blob')
      const blob = await res.blob();
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      
      // Set filename with Corp ID and Timestamp
      link.setAttribute(
        "download", 
        `ManualFund_Report_${corp_id}_${new Date().getTime()}.xlsx`
      );
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      return; // Stop here so we don't try to parse as JSON
    }





  const data = await res.json();
  dispatch({ type: "GET_FUNDS_BY_CORPID", payload: data });
};




export const getvirtualfunds = (corp_id,page,perpage,search,fundstatus,searchdate_start,searchdate_end) => async (dispatch) => {
  const token = localStorage.getItem("token") || {};


  const params =new URLSearchParams();
  if (page) params.append("page", page);
  if (perpage) params.append("limit", perpage);
  if (search) params.append("search", search);
  if (fundstatus) params.append("status", fundstatus);
  if (searchdate_start) params.append("start_date", searchdate_start);
  if (searchdate_end) params.append("end_date", searchdate_end);

  const res = await fetch(`${baseUrl}/v1/admin/fund-requests/${corp_id}?${params.toString()}`, {
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
  dispatch({ type: "GET_VIRTUALFUNDS", payload: data });
};



export const getvirtualfund_by_corpid = (
  corp_id,
  page,
  perpage,
  search,
  fundstatus,
  searchdate_start,
  searchdate_end,
  downloadexcl = false 
) => async (dispatch) => {




  try {
    const token = localStorage.getItem("token") || "";


console.log("downloadexcl",);


    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (perpage) params.append("limit", perpage);
    if (search) params.append("search", search);
    
    // Handle "All" status filter
    if (fundstatus && fundstatus !== "All") {
      params.append("status", fundstatus);
    }
    
    if (searchdate_start) params.append("start_date", searchdate_start);
    if (searchdate_end) params.append("end_date", searchdate_end);

    // Append the download parameter for the Excel export
    if (downloadexcl) {
      params.append("download", "excel");
    }

    const res = await fetch(`${baseUrl}/v1/admin/va-fund/${corp_id}?${params.toString()}`, {
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

    // --- Excel Download Handling ---
    if (downloadexcl===true) {
      // res.blob() is critical here (equivalent to responseType: 'blob')
      const blob = await res.blob();
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      
      // Set filename with Corp ID and Timestamp
      link.setAttribute(
        "download", 
        `VirtualFund_Report_${corp_id}_${new Date().getTime()}.xlsx`
      );
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      return; // Stop here so we don't try to parse as JSON
    }

    // --- Normal JSON Data Handling ---
    const data = await res.json();
    dispatch({ type: "GET_VIRTUALFUNDS_BY_CORPID", payload: data });

  } catch (error) {
    console.error("Virtual Fund Fetch Error:", error);
  }
};









// export const dispute_creacte=(txnId,disputedata)=>async (dispatch) =>{
  

//   const token = localStorage.getItem("token") || {};
//   const res = await fetch(`${baseUrl}/v1/user/dispute/${txnId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body:JSON.stringify(disputedata)
//   });

//   // if (res.status === 401) {
//   //   localStorage.removeItem("token");
//   //   window.location.href = "/";
//   //   return;
//   // }

//   if (res.status===201) {
    
//     const disputetype =
//   disputedata.dispute_type.charAt(0).toUpperCase() +
//   disputedata.dispute_type.slice(1);

//   toast.success(`${disputetype} dispute has been raised`)
//   // alert("Collection Dispute has been raised")

//   }

//   if (res.status === 405) {
//     toast.error("Dispute has already raised")
//   }


   

//   const data = await res.json();

//   dispatch({type:DISPUTE_CREATE,payload:data})
// }
export const dispute_update=(txnId,updatedata,corpid)=>async (dispatch) =>{
  

  const token = localStorage.getItem("token") || {};
  const res = await fetch(`${baseUrl}/v1/admin/dispute/update/${txnId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(updatedata)
  });

  // if (res.status === 401) {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  //   return;
  // }

  if (res.status===200) {
    
   

  toast.success(`Dispute has been updated`)
  // alert("Collection Dispute has been raised")

  dispatch(dispute_get_by_corpid(corpid))

  }

  // if (res.status === 405) {
  //   toast.error("Dispute has already raised")
  // }


   

  const data = await res.json();

  dispatch({type:DISPUTE_UPDATE,payload:data})
}

export const dispute_get_by_corpid =
(
  corpid,
  searchtr,
  trstatus,
  disputetype,
  searchdate_start,
  searchdate_end,
  page,
  pagelimit,
  downloadexcl = false
) => async (dispatch) => {
  try {

console.log(corpid);
  


    const params = new URLSearchParams();

    if (searchtr) params.append("search", searchtr);
    if (trstatus?.toLowerCase() !== "all" && trstatus)
      params.append("status", trstatus);
    if (disputetype) params.append("dispute_type", disputetype);
    if (searchdate_start) params.append("start_date", searchdate_start);
    if (searchdate_end) params.append("end_date", searchdate_end);

    if (page !== undefined && page !== null)
      params.append("page", page);

    if (pagelimit !== undefined && pagelimit !== null)
      params.append("limit", pagelimit);

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const res = await fetch(
      `${baseUrl}/v1/admin/disputes/${corpid}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    if (downloadexcl) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute(
        "download",
        `dispute_${searchdate_start || "all"}-${
          searchdate_end || "all"
        }.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    const data = await res.json();

    dispatch({
      type: DISPUTE_GET_BY_CORPID,
      payload: data,
    });

  } catch (error) {
    console.error("Dispute Fetch Error:", error);
  }
};




export const getall_dispute =
(

  searchtr,
  trstatus,
  disputetype,
  searchdate_start,
  searchdate_end,
  page,
  pagelimit,
  downloadexcl = false
) => async (dispatch) => {
  try {


  


    const params = new URLSearchParams();

    if (searchtr) params.append("search", searchtr);
    if (trstatus?.toLowerCase() !== "all" && trstatus)
      params.append("status", trstatus);
    if (disputetype) params.append("dispute_type", disputetype);
    if (searchdate_start) params.append("start_date", searchdate_start);
    if (searchdate_end) params.append("end_date", searchdate_end);

    if (page !== undefined && page !== null)
      params.append("page", page);

    if (pagelimit !== undefined && pagelimit !== null)
      params.append("limit", pagelimit);

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const res = await fetch(
      `${baseUrl}/v1/admin/disputes?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    if (downloadexcl) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute(
        "download",
        `dispute_${searchdate_start || "all"}-${
          searchdate_end || "all"
        }.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    const data = await res.json();

    dispatch({
      type: GETALL_DISPUTE,
      payload: data,
    });

  } catch (error) {
    console.error("Dispute Fetch Error:", error);
  }
};




export const getEntityIpDetails = (corp_id, currentPage, itemsPerPage, searchTerm,searchStatus) => async (dispatch) => {

console.log("corp",corp_id, currentPage, itemsPerPage, searchTerm);





  const token = localStorage.getItem("token");
 
  try {
    // 1. Handle Query Parameters
    const params = new URLSearchParams();
    if (currentPage) params.append("page", currentPage);
    if (itemsPerPage) params.append("limit", itemsPerPage);
    if (searchTerm) params.append("search", searchTerm);
    if (searchStatus) params.append("status", searchStatus);

    // 2. Construct the URL with the corp_id and query params
    // Note: Adjust the path "/v1/admin/marchent/entity-ip/" to match your actual backend structure
    const url = `${baseUrl}/v1/admin/entity-ip/${corp_id}?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // 3. Handle Unauthorized Access


    const data = await res.json();
    console.log("ipdata",data);

    // 4. Dispatch to Reducer
    if (res.ok) {
      dispatch({ 
        type: GET_ENTITY_IP_DETAILS, 
        payload: data 
      });
    } else {
      alert(data.message || "Failed to fetch entity IP details");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    // alert("Error fetching entity IP details: " + error.message);
  }
};








export const updateEntityIp = (corp_id, id, updateData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  console.log("updateData",corp_id,id,updateData);
  

  try {
    const res = await fetch(`${baseUrl}/v1/admin/entity-ip/${corp_id}/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

 

    const data = await res.json();
    console.log("updateddata",data);
    

    if (res.status===200) {
       toast.success("Updated successfully!");
    }else{
      toast.error(data.message)
    }

   

dispatch(getEntityIpDetails(corp_id))

  } catch (error) {
    alert("Error updating: " + error.message);
  }
};






export const getTokenValidity = (
  corp_id, 
  page, 
  limit, 
  search, 
  status, 
  setLoad
) => async (dispatch) => {
  if (setLoad) setLoad(true);

  try {
    const token = localStorage.getItem("token");

    // Construct Query Parameters
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (search) params.append("search", search);
    if (status && status !== "All") params.append("status", status);

    const res = await fetch(
      `${baseUrl}/v1/admin/token-validity/${corp_id}?${params.toString()}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (setLoad) setLoad(false);

    // Handle session expiration
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Token Validity Fetch Error:", errorData.message);
      return;
    }

    const data = await res.json();

    dispatch({
      type: "GET_TOKEN_VALIDITY",
      payload: data,
    });

  } catch (error) {
    if (setLoad) setLoad(false);
    console.error("Network Error (Token Validity):", error);
  }
};



export const getWalletLedger =
  (
    company_id,
    searchTerm,
    searchStatus,
    startDate,
    endDate,
    page,
    parPage,
    download = false
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");
    
    

    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (searchStatus) params.append("status", searchStatus);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (page) params.append("page", page);
    if (parPage) params.append("limit", parPage);
    if (download) params.append("download", "excel");

    try {
      const res = await fetch(
        `${baseUrl}/v1/admin/wallet-ledger/${company_id}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );



       if (download) {
      const blob = await res.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute(
        "download",
        `Ledger_${startDate || "all"}-${
          endDate || "all"
        }.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }


      const data = await res.json();
      console.log("ledgerdata",data);
      

      if (res.status === 401) {
        window.location.href = "/";
        return;
      }

      if (!res.ok) {
        console.error("Error fetching wallet ledger:", data);
        return;
      }

      dispatch({
        type: GET_WALLET_LEDGER,
        payload: data,
      });
    } catch (error) {
      console.error("Wallet ledger API error:", error);
    }
  };











// ===============================
// Get Open Disputes
// ===============================

export const getDisputeOpen =
  (
    company_id,
    dispute_type,
    search,
    page = 1,
    limit = 10,
    start_date,
    end_date
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (company_id) params.append("company_id", company_id);
    if (dispute_type) params.append("dispute_type", dispute_type);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    try {
      const response = await fetch(
        `${baseUrl}/v1/admin/disputes/open?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      

      dispatch({
        type: "GET_DISPUTE_OPEN",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get Open Disputes Error:", error);
    }
  };


// ===============================
// Get Under Review Disputes
// ===============================

export const getDisputeUnderReview =
  (
    company_id,
    dispute_type,
    search,
    page = 1,
    limit = 10,
    start_date,
    end_date
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (company_id) params.append("company_id", company_id);
    if (dispute_type) params.append("dispute_type", dispute_type);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    try {
      const response = await fetch(
        `${baseUrl}/disputes/under_review?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      dispatch({
        type: "GET_DISPUTE_UNDER_REVIEW",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get Under Review Disputes Error:", error);
    }
  };


// ===============================
// Get Resolved Disputes
// ===============================

export const getDisputeResolved =
  (
    company_id,
    dispute_type,
    search,
    page = 1,
    limit = 10,
    start_date,
    end_date
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (company_id) params.append("company_id", company_id);
    if (dispute_type) params.append("dispute_type", dispute_type);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    try {
      const response = await fetch(
        `${baseUrl}/disputes/resolved?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      dispatch({
        type: "GET_DISPUTE_RESOLVED",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get Resolved Disputes Error:", error);
    }
  };


// ===============================
// Get Rejected Disputes
// ===============================

export const getDisputeRejected =
  (
    company_id,
    dispute_type,
    search,
    page = 1,
    limit = 10,
    start_date,
    end_date
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();

    if (company_id) params.append("company_id", company_id);
    if (dispute_type) params.append("dispute_type", dispute_type);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);

    try {
      const response = await fetch(
        `${baseUrl}/disputes/rejected?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      dispatch({
        type: "GET_DISPUTE_REJECTED",
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get Rejected Disputes Error:", error);
    }
  };