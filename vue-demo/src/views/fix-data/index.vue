<script lang="ts" setup>
import { map, has, every } from "lodash";
import { MOCK_DATA01 } from "./data";

console.log(MOCK_DATA01);

/*
// 定义方法，接收原始数据作为参数，返回修改后的新数据
function updateImageHref(data: any) {
  const obj: any = { cells: [] };

  obj.cells = map(data.cells, (item) => {
    if (item.shape === "edge") {
      const hasImage = every(item.labels, (lItem) => has(lItem, "attrs.image") && lItem.attrs.image.href);
      if (hasImage) {
        const updatedImage = map(item.labels, (uItem) => {
          return {
            ...uItem,
            attrs: {
              ...uItem.attrs,
              image: {
                ...uItem.attrs.image,
                href: "www",
              },
            },
          };
        });
        return {
          ...item,
          labels: updatedImage,
        };
      }
      return item;
    }

    return item;
  }).filter(Boolean);

  return obj;
}
*/
function updateImageHref(data: any): typeof data {
  const obj: any = { cells: [] };

  try {
    obj.cells = map(data.cells, (item) => {
      if (item.shape === "edge") {
        const hasImage = every(
          item.labels,
          (lItem) => has(lItem, "attrs.image") && lItem.attrs.image.href
        );
        if (hasImage) {
          item.labels.forEach((uItem: any) => {
            if (has(uItem, "attrs.image")) {
              uItem.attrs.image.href = "www";
            }
          });
        }
      }
      return item;
    });

    return obj;
  } catch (_) {
    return data;
  }
}

console.log(updateImageHref(MOCK_DATA01));
</script>
<template>修复数据</template>
