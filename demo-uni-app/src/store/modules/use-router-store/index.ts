import { defineStore } from 'pinia';
import { reactive } from 'vue';

/**
 * @deprecated 路由传参，使用 hooks 吧，放弃 pinia 的实现 
 *
 * 路由
 *
 * https://uniapp.dcloud.net.cn/api/router.html#navigateto
 *
 * 作用：
 *
 * 1、解决 url 参数太长问题
 *
 * 2、方便路由劫持时使用 uni.addInterceptor（原生的 tabBar 跳转，不支持劫持）
 *
 * 3、会根据页面进行参数的销毁，例如你跳转到 /pages/home-son/index 时，在 uni.navigateBack 的情况下销毁数据，但是在接着跳转时不进行销毁，因为你有可能在返回回来的时候，还要接着使用
 *
 * 4、获取数据的原理：是根据当前 url 作为 key 来存取，但是 返回的时候会删除当前 url 的 params
 *
 * 5、当 uni.navigateTo 达到最大深度 9 的时候（默认情况下，页面栈的深度为10，也就是说最多只能跳转10次），默认删除第一个，实在都有 params 的前提下
 *
 * 缺点：
 * 1、原生左上角的返回，没办法监听（bug），所以适用于自定义 topBar
 *
 * 注：所以基于 1 的缺点，做一个 isParams，pinia 里面只记录一个数据，当前 指定跳转界面 url !== 当前 url 的时候，就去重置 params 为空，但是就不能在多次跳转的时候，使用 params 了，数据展示不影响，页面有缓存
 *
 * 目前默认 isParams 为 true
 *
 */
const useRouterStore = defineStore('RouterStore', () => {
    const obj = reactive({});

    return obj;
});

export default useRouterStore;
