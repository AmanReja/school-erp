export const LOGIN = "LOGIN";
export const CREATEMERCHANT = "CREATEMERCHANT";
export const GETDETAILS = "GETDETAILS";
export const DELETE_MERCHANT = "DELETE_MERCHANT";
export const UPDATE_MERCHANT = "UPDATE_MERCHANT";

// action types
export const GET_SETTLEMENTS = "GET_SETTLEMENTS";
export const CREATE_SETTLEMENT = "CREATE_SETTLEMENT";
export const UPDATE_SETTLEMENT = "UPDATE_SETTLEMENT";
export const DELETE_SETTLEMENT = "DELETE_SETTLEMENT";




export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

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

export const getDetails = (currentPage, itemsPerPage) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", currentPage);
    if (itemsPerPage) params.append("limit", itemsPerPage);
 

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
    } else {
      alert(data.message || "Failed to update merchant");
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
  if (searchTerm) params.append("search", searchTerm  );
  if (searchStatus) params.append("search",  searchStatus );

 
 

  const res = await fetch(`${baseUrl}/v1/admin/marchent/settlement/${company_id}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    // handle error
    console.error("Error fetching settlements:", data);
    return;
  }
  dispatch({ type: GET_SETTLEMENTS, payload: data });
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
  if (!res.ok) {
    const err = await res.json();
    console.error("Error deleting settlement:", err);
    return;
  }
  dispatch({ type: DELETE_SETTLEMENT, payload: company_id });
};




// ---------------- CREATE TRANSACTION ----------------
export const createTransaction = (formData, setStep) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 201) {
      alert("Transaction created successfully");
      if (setStep) setStep(1); // reset form step if multi-step form
    }

    if (res.status === 403) {
      alert("Permission denied");
    }

    dispatch({ type: CREATE_TRANSACTION, payload: data });
  } catch (error) {
    alert(error.message || "Error creating transaction");
  }
};

// ---------------- GET ALL TRANSACTIONS ----------------
export const getAllTransactions = (page = 1) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/transactions?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error fetching transactions:", data);
      return;
    }

    dispatch({ type: GET_TRANSACTIONS, payload: data });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

// ---------------- UPDATE TRANSACTION ----------------
export const updateTransaction = (id, updatedData) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error updating transaction:", data);
      return;
    }

    dispatch({ type: UPDATE_TRANSACTION, payload: { id, data } });
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};

// ---------------- DELETE TRANSACTION ----------------
export const deleteTransaction = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseUrl}/v1/admin/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Error deleting transaction:", err);
      return;
    }

    dispatch({ type: DELETE_TRANSACTION, payload: id });
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};
