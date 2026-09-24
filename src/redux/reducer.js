import { LOGIN, CREATEMERCHANT, GETDETAILS, DELETE_MERCHANT, UPDATE_MERCHANT,GET_SETTLEMENTS,
    CREATE_SETTLEMENT,
    UPDATE_SETTLEMENT,
    DELETE_SETTLEMENT,GETTRANSACTIONS_BY_COMPANYID,
   
 
  GET_ALL_SETTLEMENTS,UPDATE_TXN_STATUS,GETALL_TXN_DATA,UPDATE_TXN_DATA,


  PKG_MASTER_GET,
  PKG_MASTER_CREATE,
  PKG_MASTER_UPDATE,
  PKG_MASTER_DELETE,PKG_CMS_MASTER_GET,PKG_CMS_MASTER_CREATE,PKG_CMS_MASTER_UPDATE,PKG_CMS_MASTER_DELETE,SERVICELIST_GET,SERVICELIST_CREATE,SERVICELIST_UPDATE,SERVICELIST_DELETE
  ,GET_CMS_ASSIGN,ASSIGNED_CMS,DELETE_ASSIGNED_CMS,UPDATE_ASSIGNED_CMS,ADMINDETAILS,GET_MERCHENT_ENTITY,GET_MERCHENT_ENTITY_DELETED, DELETE_ENTITY,GETALL_FUND,GET_FUNDS_BY_CORPID, GET_VIRTUALFUNDS, GET_VIRTUALFUNDS_BY_CORPID,PKG_CMS_MASTER_GET_BY_PKG_ID,PKG_CMS_MASTER_CREATE_BY_PKG_ID,DISPUTE_CREATE, DISPUTE_GET_BY_CORPID,
  GETALL_DISPUTE,GET_ENTITY_IP_DETAILS,
  GET_TOKEN_VALIDITY,
  GET_WALLET_LEDGER,
  

  GET_DISPUTES,
  GET_DISPUTE_MESSAGES,
  GET_MERCHENT_DASHBOARD_DETAILS,
  GET_MERCHENT_VA_DETAILS

} from "../redux/action";





const initialloginState = {
  login: [],
};

export const loginReducer = (state = initialloginState, action) => {
  if (action.type === LOGIN) {
    return {
      ...state,
      login: [action.payload, ...state.login],
    };
  } else {
    return state;
  }
};

const initialState = {
  merchants: [],
};

export const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Load all merchants from API
    case GETDETAILS:
      return {
        ...state,
        merchants: action.payload
      
      };

  
    
      

    default:
      return state;
  }
};


