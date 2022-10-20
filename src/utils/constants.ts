import type { Mode, ImgObject, SortType } from "./types";

export const MODES: Mode[] = ["BW", "ORIGINAL", "RANDOM", "SORTED"];
export const SORT_TYPES: SortType[] = ["BRIGHTNESS", "HUE"];

export const IMAGES: ImgObject[] = [
  { title: "Beach", path: "/images/beach.jpg" },
  { title: "Dunes", path: "/images/dunes.jpg" },
  { title: "Waterfall", path: "/images/waterfall.jpg" },
  { title: "Orange Kiss", path: "/images/plant.jpg" },
  { title: "Mario Pixel Art", path: "/images/mario.png" },
  { title: "Tokyo", path: "/images/tokyo.jpg" },
  { title: "Venice", path: "/images/venice.jpg" },
];
