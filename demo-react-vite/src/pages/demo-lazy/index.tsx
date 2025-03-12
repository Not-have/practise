import React, {
  lazy,
  Suspense
} from "react";

const MyComponent = lazy(() => import("./MyComponent"));

export default function DemoLazy(): React.ReactElement {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