const initialSettlementState = {
    settlements: [],  // list of settlement objects
    // optionally, if you want pagination / metadata:
   
  };
  
  export const merchantSettlementReducer = (state = initialSettlementState, action) => {
    switch (action.type) {
      case GET_SETTLEMENTS:
        // Here action.payload might be { data: [...], pagination: {...} }
        return {
          ...state,
          settlements:[action.payload]
        };
  
      case GET_ALL_SETTLEMENTS:
        // Here action.payload might be { data: [...], pagination: {...} }
        return {
          ...state,
          settlements:[action.payload]
        };
  
      case CREATE_SETTLEMENT:
        return {
          ...state,
          // append the new settlement
          settlements: [action.payload, ...state.settlements]
        };
  
      case UPDATE_SETTLEMENT:
        return {
          ...state,
          settlements: state.settlements.map((settlement) =>
            settlement.id === action.payload.id
              ? { ...settlement, ...action.payload.data }
              : settlement
          ),
        };
  
      case DELETE_SETTLEMENT:
        return {
          ...state,
          settlements: state.settlements.filter(
            (settlement) => settlement.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };


  
  const initialTransactionState = {
    transactions: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      count: 0,
      data: [], // actual transaction list
    },
  };
  
  export const transactionReducer = (state = initialTransactionState, action) => {
    switch (action.type) {
      // ✅ Get all transactions (paginated or complete list)
      case GETALL_TXN_DATA:
      case GETTRANSACTIONS_BY_COMPANYID:
        return {
          ...state,
          transactions: {
            ...state.transactions,
            ...action.payload, // Expect payload like: { page, limit, total, totalPages, count, data: [...] }
          },
        };
  
      // ✅ Update transaction status
      case UPDATE_TXN_DATA:
      case UPDATE_TXN_STATUS:
        return {
          ...state,
          transactions: {
            ...state.transactions,
            data: state.transactions.data.map((txn) =>
              txn.txn_id === action.payload.txn_id
                ? { ...txn, status: action.payload.status }
                : txn
            ),
          },
        };
  
      default:
        return state;
    }
  };



  //////PKG MASTER HANDEL-------???????/////



  // ✅ Initial State (Paginated Data Format)
  const initialPkgMasterState = {
    pkgMasters: [],
  
  };
  export const pkgMasterReducer = (state = initialPkgMasterState, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case PKG_MASTER_GET:
        return {
          ...state,
          pkgMasters: action.payload,   // FLAT ARRAY ONLY
        };
  
      // ---------------- CREATE NEW PACKAGE ----------------
      case PKG_MASTER_CREATE:
        return {
          ...state,
          pkgMasters: [action.payload, ...state.pkgMasters], // prepend
        };
      case PKG_MASTER_DELETE:
        return {
        ...state,
            pkgMasters: state.pkgMasters.filter(
            (pkgMasters) => pkgMasters.id !== action.payload
          )
        };
        case PKG_MASTER_UPDATE:
          return {
            ...state,
            pkgMasters: state.pkgMasters.map((pkg) =>
              pkg.id === action.payload.id ? action.payload : pkg
            ),
          };
      // ---------------- DEFAULT ----------------
      default:
        return state;
    }
  };





  /////servicelis ////
  const initialServiceListState = {
    services: [],
  };
  
  export const serviceListReducer = (state = initialServiceListState, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case SERVICELIST_GET:
        return {
          ...state,
          services: action.payload,   // flat array
        };
  
      // ---------------- CREATE SERVICE ----------------
      case SERVICELIST_CREATE:
        return {
          ...state,
          services: [action.payload, ...state.services.data],  // prepend new item
        };
  
      // ---------------- UPDATE SERVICE ----------------
      case SERVICELIST_UPDATE:
        return {
          ...state,
          services: state.services.data.map((service) =>
            service.id === action.payload.id ? action.payload : service
          ),
        };
  
      // ---------------- DELETE SERVICE ----------------
      case SERVICELIST_DELETE:
        return {
          ...state,
          services: state.services.data.filter(
            (service) => service.id !== action.payload
          ),
        };
  
      // ---------------- DEFAULT ----------------
      default:
        return state;
    }
  };
  


  const initialPkgcmsMasterState = {
    pkgcmsMasters: [],
  
  };
  export const pkgcmsMasterReducer = (state = initialPkgcmsMasterState, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case PKG_CMS_MASTER_GET:
        return {
          ...state,
          pkgcmsMasters: action.payload,   // FLAT ARRAY ONLY
        };
      case PKG_CMS_MASTER_GET_BY_PKG_ID:
        return {
          ...state,
          pkgcmsMasters: action.payload,   // FLAT ARRAY ONLY
        };
      case PKG_CMS_MASTER_CREATE_BY_PKG_ID:
        return {
          ...state,
          pkgcmsMasters: [action.payload, ...state.pkgcmsMasters.data],  // FLAT ARRAY ONLY
        };
  
      // ---------------- CREATE NEW PACKAGE ----------------
      case PKG_CMS_MASTER_CREATE:
        return {
          ...state,
          pkgcmsMasters: [action.payload, ...state.pkgcmsMasters.data], // prepend
        };
        case PKG_CMS_MASTER_UPDATE:
          return {
            ...state,
            pkgcmsMasters: state.pkgcmsMasters.data.map((pkgcms) =>
            pkgcms.id === action.payload.id ? action.payload : pkgcms
            ),
          };
  
      // ---------------- DEFAULT ----------------
      default:
        return state;
    }
  };

  const initialcmsassignState = {
    cmsassign: {
      services: [],
      total_assigned: 0,
      total_not_assigned: 0,
    },
  };
  
  export const cmsassignReducer = (state = initialcmsassignState, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case GET_CMS_ASSIGN:
        return {
          ...state,
          cmsassign: action.payload,   // full object from backend
        };
  
      // ---------------- CREATE ----------------
      case ASSIGNED_CMS:
        return {
          ...state,
          cmsassign: {
            ...state.cmsassign,
            services: [action.payload, ...state.cmsassign.services],
            total_assigned: state.cmsassign.total_assigned + 1,
            total_not_assigned: state.cmsassign.total_not_assigned - 1,
          }
        };
  
      // ---------------- UPDATE ----------------
      case UPDATE_ASSIGNED_CMS:
        return {
          ...state,
          cmsassign: {
            ...state.cmsassign,
            services: state.cmsassign.services.map((srv) =>
              srv.id === action.payload.id ? action.payload : srv
            ),
          },
        };
  
      // ---------------- DELETE ----------------
      case DELETE_ASSIGNED_CMS:
        return {
          ...state,
          cmsassign: {
            ...state.cmsassign,
            services: state.cmsassign.services.filter(
              (service) =>{ return   service.service_id !== action.payload}
            ),
           
            total_assigned: state.cmsassign.total_assigned - 1,
            total_not_assigned: state.cmsassign.total_not_assigned + 1,
          }
        };
  
      default:
        return state;
    }
  };
  
  const initialadminstate = {
    admindetails: [],
  };
  
  export const admindetailsReducer = (state = initialadminstate, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case ADMINDETAILS:
        return {
          ...state,
          admindetails: action.payload,   // full object from backend
        };
  
     
  
      default:
        return state;
    }
  };
  

  
  
  const initialentstate = {
    entity: [],
  };
  
  export const entityReducer = (state = initialentstate, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case GET_MERCHENT_ENTITY:
        return {
          ...state,
          entity: action.payload,   // full object from backend
        };
      case GET_MERCHENT_ENTITY_DELETED:
        return {
          ...state,
          entity: action.payload,   // full object from backend
        };
  
     
  
      default:
        return state;
    }
  };
  

  const initialfundstate = {
    fund: [],
  };
  
  export const fundReducer = (state = initialfundstate, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case GETALL_FUND:
        return {
          ...state,
          fund: action.payload,   // full object from backend
        };
      case GET_FUNDS_BY_CORPID:
        return {
          ...state,
          fund: action.payload,   // full object from backend
        };
  
     
  
      default:
        return state;
    }
  };
  
  const initialvirtualfundstate = {
    virtualfund: [],
  };
  
  export const virtualfundReducer = (state = initialvirtualfundstate, action) => {
    switch (action.type) {
  
      // ---------------- GET LIST ----------------
      case GET_VIRTUALFUNDS:
        return {
          ...state,
          virtualfund: action.payload,   // full object from backend
        };
      case GET_VIRTUALFUNDS_BY_CORPID:
        return {
          ...state,
          virtualfund: action.payload,   // full object from backend
        };
  
     
  
      default:
        return state;
    }
  };
  

