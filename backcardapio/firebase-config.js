// firebase-config.js (ou no seu arquivo principal)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAma8_i3oYR4aKkdRv0YzXIuZkxNqtiwaQ",
    authDomain: "backendcardapio.firebaseapp.com",
    projectId: "backendcardapio",
    storageBucket: "backendcardapio.firebasestorage.app",
    messagingSenderId: "978890242445",
    appId: "1:978890242445:web:58516a8cc27b5fe54ae5c4"
};

// Inicializa app Firebase
const app = initializeApp(firebaseConfig);

// Pega referência do Firestore
const db = getFirestore(app);

export { db, collection, addDoc };
