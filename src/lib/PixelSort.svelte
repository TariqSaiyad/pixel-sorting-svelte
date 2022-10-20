<script lang="ts">
  import { MODES } from "$utils/constants";
  import { sortParams } from "$utils/store";
  import type { Col, ImgObject, Mode } from "$utils/types";
  import { getBrightness, getHue } from "$utils/utils";
  import type { Image, Renderer } from "p5";
  import P5, { type Sketch } from "p5-svelte";
  import { createEventDispatcher } from "svelte";

  $: ({ imgSize, invert, sortType, threshold } = $sortParams);

  export let selected: ImgObject;
  const dispatch = createEventDispatcher();

  const sketch: Sketch = (p5) => {
    //! TODO: Enable
    p5.disableFriendlyErrors = true;
    let canvas: Renderer;
    const imageName = selected.path ?? selected.data;
    const fileName = `${selected.title}_${sortType}_${threshold}`;
    let img: Image, bwImg: Image, sortedImg: Image, randomImg: Image;

    let INTERVAL_LEN = 0;
    let counter = 0;
    let current: Mode = "SORTED";
    let done = false;

    let r, g, b;
    let rb, gb, bb;
    let i = 0;

    let random: Col = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    };

    let temp: Col[] = [];
    let tempRandom: Col[] = [];

    let tempIndex: number[] = [];

    let numBlack: number[] = [];

    p5.preload = () => {
      img = p5.loadImage(imageName);
      bwImg = p5.loadImage(imageName);
      sortedImg = p5.loadImage(imageName);
      randomImg = p5.loadImage(imageName);
    };

    p5.setup = () => {
      img.resize(imgSize, imgSize);
      bwImg.resize(imgSize, imgSize);
      sortedImg.resize(imgSize, imgSize);
      randomImg.resize(imgSize, imgSize);

      img.loadPixels();
      bwImg.loadPixels();
      sortedImg.loadPixels();
      randomImg.loadPixels();

      canvas = p5.createCanvas(imgSize, imgSize);
      p5.frameRate(120);
      p5.pixelDensity(1);

      let rT, gT, bT, bright;

      let count = 0;
      for (let x = 0; x < img.height; x++) {
        for (let y = 0; y < img.width; y++) {
          let index = 4 * (x * img.width + y);
          rT = img.pixels[index];
          gT = img.pixels[index + 1];
          bT = img.pixels[index + 2];

          // const bright = getHue(r);
          // const bright = (r + g + b) / 3;
          bright = getBrightness(rT, gT, bT);
          // const bright = (0.299 * r) + (0.587 * g) + (0.114 * b);
          // const bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // Test the brightness against the threshold

          if (invert ? bright > threshold : bright < threshold) {
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

      INTERVAL_LEN = numBlack[counter];
      bwImg.updatePixels();

      p5.image(img, 0, 0);

      p5.loadPixels();
      p5.updatePixels();
    };

    p5.keyPressed = () => {
      if (p5.key == "s") p5.saveCanvas(canvas, fileName, "png");

      if (p5.key == "b") {
        const newI = (MODES.indexOf(current) + 1) % MODES.length;
        current = MODES[newI];
        console.log(current);
        p5.loop();
      }
    };

    p5.draw = () => {
      if (current === "ORIGINAL") {
        p5.image(img, 0, 0);
        p5.noLoop();
      }
      if (current === "BW") {
        p5.image(bwImg, 0, 0);
        p5.noLoop();
      }
      if (current === "RANDOM") {
        p5.image(randomImg, 0, 0);
        p5.noLoop();
      }

      if (current === "SORTED") {
        if (done) {
          p5.image(sortedImg, 0, 0);
          p5.noLoop();
        } else {
          for (let j = 0; j < 1000; j++) {
            if (temp.length === INTERVAL_LEN) {
              counter++;
              INTERVAL_LEN = numBlack[counter];

              random = {
                r: Math.random() * 255,
                g: Math.random() * 255,
                b: Math.random() * 255,
              };

              if (sortType == "BRIGHTNESS") {
                temp.sort(
                  (a, b) =>
                    getBrightness(b.r, b.g, b.b) - getBrightness(a.r, a.g, a.b)
                );
              } else {
                temp.sort(
                  (a, b) => getHue(a.r, a.g, a.b) - getHue(b.r, b.g, b.b)
                );
              }

              for (let ti = 0; ti < temp.length; ti++) {
                p5.pixels[tempIndex[ti]] = temp[ti].r;
                p5.pixels[tempIndex[ti] + 1] = temp[ti].g;
                p5.pixels[tempIndex[ti] + 2] = temp[ti].b;

                randomImg.pixels[tempIndex[ti]] = tempRandom[ti].r;
                randomImg.pixels[tempIndex[ti] + 1] = tempRandom[ti].g;
                randomImg.pixels[tempIndex[ti] + 2] = tempRandom[ti].b;
              }
              temp = [];
              tempRandom = [];
              tempIndex = [];
            }

            if (i === img.pixels.length) {
              p5.noLoop();
              p5.updatePixels();
              sortedImg.pixels = [...p5.pixels];

              sortedImg.updatePixels();
              randomImg.updatePixels();
              console.log("STOPPED");
              done = true;
              dispatch("complete");
              break;
            }

            r = img.pixels[i];
            g = img.pixels[i + 1];
            b = img.pixels[i + 2];

            rb = bwImg.pixels[i];
            gb = bwImg.pixels[i + 1];
            bb = bwImg.pixels[i + 2];

            if (rb === 255 && gb === 255 && bb === 255) {
              // randomPixels[i] = r;
              // randomPixels[i + 1] = g;
              // randomPixels[i + 2] = b;
              i += 4;
              continue;
            } else {
              temp.push({ r, g, b });
              tempRandom.push({ r: random.r, g: random.g, b: random.b });
              tempIndex.push(i);
            }

            randomImg.updatePixels();
            p5.updatePixels();
            i += 4;
          }
        }
      }
    };
  };
</script>

<P5 {sketch} />
