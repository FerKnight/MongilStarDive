// --- CONFIGURACIÓN DE FIREBASE ---
// (Reemplaza estos datos con los de tu consola de Firebase: https://console.firebase.google.com/)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Clave única basada en el UID del jugador para la nube
function getCloudPlayerKey() {
    const uidInput = document.getElementById('pUID');
    const uid = uidInput ? uidInput.value.trim() : 'MNG-9842013';
    // Limpiamos caracteres especiales para que sea una ruta válida en Firebase
    return uid.replace(/[^a-zA-Z0-9-_]/g, '_');
}

// Guardar datos completos en Firebase y LocalStorage
function saveCloudData() {
    const cloudKey = getCloudPlayerKey();
    
    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 4,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    db.ref('players/' + cloudKey).set(payload)
        .then(() => {
            updateCloudStatus(true);
            showToast('¡Datos sincronizados en la nube!');
        })
        .catch((error) => {
            console.error("Error al sincronizar con Firebase:", error);
            updateCloudStatus(false);
            showToast('Error al conectar con la nube');
        });
}

// Cargar datos desde Firebase al iniciar o cambiar de UID
function loadCloudData(callback) {
    const cloudKey = getCloudPlayerKey();
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Sincronizando...";
    }

    db.ref('players/' + cloudKey).once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                if (data.collection) {
                    localStorage.setItem('mongil_user_collection', JSON.stringify(data.collection));
                }
                if (data.profile) {
                    localStorage.setItem('mongil_player_profile', JSON.stringify(data.profile));
                }
                if (data.gridCols) {
                    localStorage.setItem('mongil_grid_cols', data.gridCols);
                }
                if (data.menuMode) {
                    localStorage.setItem('mongil_menu_mode', data.menuMode);
                }
                updateCloudStatus(true);
                console.log("Datos cargados desde la nube con éxito.");
            } else {
                // Si no existe, guardamos los locales actuales por primera vez
                saveCloudData();
            }
            if (callback) callback();
        })
        .catch((error) => {
            console.error("Error al leer de Firebase:", error);
            updateCloudStatus(false);
            if (callback) callback();
        });
}

function updateCloudStatus(isOnline) {
    const statusEl = document.getElementById('cloudSyncStatus');
    const syncText = document.getElementById('cloudSyncText');
    if (statusEl) {
        statusEl.className = `inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-500'}`;
        statusEl.title = isOnline ? 'Conectado a la nube (Firebase)' : 'Desconectado / Error de red';
    }
    if (syncText) {
        syncText.innerText = isOnline ? 'Nube sincronizada' : 'Modo local (Sin conexión)';
    }
}
