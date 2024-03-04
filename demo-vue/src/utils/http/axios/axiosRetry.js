export class AxiosRetry {
    retry(axiosInstance, error) {
        const { config } = error.response;
        const { waitTime, count } = config?.requestOptions?.retryRequest ?? {};
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount >= count) {
            return Promise.reject(error);
        }
        config.__retryCount += 1;
        delete config.headers;
        return this.delay(waitTime).then(() => axiosInstance(config));
    }
    delay(waitTime) {
        return new Promise(resolve => setTimeout(resolve, waitTime));
    }
}
