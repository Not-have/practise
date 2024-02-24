/**
 * 实现一个防抖的ref
 * 下面这个一般写在hook里面
 */
import { customRef } from "vue";
/**
 * 自定义ref
 * customRef 里面两个参数
 * track 跟踪（决定什么时候 收集依赖）
 * trigger 决定什么时候触发所有的依赖,进行更新
 * 返回一个带有 get 和 set 的对象
 */
export default function (value, delay = 200) {
    let time = null;
    return customRef((track, trigger) => {
        return {
            get() {
                // 收集依赖
                track();
                return value;
            },
            // 设置新的值
            set(newValue) {
                // 处理数据
                clearTimeout(time);
                time = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        };
    });
}