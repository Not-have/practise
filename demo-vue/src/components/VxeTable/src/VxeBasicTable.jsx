import { defineComponent, computed, ref } from 'vue';
import { basicProps } from './props';
import { ignorePropKeys } from './const';
import { basicEmits } from './emits';
import XEUtils from 'xe-utils';
import { Grid as VxeGrid } from 'vxe-table';
import { extendSlots } from '@/utils/helper/tsxHelper';
import { gridComponentMethodKeys } from './methods';
import { omit } from 'lodash-es';
export default defineComponent({
    name: 'VxeBasicTable',
    props: basicProps,
    emits: basicEmits,
    setup(props, { emit, attrs }) {
        const tableElRef = ref();
        const emitEvents = {};
        const extendTableMethods = methodKeys => {
            const funcs = {};
            methodKeys.forEach(name => {
                funcs[name] = (...args) => {
                    const $vxegrid = tableElRef.value;
                    if ($vxegrid && $vxegrid[name]) {
                        return $vxegrid[name](...args);
                    }
                };
            });
            return funcs;
        };
        const gridExtendTableMethods = extendTableMethods(gridComponentMethodKeys);
        basicEmits.forEach(name => {
            const type = XEUtils.camelCase(`on-${name}`);
            emitEvents[type] = (...args) => emit(name, ...args);
        });
        const getBindValues = computed(() => {
            const propsData = {
                ...attrs,
                ...props
            };
            return propsData;
        });
        const getBindGridValues = computed(() => {
            const omitProps = omit(getBindValues.value, ignorePropKeys);
            return {
                ...omitProps,
                ...getBindGridEvent
            };
        });
        const getWrapperClass = computed(() => {
            return [attrs.class];
        });
        const getBindGridEvent = {
            ...emitEvents
        };
        return {
            getWrapperClass,
            getBindGridValues,
            tableElRef,
            ...gridExtendTableMethods
        };
    },
    render() {
        const { tableClass, tableStyle } = this.$props;
        return (<div class={`h-full flex flex-col bg-white ${this.getWrapperClass}`}>
                <VxeGrid ref="tableElRef" class={`vxe-grid_scrollbar px-6 py-4 ${tableClass}`} style={tableStyle} {...this.getBindGridValues}>
                    {extendSlots(this.$slots)}
                </VxeGrid>
            </div>);
    }
});
