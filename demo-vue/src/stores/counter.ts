import {
  ref
} from "vue";

import {
  defineStore
} from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const clickHandler = ref<null | (() => void)>(null);

  const registerClickHandler = (handler: () => void): void => {
    clickHandler.value = handler;
  };

  const clearClickHandler = (): void => {
    clickHandler.value = null;
  };

  const invokeClickHandler = (): void => {
    const fn = clickHandler.value;

    if (fn) {
      fn();
    }
  };

  return {
    registerClickHandler,
    clearClickHandler,
    invokeClickHandler
  };
});
