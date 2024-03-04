import { toCanvas } from 'qrcode';
import { cloneDeep } from 'lodash-es';
export const renderQrCode = ({ canvas, content, width = 0, options: params = {} }) => {
    const options = cloneDeep(params);
    options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(content);
    return getOriginWidth(content, options).then((_width) => {
        options.scale = width === 0 ? undefined : (width / _width) * 4;
        return toCanvas(canvas, content, options);
    });
};
function getOriginWidth(content, options) {
    const _canvas = document.createElement('canvas');
    return toCanvas(_canvas, content, options).then(() => _canvas.width);
}
function getErrorCorrectionLevel(content) {
    if (content.length > 36) {
        return 'M';
    }
    else if (content.length > 16) {
        return 'Q';
    }
    else {
        return 'H';
    }
}
