// LÓGICA DE PERFIL DE JUGADOR Y GUARDADO LOCAL/NUBE
const PROFILE_STORAGE_KEY = 'mongil_player_profile';

// Estructura por defecto del perfil de usuario
const defaultProfile = {
    avatar: 'assets/images/Character_Portrait/portrait_Verna_01.png',
    name: '',
    friendCode: '',
    message: '',
    lastUpdated: null,
    syncVersion: 1
};

// Cargar perfil guardado al iniciar
function loadProfile() {
    try {
        const savedData = localStorage.getItem(PROFILE_STORAGE_KEY);
        const profile = savedData ? { ...defaultProfile, ...JSON.parse(savedData) } : defaultProfile;

        // Cargar valores en los inputs y elementos visuales
        const pName = document.getElementById('pName');
        const pFriendCode = document.getElementById('pFriendCode');
        const pMessage = document.getElementById('pMessage');
        const avatarImg = document.getElementById('avatarImg');

        if (pName) pName.value = profile.name || '';
        if (pFriendCode) pFriendCode.value = profile.friendCode || '';
        if (pMessage) pMessage.value = profile.message || '';
        if (avatarImg) avatarImg.src = profile.avatar || defaultProfile.avatar;

    } catch (e) {
        console.error("Error al cargar el perfil de usuario:", e);
    }
}

// Guardar cambios en localStorage
function saveProfile() {
    try {
        const currentProfile = {
            avatar: document.getElementById('avatarImg')?.src || defaultProfile.avatar,
            name: document.getElementById('pName')?.value.trim() || '',
            friendCode: document.getElementById('pFriendCode')?.value.trim() || '',
            message: document.getElementById('pMessage')?.value.trim() || '',
            lastUpdated: new Date().toISOString(),
            syncVersion: 1
        };

        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(currentProfile));
    } catch (e) {
        console.error("Error al guardar el perfil:", e);
    }
}

// Copiar un campo al portapapeles con feedback
function copyField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field || !field.value) {
        showToast('¡El campo está vacío!');
        return;
    }

    navigator.clipboard.writeText(field.value).then(() => {
        showToast('¡Copiado al portapapeles!');
    }).catch(err => {
        // Fallback si la Clipboard API falla
        field.select();
        document.execCommand('copy');
        showToast('¡Copiado al portapapeles!');
    });
}

// Mostrar notificación Toast dinámica
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('translate-x-full');

    setTimeout(() => {
        toast.classList.add('translate-x-full');
    }, 2500);
}

// Modal de Selección de Avatar
function openAvatarSelectorModal() {
    const modal = document.getElementById('avatarModal');
    const grid = document.getElementById('avatarGrid');
    if (!modal || !grid) return;

    grid.innerHTML = '';

    // Cargar retratos disponibles desde personajes si existen o fallback
    const characters = typeof charactersData !== 'undefined' ? charactersData : [];

    if (characters.length > 0) {
        characters.forEach(char => {
            const cleanName = char.nombre.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const portraitPath = `assets/images/Character_Portrait/portrait_${char.nombre.replace(/\s+/g, '')}_01.png`;

            const item = document.createElement('div');
            item.className = "w-16 h-16 rounded-full p-0.5 bg-brand-card border border-purple-500/30 hover:border-cyan-400 cursor-pointer overflow-hidden transition active:scale-95 flex items-center justify-center";
            item.onclick = () => selectAvatar(portraitPath);
            item.innerHTML = `<img src="${portraitPath}" alt="${char.nombre}" class="w-full h-full rounded-full object-cover object-top bg-slate-900" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">`;
            grid.appendChild(item);
        });
    } else {
        // Avatares por defecto si la base de personajes no ha cargado aún
        const defaultAvatars = [
            'assets/images/Character_Portrait/portrait_Verna_01.png'
        ];
        defaultAvatars.forEach(path => {
            const item = document.createElement('div');
            item.className = "w-16 h-16 rounded-full p-0.5 bg-brand-card border border-purple-500/30 hover:border-cyan-400 cursor-pointer overflow-hidden transition active:scale-95 flex items-center justify-center";
            item.onclick = () => selectAvatar(path);
            item.innerHTML = `<img src="${path}" alt="Avatar" class="w-full h-full rounded-full object-cover object-top bg-slate-900">`;
            grid.appendChild(item);
        });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAvatarSelectorModal() {
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function selectAvatar(path) {
    const avatarImg = document.getElementById('avatarImg');
    if (avatarImg) {
        avatarImg.src = path;
    }
    saveProfile();
    closeAvatarSelectorModal();
    showToast('Avatar actualizado');
}

// ESTRUCTURA Y HOOKS PREPARADOS PARA FUTURA SINCRONIZACIÓN ENTRE DISPOSITIVOS
const SyncManager = {
    // Exportar todo el estado del perfil y avance a un objeto JSON
    exportUserData: function() {
        const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
        const ownedChars = JSON.parse(localStorage.getItem('mongil_owned_characters') || '[]');
        
        return {
            profile: profile,
            ownedCharacters: ownedChars,
            exportedAt: new Date().toISOString(),
            appVersion: '1.4'
        };
    },

    // Importar datos recibidos de otro dispositivo / nube
    importUserData: function(data) {
        if (!data || !data.profile) {
            console.error("Estructura de datos inválida para importar.");
            return false;
        }

        if (data.profile) {
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data.profile));
        }
        if (data.ownedCharacters) {
            localStorage.setItem('mongil_owned_characters', JSON.stringify(data.ownedCharacters));
        }

        loadProfile();
        if (typeof renderCharacters === 'function') renderCharacters();
        showToast('¡Datos sincronizados con éxito!');
        return true;
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});
