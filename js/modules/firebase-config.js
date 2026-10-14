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

window.tempCloudData = null; // Guardado temporal para resolver conflictos

// Formatear el Código de Amistad como clave válida de Firebase
function getCleanFriendCode() {
    const savedProfile = JSON.parse(localStorage.getItem('mongil_player_profile')) || {};
    const code = savedProfile.friendCode ? savedProfile.friendCode.trim() : '';
    return code ? code.replace(/[^a-zA-Z0-9-_]/g, '_') : null;
}

// Subir datos locales a la nube
window.saveCloudData = function(force = false) {
    const friendCodeKey = getCleanFriendCode();
    
    if (!friendCodeKey) return;

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
            if (typeof showToast === 'function') showToast('¡Datos sincronizados en la nube!');
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
            if (typeof showToast === 'function') showToast('Error al conectar con la nube');
        });
};

// Verificar la existencia de datos y detectar conflictos
window.connectAndCheckSync = function(friendCode) {
    if (!friendCode) return;
    const cleanKey = friendCode.replace(/[^a-zA-Z0-9-_]/g, '_');

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Verificando sincronización...";
    }

    const userRef = ref(db, 'players/' + cleanKey);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const cloudData = snapshot.val();
                window.tempCloudData = cloudData;

                const localCollection = localStorage.getItem('mongil_user_collection') || '{}';
                const cloudCollection = JSON.stringify(cloudData.collection || {});

                // Si hay diferencias entre el progreso local y la nube, abrir modal de conflicto
                if (localCollection !== cloudCollection && localCollection !== '{}') {
                    openConflictModal(cloudData);
                } else {
                    applyCloudData(cloudData);
                    if (typeof showToast === 'function') showToast('¡Sincronizado correctamente!');
                }
            } else {
                saveCloudData(true);
            }
        })
        .catch((error) => {
            console.error("Error al conectar con la nube:", error);
            updateCloudStatus(false);
        });
};

// Aplicar los datos de la nube en el almacenamiento local
window.applyCloudData = function(data) {
    if (!data) return;

    if (data.collection) localStorage.setItem('mongil_user_collection', JSON.stringify(data.collection));
    if (data.profile) localStorage.setItem('mongil_player_profile', JSON.stringify(data.profile));
    if (data.gridCols) localStorage.setItem('mongil_grid_cols', data.gridCols);
    if (data.menuMode) localStorage.setItem('mongil_menu_mode', data.menuMode);

    updateCloudStatus(true);
    if (typeof loadProfile === 'function') loadProfile();
    if (typeof renderCharacters === 'function') renderCharacters();
    if (typeof renderAll === 'function') renderAll();
};

function updateCloudStatus(isOnline) {
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = `inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-slate-500'}`;
        statusEl.title = isOnline ? 'Sincronizado con la Nube' : 'Modo Local (Offline)';
    }
}
