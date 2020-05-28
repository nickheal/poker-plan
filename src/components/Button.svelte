<script>
  export let onClick;
  export let type;
</script>

<button
  on:click={onClick}
  {type}
>
  <slot />
</button>

<style>
  button {
    background: blue;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 30px;
    margin: 24px 12px;
    padding: 4px 12px;
  }

  button:hover {
    background-color: darkblue;
  }
</style>