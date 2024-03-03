import axios from "axios";

const MakeRequest = async (token, method, url, data) => {
  return axios({
    method: method,
    validateStatus: () => true,
    baseURL: "http://3.110.195.159/",
    headers: { Authorization: token, "Content-Type": "application/json" },
    url: url,
    data: data !== null ? data : {},
  }).catch(function (error) {
    return error.response;
  });
};

export default MakeRequest;
