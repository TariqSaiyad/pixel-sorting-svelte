<script lang="ts">
  import type { ImgObject, SortType } from "$utils/types";
  import { getBrightness, getHue } from "$utils/utils";
  import type { Image } from "p5";
  import P5, { type Sketch } from "p5-svelte";
  export let selected: ImgObject;
  export let imgWidth = 300;
  export let imgHeight = 300;

  export let sortType: SortType = "BRIGHTNESS";
  export let threshold: number;
  export let direction = false;

  let sketch: Sketch = (p5) => {
    let img: Image;
    let bwImg: Image;
    let selectedTitle = selected.title;

    p5.preload = () => {
      let file = selected.path ?? selected.data;
      img = p5.loadImage(file);
      bwImg = p5.loadImage(file);
    };

    p5.setup = () => reset();

    function reset() {
      p5.disableFriendlyErrors = true;
      p5.createCanvas(imgWidth, imgHeight);
      img.resize(imgWidth, imgHeight);
      bwImg.resize(imgWidth, imgHeight);
      img.loadPixels();
      bwImg.loadPixels();

      p5.frameRate(30);
      p5.loop();
    }

    p5.draw = () => {
      // reset sketch.
      if (selected.title !== selectedTitle) {
        selectedTitle = selected.title;
        let file = selected.path ?? selected.data;
        p5.noLoop();
        img = p5.loadImage(file, () => (bwImg = p5.loadImage(file, reset)));
      }

      let rT, gT, bT, bright;

      for (let x = 0; x < img.height; x++) {
        for (let y = 0; y < img.width; y++) {
          let index = 4 * (x * img.width + y);
          rT = img.pixels[index];
          gT = img.pixels[index + 1];
          bT = img.pixels[index + 2];

          bright =
            sortType === "HUE" ? getHue(rT, gT, bT) : getBrightness(rT, gT, bT);

          if (direction ? bright > threshold : bright < threshold) {
            bwImg.pixels[index] = 255;
            bwImg.pixels[index + 1] = 255;
            bwImg.pixels[index + 2] = 255;
          } else {
            bwImg.pixels[index] = 0;
            bwImg.pixels[index + 1] = 0;
            bwImg.pixels[index + 2] = 0;
          }
        }
      }
      bwImg.updatePixels();
      p5.image(bwImg, 0, 0);
    };
  };
</script>

<div class="image-preview">
  <P5 {sketch} />
</div>

<style lang="scss">
  .image-preview {
    padding: 1rem;
  }
</style>
