export const LOCALE = {
    ZH_CN: 'zh_CN',
    EN_US: 'en'
};
export const localeSetting = {
    showPicker: true,
    locale: LOCALE.ZH_CN,
    fallback: LOCALE.ZH_CN,
    availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
};
export const localeList = [
    {
        text: '简体中文',
        event: LOCALE.ZH_CN
    },
    {
        text: 'English',
        event: LOCALE.EN_US
    }
];
