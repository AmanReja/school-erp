import { LOGIN, CREATEMERCHANT, GETDETAILS, DELETE_MERCHANT, UPDATE_MERCHANT,GET_SETTLEMENTS,
    CREATE_SETTLEMENT,
    UPDATE_SETTLEMENT,
    DELETE_SETTLEMENT,GETTRANSACTIONS_BY_COMPANYID,
   
 
  GET_ALL_SETTLEMENTS,UPDATE_TXN_STATUS,GETALL_TXN_DATA,UPDATE_TXN_DATA,


  PKG_MASTER_GET,
  PKG_MASTER_CREATE,
  PKG_MASTER_UPDATE,
  PKG_MASTER_DELETE,


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
    pkgMasters: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      count: 0,
      data: [], // actual package list
    },
  };
  
  // ✅ Reducer
  export const pkgMasterReducer = (state = initialPkgMasterState, action) => {
    switch (action.type) {
      // ✅ Get all packages (paginated or complete)
      case PKG_MASTER_GET:
        return {
          ...state,
          pkgMasters: {
            ...state.pkgMasters,
            ...action.payload, // Expect payload like: { page, limit, total, totalPages, count, data: [...] }
          },
        };
  
      // ✅ Create new package
      case PKG_MASTER_CREATE:
        return {
          ...state,
          pkgMasters: {
            ...state.pkgMasters,
            data: [action.payload, ...state.pkgMasters.data],
            count: state.pkgMasters.count + 1,
            total: state.pkgMasters.total + 1,
          },
        };
  
      // ✅ Update existing package
      case PKG_MASTER_UPDATE:
        return {
          ...state,
          pkgMasters: {
            ...state.pkgMasters,
            data: state.pkgMasters.data.map((pkg) =>
              pkg.id === action.payload.pkg_id
                ? { ...pkg, ...action.payload.data }
                : pkg
            ),
          },
        };
  
      // ✅ Delete a package
      case PKG_MASTER_DELETE:
        return {
          ...state,
          pkgMasters: {
            ...state.pkgMasters,
            data: state.pkgMasters.data.filter(
              (pkg) => pkg.id !== action.payload
            ),
            count: state.pkgMasters.count - 1,
            total: state.pkgMasters.total - 1,
          },
        };
  
      // ✅ Default
      default:
        return state;
    }
  };
  