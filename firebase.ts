import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA5pCWZLmAcEeUOOQLQjxXeqqBfF1aNfrw",
	authDomain: "chatgpt-messenger-d13f6.firebaseapp.com",
	projectId: "chatgpt-messenger-d13f6",
	storageBucket: "chatgpt-messenger-d13f6.appspot.com",
	messagingSenderId: "768885919457",
	appId: "1:768885919457:web:e3ff874cc8a1f319d9b1a0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
