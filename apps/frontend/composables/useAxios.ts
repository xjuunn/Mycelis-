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
            baseURL: useAppStore().baseurl
                .replace('localhost', window.location.hostname)
                .replace('127.0.0.1', window.location.hostname),
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        });
    };
    const axiosInstance = ref(initAxios());

    axiosInstance.value.interceptors.request.use(
        (req) => {
            useLogger().logDefault('网络请求：' + req.baseURL + req.url)
            return req;
        }
    )
    axiosInstance.value.interceptors.response.use(
        (res) => {
            return res
        },
        (error): Promise<Result<any>> => {
            console.error("Axios错误: ", error);
            useLogger().logError(error);
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
        updateToken,
        getToken
    };
};