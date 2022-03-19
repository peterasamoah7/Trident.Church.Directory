import { setCookie, getCookie } from "./cookies";

export const setAuthCookie = () => setCookie('authenticated', 'true', 1);
export const removeAuthCookie = () => setCookie('authenticated', 'false', 0);
export const getAuthCookie = () => getCookie('authenticated');