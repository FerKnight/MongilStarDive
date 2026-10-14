// Abrir modal de selección de avatares
function openAvatarSelectorModal() {
    const modal = document.getElementById('avatarModal');
    const grid = document.getElementById('avatarGrid');

    if (grid && typeof charactersData !== 'undefined') {
        grid.innerHTML = charactersData.map(c => `
            <div onclick="selectAvatarImage('assets/images/Character_Portrait/portrait_${c.name}_00.png', '${c.name}')" class="aspect-square rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400 overflow-hidden cursor-pointer transition transform active:scale-95 group relative">
                <img src="assets/images/Character_Portrait/portrait_${c.name}_00.png" alt="${c.name}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-200" onerror="handleImageError(this, '${c.name}')">
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

function selectAvatarImage(imagePath, characterName) {
    const imgEl = document.getElementById('avatarImg');
    if (imgEl) {
        imgEl.src = imagePath;
        imgEl.onerror = function() { handleImageError(this, characterName); };
    }
    closeAvatarSelectorModal();
    saveProfile();
}

// Guardado local automático instantáneo al escribir o elegir avatar
function saveProfile() {
    const avatarImg = document.getElementById('avatarImg');
    const profile = {
        name: document.getElementById('pName') ? document.getElementById('pName').value : '',
        friendCode: document.getElementById('pFriendCode') ? document.getElementById('pFriendCode').value : '',
        message: document.getElementById('pMessage') ? document.getElementById('pMessage').value : '',
        avatar: avatarImg ? avatarImg.src : 'assets/images/Character_Portrait/portrait_Verna_01.png'
    };
    
    localStorage.setItem('mongil_player_profile', JSON.stringify(profile));
}

// Cargar perfil guardado localmente
function loadProfile() {
    const saved = localStorage.getItem('mongil_player_profile');
    if (saved) {
        const profile = JSON.parse(saved);
        if (profile.name && document.getElementById('pName')) document.getElementById('pName').value = profile.name;
        if (profile.friendCode && document.getElementById('pFriendCode')) document.getElementById('pFriendCode').value = profile.friendCode;
        if (profile.message && document.getElementById('pMessage')) document.getElementById('pMessage').value = profile.message;
        if (profile.avatar) {
            const avatarImg = document.getElementById('avatarImg');
            if (avatarImg) avatarImg.src = profile.avatar;
        }
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
