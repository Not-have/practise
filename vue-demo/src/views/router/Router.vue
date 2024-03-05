<script setup lang="ts">
import { useRouter } from "vue-router"
import {
    ERouter
} from '@/router/enum'

import Error from '../../components/Error.vue'

const router = useRouter();

const handleUrl = () => {
    // router.push({ name: Router.ROUTER_$id_ROUTER_SON, params: { id: 'erina', name: 'test' } })
    router.push({
        name: ERouter.ROUTER_$id_ROUTER_SON,
        params: {
            id: 11
        },
        query: {
            id: 'erina', name: 'test'
        }
    })
}

</script>

<template>
    <div>
        router
        
        <button @click="handleUrl">跳转</button>
        
        <router-view />

        <Error />
    </div>
</template>

<style scoped>

</style>