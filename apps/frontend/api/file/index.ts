
import type { Result } from '@mycelis/types';

/**
 * 上传图片
 * @param file 图片文件
 */
export function uploadimg(file: File) {
    let formdata = new FormData();
    formdata.append('file', file);
    return useAxios().axios.post<Result<string>>('/upload/image', formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 上传头像
 * @param file 图片文件
 */
export function uploadAvatar(file: File) {
    let formdata = new FormData();
    formdata.append('file', file);
    return useAxios().axios.post<Result<string>>('/upload/avatar', formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

/**
 * 获取完整的文件路径
 * @param fileUrl 文件名
 */
export function getFileUrl(fileUrl: string) {
    if (fileUrl) return `${useAppStore().baseurl}/file${fileUrl}`
    else return '';
}