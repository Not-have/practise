export function isSlotFormSchema(schema) {
    return 'slot' in schema;
}
export function isComponentFormSchema(schema) {
    return !isSlotFormSchema(schema);
}
