/* eslint-disable no-console */
import React, {
  useCallback
} from "react";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

const fpPromise = FingerprintJS.load();

import {
  getDeviceFingerprint
} from "../../utils";

export default function DemoDevice(): React.ReactElement {

  const handleClick = useCallback(() => {
    getDeviceFingerprint().then(res => {
      console.log(res, "getDeviceFingerprint");
    });
  }, []);

  const handleFingerprintJS = useCallback(() => {
    fpPromise.then(fp => fp.get()).
        then(result => {
          const {
            visitorId
          } = result;

          console.log("visitorId:", visitorId, "result:", result);
        });
  }, []);

  return <div>
    <br />
    <button onClick={handleClick}>获取设备指纹</button>
    <br />
    <br />
    <button onClick={handleFingerprintJS}>获取设备指纹 FingerprintJS</button>
  </div>;
}
