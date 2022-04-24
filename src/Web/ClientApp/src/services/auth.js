import { setCookie, getCookie } from "./cookies";
import axios from "axios";

export const setAuthCookie = () => setCookie("authenticated", "true", 1);
export const removeAuthCookie = async () => {
  const request = await axios.get("/api/account/logout");

  if (request.status === 200) {
      setCookie("authenticated", "false", 0);      
  }
};
export const getAuthCookie = () => getCookie("authenticated");

// controller.abort();
