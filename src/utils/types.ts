export type Mode = "ORIGINAL" | "BW" | "RANDOM" | "SORTED";

export type SortType = "HUE" | "BRIGHTNESS";

export type Col = {
  r: number;
  g: number;
  b: number;
};

export type ImgObject = {
  title: string;
  path?: string;
  data?: string;
};

export type SortParameters = {
  threshold: number;
  invert: boolean;
  sortType: SortType;
  imgSize: number;
};