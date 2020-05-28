import { writable } from 'svelte/store';
import { users } from '../utils/database';

let initialState = localStorage.getItem('userId');

if (!initialState) {
  const newUser = users.push();
  newUser.set({
    created: Date.now()
  });
  localStorage.setItem('userId', newUser.key);
  initialState = newUser.key;
}

const userStore = writable(initialState);

export default userStore;
