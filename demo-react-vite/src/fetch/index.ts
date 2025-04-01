// 数据请求执行两次，是因为 StrictMode 的包裹

export function test01Fetch():Promise<Record<string, unknown>> {
  return fetch("https://mock.mengxuegu.com/mock/60434bccf340b05bceda3906/practise-nuxtjs/test").then(res => res.json()).
      then(res => {
        if(res.code === 200) {
          return res.data;
        }

        return null;
      });
}

// const [data, loading] = useRequest(test01Fetch)
