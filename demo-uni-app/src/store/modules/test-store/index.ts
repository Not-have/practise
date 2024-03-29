import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useTestStore = defineStore('testStore', () => {
    const obj = reactive({});

    return obj;
});

export default useTestStore;
