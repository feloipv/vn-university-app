import axios from "axios";

const baseURL = `${process.env.NEXT_API_ROUTE_URL}/api`;

const authInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default authInstance;
