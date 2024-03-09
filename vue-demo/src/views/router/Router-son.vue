<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import useLocationQuery from '@/hook/use-location-query'

const [query, updateQuery] = useLocationQuery({
    keys: ["id", "name"],
    defaults: {
        name: '哈哈哈'
    }
});

function handleChangeId(event: any) {
    updateQuery({
        id: event.target.value
    })
}
function handleChangeName(event: any) {
    updateQuery({
        name: event.target.value
    })
}

watchEffect(() => {
    console.log(query.value);
})

const route = useRoute();

console.log(route);


</script>

<template>
    <br>
    Router-son
    <br>
    id <input :defaultValue="query.id" @input="handleChangeId" />
    <br>
    name <input :defaultValue="query.name" @input="handleChangeName" />
</template>

<style scoped>

</style>