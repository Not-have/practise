export var sizeEnum;
(function (sizeEnum) {
    sizeEnum["XS"] = "XS";
    sizeEnum["SM"] = "SM";
    sizeEnum["MD"] = "MD";
    sizeEnum["LG"] = "LG";
    sizeEnum["XL"] = "XL";
    sizeEnum["XXL"] = "XXL";
})(sizeEnum || (sizeEnum = {}));
export var screenEnum;
(function (screenEnum) {
    screenEnum[screenEnum["XS"] = 320] = "XS";
    screenEnum[screenEnum["SM"] = 640] = "SM";
    screenEnum[screenEnum["MD"] = 768] = "MD";
    screenEnum[screenEnum["LG"] = 960] = "LG";
    screenEnum[screenEnum["XL"] = 1280] = "XL";
    screenEnum[screenEnum["XXL"] = 1536] = "XXL";
})(screenEnum || (screenEnum = {}));
const screenMap = new Map();
screenMap.set(sizeEnum.XS, screenEnum.XS);
screenMap.set(sizeEnum.SM, screenEnum.SM);
screenMap.set(sizeEnum.MD, screenEnum.MD);
screenMap.set(sizeEnum.LG, screenEnum.LG);
screenMap.set(sizeEnum.XL, screenEnum.XL);
screenMap.set(sizeEnum.XXL, screenEnum.XXL);
export { screenMap };
