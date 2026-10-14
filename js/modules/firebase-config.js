import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get 
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.tempCloudData = null;

function getCleanFriendCode() {
    const codeInput = document.getElementById('pFriendCode');
    let code = codeInput ? codeInput.value.trim() : '';
    
    if (!code) {
        const savedProfile = JSON.parse(localStorage.getItem('mongil_player_profile')) || {};
        code = savedProfile.friendCode ? savedProfile.friendCode.trim() : '';
    }

    return code ? code.replace(/[^a-zA-Z0-9-_]/g, '_') : null;
}

window.saveCloudData = function(force = false) {
    const friendCodeKey = getCleanFriendCode();
    
    if (!friendCodeKey) {
        updateCloudStatus(false);
        return;
    }

    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 2,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    const userRef = ref(db, 'players/' + friendCodeKey);
    set(userRef, payload)
        .then(() => {
            updateCloudStatus(true);
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
        });
};

window.checkCodeAndSync = function() {
    const friendCodeKey = getCleanFriendCode();
    if (!friendCodeKey) return;

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Verificando cuenta en la nube...";
    }

    const userRef = ref(db, 'players/' + friendCodeKey);
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const cloudData = snapshot.val();
                window.tempCloudData = cloudData;

                const localCollection = localStorage.getItem('mongil_user_collection') || '{}';
                const cloudCollection = JSON.stringify(cloudData.collection || {});

                if (localCollection !== cloudCollection && localCollection !== '{}') {
                    openConflictModal(cloudData);
                } else {
                    applyCloudData(cloudData);
                    if (typeof showToast === 'function') showToast('¡Cuenta sincronizada desde la nube!');
                }
            } else {
                saveCloudData(true);
                if (typeof showToast === 'function') showToast('¡Nuevo perfil creado en la nube!');
            }
        })
        .catch((error) => {
            console.error("Error al verificar la nube:", error);
            updateCloudStatus(false);
        });
};

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
