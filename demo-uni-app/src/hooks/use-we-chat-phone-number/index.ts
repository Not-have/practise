import type { ButtonOnGetphonenumberEvent } from '@uni-helper/uni-app-types';

const appid = import.meta.env.VITE_WE_CHAT_APP_ID;
const secret = import.meta.env.VITE_WE_CHAT_SECRET;

interface IData {
    phoneNumber: string;
    /**
     * 调用凭据，token有效期为7200s
     */
    accessToken: string;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
 */
async function getPhoneNumber(phoneNumberCode?: string): Promise<IData> {
    const accessToken = await getAccessToken();

    return await new Promise((resolve, reject) => {
        uni.request({
            url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`,
            method: 'POST',
            data: {
                code: phoneNumberCode
            }
        })
            .then((res: any) => {
                resolve({
                    phoneNumber: res.data.phone_info.phoneNumber,
                    accessToken: accessToken
                });
            })
            .catch(reject);
    });
}

function getAccessToken(): Promise<string> {
    return uni
        .request({
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            method: 'GET',
            data: {
                appid: appid,
                secret: secret,
                grant_type: 'client_credential'
            }
        })
        .then((res: any) => {
            return res.data.access_token;
        });
}
/**
 * @deprecated 获取用户手机号和 accessToken
 *
 * 不建议 web 端来获取
 *
 * <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumberClick">获取手机号</button>
 *
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getRealtimePhoneNumber.html
 */
export default function useWeChatPhoneNumber(e: ButtonOnGetphonenumberEvent): Promise<IData> {
    return new Promise(async (resolve, reject) => {
        if (e.detail.code) {
            const data = await getPhoneNumber(e.detail.code);
            resolve(data);
        }

        reject('用户未同意手机号的获取');

        throw new Error('用户未同意手机号的获取');
    });
}
