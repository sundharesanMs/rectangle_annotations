import Canvas from "./canvas";
import Toolbar from "./Toolbar";
import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("draw"); // draw | select
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <Toolbar mode={mode} setMode={setMode} />
      <Canvas
        mode={mode}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}
