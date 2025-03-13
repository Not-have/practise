import {
  test01Fetch
} from "@/fetch";
import {
  useEffect
} from "react";

function Demo01(): React.ReactElement {
  useEffect(() => {
    test01Fetch().then(res => {
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }, []);

  return (
    <>
      demo01
    </>
  );
}

export default Demo01;
