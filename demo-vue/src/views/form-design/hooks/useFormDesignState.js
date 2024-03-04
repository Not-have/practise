import { inject } from 'vue';
export function useFormDesignState() {
    const formConfig = inject('formConfig');
    const formDesignMethods = inject('formDesignMethods');
    return { formConfig, formDesignMethods };
}
export function useFormModelState() {
    const formModel = inject('formModel');
    const setFormModel = inject('setFormModelMethod');
    return { formModel, setFormModel };
}
