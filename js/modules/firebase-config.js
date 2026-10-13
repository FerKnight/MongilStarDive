// --- CONFIGURACIÓN DE FIREBASE ---
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
const auth = firebase.auth();

let currentUserId = null;

// Escuchar cambios de autenticación (Login / Logout automático)
auth.onAuthStateChanged((user) => {
    const authContainer = document.getElementById('authContainer');
    const profileContainer = document.getElementById('profileContainer');
    const emailDisplay = document.getElementById('userEmailDisplay');

    if (user) {
        currentUserId = user.uid;
        if (authContainer) authContainer.classList.add('hidden');
        if (profileContainer) profileContainer.classList.remove('hidden');
        if (emailDisplay) emailDisplay.innerText = user.email;

        // Cargar datos del usuario desde la nube
        loadCloudData(() => {
            if (typeof renderAll === 'function') renderAll();
        });
    } else {
        currentUserId = null;
        if (authContainer) authContainer.classList.remove('hidden');
        if (profileContainer) profileContainer.classList.add('hidden');
    }
});

// Registrarse con correo y contraseña
function handleRegister() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (!email || !password) {
        showToast('Ingresa un correo y contraseña válidos');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showToast('¡Cuenta creada con éxito!');
            saveCloudData();
        })
        .catch((error) => {
            showToast('Error: ' + error.message);
        });
}

// Iniciar sesión con correo y contraseña
function handleLogin() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (!email || !password) {
        showToast('Ingresa tu correo y contraseña');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showToast('¡Sesión iniciada con éxito!');
        })
        .catch((error) => {
            showToast('Error al iniciar sesión: ' + error.message);
        });
}

// Cerrar sesión
function handleLogout() {
    auth.signOut().then(() => {
        showToast('Sesión cerrada');
    }).catch((error) => {
        showToast('Error al cerrar sesión');
    });
}

// Guardar datos en la nube asociados al UID del usuario autenticado
function saveCloudData() {
    if (!currentUserId) return;

    const payload = {
        collection: JSON.parse(localStorage.getItem('mongil_user_collection')) || {},
        profile: JSON.parse(localStorage.getItem('mongil_player_profile')) || {},
        gridCols: localStorage.getItem('mongil_grid_cols') || 4,
        menuMode: localStorage.getItem('mongil_menu_mode') || 'bottom',
        lastUpdated: new Date().toISOString()
    };

    db.ref('users/' + currentUserId).set(payload)
        .then(() => {
            updateCloudStatus(true);
            showToast('¡Guardado en la nube!');
        })
        .catch((error) => {
            console.error("Error al guardar en Firebase:", error);
            updateCloudStatus(false);
        });
}

// Cargar datos desde la nube asociados al UID del usuario autenticado
function loadCloudData(callback) {
    if (!currentUserId) return;

    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse";
        statusEl.title = "Sincronizando con la nube...";
    }

    db.ref('users/' + currentUserId).once('value')
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
                loadProfile(); // Actualizar inputs del perfil visualmente
            } else {
                saveCloudData(); // Guardar por primera vez si está vacía la cuenta
            }
            if (callback) callback();
        })
        .catch((error) => {
            console.error("Error al cargar de Firebase:", error);
            updateCloudStatus(false);
            if (callback) callback();
        });
}

function updateCloudStatus(isOnline) {
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = `inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-500'}`;
        statusEl.title = isOnline ? 'Conectado a la nube (Firebase)' : 'Desconectado';
    }
}
