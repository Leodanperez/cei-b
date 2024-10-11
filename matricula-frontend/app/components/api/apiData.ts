import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5454',
    headers: {
        "Content-Type": "application/json",
    }
});

const fetchData = async <T,>(url: string, options?: AxiosRequestConfig): Promise<T> => {
    try {
        const respuesta: AxiosResponse<T> = await axiosInstance(url, options);
        return respuesta.data;
    } catch (error: any) {
        throw { statusCode: 500, errorMessage: 'No se pudo obtener la data' };
    }
}

export default fetchData;