<script lang="ts">
  import ImageButton from "$lib/ImageButton.svelte";
  import ImagePreview from "$lib/ImagePreview.svelte";
  import PixelSort from "$lib/PixelSort.svelte";
  import { IMAGES, SORT_TYPES } from "$utils/constants";
  import type { ImgObject } from "$utils/types";
  import { fade } from "svelte/transition";
  import { sortParams } from "$utils/store";

  $: ({ imgSize, threshold } = $sortParams);

  let selected: ImgObject = IMAGES.at(0);
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
    <form
      on:submit|preventDefault={running ? doReset : doSort}
      class="controls"
    >
      <div class="controls__field">
        <label for="threshold">Threshold</label>
        <input
          type="range"
          min="0"
          max="255"
          bind:value={$sortParams.threshold}
          name="threshold"
        />
        <output>{threshold}</output>
      </div>
      <div class="controls__field">
        <label for="imageSize">Size</label>
        <input
          type="range"
          min="100"
          max="600"
          step="50"
          bind:value={$sortParams.imgSize}
          name="imageSize"
        />
        <output>{imgSize}</output>
      </div>
      <div class="controls__field">
        <label for="invert">Invert</label>
        <input
          type="checkbox"
          bind:checked={$sortParams.invert}
          name="invert"
        />
      </div>
      <div class="controls__field">
        <fieldset>
          <legend>Sort Type</legend>
          {#each SORT_TYPES as type}
            <label>
              <input
                type="radio"
                bind:group={$sortParams.sortType}
                name="sortTypes"
                value={type}
              />
              {type}
            </label>
          {/each}
        </fieldset>
      </div>
      <div>
        <button type="submit">{running ? "Reset" : "Sort"}</button>
      </div>
    </form>

    <div class="container" style={`--size:${imgSize}px`}>
      {#if running}
        <div transition:fade>
          <PixelSort {selected} />
        </div>
      {:else}
        <div transition:fade>
          <ImagePreview {selected} />
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
