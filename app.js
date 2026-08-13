import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import {getFirestore,collection,addDoc,getDocs} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
import {firebaseConfig} from './firebase-config.js';

const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);

document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));document.getElementById(b.dataset.page).classList.remove('hidden');if(b.dataset.page==='vault')loadVault();if(b.dataset.page==='reviews')loadReviews();});

loginBtn.onclick=async()=>{const r=await signInWithPopup(auth,new GoogleAuthProvider());user.textContent=r.user.displayName;};

seal.onclick=async()=>{if(!auth.currentUser){alert('Sign in first');return;}await addDoc(collection(db,'capsules'),{title:title.value,message:message.value,date:date.value,shared:shared.value});alert('Capsule saved');};

reviewBtn.onclick=async()=>{await addDoc(collection(db,'reviews'),{text:reviewText.value});reviewText.value='';loadReviews();};

async function loadReviews(){reviewList.innerHTML='';const s=await getDocs(collection(db,'reviews'));s.forEach(d=>reviewList.innerHTML+=`<div>${d.data().text}</div>`);}
async function loadVault(){vaultList.innerHTML='';const s=await getDocs(collection(db,'capsules'));s.forEach(d=>vaultList.innerHTML+=`<div><h3>${d.data().title}</h3></div>`);}