/*----//////// dispute ///// */





const disputeInitialState = {
  disputlist:[],
  messagelist:[]
  
};

export const disputeReducer = (state = disputeInitialState, action) => {
  if (action.type === GET_DISPUTES) {
    return {
      ...state,
      disputlist: action.payload,
    };
  } else
  if (action.type === GET_DISPUTE_MESSAGES) {
    return {
      ...state,
      messagelist: action.payload,
    };
  } 
  
 
  else {
    return state;
  }
};


  
const entityIpInitialState = {
  entityIps: [],
  token:[]
};

export const entityIpReducer = (state = entityIpInitialState, action) => {
  if (action.type === GET_ENTITY_IP_DETAILS) {
    return {
      ...state, 
      entityIps:action.payload, 
    };
  } 


  else if (action.type===GET_TOKEN_VALIDITY) {
    
  return{
  ...state,
  token:action.payload
  }

  }
 
  else {
    return state;
  }
};

  
const ledgerInitialState = {
  ledger: [],
 
};

export const ledgerReducer = (state = ledgerInitialState, action) => {
  if (action.type === GET_WALLET_LEDGER) {
    return {
      ...state, 
      ledger:action.payload, 
    };
  } 



 
  else {
    return state;
  }
};





const initialConfigState = {
  dashboardDetails: null,
  vaDetails: null,
};

export const merchantConfigureReducer = (
  state = initialConfigState,
  action
) => {
  switch (action.type) {
    // ─────────────────────────────────────
    // MERCHANT DASHBOARD
    // ─────────────────────────────────────
    case GET_MERCHENT_DASHBOARD_DETAILS:
      return {
        ...state,
        dashboardDetails: action.payload[0],
       
      };
    case GET_MERCHENT_VA_DETAILS:
      return {
        ...state,
        vaDetails: action.payload[0],
      
      };

    default:
      return state;
  }
};


