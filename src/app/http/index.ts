import Axios, {AxiosInstance} from "axios";

export const httpClient: AxiosInstance = Axios.create(
    {
        baseURL: "http://localhost:8080/",
        withCredentials: true
    }
)

export const registrarToken = (token: string)=> {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}