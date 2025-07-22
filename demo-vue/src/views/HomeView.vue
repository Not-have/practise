<script lang="ts" setup>
import {
  useState
} from "@mt-kit/vue-hooks";
import {
  watch
} from "vue";

import {
  DomMessage
} from "@/utils";

const [
  state,
  setState
] = useState({
  age: 1
});

const handleClick = (): void => {
  setState({
    age: 2
  });
};

const handleReductionClick = (): void => {
  DomMessage.message({
    message: "这是一条成功提示",
    type: "success",
    duration: 3000
  });
  setState();
};

watch(() => state.age, (newValue, oldValue) => {
  // eslint-disable-next-line no-console
  console.log(newValue, oldValue);
});
</script>
<template>
  <div>
    {{ state.age }}
    <br />
    <br />
    <button @click="handleClick">
      修改
    </button>
    <br />
    <button @click="handleReductionClick">
      还原
    </button>
  </div>
</template>
