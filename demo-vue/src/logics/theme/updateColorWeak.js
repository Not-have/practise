import { toggleClass } from './util';
export function updateColorWeak(colorWeak) {
    toggleClass(colorWeak, 'color-weak', document.documentElement);
}
