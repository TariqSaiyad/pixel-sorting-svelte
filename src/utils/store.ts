// store.js
import { writable, type Writable } from "svelte/store";
import type { SortParameters } from "./types";


export const sortParams: Writable<SortParameters> = writable({
  threshold: 44,
  invert: true,
  sortType: "BRIGHTNESS",
  imgSize: 400,
});
