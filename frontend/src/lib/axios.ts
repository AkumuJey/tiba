import axios from "axios";

const providerApi = axios.create({
  baseURL: "http://localhost:4000/provider",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default providerApi;
