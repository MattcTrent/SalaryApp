import axios from "axios";

export function getConfiguredAxios() {
  const token: string | null = null;
  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    timeout: 30000,
  });
  return axiosClient;
}
