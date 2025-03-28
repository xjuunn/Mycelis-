
import type { Result } from '@mycelis/types';
export function uploadimg(file: File) {
    let formdata = new FormData();
    formdata.append('file', file);
    return useAxios().axios.post<Result<string>>('/upload/image', formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export function uploadAvatar(file: File) {
    let formdata = new FormData();
    formdata.append('file', file);
    return useAxios().axios.post<Result<string>>('/upload/avatar', formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export function getFileUrl(file: string) {
    return `${useAppStore().baseurl}/file/${file}`
}