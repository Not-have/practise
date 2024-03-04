import { getCurrentInstance, toRaw } from 'vue';
import { cloneDeep, forOwn, isFunction } from 'lodash-es';
import { Form } from 'ant-design-vue';
export function useFormInstanceMethods(props, formdata, context, _formInstance) {
    const bindContext = () => {
        const instance = getCurrentInstance();
        const vm = instance?.parent;
        if (!vm)
            return;
        props.formConfig.schemas.forEach(item => {
            forOwn(item.componentProps, (value, key) => {
                if (isFunction(value)) {
                    item.componentProps[key] = value.bind(vm);
                }
            });
            forOwn(item.on, (value, key) => {
                if (isFunction(value)) {
                    item.componentProps[key] = value.bind(vm);
                }
            });
        });
    };
    bindContext();
    const { emit } = context;
    const useForm = Form.useForm;
    const { resetFields, validate, clearValidate, validateField } = useForm(formdata, []);
    const submit = async () => {
        const data = cloneDeep(toRaw(formdata.value));
        emit?.('submit', data);
        props.formConfig.submit?.(data);
        return data;
    };
    return {
        validate,
        validateField,
        resetFields,
        clearValidate,
        submit
    };
}
