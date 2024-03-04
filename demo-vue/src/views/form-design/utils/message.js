import { useMessage } from '@/hooks/web/useMessage';
const { createMessage } = useMessage();
const message = Object.assign({
    success: (msg) => {
        createMessage.success(msg);
    },
    error: (msg) => {
        createMessage.error(msg);
    },
    warning: (msg) => {
        createMessage.warning(msg);
    },
    info: (msg) => {
        createMessage.info(msg);
    }
});
export default message;
