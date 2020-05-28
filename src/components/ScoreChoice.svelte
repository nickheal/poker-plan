<script>
  export let onChange;
  export let value;

  const options = [1, 2, 3, 5, 8, 13, 20].map((score) => ({
    id: score,
    label: `${score}`,
    onClick: () => onChange(score)
  }));
</script>

<ol class="list">
  {#each options as option}
    <li>
      <button
        class="option"
        class:chosen={option.id === value}
        on:click={option.onClick}
      >
        {option.label}
      </button>
    </li>
  {/each}
</ol>

<style>
  .list {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 24px auto;
    max-width: 300px;
  }

  .option {
    background: none;
    border: 0;
    border-bottom: solid 2px #eee;
    border-radius: 8px;
    cursor: pointer;
    font-size: 30px;
    margin: 0 4px;
    min-width: 44px;
    padding: 4px 12px;
  }

  .option:hover {
    border-color: darkblue;
  }

  .chosen {
    border-color: blue;
  }
</style>