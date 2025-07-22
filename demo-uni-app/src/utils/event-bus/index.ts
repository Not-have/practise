class EventBus {
  private events: Record<string, ((...args: any[]) => void)[]> = {};

  public $on(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  public $emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
}

const eventBus = new EventBus();

export default eventBus;
