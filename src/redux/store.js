import { configureStore } from "@reduxjs/toolkit";
import { loginReducer ,merchantReducer,merchantSettlementReducer,transactionReducer,pkgMasterReducer,pkgcmsMasterReducer,serviceListReducer,cmsassignReducer,admindetailsReducer} from "./reducer";




export const store =configureStore({
    reducer:{

login:loginReducer,

merchants:merchantReducer,
settlements:merchantSettlementReducer,
transactions:transactionReducer,
pkgMasters:pkgMasterReducer,
pkgcmsMasters:pkgcmsMasterReducer,
services:serviceListReducer,
cmsassign:cmsassignReducer,
admindetails:admindetailsReducer,


    },
});