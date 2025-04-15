// 定义消息提示的选项类型
interface IMessageOptions {
  message: string;                // 提示内容
  type?: "success" | "warning" | "info" | "error"; // 提示类型，默认为 info
  duration?: number;              // 显示时间，单位毫秒，默认为 2000 毫秒
}

// 使用类封装消息提示的方法
const DomMessage = {

  // 静态方法，直接通过 ElMessage.message 调用
  message(options: IMessageOptions): void {

    // 创建提示容器
    const container = document.createElement("div");

    container.innerText = options.message;

    // 设置基础样式
    Object.assign(container.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      borderRadius: "4px",
      fontSize: "14px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
      opacity: "1",
      transition: "opacity 0.5s"
    });

    // 根据不同类型设置不同的背景和文字颜色
    switch (options.type) {
      case "success": {
        container.style.backgroundColor = "#f0f9eb";
        container.style.color = "#67c23a";

        break;
      }
      case "warning": {
        container.style.backgroundColor = "#fdf6ec";
        container.style.color = "#e6a23c";

        break;
      }
      case "error": {
        container.style.backgroundColor = "#fef0f0";
        container.style.color = "#f56c6c";

        break;
      }
      default: {

        // info 或未传 type 时默认处理
        container.style.backgroundColor = "#f5f7fa";
        container.style.color = "#909399";

        break;
      }
    }

    // 将提示添加到页面中
    document.body.append(container);

    // 设置显示时间，默认 2000 毫秒
    const displayDuration = options.duration ?? 2000;

    // 在指定时间后淡出提示，并移除 DOM 元素
    setTimeout(() => {
      container.style.opacity = "0";

      // 等待过渡动画结束后移除该提示
      setTimeout(() => {
        container.remove();
      }, 500);
    }, displayDuration);
  }
};

export default DomMessage;
