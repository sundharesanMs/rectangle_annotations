import { Stage, Layer, Rect, Transformer, Image as KonvaImage } from "react-konva";
import { useEffect, useRef, useState } from "react";
import useImage from "use-image";
import images from "./sampleImage.jpg"

export default function Canvas({ mode, selectedId, setSelectedId }) {
  const [rectangles, setRectangles] = useState([]);
  const [drawingRect, setDrawingRect] = useState(null);

  const layerRef = useRef(null);
  const transformerRef = useRef(null);

  // 🔹 Load background image
  const image_url = "images"; 
  const [image] = useImage(images);

  // 🔹 Attach transformer to selected rectangle
  useEffect(() => {
    if (!selectedId) {
      transformerRef.current.nodes([]);
      return;
    }

    const node = layerRef.current.findOne(`#${selectedId}`);
    if (node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, rectangles]);

  return (
    <Stage
      width={900}
      height={500}
      className="stage"
      onMouseDown={(e) => {
        if (mode !== "draw") return;
        if (e.target !== e.target.getStage()) return;

        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();

        setDrawingRect({
          id: Date.now().toString(),
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
        });
      }}
      onMouseMove={(e) => {
        if (!drawingRect) return;

        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();

        setDrawingRect({
          ...drawingRect,
          width: pos.x - drawingRect.x,
          height: pos.y - drawingRect.y,
        });
      }}
      onMouseUp={() => {
        if (!drawingRect) return;

        setRectangles([...rectangles, drawingRect]);
        setDrawingRect(null);
      }}
    >
      <Layer ref={layerRef}>
        {/* 🖼️ Background Image */}
        <KonvaImage
          image={image}
          x={0}
          y={0}
          width={900}
          height={500}
          listening={false}
        />

        {/* 🟦 Saved Rectangles */}
        {rectangles.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            {...rect}
            stroke={rect.id === selectedId ? "red" : "blue"}
            strokeWidth={2}
            draggable={mode === "select"}
            onClick={() => mode === "select" && setSelectedId(rect.id)}
            onDragEnd={(e) => {
              const updated = rectangles.map((r) =>
                r.id === rect.id
                  ? { ...r, x: e.target.x(), y: e.target.y() }
                  : r
              );
              setRectangles(updated);
            }}
            onTransformEnd={(e) => {
              const node = e.target;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              node.scaleX(1);
              node.scaleY(1);

              const updated = rectangles.map((r) =>
                r.id === rect.id
                  ? {
                      ...r,
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(10, node.width() * scaleX),
                      height: Math.max(10, node.height() * scaleY),
                    }
                  : r
              );
              setRectangles(updated);
            }}
          />
        ))}

        {/* 🟩 Currently Drawing Rectangle */}
        {drawingRect && (
          <Rect
            {...drawingRect}
            stroke="green"
            strokeWidth={2}
            dash={[6, 4]}
          />
        )}

        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );
}
