// Importar los SDKs necesarios de Firebase (versión modular moderna)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
import { 
    getAuth, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get 
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7UOK8iqYZJhFI_7FELm22cV6tQs6JdBw",
    authDomain: "mongilstardive-7a70a.firebaseapp.com",
    databaseURL: "https://mongilstardive-7a70a-default-rtdb.firebaseio.com",
    projectId: "mongilstardive-7a70a",
    storageBucket: "mongilstardive-7a70a.firebasestorage.app",
    messagingSenderId: "144252207933",
    appId: "1:144252207933:web:1ce179e4a6ece4fe6a7b54",
    measurementId: "G-W1GF3G9XJK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

let currentUserId = null;

// Escuchar cambios de autenticación en tiempo real
onAuthStateChanged(auth, (user) => {
    const authContainer = document.getElementById('authContainer');
    const loggedInStatus = document.getElementById('loggedInStatus');
    const emailDisplay = document.getElementById('userEmailDisplay');

    if (user) {
        currentUserId = user.uid;
        if (authContainer) authContainer.classList.add('hidden');
        if (loggedInStatus) loggedInStatus.classList.remove('hidden');
        if (emailDisplay) emailDisplay.innerText = user.email || user.displayName || 'Usuario Google';

        // Cargar datos de la nube automáticamente al conectar
        loadCloudData(() => {
            if (typeof renderAll === 'function') renderAll();
        });
    } else {
        currentUserId = null;
        if (authContainer) authContainer.classList.remove('hidden');
        if (loggedInStatus) loggedInStatus.classList.add('hidden');
        updateCloudStatus(false);
    }
});

// Inicio de sesión con Google
window.handleGoogleLogin = function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            showToast('¡Conectado con Google!');
        })
        .catch((error) => {
            showToast('Error con Google: ' + error.message);
        });
};

// Cerrar sesión
window.handleLogout = function() {
    signOut(auth).then(() => {
        showToast('Desconectado de la nube');
    }).catch(() => {
        showToast('Error al desconectar');
    });
};

// Guardar datos en la Realtime Database
window.saveCloudData = function() {
    if (!currentUserId) {
        showToast('Inicia sesión con Google para sincronizar');
        return;
    }

    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 4,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    const userRef = ref(db, 'users/' + currentUserId);
    set(userRef, payload)
        .then(() => {
            updateCloudStatus(true);
            showToast('¡Progreso sincronizado en la nube!');
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
            showToast('Error al sincronizar datos');
        });
};

// Cargar datos desde la Realtime Database
window.loadCloudData = function(callback) {
    if (!currentUserId) return;

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Sincronizando con la nube...";
    }

    const userRef = ref(db, 'users/' + currentUserId);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.collection) localStorage.setItem('mongil_user_collection', JSON.stringify(data.collection));
                if (data.profile) localStorage.setItem('mongil_player_profile', JSON.stringify(data.profile));
                if (data.gridCols) localStorage.setItem('mongil_grid_cols', data.gridCols);
                if (data.menuMode) localStorage.setItem('mongil_menu_mode', data.menuMode);
                
                updateCloudStatus(true);
                if (typeof loadProfile === 'function') loadProfile();
            } else {
                saveCloudData();
            }
            if (callback) callback();
        })
        .catch((error) => {
            console.error("Error al cargar de Firebase:", error);
            updateCloudStatus(false);
            if (callback) callback();
        });
};

function updateCloudStatus(isOnline) {
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = `inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-slate-500'}`;
        statusEl.title = isOnline ? 'Sincronizado con la nube' : 'Modo Local';
    }
}
