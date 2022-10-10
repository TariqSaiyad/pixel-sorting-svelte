export type Mode = "ORIGINAL" | "BW" | "RANDOM" | "SORTED";

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
