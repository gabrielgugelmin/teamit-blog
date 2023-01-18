import axios from "axios";

const BASE_URL = "http://localhost:9000/";

export default function getNewApiInstance() {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return api;
}
