import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Merchant from "./Components/Merchant";


import Dashbord from "./Components/Dashbord";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "./Contexts/Theme";
import { Login } from "./Components/Login";
import {store} from "./redux/store";
import Settlement from "./Components/Settlement";
import Createmerchants from "./Components/Createmerchants";
import Profile from "./Components/Profile";
import Getallsettlements from "./Components/Getallsettlements";


import { LoadDetailsProvider } from "./Contexts/LoadDetails";
import GetallTxn from "./Components/GetallTxn";
import Commercial from "./Components/Commercial";
import Packagemaster from "./Components/Packagemaster";
import Servicelist from "./Components/Servicelist";
import Getcommercial from "./Components/Getcommercial";
import Notassigned from "./Components/Notassigned";
import Protectedroutes from "./Components/Protectedroutes";
import Otpverification from "./Components/Otpverification";
import Resetpass from "./Components/Resetpass";
import Forgotpass from "./Components/Forgotpass";
import Updatepass from "./Components/Updatepass";
import Fund from "./Components/Fund";
import Fund_by_corp from "./Components/fund_by_corp";
import Virfund_by_corpid from "./Components/Virfund_by_corpid";
import Dispute from "./Components/Dispute";
import Support from "./Components/Support.jsx";
import EntityIpPage from "./Components/EntityIpPage.jsx";
import TokenPage from "./Components/TokenPage.jsx";
import LedgerByCompany from "./Components/LedgerByCompany.jsx";
import Disputemanagement from "./Components/Disputemanagement.jsx";
import CloseDisputes from "./pages/Dispute/CloseDisputes.jsx";
import ResolveDisputes from "./pages/Dispute/ResolveDispute.jsx";
import OpenDisputes from "./pages/Dispute/OpenDisputes.jsx";
import Merchants from "./pages/Dispute/Merchants.jsx";
import UnderReview from "./pages/Dispute/UnderReview.jsx";
import Transactionmanagement from "./Components/Transactionmanagement.jsx";
import TransactionMaster from "./pages/Transaction/TransactionMaster.jsx";
import Pending from "./pages/Transaction/Pending.jsx";
import SuccessNotCredited from "./pages/Transaction/SuccessNotCredited.jsx";
import Merchantmanagement from "./Components/Merchantmanagement.jsx";
import MerchantMaster from "./pages/Merchant/MerchantMaster.jsx";
import ActiveMerchants from "./pages/Merchant/ActiveMerchants.jsx";
import MerchantConfiguration from "./pages/Merchant/MerchantConfiguration.jsx";
import RejectedDisputes from "./pages/Dispute/RejectedDisputes.jsx";
import EntityCallbackPage from "./Components/EntityCallbackPage.jsx";

if(import.meta.env.PROD){
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}



const router = createBrowserRouter(
  createRoutesFromElements(

    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/otpverification" element={<Otpverification />} />
      <Route path="/resetpass" element={<Resetpass />} />
      <Route path="/forgotpass" element={<Forgotpass />} />

     

      <Route element={<Protectedroutes />}>
<Route path="/dashboard" element={<Dashbord />}>

       <Route path="createmerchants" element={<Createmerchants/>}/>
<Route path="dispute" element={<Disputemanagement />}>
  <Route index element={<Navigate to="merchants" replace />} />

  <Route path="merchants" element={<Merchants />} />
  <Route path="close" element={<CloseDisputes />} />
  <Route path="resolve" element={<ResolveDisputes />} />
  <Route path="resolve/:corp_id?" element={<ResolveDisputes />} />
  <Route path="open" element={<OpenDisputes />} />
  <Route path="open/:corp_id?" element={<OpenDisputes />} />
  <Route path="underreview" element={<UnderReview />} />
  <Route path="underreview/:corp_id?" element={<UnderReview />} />
  <Route path="rejected" element={<RejectedDisputes />} />
  <Route path="rejected/:corp_id?" element={<RejectedDisputes />} />
</Route>
           

    <Route path="transaction" element={<Transactionmanagement/>}>



        <Route  index element={<Navigate to="transactionMaster" replace/>}/>
        <Route  path="transactionMaster" element={<TransactionMaster/>}/>
        <Route path="pending" element={<Pending/>}/>
        <Route path="success_not_credited" element={<SuccessNotCredited/>}/>
        {/* <Route path="open" element={<OpenDisputes/>}/>
        <Route path="underreview" element={<UnderReview/>}/>
        <Route path="rejected" element={<ResolveDisputes/>}/> */}

    </Route>

    <Route path="merchant" element={<Merchantmanagement/>}>



        <Route  index element={<Navigate to="merchantmaster" replace/>}/>
        <Route  path="merchantmaster" element={<MerchantMaster/>}/>
        <Route path="active" element={<ActiveMerchants/>}/>
        <Route path="merchant_configuration" element={<MerchantConfiguration/>}/>
        {/* <Route path="open" element={<OpenDisputes/>}/>
        <Route path="underreview" element={<UnderReview/>}/>
        <Route path="rejected" element={<ResolveDisputes/>}/> */}

    </Route>
       
        <Route path="entityIp/:corpid" element={<EntityIpPage/>}/>
        <Route path="entitycallback/:corpid" element={<EntityCallbackPage/>}/>
        <Route path="ledger/:corpid" element={<LedgerByCompany/>}/>
        <Route path="token/:corpid" element={<TokenPage/>}/>
        <Route path="updatepass" element={<Updatepass/>}/>
        <Route path="profile" element={<Profile />} />
        <Route path="getallsettlements" element={<Getallsettlements />} />
        <Route path="getalltxn" element={<GetallTxn />} />
        {/* <Route path="transactionmaster/:merchantId" element={<TransactionMaster />} /> */}
        {/* <Route path="merchant" element={<Merchant />} /> */}
        <Route path="settlement/:merchantId" element={<Settlement />} />
        <Route path="commercial/:pkgid/:serviceid" element={<Commercial />} />
        <Route path="servicelist" element={<Servicelist />} />
        <Route path="fund" element={<Fund />} />
        <Route path="dispute/:corpid" element={<Dispute />} />
        <Route path="fundbycorp/:corpid" element={<Fund_by_corp />} />
        <Route path="Virfundbycorpid/:corpid" element={<Virfund_by_corpid />} />
        <Route path="notassigned" element={<Notassigned />} />
        <Route path="getcommercial/:compid" element={<Getcommercial />} />
        <Route path="packagemaster/:pkgId" element={<Packagemaster />} />
        <Route path="support" element={<Support />} />
      </Route>

      </Route>




    </Route>


  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadDetailsProvider>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>


        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>

      </GoogleOAuthProvider>
    </ThemeProvider>
    </LoadDetailsProvider>

  </StrictMode>
);
