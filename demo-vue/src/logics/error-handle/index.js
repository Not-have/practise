import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import projectSetting from '@/settings/projectSetting';
function processStackMsg(error) {
    if (!error.stack) {
        return '';
    }
    let stack = error.stack
        .replace(/\n/gi, '')
        .replace(/\bat\b/gi, '@')
        .split('@')
        .slice(0, 9)
        .map(v => v.replace(/^\s*|\s*$/g, ''))
        .join('~')
        .replace(/\?[^:]+/gi, '');
    const msg = error.toString();
    if (stack.indexOf(msg) < 0) {
        stack = msg + '@' + stack;
    }
    return stack;
}
function formatComponentName(vm) {
    if (vm.$root === vm) {
        return {
            name: 'root',
            path: 'root'
        };
    }
    const options = vm.$options;
    if (!options) {
        return {
            name: 'anonymous',
            path: 'anonymous'
        };
    }
    const name = options.name || options._componentTag;
    return {
        name: name,
        path: options.__file
    };
}
function vueErrorHandler(err, vm, info) {
    const errorLogStore = useErrorLogStoreWithOut();
    const { name, path } = formatComponentName(vm);
    errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.VUE,
        name,
        file: path,
        message: err.message,
        stack: processStackMsg(err),
        detail: info,
        url: window.location.href
    });
}
export function scriptErrorHandler(event, source, lineno, colno, error) {
    if (event === 'Script error.' && !source) {
        return false;
    }
    const errorInfo = {};
    colno = colno || (window.event && window.event.errorCharacter) || 0;
    errorInfo.message = event;
    if (error?.stack) {
        errorInfo.stack = error.stack;
    }
    else {
        errorInfo.stack = '';
    }
    const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script';
    const errorLogStore = useErrorLogStoreWithOut();
    errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.SCRIPT,
        name: name,
        file: source,
        detail: 'lineno' + lineno,
        url: window.location.href,
        ...errorInfo
    });
    return true;
}
function registerPromiseErrorHandler() {
    window.addEventListener('unhandledrejection', function (event) {
        const errorLogStore = useErrorLogStoreWithOut();
        errorLogStore.addErrorLogInfo({
            type: ErrorTypeEnum.PROMISE,
            name: 'Promise Error!',
            file: 'none',
            detail: 'promise error!',
            url: window.location.href,
            stack: 'promise error!',
            message: event.reason
        });
    }, true);
}
function registerResourceErrorHandler() {
    window.addEventListener('error', function (e) {
        const target = e.target ? e.target : e.srcElement;
        const errorLogStore = useErrorLogStoreWithOut();
        errorLogStore.addErrorLogInfo({
            type: ErrorTypeEnum.RESOURCE,
            name: 'Resource Error!',
            file: (e.target || {}).currentSrc,
            detail: JSON.stringify({
                tagName: target.localName,
                html: target.outerHTML,
                type: e.type
            }),
            url: window.location.href,
            stack: 'resource is not found',
            message: (e.target || {}).localName + ' is load error'
        });
    }, true);
}
export function setupErrorHandle(app) {
    const { useErrorHandle } = projectSetting;
    if (!useErrorHandle) {
        return;
    }
    app.config.errorHandler = vueErrorHandler;
    window.onerror = scriptErrorHandler;
    registerPromiseErrorHandler();
    registerResourceErrorHandler();
}
