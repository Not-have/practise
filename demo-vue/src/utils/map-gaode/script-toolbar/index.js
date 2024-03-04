import { head } from '../const';
export default function scriptToolbar() {
    return new Promise((resolve, reject) => {
        const element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = 'https://cache.amap.com/lbs/static/addToolbar.js';
        head.appendChild(element);
        element.onload = (res) => {
            resolve(res);
        };
        element.onerror = (err) => {
            reject(err);
            throw new Error('addToolbar.js loading failed!');
        };
    });
}
