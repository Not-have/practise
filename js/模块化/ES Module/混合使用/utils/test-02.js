export function formattedDate() {
    const currentDate = new Date();

    // 获取年、月、日
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要+1，并保证两位数
    const day = currentDate.getDate().toString().padStart(2, '0'); // 保证两位数的日

    // 拼接成指定格式
    return `${ year }-${ month }-${ day }`;
}

