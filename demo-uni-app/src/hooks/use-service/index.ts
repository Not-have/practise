import type { Ref } from "vue";
import { toRef } from "vue";
import { ServiceFunction, ServiceConfig, useService as _useService } from "micro-vue-hooks";

interface IAsyncResult<T, Q> {
  data?: Ref<T | null | undefined>;
  loading: Ref<boolean>;
  error: Ref<string | undefined>;
  run: (arg?: Q) => Promise<T>;
}

export default function useService<T, Q>(
  fetch: ServiceFunction<T, Q>,
  query?: Q,
  initData?: T,
  config?: ServiceConfig
): IAsyncResult<T, Q> {
  const _data = _useService<T, Q>(fetch, query, initData, config);

  return {
    data: toRef(_data, "data") as Ref<T | undefined>,
    loading: toRef(_data, "loading") as unknown as Ref<boolean>,
    error: toRef(_data, "error") as unknown as Ref<string | undefined>,
    run: toRef(_data, "run") as unknown as (arg?: Q) => Promise<T>
  };
}
