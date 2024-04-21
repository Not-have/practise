<script lang="ts" setup>
import PublicPage from '@/components/public-page/index.vue';
import { useWeChatUserCertificate } from '@/hooks';
const handleClick = () => {
    useWeChatUserCertificate().then((res) => {
        console.log(res);
    });
};
</script>
<template>
    <PublicPage>
        <u-button type="primary" text="确定" @click="handleClick" />
    </PublicPage>
</template>

<style scoped></style>
