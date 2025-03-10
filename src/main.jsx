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
        <Route path="/dashboard" element={<App />}>
          <Route path="edit" element={<EditUser />} />
          <Route index element={<Home />} />
          <Route path="buyairtime" element={<BuyAirtime />} />
          <Route path="transactions/:id" element={<AllTransactions />} />
          <Route
            path="airtime_transactions/:id"
            element={<AirtimeTransactions />}
          />
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
