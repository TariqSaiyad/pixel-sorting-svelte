<script lang="ts">
  import ImageButton from "$lib/ImageButton.svelte";
  import ImagePreview from "$lib/ImagePreview.svelte";
  import PixelSort from "$lib/PixelSort.svelte";
  import { IMAGES, SORT_TYPES } from "$utils/constants";
  import type { ImgObject, SortType } from "$utils/types";

  let threshold = 70;
  let direction = true;
  let sortType: SortType = "BRIGHTNESS";
  let selected: ImgObject = IMAGES.at(1);
</script>

<main>
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
      <label for="direction">Direction</label>
      <input type="checkbox" bind:checked={direction} name="direction" />
    </div>
    <div>
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
    </div>
  </div>
  <ImagePreview
    {selected}
    {threshold}
    {sortType}
    direction={direction}
  />
  <PixelSort {threshold} {selected} direction={direction} />
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
