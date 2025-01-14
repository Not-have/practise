<script setup lang="ts">

import Ajv, {
  JTDSchemaType
} from "ajv/dist/jtd";
const ajv = new Ajv();

interface MyData {
  foo: number
  bar?: string
}

const schema: JTDSchemaType<MyData> = {
  properties: {
    foo: {
      type: "int32"
    }
  },
  optionalProperties: {
    bar: {
      type: "string"
    }
  }
};

const validate = ajv.compile(schema);

const data = {
  foo: 1,
  bar: "abc"
};

if (validate(data)) {
  console.log(data.foo);
} else {
  console.log(validate.errors);
}

</script>

<template>
  <main>
    home
  </main>
</template>
