export const useTheme = () => {

    function init() {
        const theme = localStorage.getItem('theme');
        setTheme(theme)
    }

    function setTheme(theme: 'system' | 'dark' | 'light' | null | string) {
        if (!theme) return;
        const html = document.getElementsByTagName('html')[0];
        localStorage.setItem('theme', theme);
        if (theme == 'system') {
            html.removeAttribute('data-theme');
            return;
        }
        if (theme == 'dark') {
            html.setAttribute('data-theme', 'dark');
            return;
        }
        if (theme == 'light') {
            html.setAttribute('data-theme', 'light');
            return;
        }
    }


    return {
        init, setTheme
    }
}
