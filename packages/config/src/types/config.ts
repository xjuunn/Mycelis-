export type Config = {
    /** 应用名 */
    APP_NAME?: string;
    /** 应用版本 */
    APP_VERSION?: string;
    /** JWT 密钥 */
    JWT_SECRET?: string;
    /** 网站服务端口 */
    WEB_PORT?: number;
    /** 文件上传地址(相对根目录) */
    FILE_UPLOAD_PATH?: string;
    /** 服务器地址 */
    SERVER_HOST?: string;
    /** 后端服务端口 */
    SERVER_PORT?: number;
}
