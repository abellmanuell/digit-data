import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import App from "./app/App.jsx";
import "./index.css";
import ErrorBoundary from "@/pages/ErrorBoundary.jsx";
import SignUp from "./pages/SignUp.jsx";
import LandingPage from "./pages/spa/LandingPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import { TokenProvider } from "./contexts/context.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import EditUser from "./app/edit-user/EditUser.jsx";
import BuyAirtime from "./app/buyairtime/BuyAirtime.jsx";
import Home from "./app/home/Home.jsx";
import AllTransactions from "./app/transactions/AllTransactions.jsx";
import AirtimeTransactions from "./app/transactions/AirtimeTransactions.jsx";
import PaymentMessage from "./app/payments/PaymentMessage.jsx";
import Settings from "./app/settings/Settings.jsx";
import BuyData from "./app/buydata/BuyData.jsx";
import ChangePassword from "./app/settings/change-password/ChangePassword.jsx";
import HelpCenter from "./app/settings/help-center/HelpCenter.jsx";
import BottomNavigationBar from "./app/bottom-navigation-bar/BottomNavigationBar.jsx";

// Document Title
document.title = "Digit Data";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />}>
      <Route index element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        element={
          <ProtectedRoute
            token={localStorage.getItem("token")}
            redirectPath="/signin"
          />
        }
      >
        <Route element={<BottomNavigationBar />}>
          <Route path="/dashboard" element={<App />}>
            <Route index element={<Home />} />
            <Route path="buyairtime" element={<BuyAirtime />} />
            <Route path="buydata" element={<BuyData />} />
            <Route path="transactions/:id" element={<AllTransactions />} />
            <Route path="success" element={<PaymentMessage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/edit" element={<EditUser />} />
            <Route
              path="settings/change-password"
              element={<ChangePassword />}
            />
            <Route path="help-center" element={<HelpCenter />} />
            <Route
              path="airtime_transactions/:id"
              element={<AirtimeTransactions />}
            />
            <Route
              path="#d"
              element={<h1 className="bg-red-500">Side Bar</h1>}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </TokenProvider>
  </StrictMode>
);
