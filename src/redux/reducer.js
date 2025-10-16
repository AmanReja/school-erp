import { LOGIN, CREATEMERCHANT, GETDETAILS, DELETE_MERCHANT, UPDATE_MERCHANT,GET_SETTLEMENTS,
    CREATE_SETTLEMENT,
    UPDATE_SETTLEMENT,
    DELETE_SETTLEMENT,CREATE_TRANSACTION,
    GET_TRANSACTIONS,
    UPDATE_TRANSACTION,
    DELETE_TRANSACTION, } from "../redux/action";





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
  transactions: [], // list of transaction objects
  pagination: {},   // optional: for API pagination info
};

export const transactionReducer = (state = initialTransactionState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      // If API returns { data: [...], pagination: {...} }
      return {
        ...state,
        transactions: action.payload.data || [],
        pagination: action.payload.pagination || {},
      };

    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? { ...tx, ...action.payload.data } : tx
        ),
      };

    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (tx) => tx.id !== action.payload
        ),
      };

    default:
      return state;
  }
};