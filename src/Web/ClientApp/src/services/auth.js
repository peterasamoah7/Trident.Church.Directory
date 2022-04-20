import { setCookie, getCookie } from "./cookies";
import axios from "axios";

const controller = new AbortController();

export const setAuthCookie = () => setCookie("authenticated", "true", 1);
export const removeAuthCookie = async () => {
  const request = await axios.get("/api/account/logout", {
    signal: controller.signal,
  });

  if (request.status === 200) {
    setCookie("authenticated", "false", 0);
  }

  return controller.abort();
};
export const getAuthCookie = () => getCookie("authenticated");

// controller.abort();
