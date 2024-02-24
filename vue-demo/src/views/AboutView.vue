<template>
    <div>
        <h1 v-if="counter < 2" @click="add" v-num.aa.bb="'哈哈哈'">{{ counter }}</h1>
        <h1 v-if="counter < 2" @click="add" v-num.aa="'哈哈哈'">{{ counter }}</h1>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    directives: {
        num: {
            created(el, binding) {
                console.log("created");
                console.log(el, binding);
            },
            beforeMount() {
                console.log("beforeMount");
            },
            mounted() {
                console.log("mounted");
            },
            beforeUpdate() {
                console.log("beforeUpdate");
            },
            updated() {
                console.log("updated");
            },
            beforeUnmount() {
                console.log("beforeUnmount");
            },
            unmounted() {
                console.log("unmounted");
            }
        }
    },
    setup() {
        let counter = ref(0);
        const add = () => {
            counter.value++;
        };
        return { add, counter };
    }
};
</script>