const BASE_URL = process.env.REACT_APP_BASE_URL


export const endpoints = {
  SIGNUP_API: BASE_URL + "/api/v1/register",
  LOGIN_API: BASE_URL + "/api/v1/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/reset-password",

  GET_ALL_DESTINATIONS_API: BASE_URL + "/api/v1/destination",


  CREATE_NEW_LEAD: BASE_URL+"/api/v1/newLead"
}
