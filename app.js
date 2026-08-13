import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import {getFirestore,collection,addDoc} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
import {firebaseConfig} from './firebase-config.js';

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

document.getElementById('loginBtn').onclick=()=>signInWithPopup(auth,new GoogleAuthProvider());

document.getElementById('saveBtn').onclick=async()=>{
 await addDoc(collection(db,'capsules'),{
  title:title.value,message:message.value,createdAt:new Date()
 });
 status.textContent='Capsule saved!';
};