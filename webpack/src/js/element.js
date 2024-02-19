// import "style-loader!css-loader!../css/box.css"
import "../css/box.css"
import "../css/img.css"
import three from "../img/three.jpg"
import "../font/iconfont.css"

const div = document.createElement("div");
div.className = "box";
div.innerText = "你好世界！ 明天会更好"

// 加入背景图
const bgdiv = document.createElement("div");
bgdiv.className = "bg-img";

const imgdiv = document.createElement("img");
imgdiv.className = "img";
imgdiv.src = three

const text = document.createElement("p");
text.className = "iconfont icon-ashbin icon-caps-lock"

document.body.appendChild(div);
document.body.appendChild(bgdiv);
document.body.appendChild(imgdiv);
document.body.appendChild(text);


console.log("啦啦啦啦11111");