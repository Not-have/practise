import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IInitStore {
    age: number;
    name: string;
}

interface IStore {
    objTestStore: Ref<IInitStore>;
    setAllTestStore: (payload: IInitStore) => void;
    setPropertyTestStore: <K extends keyof IInitStore>(key: K, value: IInitStore[K]) => void;
}

const useTestStore = defineStore(
    'testStore',
    (): IStore => {
        const objTestStore = ref({ age: 0, name: '' });

        function setAllTestStore(payload: IInitStore) {
            objTestStore.value = payload;
        }

        function setPropertyTestStore<K extends keyof IInitStore>(key: K, value: IInitStore[K]) {
            return (objTestStore.value[key] = value);
        }

        return { setAllTestStore, setPropertyTestStore, objTestStore };
    },
    {
        persist: true
    }
);

export default useTestStore;
