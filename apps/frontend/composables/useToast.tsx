import { render, h } from 'vue'
import { Icon } from '@iconify/vue'
export const useToast = () => {
    let container = document.getElementById('ToastContainer');
    function create(content: string, type: "error" | "info" | "success" | "warning", icon: string) {
        let iconVnode = h(Icon, { icon, width: 22 });
        let alert = <div class={['alert', 'font-extrabold', `alert-${type}`]}>
            {iconVnode} {content}
        </div>
        const mountNode = document.createElement('div')
        container?.appendChild(mountNode)
        render(alert, mountNode)
        setTimeout(() => container?.removeChild(mountNode), 3000)
    }

    const success = (content: string) => create(content, 'success', "mdi:success-bold")
    const error = (content: string) => create(content, 'error', "mdi:close-thick")
    const warning = (content: string) => create(content, 'warning', 'mdi:exclamation-thick')
    const info = (content: string) => create(content, 'info', 'mdi:information-variant')
    return {
        container,
        create,
        success,
        error,
        warning,
        info
    }
}