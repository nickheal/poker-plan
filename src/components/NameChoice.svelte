<script>
  import { onMount, onDestroy } from 'svelte';
  import Input from './Input.svelte';
  import userStore from '../stores/user';
  import { user } from '../utils/database';

  let userId;
  let userInfo;
  let userRef;

  userStore.subscribe(newValue => userId = newValue);

  onMount(() => {
    userRef = user(userId);
    userRef.on('value', (snapshot) => {
      userInfo = snapshot.val();
    });
  });

  onDestroy(() => userRef.off());

  function onChangeUser(newValue) {
    userRef.update({ name: newValue });
  }
</script>

<Input
  disabled={!userInfo || !userId}
  id="name-choice"
  label="Name"
  onInput={onChangeUser}
  value={userInfo && userInfo.name}
/>
