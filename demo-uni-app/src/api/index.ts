// https://www.jianshu.com/p/ddd984e9d197

/*
    let token;
    try {
        token = uni.getStorageSync(import.meta.env.VITE_TOKEN_NAME);
    } catch (e) {
        throw new Error(`token error: ${e}`);
    }

    const headerToken = {
        authorization: token ? `Bearer ${token}` : null
    };

    if (!/^https?:\/\//i.test(url)) {
        url = `${import.meta.env.VITE_BASE_URL}${url}`;
    }
 */
import dataRequest from "./data-request";
import initRequest from "./init-request";

interface IConfig
  extends Omit<UniNamespace.RequestOptions, "method" | "url" | "data"> {}
interface IParamsConf extends IConfig {

  /**
   * 基础的 url 信息
   *
   * 例：http://localhost:52330
   */
  baseUrl?: string;
}

function injectUrl(baseUrl: string = "", url: string): string {
  if (!(/^https?:\/\//i).test(url)) {
    url = `${baseUrl}${url}`;
  }

  return url;
}

function fetch({ baseUrl, ...conf }: IParamsConf = {}) {
  function get<D, Q extends string | AnyObject>(
      url: string,
      params?: Q,
      config?: IConfig
  ): Promise<D> {
    return dataRequest<D>({
      ...conf,
      url: injectUrl(baseUrl, url),
      method: "GET",
      data: params,
      header: {
        ...conf?.header,
        ...config?.header
      },
      ...config
    });
  }

  function post<D, Q extends string | AnyObject>(
      url: string,
      params?: Q,
      config?: IConfig
  ): Promise<D | null> {
    return dataRequest<D>({
      ...conf,
      url: injectUrl(baseUrl, url),
      method: "POST",
      data: params,
      header: {
        ...conf?.header,
        ...config?.header
      },
      ...config
    });
  }

  return {
    get,
    post
  };
}

export default fetch();

export { initRequest };
