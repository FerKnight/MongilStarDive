function openAvatarSelectorModal() {
    const modal = document.getElementById('avatarModal');
    const grid = document.getElementById('avatarGrid');

    if (grid && typeof charactersData !== 'undefined') {
        grid.innerHTML = charactersData.map(c => `
            <div onclick="selectAvatarImage('${c.image}')" class="aspect-square rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 overflow-hidden cursor-pointer transition transform active:scale-95 group relative">
                <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-200" onerror="handleImageError(this, '${c.name}')">
                <span class="absolute bottom-0 inset-x-0 bg-black/80 text-slate-200 text-[8px] text-center font-semibold truncate py-0.5 px-1">${c.name}</span>
            </div>
        `).join('');
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeAvatarSelectorModal() {
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function selectAvatarImage(imagePath) {
    const imgEl = document.getElementById('avatarImg');
    if (imgEl) {
        imgEl.src = imagePath;
    }
    closeAvatarSelectorModal();
    saveProfile();
}

function saveProfile() {
    const avatarImg = document.getElementById('avatarImg');
    const profile = {
        name: document.getElementById('pName') ? document.getElementById('pName').value : '',
        friendCode: document.getElementById('pFriendCode') ? document.getElementById('pFriendCode').value : '',
        message: document.getElementById('pMessage') ? document.getElementById('pMessage').value : '',
        avatar: avatarImg ? avatarImg.src : 'assets/images/Character_Portrait/portrait_Verna_01.png'
    };
    localStorage.setItem('mongil_player_profile', JSON.stringify(profile));
    
    if (profile.friendCode && typeof saveCloudData === 'function') {
        saveCloudData();
    } else if (typeof showToast === 'function') {
        showToast('Guardado localmente');
    }
}

function loadProfile() {
    const saved = localStorage.getItem('mongil_player_profile');
    const syncStatusBadge = document.getElementById('syncStatusBadge');
    const authBox = document.getElementById('authBox');
    const profileBox = document.getElementById('profileBox');

    if (saved) {
        const profile = JSON.parse(saved);
        if (profile.name && document.getElementById('pName')) document.getElementById('pName').value = profile.name;
        if (profile.friendCode && document.getElementById('pFriendCode')) document.getElementById('pFriendCode').value = profile.friendCode;
        if (profile.message && document.getElementById('pMessage')) document.getElementById('pMessage').value = profile.message;
        if (profile.avatar) {
            const avatarImg = document.getElementById('avatarImg');
            if (avatarImg) avatarImg.src = profile.avatar;
        }

        // Mostrar estado según si está vinculado a la nube o no
        if (profile.friendCode) {
            if (syncStatusBadge) syncStatusBadge.innerText = "Sincronizado por Código";
            if (authBox) authBox.classList.add('hidden');
            if (profileBox) profileBox.classList.remove('hidden');
        } else {
            if (syncStatusBadge) syncStatusBadge.innerText = "Modo Local Anónimo";
            if (authBox) authBox.classList.remove('hidden');
            if (profileBox) profileBox.classList.add('hidden');
        }
    }
}

// Iniciar sesión / Vincular con Código de Amistad
function handleLoginSubmit() {
    const nameInput = document.getElementById('loginName');
    const codeInput = document.getElementById('loginCode');

    const name = nameInput ? nameInput.value.trim() : '';
    const code = codeInput ? codeInput.value.trim() : '';

    if (!code) {
        if (typeof showToast === 'function') showToast('Ingresa un Código de Amistad');
        return;
    }

    const profile = {
        name: name || 'DiveMaster',
        friendCode: code,
        message: '¡Explorando Belana!',
        avatar: 'assets/images/Character_Portrait/portrait_Verna_01.png'
    };

    localStorage.setItem('mongil_player_profile', JSON.stringify(profile));
    loadProfile();

    if (typeof connectAndCheckSync === 'function') {
        connectAndCheckSync(code);
    }
}

// Cerrar Sesión y regresar al Modo Local Anónimo
function handleUnlinkAccount() {
    localStorage.removeItem('mongil_player_profile');
    loadProfile();
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        statusEl.className = "inline-block w-2 h-2 rounded-full bg-slate-500";
        statusEl.title = "Modo Local (Offline)";
    }
    if (typeof showToast === 'function') showToast('Desconectado de la nube (Modo Local)');
}

// Abrir Modal de Conflicto de Datos
function openConflictModal(cloudData) {
    const modal = document.getElementById('conflictModal');
    const cloudDateEl = document.getElementById('cloudLastUpdated');
    
    if (cloudDateEl && cloudData.lastUpdated) {
        const date = new Date(cloudData.lastUpdated);
        cloudDateEl.innerText = date.toLocaleString();
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Elección 1 del Usuario: Aceptar datos de la Nube
function resolveConflictUseCloud() {
    if (window.tempCloudData && typeof applyCloudData === 'function') {
        applyCloudData(window.tempCloudData);
        if (typeof showToast === 'function') showToast('¡Datos cargados desde la Nube!');
    }
    closeConflictModal();
}

// Elección 2 del Usuario: Sobrescribir la Nube con los datos Locales
function resolveConflictUseLocal() {
    if (typeof saveCloudData === 'function') {
        saveCloudData(true);
        if (typeof showToast === 'function') showToast('¡Nube sobrescrita con el avance local!');
    }
    closeConflictModal();
}

function closeConflictModal() {
    const modal = document.getElementById('conflictModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function copyField(elementId) {
    const input = document.getElementById(elementId);
    if (input) {
        input.select();
        navigator.clipboard.writeText(input.value);
        if (typeof showToast === 'function') showToast('¡Copiado al portapapeles!');
    }
}
