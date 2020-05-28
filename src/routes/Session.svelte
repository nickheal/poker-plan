<script>
	import Button from '../components/Button.svelte';
	import NameChoice from '../components/NameChoice.svelte';
  import ScoreChoice from '../components/ScoreChoice.svelte';
	import Title from '../components/Title.svelte';
  import { score, session, sessionUser, user } from '../utils/database';
  
  export let sessionId;
  export let userId;

  let userRefs = [];
  let scoreRef = score(sessionId);
  let sessionRef = session(sessionId);
  let sessionUserRef = sessionUser(sessionId);

	let scoreList;
  let sessionInfo;
  let userList = [];

  function onChoose(newChoice) {
    scoreRef.update({ [userId]: newChoice })
  }

  function onClickReveal() {
    sessionRef.update({ revealed: !sessionInfo.revealed });
  }

  function onClickClear() {
    scoreRef.set({});
  }

  sessionUserRef.update({
    [userId]: true
  });

	scoreRef.on('value', (snapshot) => {
		scoreList = snapshot.val();
  });
  
  sessionRef.on('value', (snapshot) => {
		sessionInfo = snapshot.val();
  });

  sessionUserRef.on('value', (snapshot) => {
    userRefs.map((userRef) => userRef.off());
    userRefs = [];

    const sessionUserList = snapshot.val();

    Object.keys(sessionUserList).map((userId) => {
      const userRef = user(userId);
      userRefs.push(userRef);
  
      userRef.on('value', (snapshot) => {
        const user = snapshot.val();
        const existingUser = userList.find((u) => u.id === userId);
        if (existingUser) {
          userList.splice(userList.indexOf(existingUser));
        }
        userList = [...userList, {
          id: userId,
          name: user.name
        }];
      });
    });
  });
</script>

<main>
  {#if sessionInfo && userList.length}
    <Title>Poker-plan</Title>

    <NameChoice />

    <section class="actions">
      <Button onClick={onClickClear}>Clear</Button>
      <Button onClick={onClickReveal}>{sessionInfo.revealed ? 'Hide' : 'Show'}</Button>
    </section>

    <ScoreChoice onChange={onChoose} value={scoreList && scoreList[userId]} />

    <dl>
      {#each userList as user}
        <div class="user">
          <dt class="user-name">{user.name || '???'}</dt>
          <dd class="user-score-container">
            <p class="user-score" class:obscured={!sessionInfo.revealed}>
              {sessionInfo.revealed && scoreList ? scoreList[user.id] || '?' : '?'}
            </p>
          </dd>
        </div>
      {/each}
    </dl>
  {/if}
</main>

<style>
  .actions {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  .user {
    border-bottom: solid 1px #eee;
    display: flex;
    font-size: 24px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }

  .user-name, .user-score-container {
    width: 50%;
  }
  
  .user-name {
    margin: 0;
    padding-right: 8px;
    text-align: right;
  }

  .user-score-container {
    margin: 0;
    padding-left: 8px;
    text-align: left;
  }

  .user-score {
    display: inline-block;
    padding: 0 4px;
  }

  .obscured {
    background: #eee;
    color: #eee;
  }
</style>