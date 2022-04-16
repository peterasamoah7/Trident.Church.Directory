import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
  const showError = (errorMessage, type) => {
    toast(errorMessage ?? "Sorry there was an error", {
      type: type ?? "error",
    });
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      <ToastContainer />
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContextProvider;
