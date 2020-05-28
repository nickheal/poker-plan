import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyBtMNeDzxaDcPoUyNMNJ0ylU6rJyP9CrDE",
	authDomain: "poker-plan-ce9ec.firebaseapp.com",
	databaseURL: "https://poker-plan-ce9ec.firebaseio.com",
	projectId: "poker-plan-ce9ec",
	storageBucket: "poker-plan-ce9ec.appspot.com",
	messagingSenderId: "71570247397",
	appId: "1:71570247397:web:d9c35f4a0114c137b80e0c",
	measurementId: "G-YN88VDC57T"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

export const scores = database.ref('/scores');
export const score = id => database.ref(`/scores/${id}`);

export const sessions = database.ref('/sessions');
export const session = id => database.ref(`/sessions/${id}`);

export const sessionUsers = database.ref('/sessionUsers');
export const sessionUser = id => database.ref(`/sessionUsers/${id}`);

export const users = database.ref('/users');
export const user = id => database.ref(`/users/${id}`);
