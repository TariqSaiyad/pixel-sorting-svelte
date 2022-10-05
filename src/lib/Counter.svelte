<script lang="ts">
  let count = 0;
  let test = "test";
  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>count is {count} </button>
