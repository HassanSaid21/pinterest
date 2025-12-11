import { useState, useRef, useEffect } from "react";
import useEditorStore from "../../utils/editorStore";
import { HexColorPicker } from "react-colorful";

// --- Aspect Ratios ---
const portraitSizes = [
{ name: "1:2", width: 1, height: 2 },
{ name: "9:16", width: 9, height: 16 },
{ name: "2:3", width: 2, height: 3 },
{ name: "3:4", width: 3, height: 4 },
{ name: "4:5", width: 4, height: 5 },
{ name: "1:1", width: 1, height: 1 },
];

const landscapeSizes = [
{ name: "2:1", width: 2, height: 1 },
{ name: "16:9", width: 16, height: 9 },
{ name: "3:2", width: 3, height: 2 },
{ name: "4:3", width: 4, height: 3 },
{ name: "5:4", width: 5, height: 4 },
{ name: "1:1", width: 1, height: 1 },
];

// --- Utility: Calculate height for fixed width ---
const FIXED_WIDTH = 375;
const calcHeight = (w, h) => (FIXED_WIDTH * h) / w;

// ---------------------------------------------

export default function Options({ previewImg }) {
  const {
    textOptions,
    setTextOptions,
    selectedLayer,
    canvasOptions,
    setCanvasOptions,
  } = useEditorStore();

const [openPicker, setOpenPicker] = useState(null); // "text" | "canvas" | null

const pickerRef = useRef();

// Close picker when clicking outside
useEffect(() => {
function handleClickOutside(e) {
if (pickerRef.current && !pickerRef.current.contains(e.target)) {
setOpenPicker(null);
}
}
document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const originalOrientation =
previewImg.width < previewImg.height ? "portrait" : "landscape";

// --- Orientation Change ---
const handleOrientation = (orientation) => {
const isSame = originalOrientation === orientation;


const newHeight = isSame
  ? calcHeight(previewImg.width, previewImg.height)
  : calcHeight(previewImg.height, previewImg.width);

setCanvasOptions({
  ...canvasOptions,
  orientation,
  size: "original",
  height: newHeight,
});
setOpenPicker(null);


};

// --- Size Change ---
const handleSize = (size) => {
let newHeight;


if (size === "original") {
  const isSame = originalOrientation === canvasOptions.orientation;
  newHeight = isSame
    ? calcHeight(previewImg.width, previewImg.height)
    : calcHeight(previewImg.height, previewImg.width);
} else {
  newHeight = calcHeight(size.width, size.height);
}

setCanvasOptions({
  ...canvasOptions,
  size: size === "original" ? "original" : size.name,
  height: newHeight,
});

setOpenPicker(null);


};

return ( <div className="options">
{/* TEXT EDIT OPTIONS */}
{selectedLayer === "text" ? (
<>
{/* Font Size */} <div className="editingOption"> <span>Font Size</span>
<input
type="number"
value={textOptions.fontSize}
onChange={(e) =>
setTextOptions({
...textOptions,
fontSize: Number(e.target.value),
})
}
/> </div>

      {/* Text Color */}
      <div className="editingOption">
        <span>Color</span>
        <div className="textColor">
          <div
            className="previewColor"
            style={{ backgroundColor: textOptions.color }}
            onClick={() =>
              setOpenPicker(openPicker === "text" ? null : "text")
            }
          />
          {openPicker === "text" && (
            <div className="colorPicker" ref={pickerRef}>
              <HexColorPicker
                color={textOptions.color}
                onChange={(c) =>
                  setTextOptions({ ...textOptions, color: c })
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Orientation */}
      <div className="editingOption">
        <span>Orientation</span>
        <div className="orientations">
          <div
            onClick={() => handleOrientation("portrait")}
            className={`orientation ${
              canvasOptions.orientation === "portrait" ? "selected" : ""
            }`}
          >
            P
          </div>
          <div
            onClick={() => handleOrientation("landscape")}
            className={`orientation ${
              canvasOptions.orientation === "landscape" ? "selected" : ""
            }`}
          >
            L
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="editingOption">
        <span>Sizes</span>
        <div className="sizes">
          <div
            onClick={() => handleSize("original")}
            className={`size ${
              canvasOptions.size === "original" ? "selected" : ""
            }`}
          >
            original
          </div>

          {(canvasOptions.orientation === "portrait"
            ? portraitSizes
            : landscapeSizes
          ).map((size) => (
            <div
              key={size.name}
              onClick={() => handleSize(size)}
              className={`size ${
                canvasOptions.size === size.name ? "selected" : ""
              }`}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Background */}
      <div className="editingOption">
        <span>Background Color</span>
        <div className="textColor">
          <div
            className="previewColor"
            style={{ backgroundColor: canvasOptions.backgroundColor }}
            onClick={() =>
              setOpenPicker(openPicker === "canvas" ? null : "canvas")
            }
          />

          {openPicker === "canvas" && (
            <div className="colorPicker" ref={pickerRef}>
              <HexColorPicker
                color={canvasOptions.backgroundColor}
                onChange={(c) =>
                  setCanvasOptions({
                    ...canvasOptions,
                    backgroundColor: c,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  )}
</div>


);
}
