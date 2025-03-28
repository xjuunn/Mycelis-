import axios from 'axios';

export const useAxios = () => {
    const token = ref('');

    const getToken = () => {
        return token.value;
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
        (error) => {
            console.error("Axios错误: ", error);
            return Promise.reject(error);
        }
    );
    const refreshAxios = () => {
        axiosInstance.value = initAxios();
    };
    const updateToken = (newToken: string) => {
        token.value = newToken;
        refreshAxios();
    };
    return {
        axios: axiosInstance.value,
        refreshAxios,
        updateToken
    };
};