
export default function One() {
  return (
    <div className="w-full h-full flex-1 flex flex-col min-h-0">
      <div className="flex-1 relative">
        {/* @ts-ignore */}
        <micro-app
          name="child-app"
          url="http://localhost:5175/"
          baseroute="/one"
        />
      </div>
    </div>
  );
}
