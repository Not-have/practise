const pendingMap = new Map();
const getPendingUrl = (config) => {
    return [config.method, config.url].join('&');
};
export class AxiosCanceler {
    addPending(config) {
        this.removePending(config);
        const url = getPendingUrl(config);
        const controller = new AbortController();
        config.signal = config.signal || controller.signal;
        if (!pendingMap.has(url)) {
            pendingMap.set(url, controller);
        }
    }
    removeAllPending() {
        pendingMap.forEach(abortController => {
            if (abortController) {
                abortController.abort();
            }
        });
        this.reset();
    }
    removePending(config) {
        const url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            const abortController = pendingMap.get(url);
            if (abortController) {
                abortController.abort(url);
            }
            pendingMap.delete(url);
        }
    }
    reset() {
        pendingMap.clear();
    }
}
