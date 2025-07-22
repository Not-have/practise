// https://zh.uniapp.dcloud.io/api/storage/storage.html
/**
 * 设置 Storage
 * @param {缓存key} key
 * @param {需要存储的缓存值} value
 * @param {过期时间，默认0表示永久有效} expire
 */
export const setStorage = (
    key: string,
    value: AnyObject | string,
    expire = 0
) => {
  const obj = {
    value, // 存储的数据
    expire: expire ? new Date().getTime() + expire * 24 * 60 * 60 * 1000 : null
  };

  uni.setStorageSync(key, obj);
};

/**
 * 读取 Storage
 * @param {缓存key} key
 */
export const getStorage = (key: string) => {
  let value = uni.getStorageSync(key);

  if (!value) {
    return null;
  }

  value = value;

  if (value.expire) {
    const now = Date.now();

    if (value.expire === Infinity || value.expire > now) {
      return value.value;
    }

    uni.removeStorageSync(key);

    return null;
  }

  return value.value;
};

/**
 * 清楚
 */
export const clearStorage = () => {
  try {
    uni.clearStorageSync();
  } catch (e) {
    throw e;
  }
};
