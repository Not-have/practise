<script lang="ts" setup>
import {
  useState
} from "@mt-kit/vue-hooks";
import {
  watch
} from "vue";

const [state, setState] = useState({
  age: 1
});

const handleClick = (): void => {
  setState({
    age: 2
  });
};

const handleReductionClick = (): void => {
  setState();
};

watch(() => state.age, (newValue, oldValue) => {
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
