import { LOGIN, CREATEMERCHANT, GETDETAILS, DELETE_MERCHANT, UPDATE_MERCHANT,GET_SETTLEMENTS,
    CREATE_SETTLEMENT,
    UPDATE_SETTLEMENT,
    DELETE_SETTLEMENT,GETTRANSACTIONS_BY_COMPANYID,
   
 
  GET_ALL_SETTLEMENTS,UPDATE_TXN_STATUS,GETALL_TXN_DATA,UPDATE_TXN_DATA,


  PKG_MASTER_GET,
  PKG_MASTER_CREATE,
  PKG_MASTER_UPDATE,
  PKG_MASTER_DELETE,PKG_CMS_MASTER_GET,PKG_CMS_MASTER_CREATE,PKG_CMS_MASTER_UPDATE,PKG_CMS_MASTER_DELETE,SERVICELIST_GET,SERVICELIST_CREATE,SERVICELIST_UPDATE,SERVICELIST_DELETE
,

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
  merchants: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    count: 0,
    data: [], // actual merchant list
  },
};

export const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Load all merchants from API
    case GETDETAILS:
      return {
        ...state,
        merchants: {
          ...state.merchants,
          ...action.payload, // This will include page, limit, total, totalPages, count, data
        },
      };

    // ✅ Create (add new merchant to data array)
    case CREATEMERCHANT:
      return {
        ...state,
        merchants: {
          ...state.merchants,
          data: [...state.merchants.data, action.payload],
          count: state.merchants.count + 1,
          total: state.merchants.total + 1,
        },
      };

    // ✅ Update merchant (match by corp_id since that's what you're using in API)
    case UPDATE_MERCHANT:
      return {
        ...state,
        merchants: {
          ...state.merchants,
          data: state.merchants.data.map((merchant) =>
            merchant.corp_id === action.payload.corp_id ||
            merchant.company_id === action.payload.company_id ||
            merchant.org_id === action.payload.org_id
              ? { ...merchant, ...action.payload }
              : merchant
          ),
        },
      };

    // ✅ Delete merchant (match by corp_id)
    case DELETE_MERCHANT:
      const deletedMerchant = state.merchants.data.find(
        merchant => merchant.corp_id === action.payload
      );
      
      return {
        ...state,
        merchants: {
          ...state.merchants,
          data: state.merchants.data.filter(
            (merchant) => merchant.corp_id !== action.payload
          ),
          count: deletedMerchant ? Math.max(0, state.merchants.count - 1) : state.merchants.count,
          total: deletedMerchant ? Math.max(0, state.merchants.total - 1) : state.merchants.total,
        },
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