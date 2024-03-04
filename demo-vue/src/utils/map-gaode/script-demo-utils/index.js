import { head } from '../const';
export default function scriptDemoUtils() {
    return new Promise((resolve, reject) => {
        const element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = 'https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js';
        head.appendChild(element);
        element.onload = (res) => {
            resolve(res);
        };
        element.onerror = (err) => {
            reject(err);
            throw new Error('demoutils.js loading failed!');
        };
    });
}
