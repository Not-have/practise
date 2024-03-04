import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '@/settings/localeSetting';
import { useLocaleStoreWithOut } from '@/store/modules/locale';
const { fallback, availableLocales } = localeSetting;
export let i18n;
async function createI18nOptions() {
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    const defaultLocal = await import(`./lang/${locale}.ts`);
    const message = defaultLocal.default?.message ?? {};
    setHtmlPageLang(locale);
    setLoadLocalePool(loadLocalePool => {
        loadLocalePool.push(locale);
    });
    return {
        legacy: false,
        locale,
        fallbackLocale: fallback,
        messages: {
            [locale]: message
        },
        availableLocales: availableLocales,
        sync: true,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true
    };
}
export async function setupI18n(app) {
    const options = await createI18nOptions();
    i18n = createI18n(options);
    app.use(i18n);
}
