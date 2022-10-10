import type { Image } from "p5";
import type { Col } from "./types";

export function getBrightness(r: number, g: number, b: number) {
  return Math.sqrt(
    Math.pow(0.299 * r, 2) + Math.pow(0.587 * g, 2) + Math.pow(0.114 * b, 2)
  );
}

export function getHue(r: number, g: number, b: number) {
  let min = Math.min(Math.min(r, g), b);
  let max = Math.max(Math.max(r, g), b);

  if (min == max) return 0;

  let hue = 0.0;
  if (max == r) hue = (g - b) / (max - min);
  else if (max == g) hue = 2.0 + (b - r) / (max - min);
  else hue = 4.0 + (r - g) / (max - min);

  hue = hue * 60;
  if (hue < 0) hue = hue + 360;

  return Math.round(hue);
}

export function imageToBW(
  img: Image,
  bwImg: Image,
  threshold: number,
  mode: "Hue" | "Brightness" = "Brightness"
) {
  let bwArr: number[] = [];
  let numBlack: number[] = [];
  let count = 0;

  for (let x = 0; x < img.height; x++) {
    for (let y = 0; y < img.width; y++) {
      let index = 4 * (x * img.width + y);
      const r = img.pixels[index];
      const g = img.pixels[index + 1];
      const b = img.pixels[index + 2];

      // const bright = (r + g + b) / 3;
      // const bright = (0.299 * r) + (0.587 * g) + (0.114 * b);
      // const bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const bright = mode == "Hue" ? getHue(r, g, b) : getBrightness(r, g, b);

      // Test the brightness against the threshold
      // if (bright > threshold) {
      //   bwArr.push(255);
      //   bwArr.push(255);
      //   bwArr.push(255);
      // } else {
      //   bwArr.push(0);
      //   bwArr.push(0);
      //   bwArr.push(0);
      //   count++;
      // }
      if (bright > threshold) {
        bwImg.pixels[index] = 255;
        bwImg.pixels[index + 1] = 255;
        bwImg.pixels[index + 2] = 255;
      } else {
        bwImg.pixels[index] = 0;
        bwImg.pixels[index + 1] = 0;
        bwImg.pixels[index + 2] = 0;
        count++;
      }
    }

    numBlack.push(count);
    count = 0;
  }

  bwImg.updatePixels()

  return {
    bwArr,
    numBlack,
  };
}
