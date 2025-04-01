import {
  ScLineText
} from "@/rc";
import React, {
  useId
} from "react";

export default function TestUseId(): React.ReactElement {

  const id1 = useId();

  const id2 = useId();

  const id3 = useId();

  const id4 = useId();

  return <div>
    <ScLineText children="useId" />

    <dl>
      <dt>不会重复的 🆔</dt>
      {id1}
      <br />
      {id2}
      <br />
      {id3}
      <br />
      {id4}
    </dl>
  </div>;
}
