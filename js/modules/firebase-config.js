// Importar los SDKs necesarios de Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get 
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// Configuración de Firebase
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

// Obtener la clave del Código de Amistad formateada
function getCleanFriendCode() {
    const codeInput = document.getElementById('pFriendCode');
    let code = codeInput ? codeInput.value.trim() : '';
    
    if (!code) {
        const savedProfile = JSON.parse(localStorage.getItem('mongil_player_profile'));
        code = savedProfile && savedProfile.friendCode ? savedProfile.friendCode.trim() : 'FRIEND-STARDIVE-2026';
    }

    return code.replace(/[^a-zA-Z0-9-_]/g, '_');
}

// Guardar datos en la nube para el Código de Amistad actual
window.saveCloudData = function() {
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
            if (typeof showToast === 'function') showToast('Error de conexión a la nube');
        });
};

// Cargar datos desde la nube cuando cambia el Código de Amistad
window.loadCloudData = function(callback) {
    const friendCodeKey = getCleanFriendCode();
    if (!friendCodeKey) return;

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Cargando cuenta...";
    }

    const userRef = ref(db, 'players/' + friendCodeKey);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // Sobrescribir el localStorage local con los datos traídos de la cuenta nueva
                localStorage.setItem('mongil_user_collection', JSON.stringify(data.collection || {}));
                localStorage.setItem('mongil_player_profile', JSON.stringify(data.profile || {}));
                if (data.gridCols) localStorage.setItem('mongil_grid_cols', data.gridCols);
                if (data.menuMode) localStorage.setItem('mongil_menu_mode', data.menuMode);
                
                updateCloudStatus(true);
                if (typeof showToast === 'function') showToast('¡Cuenta cargada desde la nube!');
            } else {
                // Si la cuenta no existe en Firebase, resetear la colección local para esa clave nueva
                localStorage.setItem('mongil_user_collection', JSON.stringify({}));
                saveCloudData();
                if (typeof showToast === 'function') showToast('Nueva cuenta creada con este Código');
            }

            // Actualizar la interfaz gráfica
            if (typeof loadProfile === 'function') loadProfile();
            if (typeof renderCharacters === 'function') renderCharacters();
            if (typeof renderAll === 'function') renderAll();
            
            if (callback) callback();
        })
        .catch((error) => {
            console.error("Error al cargar desde Firebase:", error);
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
