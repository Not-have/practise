import {
  JSX,
  useCallback,
  useMemo
} from "react";

import {
  IframeCommunicator
} from "../../utils";

export default function DemoIframeMessage(): JSX.Element {
  const url = "http://localhost:5173/";

  const iframeMessage = useMemo(() => {
    const communicator = new IframeCommunicator();

    communicator.createIframe(url);

    return communicator;
  }, [url]);

  // const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick = useCallback(() => {

    iframeMessage.postMessage({
      type: "message",
      data: {
        name: "hello",
        age: 18
      }
    });

    // if (iframeRef.current && iframeRef.current.contentWindow) {
    //   const message = {
    //     type: "message",
    //     data: {
    //       name: "hello",
    //       age: 18
    //     }
    //   };

    //   iframeRef.current.contentWindow?.postMessage(message, url);
    // }
  }, [iframeMessage]);

  return <div>
    <p>iframe 通信</p>
    <button onClick={handleClick}>传值</button>
    {/* <iframe
      frameBorder="0"
      ref={iframeRef}
      src={url} /> */}
  </div>;
}
