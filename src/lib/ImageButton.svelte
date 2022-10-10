<script lang="ts">
  import type { ImgObject } from "$utils/types";

  export let image: ImgObject;
  export let selected: boolean = false;
</script>

<button class="image-btn" class:selected on:click>
  <figure>
    <img src={image.path} alt={image.title} />
    <figcaption>{image.title}</figcaption>
  </figure>
</button>

<style lang="scss">
  .image-btn {
    padding: 1rem;
    border: 3px solid rgb(35, 35, 35);

    &:hover {
      border: 3px solid rgb(100, 100, 100);
    }

    figure {
      margin: 0;
    }

    img {
      width: 10rem;
    }
  }

  .selected {
    border: 3px solid tan;
  }
</style>
