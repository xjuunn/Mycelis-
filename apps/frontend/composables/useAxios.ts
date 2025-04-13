import axios from 'axios';
import { Result } from '@mycelis/types';
export const useAxios = () => {
    const token = ref('');

    const getToken = () => {
        if (token.value === '')
            token.value = localStorage.getItem('token') ?? 'no token'
        return "Bearer " + token.value;
    };
    const initAxios = () => {
        return axios.create({
            baseURL: useAppStore().baseurl,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
    };
    const axiosInstance = ref(initAxios());
    axiosInstance.value.interceptors.response.use(
        (res) => res,
        (error): Promise<Result<any>> => {
            console.error("Axios错误: ", error);
            return Promise.reject<Result<any>>(error.response.data);
        }
    );
    const refreshAxios = () => {
        token.value = '';
        axiosInstance.value = initAxios();
    };
    const updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        token.value = newToken;
        refreshAxios();
    };
    return {
        axios: axiosInstance.value,
        refreshAxios,
        updateToken
    };
};