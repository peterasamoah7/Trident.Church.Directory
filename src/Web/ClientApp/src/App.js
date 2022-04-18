import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/mobileBlock.css";

//
import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";

import Home from "./Routes/Home";
import Units from "./Routes/Units";
import Members from "./Routes/Members";
import Parish from "./Routes/Parish";
import AuthPagesGuard from "./pages/Authentication/AuthPagesGuard";
import RequireAuth from "./pages/Authentication/RequireAuth";
import NotfoundPage from "./components/404";
import MobileViewBlock from "./MobileViewBlock";
import ErrorContextProvider from "./context/ErrorContext";
import Sacrament from "./Routes/Sacraments";

function App() {
  return (
    <ErrorContextProvider>
      <MobileViewBlock>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthPagesGuard>
                <Login />
              </AuthPagesGuard>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthPagesGuard>
                <ForgotPassword />
              </AuthPagesGuard>
            }
          />
          <Route
            path="/reset-password/:id"
            element={
              <AuthPagesGuard>
                <ResetPassword />
              </AuthPagesGuard>
            }
          />

          {/* home */}
          <Route
            path="/*"
            // exact
            element={
              <RequireAuth redirectTo="/login">
                <Home />
              </RequireAuth>
            }
          />

          {/* <Route path="/*" element={} /> */}

          {/* Units */}
          <Route
            path="/groups/*"
            element={
              <RequireAuth redirectTo="/login">
                <Units />
              </RequireAuth>
            }
          />

          {/* Members */}
          <Route
            path="/members/*"
            element={
              <RequireAuth redirectTo="/login">
                <Members />
              </RequireAuth>
            }
          />

          {/* parish */}
          <Route
            path="/parish/*"
            element={
              <RequireAuth redirectTo="/login">
                <Parish />
              </RequireAuth>
            }
          />

          {/* parish */}
          <Route
            path="/sacrament/*"
            element={
              <RequireAuth redirectTo="/login">
                <Sacrament />
              </RequireAuth>
            }
          />

          {/* Not Found Route */}
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </MobileViewBlock>
    </ErrorContextProvider>
  );
}

export default App;
