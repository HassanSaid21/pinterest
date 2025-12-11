import { create } from "zustand";

const useEditoreStore = create((set) => ({
  selectedLayer: "canvas",
  textOptions: {
    text: "",
    fontSize: 48,
    color: "#000000",
    top: 0,
    left: 0,
  },
  canvasOptions: {
    height: 0,
    orientation: "",
    backgroundColor: "#008080",
    size: "original",
  },
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  setTextOptions: (newOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: "Add Text",
        fontSize: 48,
        color: "#000000",
        top: 38,
        left: 0,
      },
    }),
  setCanvasOptions: (newOptions) => set({ canvasOptions: newOptions }),

  resetStore: () => {
    set({
      textOptions: {
        text: "",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0,
      },
      selectedLayer :'canvas' ,
      canvasOptions :   {
        height: 0,
        orientation: "",
        backgroundColor: "#008080",
        size: "original",
      },
    });
  },
}));

export default useEditoreStore;
