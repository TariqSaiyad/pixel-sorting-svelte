<script lang="ts">
  import ImageButton from "$lib/ImageButton.svelte";
  import ImagePreview from "$lib/ImagePreview.svelte";
  import PixelSort from "$lib/PixelSort.svelte";
  import { IMAGES, SORT_TYPES } from "$utils/constants";
  import type { ImgObject, SortType } from "$utils/types";
  import { fade, blur } from "svelte/transition";

  let threshold = 44;
  let invert = true;
  let sortType: SortType = "BRIGHTNESS";
  let selected: ImgObject = IMAGES.at(0);
  let imgSize = 400;
  let running = false;

  function doSort() {
    running = true;
  }

  function doReset() {
    running = false;
  }
</script>

<main>
  <div class="sidebar">
    <span class="info-box">Select image to process</span>
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
  </div>

  <div class="content">
    <div class="controls">
      <div>
        <label for="threshold">Threshold</label>
        <input
          type="range"
          min="0"
          max="255"
          bind:value={threshold}
          name="threshold"
        />
        <output>{threshold}</output>
      </div>
      <div>
        <label for="imageSize">Size</label>
        <input
          type="range"
          min="100"
          max="600"
          step="50"
          bind:value={imgSize}
          name="imageSize"
        />
        <output>{imgSize}</output>
      </div>
      <div>
        <label for="invert">Invert</label>
        <input type="checkbox" bind:checked={invert} name="invert" />
      </div>
      <div>
        <fieldset>
          <legend>Sort Type</legend>
          {#each SORT_TYPES as type}
            <label>
              <input
                type="radio"
                bind:group={sortType}
                name="sortTypes"
                value={type}
              />
              {type}
            </label>
          {/each}
        </fieldset>
      </div>
      <div>
        <button on:click={running ? doReset : doSort}>
          {running ? "Reset" : "Sort"}
        </button>
      </div>
    </div>

    <div class="container" style={`--size:${imgSize}px`}>
      {#if running}
        <div transition:fade>
          <PixelSort {threshold} {selected} {invert} {sortType} {imgSize} />
        </div>
      {:else}
        <div transition:fade>
          <ImagePreview {selected} {threshold} {sortType} {invert} {imgSize} />
        </div>
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  .info {
  }

  main {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
    align-items: start;
    justify-items: center;
  }

  .container {
    overflow: hidden;
    display: grid;
    height: var(--size);
    width: var(--size);

    & > * {
      grid-column: 1/2;
      grid-row: 1/2;
    }
  }

  .sidebar {
    overflow-y: auto;
    max-height: 90vh;
  }

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
