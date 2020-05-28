<script>
  export let disabled;
  export let id;
  export let label;
  export let onChange = () => {};
  export let onInput = () => {};
  export let value;
</script>

<label for={id}>{label}</label>
<input
  {disabled}
  {id}
  name={id}
  on:change={e => onChange(e.currentTarget.value)}
  on:input={e => onInput(e.currentTarget.value)}
  value={value || ''}
/>

<style>
  input {
    border: solid 2px #333;
    border-radius: 8px;
    font-size: 30px;
    padding: 2px 12px;
  }

  label {
    font-size: 30px;
  }
</style>