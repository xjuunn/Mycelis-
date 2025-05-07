import * as APPAPI from '~/api/app'
export const useCheck = () => {

    async function check() {
        if (import.meta.server) return;

        // 连接性检查
        try {
            await APPAPI.checkConnect();
        } catch {
            useToast().error("无法连接至服务器");
            return;
        }
        // 登录状态检查
        try {
            await APPAPI.checkLogin();
        } catch {
            useToast().error("请登录");
            navigateTo('/auth/signin');
        }
    }
    return {
        check
    }
}