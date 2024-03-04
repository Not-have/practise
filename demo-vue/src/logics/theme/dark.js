import { addClass, hasClass, removeClass } from '@/utils/domUtils';
export async function updateDarkTheme(mode = 'light') {
    const htmlRoot = document.getElementById('htmlRoot');
    if (!htmlRoot) {
        return;
    }
    const hasDarkClass = hasClass(htmlRoot, 'dark');
    if (mode === 'dark') {
        htmlRoot.setAttribute('data-theme', 'dark');
        if (!hasDarkClass) {
            addClass(htmlRoot, 'dark');
        }
    }
    else {
        htmlRoot.setAttribute('data-theme', 'light');
        if (hasDarkClass) {
            removeClass(htmlRoot, 'dark');
        }
    }
}