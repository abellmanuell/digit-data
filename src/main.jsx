import { StrictMode } from "react";
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

// Document Title
document.title = "Digit Data";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />}>
      <Route index element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
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
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  </StrictMode>
);
