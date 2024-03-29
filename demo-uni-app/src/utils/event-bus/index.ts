class EventBus {
    // eslint-disable-next-line no-unused-vars
    private events: Record<string, ((...args: any[]) => void)[]> = {};

    // eslint-disable-next-line no-unused-vars
    public $on(event: string, callback: (...args: any[]) => void) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    public $emit(event: string, ...args: any[]) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => {
                callback(...args);
            });
        }
    }
}

const eventBus = new EventBus();

// export const useEventBus = () => eventBus;

export default eventBus;
