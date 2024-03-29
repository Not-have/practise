import { defineStore } from 'pinia';
import { ref } from 'vue';

const useTestLongStore = defineStore(
    'testStore',
    () => {
        const obj = reactive({});

        return obj;
    },
    {
        persist: true
    }
);

export default useTestLongStore;
