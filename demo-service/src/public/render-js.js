(function () {
    const div = document.createElement("div");
    div.innerText = "引入了一个自运行的js.html";

    const body = document.body;
    body.appendChild(div);
})()