let deferredPrompt;

// ESTADO DE COLECCIÓN Y PROGRESIÓN
let userCollection = JSON.parse(localStorage.getItem('mongil_user_collection')) || {};

function saveUserCollection() {
    localStorage.setItem('mongil_user_collection', JSON.stringify(userCollection));
}

function getCharData(id) {
    if (!userCollection[id]) {
        userCollection[id] = {
            owned: false,
            awakening: 0,
            skills: { basic: 1, relay: 1, special: 1, charged: 1 },
            equip: [null, null, null, null],
            artifact: null,
            monsterlings: {
                link: null,
                normal1: null,
                normal2: null,
                legendary: null
            }
        };
    }
    if (!userCollection[id].equip) userCollection[id].equip = [null, null, null, null];
    if (!userCollection[id].monsterlings) {
        userCollection[id].monsterlings = { link: null, normal1: null, normal2: null, legendary: null };
    }
    return userCollection[id];
}

// CÁLCULO DE MÁXIMO NIVEL DE HABILIDAD SEGÚN DESPERTARES
function getMaxSkillLevel(awakening) {
    if (awakening >= 5) return 16;
    if (awakening >= 3) return 14;
    return 12; // 0, 1 o 2 despertares
}

function toggleCharOwned(event, id) {
    event.stopPropagation();
    const data = getCharData(id);
    data.owned = !data.owned;
    saveUserCollection();
    filterCharacters();
}

// CAMBIAR DESPERTARES Y CAPAR HABILIDADES SI EXCEDEN EL NUEVO MÁXIMO
function changeAwakening(id, delta) {
    const data = getCharData(id);
    let newVal = (data.awakening || 0) + delta;
    if (newVal < 0) newVal = 0;
    if (newVal > 6) newVal = 6;
    data.awakening = newVal;

    const maxSkill = getMaxSkillLevel(newVal);
    ['basic', 'relay', 'special', 'charged'].forEach(s => {
        if (data.skills[s] > maxSkill) {
            data.skills[s] = maxSkill;
        }
    });

    saveUserCollection();
    openCharacterModal(id);
    filterCharacters();
}

// CAMBIAR NIVEL DE HABILIDAD SEGÚN LÍMITE
function changeSkillLevel(id, skillType, delta) {
    const data = getCharData(id);
    const maxSkill = getMaxSkillLevel(data.awakening || 0);
    let current = data.skills[skillType] || 1;
    let newVal = current + delta;

    if (newVal < 1) newVal = 1;
    if (newVal > maxSkill) newVal = maxSkill;

    data.skills[skillType] = newVal;
    saveUserCollection();
    openCharacterModal(id);
}

// HELPER DE COLORES
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

// PESTAÑAS
function switchTab(tabId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(el => el.classList.remove('active'));

    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }

    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetNav) {
        targetNav.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CONFIGURACIÓN MENÚ
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

// FILTRADO DE PERSONAJES
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
        filtered.sort((a, b) => a.rarity.localeCompare(b.rarity));
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
        const uData = getCharData(c.id);
        const isOwned = uData.owned;

        return `
            <div onclick="openCharacterModal('${c.id}')" class="bg-brand-card border ${isOwned ? 'border-cyan-400/80 shadow-md shadow-cyan-950/50' : 'border-white/10 opacity-70'} rounded-xl p-2.5 hover:border-cyan-400 cursor-pointer transition transform relative overflow-hidden group">
                
                <button onclick="toggleCharOwned(event, '${c.id}')" class="absolute top-2 left-2 z-10 w-6 h-6 rounded-md ${isOwned ? 'bg-cyan-500 text-white' : 'bg-slate-900/80 text-slate-500 border border-white/20'} flex items-center justify-center text-xs shadow-md transition active:scale-90">
                    <i class="fa-solid fa-check"></i>
                </button>

                ${isOwned && uData.awakening > 0 ? `
                    <span class="absolute bottom-11 right-2 z-10 bg-purple-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-purple-400">
                        D${uData.awakening}
                    </span>
                ` : ''}

                <div class="w-full h-28 rounded-lg bg-slate-900 overflow-hidden mb-2 relative flex items-center justify-center">
                    <img src="${c.image}" alt="${c.name}" loading="lazy" class="w-full h-full object-cover object-top ${isOwned ? '' : 'grayscale'} group-hover:scale-105 transition duration-300" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                    <span class="absolute top-1 right-1 bg-black/70 backdrop-blur-md text-yellow-400 font-bold text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/30">${c.rarity}</span>
                </div>
                
                <div class="truncate mb-1">
                    <h3 class="font-title font-bold text-xs text-slate-100 truncate">${c.name}</h3>
                </div>
                
                <div class="flex items-center justify-between gap-1">
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${elemBadge.bg} ${elemBadge.text} border${elemBadge.border}">
                        <i class="fa-solid ${elemBadge.icon}"></i> ${c.element}
                    </span>
                    <span class="text-[9px] text-purple-300 font-semibold truncate">${c.role}</span>
                </div>
            </div>
        `;
    }).join('');
}

