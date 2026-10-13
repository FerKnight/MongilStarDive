let deferredPrompt;

// HELPER PARA COLORES Y BADGES ELEMENTALES
function getElementBadge(element) {
    switch (element) {
        case 'Fuego':
            return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40', icon: 'fa-fire' };
        case 'Hielo':
            return { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500/40', icon: 'fa-snowflake' };
        case 'Rayo':
            return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/40', icon: 'fa-bolt' };
        case 'Viento':
            return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', icon: 'fa-wind' };
        case 'Tierra':
            return { bg: 'bg-amber-600/20', text: 'text-amber-400', border: 'border-amber-600/40', icon: 'fa-mountain' };
        default:
            return { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/40', icon: 'fa-circle' };
    }
}

// LÓGICA DE CONFIGURACIÓN Y MODO DE MENÚ
function applyMenuMode(mode) {
    const bottomNav = document.getElementById('bottomNav');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const radioBottom = document.getElementById('radioBottomNav');
    const radioSidebar = document.getElementById('radioSidebarNav');

    if (mode === 'sidebar') {
        if (bottomNav) bottomNav.classList.add('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.remove('hidden');
        if (radioSidebar) radioSidebar.checked = true;
        if (radioBottom) radioBottom.checked = false;
    } else {
        if (bottomNav) bottomNav.classList.remove('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.add('hidden');
        if (radioBottom) radioBottom.checked = true;
        if (radioSidebar) radioSidebar.checked = false;
    }
}

function setMenuMode(mode) {
    localStorage.setItem('mongil_menu_mode', mode);
    applyMenuMode(mode);
    showToast(`Modo cambiado a: ${mode === 'sidebar' ? 'Menú Desplegable' : 'Menú Inferior'}`);
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// LÓGICA DE FILTRADO COMBINABLE DE PERSONAJES
function filterCharacters() {
    const searchInput = document.getElementById('charSearch');
    const sortSelect = document.getElementById('charSort');
    const raritySelect = document.getElementById('charRarity');
    const roleSelect = document.getElementById('charRole');
    const elementSelect = document.getElementById('charElement');

    const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const sortVal = sortSelect ? sortSelect.value : 'default';
    const rarityVal = raritySelect ? raritySelect.value : 'all';
    const roleVal = roleSelect ? roleSelect.value : 'all';
    const elementVal = elementSelect ? elementSelect.value : 'all';

    let filtered = charactersData.filter(c => {
        const matchName = c.name.toLowerCase().includes(searchVal);
        const matchRarity = rarityVal === 'all' || c.rarity === rarityVal;
        const matchRole = roleVal === 'all' || c.role === roleVal;
        const matchElement = elementVal === 'all' || c.element === elementVal;
        return matchName && matchRarity && matchRole && matchElement;
    });

    if (sortVal === 'az') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'za') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortVal === 'rarity-desc') {
        filtered.sort((a, b) => b.rarity.localeCompare(a.rarity));
    } else if (sortVal === 'rarity-asc') {
        filtered.sort((a, b) => b.rarity.localeCompare(b.rarity));
    }

    renderCharacterGrid(filtered);
}

function renderCharacterGrid(list) {
    const charGrid = document.getElementById('charGrid');
    const charCount = document.getElementById('charCount');
    
    if (charCount) charCount.innerText = `Mostrando: ${list.length}`;
    if (!charGrid) return;

    if (list.length === 0) {
        charGrid.innerHTML = `
            <div class="col-span-full py-8 text-center text-slate-400 text-xs font-medium">
                <i class="fa-solid fa-filter-circle-xmark text-2xl mb-2 text-slate-500 block"></i>
                No se encontraron personajes con los filtros seleccionados.
            </div>
        `;
        return;
    }

    charGrid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3";

    charGrid.innerHTML = list.map(c => {
        const elemBadge = getElementBadge(c.element);
        return `
            <div onclick="openCharacterModal('${c.id}')" class="bg-brand-card border border-white/10 rounded-xl p-2.5 hover:border-cyan-400 cursor-pointer active:scale-95 transition transform relative overflow-hidden group">
                <div class="w-full h-28 rounded-lg bg-slate-900 overflow-hidden mb-2 relative flex items-center justify-center">
                    <img src="${c.image}" alt="${c.name}" loading="lazy" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300" onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Verna_01.png';">
                    <span class="absolute top-1 right-1 bg-black/70 backdrop-blur-md text-yellow-400 font-bold text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/30">${c.rarity}</span>
                </div>
                <div class="truncate mb-1">
                    <h3 class="font-title font-bold text-xs text-slate-100 truncate">${c.name}</h3>
                </div>
                <div class="flex items-center justify-between gap-1">
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${elemBadge.bg} ${elemBadge.text} border ${elemBadge.border}">
                        <i class="fa-solid ${elemBadge.icon}"></i> ${c.element}
                    </span>
                    <span class="text-[9px] text-purple-300 font-semibold truncate">${c.role}</span>
                </div>
            </div>
        `;
    }).join('');
}

// MODAL INTERACTIVO CON DETALLES COMPLETOS
function openCharacterModal(charId) {
    const char = charactersData.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('charModal');
    const modalContent = document.getElementById('charModalContent');
    const elemBadge = getElementBadge(char.element);

    modalContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div class="flex items-center gap-3">
                <img src="${char.image}" alt="${char.name}" class="w-16 h-16 rounded-xl object-cover object-top border border-purple-500/40 shadow-lg bg-slate-900" onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Verna_01.png';">
                <div>
                    <h3 class="font-title font-black text-lg text-slate-100">${char.name}</h3>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-xs text-yellow-400 font-bold">${char.rarity}</span>
                        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${elemBadge.bg} ${elemBadge.text} border ${elemBadge.border}">
                            <i class="fa-solid ${elemBadge.icon}"></i> ${char.element}
                        </span>
                        <span class="text-xs text-purple-300 font-semibold">${char.role}</span>
                    </div>
                </div>
            </div>
            <button onclick="closeCharacterModal()" class="w-8 h-8 rounded-lg bg-brand-card hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="space-y-3 text-xs">
            <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Arma Principal</span>
                <p class="text-slate-200 font-semibold"><i class="fa-solid fa-shield-halved text-cyan-400"></i> ${char.weapon}</p>
            </div>
            <div>
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Descripción General</span>
                <p class="text-slate-300 leading-relaxed">${char.desc}</p>
            </div>
            <div class="bg-brand-card/60 p-2.5 rounded-lg border border-white/5 space-y-1.5">
                <span class="block text-[10px] font-bold text-purple-400 uppercase tracking-wider">Habilidad Pasiva</span>
                <p class="text-slate-300">${char.skillPassive}</p>
            </div>
            <div class="bg-brand-card/60 p-2.5 rounded-lg border border-white/5 space-y-1.5">
                <span class="block text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Habilidad Activa Principal</span>
                <p class="text-slate-300">${char.skillActive}</p>
            </div>
            <div class="bg-purple-950/40 p-2.5 rounded-lg border border-purple-500/20">
                <span class="block text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Sinergia Monsterling Recomendada</span>
                <p class="text-slate-200 font-semibold"><i class="fa-solid fa-paw text-yellow-400"></i> ${char.monsterlingCombo}</p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCharacterModal() {
    const modal = document.getElementById('charModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function renderAll() {
    filterCharacters();

    const equipGrid = document.getElementById('equipGrid');
    if (equipGrid) {
        equipGrid.innerHTML = equipData.map(e => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${e.image}" alt="${e.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start mb-0.5">
                        <h3 class="font-title font-bold text-sm text-purple-300 truncate">${e.name}</h3>
                        <span class="text-xs text-yellow-400 font-bold">${e.rarity}</span>
                    </div>
                    <p class="text-xs text-cyan-400 font-semibold mb-1">${e.type} | ${e.stat}</p>
                    <p class="text-[11px] text-slate-400 line-clamp-2">${e.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const monsterGrid = document.getElementById('monsterGrid');
    if (monsterGrid) {
        monsterGrid.innerHTML = monsterData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${m.image}" alt="${m.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <h3 class="font-title font-bold text-sm text-slate-100 truncate">${m.name}</h3>
                    <p class="text-[10px] text-purple-400 mb-1">${m.habitat} • <span class="text-slate-300">${m.rarity}</span></p>
                    <p class="text-[11px] text-slate-400 line-clamp-2"><strong class="text-slate-200">Habilidad:</strong> ${m.skill}</p>
                </div>
            </div>
        `).join('');
    }

    const artifactGrid = document.getElementById('artifactGrid');
    if (artifactGrid) {
        artifactGrid.innerHTML = artifactData.map(a => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${a.image}" alt="${a.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <h3 class="font-title font-bold text-sm text-cyan-300 mb-1 truncate">${a.name}</h3>
                    <p class="text-[11px] text-slate-300 mb-0.5"><strong>(2 Pcs):</strong> ${a.set2}</p>
                    <p class="text-[11px] text-slate-400"><strong>(4 Pcs):</strong> ${a.set4}</p>
                </div>
            </div>
        `).join('');
    }

    // Resto de renders (builds, mapas, eventos, novedades)...
    // ...
}

    const buildsList = document.getElementById('buildsList');
    if (buildsList) {
        buildsList.innerHTML = buildsData.map(b => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4">
                <h3 class="font-title font-bold text-base text-purple-300 mb-1">${b.name}</h3>
                <p class="text-xs text-cyan-400 font-semibold mb-2">Equipo: ${b.chars}</p>
                <p class="text-xs text-slate-300">${b.desc}</p>
            </div>
        `).join('');
    }

    const mapGrid = document.getElementById('mapGrid');
    if (mapGrid) {
        mapGrid.innerHTML = mapData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3">
                <h3 class="font-title font-bold text-sm text-cyan-400 mb-1"><i class="fa-solid fa-location-dot"></i> ${m.region}</h3>
                <p class="text-xs text-slate-300">${m.desc}</p>
            </div>
        `).join('');
    }

    const eventsList = document.getElementById('eventsList');
    if (eventsList) {
        eventsList.innerHTML = eventsData.map(ev => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex justify-between items-center">
                <div>
                    <h3 class="font-title font-bold text-sm text-slate-100">${ev.title}</h3>
                    <p class="text-xs text-slate-400">${ev.desc}</p>
                </div>
                <span class="text-[10px] px-2 py-1 bg-purple-900/60 text-purple-300 rounded font-semibold whitespace-nowrap">${ev.date}</span>
            </div>
        `).join('');
    }

    const newsList = document.getElementById('newsList');
    if (newsList) {
        newsList.innerHTML = newsData.map(n => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4">
                <span class="text-[10px] px-2 py-0.5 bg-cyan-900/60 text-cyan-300 rounded font-bold tracking-wider">${n.tag}</span>
                <h3 class="font-title font-bold text-base text-slate-100 mt-2 mb-1">${n.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed">${n.desc}</p>
            </div>
        `).join('');
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) targetSection.classList.add('active');

    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetNav) targetNav.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveProfile() {
    const profile = {
        name: document.getElementById('pName').value,
        uid: document.getElementById('pUID').value,
        friendCode: document.getElementById('pFriendCode').value,
        message: document.getElementById('pMessage').value,
        icon: document.getElementById('avatarIcon').className
    };
    localStorage.setItem('mongil_player_profile', JSON.stringify(profile));
    showToast('Perfil guardado correctamente');
}

function loadProfile() {
    const saved = localStorage.getItem('mongil_player_profile');
    if (saved) {
        const profile = JSON.parse(saved);
        if (profile.name) document.getElementById('pName').value = profile.name;
        if (profile.uid) document.getElementById('pUID').value = profile.uid;
        if (profile.friendCode) document.getElementById('pFriendCode').value = profile.friendCode;
        if (profile.message) document.getElementById('pMessage').value = profile.message;
        if (profile.icon) document.getElementById('avatarIcon').className = profile.icon;
    }
}

function setAvatar(iconClass) {
    document.getElementById('avatarIcon').className = `fa-solid ${iconClass}`;
    saveProfile();
}

function copyField(elementId) {
    const input = document.getElementById(elementId);
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('¡Copiado al portapapeles!');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        document.getElementById('toastMsg').innerText = msg;
        toast.classList.remove('translate-x-full');
        setTimeout(() => toast.classList.add('translate-x-full'), 2500);
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('installPwaBtn');
    if (btn) btn.classList.remove('hidden');
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                document.getElementById('installPwaBtn').classList.add('hidden');
            }
            deferredPrompt = null;
        });
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registrado con éxito', reg))
            .catch(err => console.log('Error al registrar SW', err));
    });
}

window.onload = function() {
    const savedMenuMode = localStorage.getItem('mongil_menu_mode') || 'bottom';
    applyMenuMode(savedMenuMode);
    renderAll();
    loadProfile();
};
