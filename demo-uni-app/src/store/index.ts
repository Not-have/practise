/**
 * 注意事项
 *
 * 1、对对象的全量修改，对象的定义必须是 ref
 *
 * 2、reactive 定义的对象，不支持全量的修改，只能按属性修改
 *
 * 3、全量赋值时，页面数据不响应
 *
 * 4、persist: true 时,全量修改不支持存储 storage 储存
 *
 * 5、reactive 的不要使用 toRefs 进行转换，转换后，数据就丢失了响应，而是把整个  const obj = reactive({}) 全部暴露出去，也就是 return { obj },推荐 storeToRefs
 * 6、storeToRefs 的使用
 * import { storeToRefs } from 'pinia';
 * const testStore = useTestOneStore();
 * 提取 ref 或 reactive 进行响应
 * const { objTestStore } = storeToRefs(testStore);
 * 作为 action 的 increment 可以直接解构
 * const { setAllTestStore, setPropertyTestStore } = testStore;
 */
export { default } from './setup-store';

export { default as useTestOneStore } from './modules/test-one-store';
