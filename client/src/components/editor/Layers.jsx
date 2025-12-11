import useEditorStore from "../../utils/editorStore";
import ImageKit from "../imageKit/ImageKit";

export default function Layers() {
  const { selectedLayer, setSelectedLayer, addText, canvasOptions } =
    useEditorStore();
  function handleSelect(layer) {
    setSelectedLayer(layer);
    if (layer === "text") {
      addText();
    }
  }

  return (
    <div className="layers">
      <div className="kayersTitle">
        <h3>Layers</h3>
        <p>Select a layer to edit</p>
      </div>
      <div
        onClick={() => handleSelect("text")}
        className={`layer ${selectedLayer === "text" ? "selected" : ""}`}
      >
        <div className="layerImg">
          <ImageKit src="/general/text.png" alt="text" />
        </div>
        <span> Add Text</span>
      </div>
      <div
        onClick={() => handleSelect("canvas")}
        className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}
      >
        <div
          className="layerImg"
          style={{ backgroundColor: canvasOptions.backgroundColor }}
        />
        <span> Canvas</span>
      </div>
    </div>
  );
}
