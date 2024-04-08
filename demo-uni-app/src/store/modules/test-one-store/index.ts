// import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface IInitStore {
    age: number;
    name: string;
}

interface IStore {
    objTestStore: IInitStore;
    setAllTestStore: (payload: IInitStore) => void;
    setPropertyTestStore: <K extends keyof IInitStore>(key: K, value: IInitStore[K]) => void;
}

const useTestOneStore = defineStore(
    'testStore',
    (): IStore => {
        const objTestStore = reactive({ age: 0, name: '' });

        function setAllTestStore(payload: IInitStore) {
            Object.assign(objTestStore, payload);
        }

        function setPropertyTestStore<K extends keyof IInitStore>(key: K, value: IInitStore[K]) {
            return (objTestStore[key] = value);
        }

        return { setAllTestStore, setPropertyTestStore, objTestStore };
    },
    {
        persist: true
    }
);

export default useTestOneStore;
