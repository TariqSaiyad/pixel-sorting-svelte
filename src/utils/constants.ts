import type { Mode, ImgObject, SortType } from "./types";

export const MODES: Mode[] = ["BW", "ORIGINAL", "RANDOM", "SORTED"];
export const SORT_TYPES: SortType[] = ["BRIGHTNESS", "HUE"];

export const IMAGES: ImgObject[] = [
  { title: "Beach", path: "/beach.jpg" },
  { title: "Dunes", path: "/dunes.jpg" },
  { title: "Waterfall", path: "/waterfall.jpg" },
  { title: "Orange Kiss", path: "/plant.jpg" },
  { title: "Mario Pixel Art", path: "/mario.png" },
  { title: "Tokyo", path: "/tokyo.jpg" },
  { title: "Venice", path: "/venice.jpg" },
];
