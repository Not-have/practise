const obj = {
    name: "里斯",
    age: 16
};

const newObject1 = Object.entries(obj);
console.log(newObject1);

// Object.fromEntries 自我感觉，根本用不到
const newObject2 = Object.fromEntries(newObject1);
console.log(newObject2);

console.log("________________应用场景（转换 url 中的参数为对象格式）________________");
const queryString = "wd=test&pn=200";
const queryParams = new URLSearchParams(queryString);

for (const param of queryParams) {
    console.log(param);
}

const  paramsObj = Object.fromEntries(queryParams);
console.log(paramsObj);