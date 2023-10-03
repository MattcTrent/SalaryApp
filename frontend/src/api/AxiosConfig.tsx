import axios from "axios";

export function getConfiguredAxios() {
  const token: string | null = null;
  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    timeout: 30000,
    withCredentials: false,
  });
  return axiosClient;
}
