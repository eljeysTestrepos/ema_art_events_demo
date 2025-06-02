import { create } from "zustand";
const useStoredImages = create((set, get) => ({
  items: [],
  setStoredImages: () => set((state) => {}),
  getStoredImages: (selectedImages) =>
    get((state) => {
      console.log(
        "zustand: kuratorFormStore: ",
        state,
        "selectedImages",
        selectedImages
      );
    }),
}));
