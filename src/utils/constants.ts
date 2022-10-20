import type { Mode, ImgObject, SortType } from "./types";

export const MODES: Mode[] = ["BW", "ORIGINAL", "RANDOM", "SORTED"];
export const SORT_TYPES: SortType[] = ["BRIGHTNESS", "HUE"];

export const IMAGES: ImgObject[] = [
  { title: "Beach", path: "src/assets/beach.jpg" },
  { title: "Dunes", path: "src/assets/dunes.jpg" },
  { title: "Waterfall", path: "src/assets/waterfall.jpg" },
  { title: "Orange Kiss", path: "src/assets/plant.jpg" },
  { title: "Mario Pixel Art", path: "src/assets/mario.png" },
  { title: "Tokyo", path: "src/assets/tokyo.jpg" },
  { title: "Venice", path: "src/assets/venice.jpg" },
];
