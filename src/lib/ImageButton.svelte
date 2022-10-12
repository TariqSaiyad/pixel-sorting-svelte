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
    width: min(100%, 10rem);
    padding: 1rem;
    border: 3px solid rgb(35, 35, 35);
    &::before {
      content: "";
      transition: all 0.2s ease-out;
      opacity: 0;
    }

    &:hover {
      border: 3px solid rgb(100, 100, 100);
    }

    figure {
      margin: 0;
    }

    img {
      width: 100%;
    }
  }

  .selected {
    border: 3px solid tan;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      opacity: 1;
      left: 0.25rem;
      top: 0.25rem;
      height: 1.25rem;
      width: 1.25rem;
      background-image: url("data:image/svg+xml,%3Csvg fill='%23d2b48c' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'%3E%3C/path%3E%3C/svg%3E");
    }
  }
</style>
