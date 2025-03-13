import {
  ScLineText
} from "@/rc";
import React, {
  useLayoutEffect,
  useState,
  useRef
} from "react";

export default function TestUseLayoutEffect(): React.ReactElement {
  const [width, setWidth] = useState(0);

  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      const {
        clientWidth
      } = divRef.current;

      setWidth(() => clientWidth);
    }
  }, [divRef]);

  return <>
    <ScLineText children="useLayoutEffect" />

    <dl>
      <dt>注意事项</dt>
      <dd>由于 useLayoutEffect 是同步执行的，它会阻塞页面的渲染，因此应谨慎使用，避免在其中进行耗时的操作。</dd>
      <dd>如果你的操作不需要在 DOM 绘制之前完成，建议使用 useEffect 以避免性能问题。</dd>

      <dt>
        <div ref={divRef}
          style={{
            width: "200px",
            height: "100px",
            backgroundColor: "lightblue"
          }}>
          这是一个示例 div
        </div>
      </dt>

      <dd>
        这个 div 的宽度是:
        {width}
        px
      </dd>
    </dl>
  </>;
}
