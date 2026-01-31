export default function Toolbar({ mode, setMode }) {
  return (
    <div className="toolbar">
      <button
        className={mode === "draw" ? "active" : ""}
        onClick={() => setMode("draw")}
      >
        Draw
      </button>

      <button
        className={mode === "select" ? "active" : ""}
        onClick={() => setMode("select")}
      >
        Select
      </button>
    </div>
  );
}
