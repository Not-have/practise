import { Modal } from 'ant-design-vue';
import { defineComponent, toRefs, unref } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/useModalDrag';
import { useAttrs } from '@vben/hooks';
import { extendSlots } from '@/utils/helper/tsxHelper';
export default defineComponent({
    name: 'Modal',
    inheritAttrs: false,
    props: basicProps,
    emits: ['cancel'],
    setup(props, { slots, emit }) {
        const { open, draggable, destroyOnClose } = toRefs(props);
        const attrs = useAttrs();
        useModalDragMove({
            open,
            destroyOnClose,
            draggable
        });
        const onCancel = (e) => {
            emit('cancel', e);
        };
        return () => {
            const propsData = { ...unref(attrs), ...props, onCancel };
            return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
        };
    }
});
