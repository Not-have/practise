import {
  useHistory
} from "@mt-kit/react-hooks";
import React, {
  useCallback
} from "react";

export default function TestUseHistory(): React.ReactElement {

  const {
    push,
    replace
  } = useHistory();

  const handlePush = useCallback(() => {
    push("/home", {
      search: "?param=value",
      hash: "#section"
    });
  }, [push]);

  const handleReplace = useCallback(() => {
    replace("/home");
  }, [replace]);

  return <div>
    <p>useHistory 的使用</p>
    <button onClick={handlePush}>Push Current Page</button>
    <button onClick={handleReplace}>Replace Current Page</button>
  </div>;
}
