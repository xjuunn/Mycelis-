export const useTheme = () => {
    const themeList = [
        'system', 'dark', 'light'
    ]
    function init() {
        const theme = localStorage.getItem('theme');
        if (theme) setTheme(theme)
    }

    function setTheme(theme: typeof themeList[number]) {
        if (!theme) return;
        const html = document.getElementsByTagName('html')[0];
        localStorage.setItem('theme', theme);
        if (theme == 'system') {
            html.removeAttribute('data-theme');
            return;
        }
        html.setAttribute('data-theme', theme);
    }


    return {
        init, setTheme, themeList
    }
}
