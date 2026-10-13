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

// Obtener la clave normalizada del UID para Realtime Database
function getCleanPlayerUID() {
    const pUIDInput = document.getElementById('pUID');
    let uid = pUIDInput ? pUIDInput.value.trim() : '';
    
    if (!uid) {
        // Buscar en localStorage si la caja de texto no ha cargado aún
        const savedProfile = JSON.parse(localStorage.getItem('mongil_player_profile'));
        uid = savedProfile && savedProfile.uid ? savedProfile.uid.trim() : 'MNG-9842013';
    }

    // Remplazar caracteres no permitidos por Firebase Realtime Database
    return uid.replace(/[^a-zA-Z0-9-_]/g, '_');
}

// Guardar datos en la Realtime Database usando el UID
window.saveCloudData = function() {
    const playerUID = getCleanPlayerUID();

    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 4,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    const userRef = ref(db, 'players/' + playerUID);
    set(userRef, payload)
        .then(() => {
            updateCloudStatus(true);
            showToast('¡Guardado en la nube con tu UID!');
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
            showToast('Error de conexión a la nube');
        });
};

// Cargar datos desde la Realtime Database usando el UID
window.loadCloudData = function(callback) {
    const playerUID = getCleanPlayerUID();

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Cargando desde la nube...";
    }

    const userRef = ref(db, 'players/' + playerUID);
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
                // Si la clave no existe en Firebase, creamos la entrada por primera vez
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
        statusEl.title = isOnline ? 'Conectado y sincronizado por UID' : 'Error de sincronización con la nube';
    }
}
