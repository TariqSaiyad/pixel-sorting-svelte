<script lang="ts">
  import PixelSort from "./lib/PixelSort.svelte";
  import type { ImgObject } from "$utils/types";
  import { IMAGES } from "$utils/constants";
  import ImageButton from "$lib/ImageButton.svelte";
  import ImagePreview from "$lib/ImagePreview.svelte";

  let threshold = 70;
  let selected: ImgObject = IMAGES.at(0);
</script>

<main>
  <div>
    <ul class="image-buttons">
      {#each IMAGES as image}
        <li>
          <ImageButton
            on:click={() => (selected = image)}
            selected={selected.title === image.title}
            {image}
          />
        </li>
      {/each}
    </ul>

    <div>
      <input
        type="range"
        min="0"
        max="255"
        bind:value={threshold}
        name="threshold"
      />
      <label for="threshold">{threshold}</label>
    </div>
    <ImagePreview {selected} {threshold} />
    <PixelSort {threshold} />
  </div>
</main>

<style lang="scss">
  .image-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-flow: row wrap;
    margin-bottom: 2rem;
    padding: 0;
    list-style-type: none;
  }
</style>
