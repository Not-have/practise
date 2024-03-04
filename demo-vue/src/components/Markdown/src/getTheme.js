export const getTheme = (darkModeVal, themeMode = 'default') => {
    const isDark = darkModeVal === 'dark';
    switch (themeMode) {
        case 'default':
            return isDark ? 'dark' : 'classic';
        case 'content':
            return isDark ? 'dark' : 'light';
        case 'code':
            return isDark ? 'dracula' : 'github';
    }
};
