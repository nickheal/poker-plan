<script>
	import { navigate } from 'svelte-routing';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import Title from '../components/Title.svelte';
	import { score, sessions, sessionUser } from '../utils/database';

	export let userId;

	let noOfSessions;
	let joinSessionId;

	sessions.on('value', (snapshot) => {
		const val = snapshot.val();
		if (!val) {
			noOfSessions = 0;
			return;
		}
		noOfSessions = Object.keys(val).length;
	});

	async function createSession() {
		const newSession = await sessions.push();
		newSession.set({
			revealed: false
		});
		sessionUser(newSession.key).set({
			[userId]: true
		});
		navigate(`/poker-plan/sessions/${newSession.key}`);
	}

	function onJoinSession(e) {
		e.preventDefault();
		navigate(`/poker-plan/sessions/${joinSessionId}`);
	}
</script>

<main>
	<Title>Poker-plan</Title>

	<section>
		<h2>Start a new session</h2>
		<Button onClick={createSession}>Create a session</Button>
	</section>
	
	<section>
		<h2>Join an existing session</h2>
		<form on:submit={onJoinSession}>
			<Input
				id="session-id"
				label="Session ID"
				onChange={newValue => joinSessionId = newValue}
				value={joinSessionId}
			/>
			<Button>Join session</Button>
		</form>
	</section>

	<p>{noOfSessions} sessions currently in progress.</p>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	section {
		border-bottom: solid 1px #eee;
		margin: 24px auto;
		padding: 24px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>