export const getToken = () => {
  return localStorage.getItem("token") || null;
};
export const getUser = () => {
  return localStorage.getItem("user") || null;
};
