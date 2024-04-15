import axios from "axios";

const MakeRequest = async (token, method, url, data) => {
  const baseURL = process.env.NODE_ENV === "development" ? "http://localhost/" : "https://3.110.195.159/";
  return axios({
    method: method,
    validateStatus: () => true,
    baseURL: baseURL,
    headers: { Authorization: token, "Content-Type": "application/json" },
    url: url,
    data: data !== null ? data : {},
  }).catch(function (error) {
    return error.response;
  });
};

export default MakeRequest;
