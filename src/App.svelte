<script lang="ts">
  import ImageButton from "$lib/ImageButton.svelte";
  import ImagePreview from "$lib/ImagePreview.svelte";
  import PixelSort from "$lib/PixelSort.svelte";
  import { IMAGES, SORT_TYPES } from "$utils/constants";
  import type { ImgObject } from "$utils/types";
  import { fade } from "svelte/transition";
  import { sortParams } from "$utils/store";

  $: ({ imgSize } = $sortParams);

  let selected: ImgObject = IMAGES.at(0);
  let running = false;
  let complete = false;

  function doSort() {
    running = true;
    complete = false;
  }

  function doReset() {
    running = false;
    complete = false;
  }

  function doSave() {
    complete = false;
  }
</script>

<main>
  <div class="sidebar">
    <h1>Pixel Sorting</h1>
    <div class="info">Select image to sort</div>
    <ul class="image-buttons">
      {#each IMAGES as image}
        <ImageButton
          on:click={() => (selected = image)}
          selected={selected.title === image.title}
          {image}
        />
      {/each}
    </ul>
  </div>

  <div class="content">
    <form
      on:submit|preventDefault={running ? doReset : doSort}
      class="controls card"
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
        <legend>Sort Type</legend>
        <div class="radio-group">
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
        </div>
      </div>
      <div class="controls__buttons">
        <button type="submit">{running ? "Reset" : "Sort"}</button>
        {#if complete}
          <button on:click={doSave}>Save</button>
        {/if}
      </div>
    </form>

    <div class="container" style={`--size:${imgSize}px`}>
      {#if running}
        <div transition:fade>
          <PixelSort {selected} on:complete={(e) => (complete = true)} />
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
  @use "variables";
  .info {
  }

  main {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 3fr;
    align-items: start;
    justify-items: center;

    @include variables.breakpoint-tablet-down {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
  }

  .container {
    overflow: hidden;
    display: grid;
    margin: 3rem auto;
    height: min(90vw, var(--size));
    width: min(90vw, var(--size));

    & > * {
      grid-column: 1/2;
      grid-row: 1/2;
    }
  }

  .sidebar {
    overflow-y: auto;
    max-height: 90vh;
  }

  .content {
    width: 100%;
  }

  .image-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-flow: row wrap;
    margin-bottom: 2rem;
    padding: 0.5rem;
    list-style-type: none;
  }

  .controls {
    display: flex;
    align-items: center;
    flex-flow: wrap;
    gap: 1rem 1.5rem;

    &__field {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      border: none;

      label,
      legend {
        font-weight: 500;
        text-transform: uppercase;
      }

      .radio-group {
        display: grid;
        justify-items: start;
        label {
          font-size: variables.$text-small;
          font-weight: normal;
        }
      }
    }

    &__buttons {
      margin-left: auto;
    }
  }
</style>
