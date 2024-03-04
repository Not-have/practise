export function checkFileType(file, accepts) {
    const newTypes = accepts.join('|');
    const reg = new RegExp('\\.(' + newTypes + ')$', 'i');
    return reg.test(file.name);
}
export function checkImgType(file) {
    return isImgTypeByName(file.name);
}
export function isImgTypeByName(name) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
}
export function getBase64WithFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ result: reader.result, file });
        reader.onerror = error => reject(error);
    });
}
