import { configureStore } from "@reduxjs/toolkit";
import { loginReducer ,merchantReducer,merchantSettlementReducer,transactionReducer,pkgMasterReducer} from "./reducer";




export const store =configureStore({
    reducer:{

login:loginReducer,

merchants:merchantReducer,
settlements:merchantSettlementReducer,
transactions:transactionReducer,
pkgMasters:pkgMasterReducer

    },
});