<template>
    <p>{{and}}</p>
    <button @click="fun">修改</button>
</template>
<script setup>
import { computed, ref } from "vue"
const str1 = ref(1)
const str2 = ref(2)
/**
 * 方法一：
 * 传入一个getter函数
 * computed 返回的是一个ref对象
 */
// const and = computed(() => str1.value + str2.value)
/**
 * 方法二：
 * 传入一个对象，包含 etter/setter
 * computed 返回的是一个ref对象
 */
const and = computed({
    get: () => str1.value + str2.value,
    set(newValue) {
        str1.value = newValue
    }
})

console.log(and.value);

const fun = function () {
    and.value = 4
}

let query = {
    id: 'erina',
    name: ''
}

const filteredObj = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => {
            console.log(key, value);
            return value !== "" && value !== undefined
        }
    )
);

console.log(filteredObj);
</script>
