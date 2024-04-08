<script lang="ts" setup>
import { ref } from 'vue';

const isTyping = ref(false);
const voicePath = ref('');
let text = ref('');

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
// 自动播放
innerAudioContext.autoplay = true;

// 复合使用的时候，注意播放失效问题，建议
var plugin = requirePlugin('WechatSI');
let manager = plugin.getRecordRecognitionManager();

const initRecord = () => {
    manager.onStart = function (res: any) {
        console.log('正在录音', res);
    };
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res: any) => {
        console.log('有新的识别内容', res);
    };
    // 识别结束事件
    manager.onStop = (res: any) => {
        console.log('识别结束事件', res);
        if (res?.result) {
            text.value = res.result;
        }
    };
    // 识别错误事件
    manager.onError = (res: any) => {
        console.log('识别错误事件', res);
    };
    // 语音录制完成
    recorderManager.onStop(function (res) {
        console.log(res, '语音录制完成');

        voicePath.value = res.tempFilePath;
    });
};
onLoad(() => initRecord());

const handleTouchstart = () => {
    console.log('开始录音');
    isTyping.value = true;
    recorderManager.start({
        duration: 30000
    });

    manager.start({
        duration: 30000,
        lang: 'zh_CN'
    });
};
const handleTouchend = () => {
    console.log('录音结束');
    isTyping.value = false;
    recorderManager.stop();

    manager.stop();
};
// const handlePlayClick = () => {
//     if (voicePath.value) {
//         handlePlay(voicePath.value);
//     }
// };

// const handlePlay = (url: string) => {
//     if (url) {
//         innerAudioContext.src = url;
//         innerAudioContext.play();
//     }
// };

// const handleVideoToTestClick = () => {
//     /*
//     // 翻译
//     plugin.translate({
//         lfrom: 'en_US',
//         lto: 'zh_CN',
//         content: 'hello, this is the first time to test？',
//         success: function (res: any) {
//             if (res.retcode === 0) {
//                 console.log('result', res.result);
//             } else {
//                 console.warn('翻译失败', res);
//             }
//         },
//         fail: function (res: any) {
//             console.log('网络失败', res);
//         }
//     });
//     */

//     plugin.textToSpeech({
//         lang: 'zh_CN',
//         tts: true,
//         content: text.value || '一个常见的需求',
//         success: function (res: any) {
//             console.log('succ tts', res.filename);
//             handlePlay(res.filename);
//         },
//         fail: function (res: any) {
//             console.log('fail tts', res);
//         }
//     });
// };
</script>
<template>
    <view class="video">
        <button @touchstart="handleTouchstart" @touchend="handleTouchend">
            {{ isTyping ? '语音输入中...' : '语音输入' }}
        </button>
        <br />
        <!-- <button class="" hover-class="none" @click="handlePlayClick"> 播放语音 </button> -->

        {{ text }}

        <!-- <button @click="handleVideoToTestClick">文字操作</button> -->
    </view>
</template>

<style scoped></style>
