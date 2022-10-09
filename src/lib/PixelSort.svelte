<script lang="ts">
  import type { Color, Image, Renderer } from "p5";
  import P5, { type Sketch } from "p5-svelte";

  type Mode = "ORIGINAL" | "BW" | "RANDOM" | "SORTED";

  const MODES: Mode[] = ["BW", "ORIGINAL", "RANDOM", "SORTED"];
  // const MODES: Mode[] = [Mode.BW, Mode.ORIGINAL, Mode.RANDOM, Mode.SORTED];

  type Col = {
    r: number;
    g: number;
    b: number;
  };

  const sketch: Sketch = (p5) => {
    let canvas: Renderer;
    // const fileName = "src/assets/img1-small.jpg";
    const fileName = "src/assets/mario-2-small.png";
    let img: Image, bwImg: Image, sortedImg: Image, randomImg: Image;
    let direction = 1; //* 0 or 1
    let threshold = 70; //* 120-170
    let INTERVAL_LEN = 0;
    let counter = 0;
    let current: Mode = "SORTED";
    let done = false;

    let r, g, b;
    let rb, gb, bb;
    let i = 0;

    let random: Col = {
      r: p5.random(255),
      g: p5.random(255),
      b: p5.random(255),
    };

    let temp: Col[] = [];
    let tempRandom: Col[] = [];

    let tempIndex: number[] = [];

    let numBlack: number[] = [];

    p5.preload = () => {
      p5.pixelDensity(1);

      img = p5.loadImage(fileName);
      bwImg = p5.loadImage(fileName);
      sortedImg = p5.loadImage(fileName);
      randomImg = p5.loadImage(fileName);
    };

    p5.keyPressed = () => {
      if (p5.key == "s") p5.saveCanvas(canvas, "test", "png");

      if (p5.key == "b") {
        const newI = (MODES.indexOf(current) + 1) % MODES.length;
        current = MODES[newI];
        p5.loop();
      }
    };

    p5.setup = () => {
      img.loadPixels();
      bwImg.loadPixels();
      sortedImg.loadPixels();
      randomImg.loadPixels();
      canvas = p5.createCanvas(img.width, img.height);
      p5.frameRate(120);

      let count = 0;
      for (let x = 0; x < img.height; x++) {
        for (let y = 0; y < img.width; y++) {
          let index = 4 * (x * img.width + y);
          const r = img.pixels[index];
          const g = img.pixels[index + 1];
          const b = img.pixels[index + 2];

          // const bright = getHue(r);
          // const bright = (r + g + b) / 3;
          const bright = getBrightness(r, g, b);
          // const bright = (0.299 * r) + (0.587 * g) + (0.114 * b);
          // const bright = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // Test the brightness against the threshold

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
      INTERVAL_LEN = numBlack[counter];

      bwImg.updatePixels();
      p5.image(img, 0, 0);

      p5.loadPixels();
      p5.updatePixels();
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
                r: p5.random(255),
                g: p5.random(255),
                b: p5.random(255),
              };

              temp.sort(
                (a, b) =>
                  getBrightness(b.r, b.g, b.b) - getBrightness(a.r, a.g, a.b)
              );
              // temp.sort((a, b) => getHue(a) - getHue(b));

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
              break;
            }

            r = img.pixels[i];
            g = img.pixels[i + 1];
            b = img.pixels[i + 2];

            rb = bwImg.pixels[i];
            gb = bwImg.pixels[i + 1];
            bb = bwImg.pixels[i + 2];

            if (
              rb === direction * 255 &&
              gb === direction * 255 &&
              bb === direction * 255
            ) {
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

  function getHue({ r, g, b }: Col) {
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

  function getBrightness(r: number, g: number, b: number) {
    return Math.sqrt(
      Math.pow(0.299 * r, 2) + Math.pow(0.587 * g, 2) + Math.pow(0.114 * b, 2)
    );
    // return (r + b + g) / 3;
  }
</script>

<P5 {sketch} />