// MODAL DE DETALLES DEL PERSONAJE
function openCharacterModal(charId) {
    const char = charactersData.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('charModal');
    const modalContent = document.getElementById('charModalContent');
    const elemBadge = getElementBadge(char.element);
    const uData = getCharData(char.id);

    modalContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div class="flex items-center gap-3">
                <img src="${char.image}" alt="${char.name}" class="w-16 h-16 rounded-xl object-cover object-top border border-purple-500/40 shadow-lg bg-slate-900" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div>
                    <h3 class="font-title font-black text-lg text-slate-100">${char.name}</h3>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-xs text-yellow-400 font-bold">${char.rarity}</span>
                        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${elemBadge.bg} ${elemBadge.text} border${elemBadge.border}">
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

        <div class="space-y-4 text-xs max-h-[75vh] overflow-y-auto pr-1">
            
            <!-- CONTROL DE DESPERTARES -->
            <div class="bg-brand-card p-3 rounded-xl border border-purple-500/30 flex items-center justify-between">
                <span class="font-title font-bold text-slate-100 text-xs">Despertares</span>
                <div class="flex items-center gap-2">
                    <button onclick="changeAwakening('${char.id}', -1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-sm flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                    <span class="font-title font-black text-base text-purple-300 w-6 text-center">${uData.awakening}</span>
                    <button onclick="changeAwakening('${char.id}', 1)" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-sm flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                </div>
            </div>

            <!-- NIVELES DE ATAQUES (MUESTRA SOLO EL NIVEL ACTUAL) -->
            <div class="bg-brand-card/60 p-3 rounded-xl border border-white/5 space-y-2">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider mb-1">Nivel de Ataques</span>
                
                <!-- BÁSICO -->
                <div class="flex items-center justify-between py-1 border-b border-white/5">
                    <span class="font-bold text-cyan-400 text-xs">Básico</span>
                    <div class="flex items-center gap-2">
                        <button onclick="changeSkillLevel('${char.id}', 'basic', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">-</button>
                        <span class="text-xs font-mono font-bold text-slate-100 w-6 text-center">${uData.skills.basic}</span>
                        <button onclick="changeSkillLevel('${char.id}', 'basic', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">+</button>
                    </div>
                </div>

                <!-- RELEVO -->
                <div class="flex items-center justify-between py-1 border-b border-white/5">
                    <span class="font-bold text-purple-400 text-xs">Relevo</span>
                    <div class="flex items-center gap-2">
                        <button onclick="changeSkillLevel('${char.id}', 'relay', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">-</button>
                        <span class="text-xs font-mono font-bold text-slate-100 w-6 text-center">${uData.skills.relay}</span>
                        <button onclick="changeSkillLevel('${char.id}', 'relay', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">+</button>
                    </div>
                </div>

                <!-- ESPECIAL -->
                <div class="flex items-center justify-between py-1 border-b border-white/5">
                    <span class="font-bold text-yellow-400 text-xs">Especial</span>
                    <div class="flex items-center gap-2">
                        <button onclick="changeSkillLevel('${char.id}', 'special', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">-</button>
                        <span class="text-xs font-mono font-bold text-slate-100 w-6 text-center">${uData.skills.special}</span>
                        <button onclick="changeSkillLevel('${char.id}', 'special', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">+</button>
                    </div>
                </div>

                <!-- CARGADO -->
                <div class="flex items-center justify-between py-1">
                    <span class="font-bold text-pink-400 text-xs">Cargado</span>
                    <div class="flex items-center gap-2">
                        <button onclick="changeSkillLevel('${char.id}', 'charged', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">-</button>
                        <span class="text-xs font-mono font-bold text-slate-100 w-6 text-center">${uData.skills.charged}</span>
                        <button onclick="changeSkillLevel('${char.id}', 'charged', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10">+</button>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN 5 RECUADROS: EQUIPAMIENTO (CASCO, PECHERA, GUANTES, BOTAS) Y ARTEFACTO -->
            <div class="space-y-1.5">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider">Equipamientos y Artefacto</span>
                <div class="grid grid-cols-5 gap-2">
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-helmet-safety text-cyan-400 text-sm mb-1"></i>
                        <span class="text-[9px] text-slate-400 font-semibold">Casco</span>
                    </div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-shirt text-cyan-400 text-sm mb-1"></i>
                        <span class="text-[9px] text-slate-400 font-semibold">Pechera</span>
                    </div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-mitten text-cyan-400 text-sm mb-1"></i>
                        <span class="text-[9px] text-slate-400 font-semibold">Guantes</span>
                    </div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-socks text-cyan-400 text-sm mb-1"></i>
                        <span class="text-[9px] text-slate-400 font-semibold">Botas</span>
                    </div>
                    <div class="aspect-square bg-purple-950/40 border border-purple-500/50 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-purple-400 transition cursor-pointer">
                        <i class="fa-solid fa-gem text-purple-400 text-sm mb-1"></i>
                        <span class="text-[9px] text-purple-300 font-bold">Artefacto</span>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN 4 RECUADROS: MONSTERLINGS (SOLO ICONOS) -->
            <div class="space-y-1.5">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider">Monsterlings</span>
                <div class="grid grid-cols-4 gap-2">
                    <!-- LINK (DORADO CON TEXTO LINK) -->
                    <div class="aspect-square bg-amber-950/30 border-2 border-yellow-500 rounded-xl flex flex-col items-center justify-center p-1 text-center shadow-lg shadow-yellow-950/40 hover:scale-105 transition cursor-pointer">
                        <i class="fa-solid fa-link text-yellow-400 text-base mb-1"></i>
                        <span class="text-[9px] text-yellow-300 font-extrabold">Link</span>
                    </div>
                    <!-- NORMAL 1 (SOLO ICONO) -->
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-paw text-slate-400 text-lg"></i>
                    </div>
                    <!-- NORMAL 2 (SOLO ICONO) -->
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400 transition cursor-pointer">
                        <i class="fa-solid fa-paw text-slate-400 text-lg"></i>
                    </div>
                    <!-- LEGENDARIO (SOLO ICONO) -->
                    <div class="aspect-square bg-red-950/40 border border-red-500/60 rounded-xl flex items-center justify-center hover:border-red-400 transition cursor-pointer">
                        <i class="fa-solid fa-dragon text-red-400 text-lg"></i>
                    </div>
                </div>
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
                    <p class="text-xs text-cyan-400 font-semibold mb-1">${e.type} \vert{}${e.stat}</p>
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
                <p
