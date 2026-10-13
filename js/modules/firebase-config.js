// Importar los SDKs necesarios de Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
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
const db = getDatabase(app);

// Obtener la clave limpia del Código de Amistad
function getCleanFriendCode() {
    const codeInput = document.getElementById('pFriendCode');
    let code = codeInput ? codeInput.value.trim() : '';
    
    if (!code) {
        const savedProfile = JSON.parse(localStorage.getItem('mongil_player_profile'));
        code = savedProfile && savedProfile.friendCode ? savedProfile.friendCode.trim() : 'FRIEND-STARDIVE-2026';
    }

    return code.replace(/[^a-zA-Z0-9-_]/g, '_');
}

// Guardar datos en la nube usando el Código de Amistad
window.saveCloudData = function() {
    const friendCodeKey = getCleanFriendCode();

    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 4,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    const userRef = ref(db, 'players/' + friendCodeKey);
    set(userRef, payload)
        .then(() => {
            updateCloudStatus(true);
            showToast('¡Progreso sincronizado en la nube!');
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
            showToast('Error de conexión a la nube');
        });
};

// Cargar datos desde la nube usando el Código de Amistad
window.loadCloudData = function(callback) {
    const friendCodeKey = getCleanFriendCode();

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Cargando desde la nube...";
    }

    const userRef = ref(db, 'players/' + friendCodeKey);
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
        statusEl.className = `inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-500'}`;
        statusEl.title = isOnline ? 'Sincronizado por Código de Amistad' : 'Error de sincronización';
    }
}
