interface IMessage {
  type: "message" | "response" | "error";
  data: {
    [key: string]: string | number | boolean | object;
  };
}

class IframeCommunicator {
  private iframe: HTMLIFrameElement | null = null;

  private url: string | null = null;

  private type: string | null = null;

  constructor() {

    // 页面卸载时自动移除 iframe
    window.addEventListener("beforeunload", () => this.destroy());
  }

  createIframe(url: string): HTMLIFrameElement {

    this.url = url;

    this.iframe = document.createElement("iframe");

    Object.assign(this.iframe.style, {
      width: "1px",
      height: "1px",
      display: "none",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-1",
      border: "none",
      background: "transparent",
      pointerEvents: "none",
      opacity: "0",
      visibility: "hidden"
    });

    this.iframe.src = url;

    document.body.append(this.iframe);

    return this.iframe;
  }

  postMessage(message: IMessage): void {

    if (this.iframe) {
      this.iframe.contentWindow?.postMessage(message, this.url || "*");
      this.type = message.type;
    }
  }

  onMessage(callback: (message: IMessage) => void): void {
    window.addEventListener("message", event => {
      // eslint-disable-next-line no-console
      console.log(this.type);

      if (event.data.type !== "message") {
        return;
      }

      callback(event.data);
    });
  }

  removeMessageListener(callback: (event: MessageEvent) => void): void {
    window.removeEventListener("message", callback);
  }

  destroy(): void {
    if (this.iframe) {
      this.iframe?.remove();
      this.iframe = null;
    }
  }
}

export default IframeCommunicator;
