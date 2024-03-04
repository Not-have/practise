import { head } from '../const';
export default function scriptMap({ key, version = '2.0', plugins }) {
    return new Promise((resolve, reject) => {
        const element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = 'https://webapi.amap.com/loader.js';
        head.appendChild(element);
        element.onload = () => {
            resolve(AMapLoader.load({
                key: key,
                version: version,
                plugins: plugins
            }));
        };
        element.onerror = err => {
            reject(err);
            throw new Error('Map loading failed!');
        };
    });
}
