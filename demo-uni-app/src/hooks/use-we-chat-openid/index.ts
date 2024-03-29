const appid = import.meta.env.VITE_WE_CHAT_APP_ID;
const secret = import.meta.env.VITE_WE_CHAT_SECRET;

interface IData {
    /**
     * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 code2Session，使用 code 换取 openid、unionid、session_key 等信息
     */
    code: string;
    /**
     * 不会改变，作为用户的身份标识
     */
    openId: string;
    /**
     * 会话密钥，有效期是三天
     */
    sessionKey: string;
}

interface _IData extends Pick<IData, 'openId' | 'sessionKey'> {}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
 */
function getOpenId(code: string): Promise<_IData> {
    return uni
        .request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
                appid: appid, //你的小程序的APPID
                secret: secret, //你的小程序的secret,
                js_code: code, //wx.login 登录成功后的code
                grant_type: 'authorization_code'
            }
        })
        .then((res: any) => {
            return {
                openId: res.data.openid,
                sessionKey: res.data.session_key
            };
        });
}

/**
 * @deprecated 获取用户 code 和 openId
 *
 * 不建议 web 端来获取
 *
 * https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
 */
export default function useWeChatOpenId(): Promise<IData> {
    return uni.login().then(async (res) => {
        if (!res.code) {
            throw new Error('登录失败！' + res.errMsg);
        }

        const data = await getOpenId(res.code);
        return {
            code: res.code,
            openId: data.openId,
            sessionKey: data.sessionKey
        };
    });
}
