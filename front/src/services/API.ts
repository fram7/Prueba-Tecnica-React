import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export let API: AxiosInstance = undefined!;

//FM: Inyecto a las solicitudes el Token
// API = useMemo(() => {
API = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
