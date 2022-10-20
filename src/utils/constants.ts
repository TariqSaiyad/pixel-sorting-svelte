import type { Mode, ImgObject, SortType } from "./types";

export const MODES: Mode[] = ["BW", "ORIGINAL", "RANDOM", "SORTED"];
export const SORT_TYPES: SortType[] = ["BRIGHTNESS", "HUE"];

export const IMAGES: ImgObject[] = [
  { title: "Beach", path: "public/images/beach.jpg" },
  { title: "Dunes", path: "public/images/dunes.jpg" },
  { title: "Waterfall", path: "public/images/waterfall.jpg" },
  { title: "Orange Kiss", path: "public/images/plant.jpg" },
  { title: "Mario Pixel Art", path: "public/images/mario.png" },
  { title: "Tokyo", path: "public/images/tokyo.jpg" },
  { title: "Venice", path: "public/images/venice.jpg" },
];
