var authtoken = localStorage.getItem("authtoken");

let axiosConfig = {
  withCredentials: true,
  headers: { "Content-Type": "application/json", authtoken: authtoken },
};

export default axiosConfig;
