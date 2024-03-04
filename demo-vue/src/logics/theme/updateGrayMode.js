import { toggleClass } from './util';
export function updateGrayMode(gray) {
    toggleClass(gray, 'gray-mode', document.documentElement);
}
