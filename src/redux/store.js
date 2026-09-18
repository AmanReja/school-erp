import { configureStore } from "@reduxjs/toolkit";
import { loginReducer ,merchantReducer,merchantSettlementReducer,transactionReducer,pkgMasterReducer,entityReducer, pkgcmsMasterReducer,serviceListReducer,cmsassignReducer,admindetailsReducer,fundReducer,virtualfundReducer,entityIpReducer, ledgerReducer, disputeReducer} from "./reducer";




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
entity:entityReducer,
fund:fundReducer,
virtualfund:virtualfundReducer,
dispute:disputeReducer,
entityIps:entityIpReducer,
ledger:ledgerReducer,

    },
});