import { useI18n } from '@/hooks/web/useI18n';
const { t } = useI18n();
export function createPlaceholderMessage(component) {
    if (component.includes('Input') || component.includes('AutoComplete')) {
        return t('common.inputText');
    }
    if (component.includes('Picker')) {
        return t('common.chooseText');
    }
    if (component.includes('Select') ||
        component.includes('Checkbox') ||
        component.includes('Radio') ||
        component.includes('Switch') ||
        component.includes('DatePicker') ||
        component.includes('TimePicker')) {
        return t('common.chooseText');
    }
    return '';
}
