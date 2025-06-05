import API from "./axios";

export const fetchData = ({ endpoint }) => {
  return API.get(endpoint);
};

export const postData = ({ endpoint, data }) => {
  return API.post(endpoint, data);
};

export const requestPasswordReset = ({ email }) => {
  return API.post("api/users/forgot-password", { email }); // Change this line
};
export const confirmPasswordReset = ({ email, otp, newPassword }) => {
  return API.post("api/users/reset-password", { email, otp, newPassword });
};