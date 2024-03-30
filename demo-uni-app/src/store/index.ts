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
 */
export { default } from './setup-store';

export { default as useRouterStore } from './modules/use-router-store';

export { default as useTestStore } from './modules/test-store';
