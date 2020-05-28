<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
	import Session from './routes/Session.svelte';
	import userStore from './stores/user';

	let userId;

	userStore.subscribe(uid => userId = uid);

  export let url = '';
</script>

{#if !userId}
	<p>Loading...</p>
{:else}
	<Router basepath="/poker-plan" url={url}>
		<Route path="/sessions/:id" let:params>
			<Session sessionId={params.id} userId={userId} />
		</Route>
		<Route path="/">
			<Home userId={userId} />
		</Route>
	</Router>
{/if}

<style>
	:global(body, *) {
		font-family: 'Balsamiq Sans', Helvetica, Arial, sans-serif;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>