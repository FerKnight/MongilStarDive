let userCollection = JSON.parse(localStorage.getItem('mongil_user_collection')) || {};

function saveUserCollection() {
    localStorage.setItem('mongil_user_collection', JSON.stringify(userCollection));
    updateOwnedCounter();
}

function updateOwnedCounter() {
    const totalChars = charactersData.length;
    let ownedChars = 0;
    
    charactersData.forEach(c => {
        if (userCollection[c.id] && userCollection[c.id].owned) {
            ownedChars++;
        }
    });

    const ownedBadge = document.getElementById('ownedCount');
    if (ownedBadge) {
        ownedBadge.innerText = `${ownedChars}/${totalChars}`;
    }
}

function getCharData(id) {
    if (!userCollection[id]) {
        userCollection[id] = {
            owned: false,
            awakening: 0,
            skills: { basic: 1, relay: 1, special: 1, charged: 1 },
            equip: [null, null, null, null],
            artifact: null,
            monsterlings: { link: null, normal1: null, normal2: null, legendary: null }
        };
    }
    if (!userCollection[id].equip) userCollection[id].equip = [null, null, null, null];
    if (!userCollection[id].monsterlings) {
        userCollection[id].monsterlings = { link: null, normal1: null, normal2: null, legendary: null };
    }
    return userCollection[id];
}

function getMaxSkillLevel(awakening) {
    if (awakening >= 5) return 16;
    if (awakening >= 3) return 14;
    return 12;
}

function toggleCharOwned(event, id) {
    if (event) event.stopPropagation();
    const data = getCharData(id);
    data.owned = !data.owned;
    saveUserCollection();
    filterCharacters();
    
    const modal = document.getElementById('charModal');
    if (modal && !modal.classList.contains('hidden')) {
        openCharacterModal(id);
    }
}

function changeAwakening(id, delta) {
    const data = getCharData(id);
    if (!data.owned) return;

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

function changeSkillLevel(id, skillType, delta) {
    const data = getCharData(id);
    if (!data.owned) return;

    const maxSkill = getMaxSkillLevel(data.awakening || 0);
    let current = data.skills[skillType] || 1;
    let newVal = current + delta;

    if (newVal < 1) newVal = 1;
    if (newVal > maxSkill) newVal = maxSkill;

    data.skills[skillType] = newVal;
    saveUserCollection();
    openCharacterModal(id);
    filterCharacters();
}

function handleImageError(img, characterName) {
    if (img.src.includes('_00.png')) {
        img.src = img.src.replace('_00.png', '_01.png');
    } else {
        img.onerror = null;
        img.src = 'assets/images/Character_Portrait/portrait_Verna_01.png';
    }
}

function getElementIconHTML(element) {
    let iconFile = 'fire.png';
    switch (element) {
        case 'Fuego': iconFile = 'fire.png'; break;
        case 'Hielo': iconFile = 'ice.png'; break;
        case 'Rayo': iconFile = 'lightning.png'; break;
        case 'Viento': iconFile = 'wind.png'; break;
        case 'Tierra': iconFile = 'earth.png'; break;
    }
    const path = `assets/images/elements/icons/${iconFile}`;
    return `<img src="${path}" alt="${element}" title="${element}" class="w-4 h-4 object-contain inline-block">`;
}

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

    charGrid.className = "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-3";

    charGrid.innerHTML = list.map(c => {
        const uData = getCharData(c.id);
        const isOwned = uData.owned;
        const elementIcon = getElementIconHTML(c.element);

        return `
            <div onclick="openCharacterModal('${c.id}')" class="bg-brand-card border ${isOwned ? 'border-cyan-400/80 shadow-md shadow-cyan-950/50' : 'border-white/10 opacity-70'} rounded-lg p-1 sm:p-2 hover:border-cyan-400 cursor-pointer transition transform relative overflow-hidden group">
                
                <button onclick="toggleCharOwned(event, '${c.id}')" class="absolute top-1 left-1 z-10 w-4 h-4 sm:w-5 sm:h-5 rounded ${isOwned ? 'bg-cyan-500 text-white' : 'bg-slate-900/80 text-slate-500 border border-white/20'} flex items-center justify-center text-[9px] sm:text-xs shadow-md transition active:scale-90">
                    <i class="fa-solid fa-check"></i>
                </button>

                ${isOwned && uData.awakening > 0 ? `
                    <span class="absolute bottom-8 sm:bottom-10 right-1 z-10 bg-purple-600/90 text-white text-[8px] sm:text-[9px] font-extrabold px-1 py-0.2 rounded border border-purple-400">
                        D${uData.awakening}
                    </span>
                ` : ''}

                <div class="w-full h-16 sm:h-24 rounded-md bg-slate-900 overflow-hidden mb-1 relative flex items-center justify-center">
                    <img src="${c.image}" alt="${c.name}" loading="lazy" class="w-full h-full object-cover object-top ${isOwned ? '' : 'grayscale'} group-hover:scale-105 transition duration-300" onerror="handleImageError(this, '${c.name}')">
                    <span class="absolute top-0.5 right-0.5 bg-black/70 backdrop-blur-md text-yellow-400 font-bold text-[8px] sm:text-[10px] px-1 py-0.2 rounded border border-yellow-500/30">${c.rarity}</span>
                </div>
                
                <div class="truncate mb-0.5 text-center sm:text-left">
                    <h3 class="font-title font-bold text-[10px] sm:text-xs text-slate-100 truncate">${c.name}</h3>
                </div>

                ${isOwned ? `
                    <div class="grid grid-cols-4 gap-0.5 bg-slate-900/80 rounded p-0.5 mb-1 text-[7px] text-center font-mono">
                        <span class="text-cyan-400" title="Básico">B:${uData.skills.basic}</span>
                        <span class="text-purple-400" title="Relevo">R:${uData.skills.relay}</span>
                        <span class="text-yellow-400" title="Especial">E:${uData.skills.special}</span>
                        <span class="text-pink-400" title="Cargado">C:${uData.skills.charged}</span>
                    </div>
                ` : ''}
                
                <div class="flex items-center justify-between gap-0.5">
                    <span class="p-0.5 rounded bg-slate-800/80 border border-white/10 flex items-center justify-center">
                        ${elementIcon}
                    </span>
                    <span class="text-[8px] sm:text-[9px] text-purple-300 font-semibold truncate">${c.role}</span>
                </div>
            </div>
        `;
    }).join('');
}

function openCharacterModal(charId) {
    const char = charactersData.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('charModal');
    const modalContent = document.getElementById('charModalContent');
    const uData = getCharData(char.id);
    const isOwned = uData.owned;
    const elementIcon = getElementIconHTML(char.element);

    modalContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div class="flex items-center gap-3">
                <img src="${char.image}" alt="${char.name}" class="w-14 h-14 rounded-xl object-cover object-top border border-purple-500/40 shadow-lg bg-slate-900 ${isOwned ? '' : 'grayscale'}" onerror="handleImageError(this, '${char.name}')">
                <div>
                    <div class="flex items-center gap-2">
                        <h3 class="font-title font-black text-base text-slate-100">${char.name}</h3>
                        <div class="flex items-center gap-1 bg-brand-card/90 px-2 py-0.5 rounded-lg border border-purple-500/30 ${isOwned ? '' : 'opacity-40 pointer-events-none'}">
                            <button onclick="changeAwakening('${char.id}', -1)" class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                            <span class="font-title font-black text-xs text-purple-300 w-5 text-center">D${uData.awakening}</span>
                            <button onclick="changeAwakening('${char.id}', 1)" class="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-xs text-yellow-400 font-bold">${char.rarity}</span>
                        <span class="p-1 rounded bg-slate-800 border border-white/10 flex items-center justify-center">
                            ${elementIcon}
                        </span>
                        <span class="text-xs text-purple-300 font-semibold">${char.role}</span>
                    </div>
                </div>
            </div>
            <button onclick="closeCharacterModal()" class="w-8 h-8 rounded-lg bg-brand-card hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="mb-3 p-2 rounded-xl bg-brand-card/90 border border-white/10 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-200">¿Tienes a este personaje?</span>
            <button onclick="toggleCharOwned(null, '${char.id}')" class="px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${isOwned ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 border border-white/10'}">
                <i class="fa-solid ${isOwned ? 'fa-check' : 'fa-plus'}"></i>
                <span>${isOwned ? 'Obtenido' : 'No obtenido'}</span>
            </button>
        </div>

        <div class="space-y-4 text-xs max-h-[65vh] overflow-y-auto pr-1 relative">
            ${!isOwned ? `
                <div class="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[11px] text-center font-medium flex items-center justify-center gap-2">
                    <i class="fa-solid fa-lock text-purple-400"></i> Marca este personaje como <strong>Obtenido</strong> para modificar sus estadísticas.
                </div>
            ` : ''}

            <div class="space-y-1.5 ${isOwned ? '' : 'opacity-40 pointer-events-none select-none'}">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider">Nivel de Ataques</span>
                <div class="grid grid-cols-2 gap-2">
                    <div class="bg-brand-card/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between items-center text-center gap-1.5">
                        <span class="font-bold text-cyan-400 text-xs">Básico</span>
                        <div class="flex items-center gap-2">
                            <button onclick="changeSkillLevel('${char.id}', 'basic', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                            <span class="text-xs font-mono font-bold text-slate-100 w-5 text-center">${uData.skills.basic}</span>
                            <button onclick="changeSkillLevel('${char.id}', 'basic', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                        </div>
                    </div>
                    <div class="bg-brand-card/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between items-center text-center gap-1.5">
                        <span class="font-bold text-purple-400 text-xs">Relevo</span>
                        <div class="flex items-center gap-2">
                            <button onclick="changeSkillLevel('${char.id}', 'relay', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                            <span class="text-xs font-mono font-bold text-slate-100 w-5 text-center">${uData.skills.relay}</span>
                            <button onclick="changeSkillLevel('${char.id}', 'relay', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                        </div>
                    </div>
                    <div class="bg-brand-card/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between items-center text-center gap-1.5">
                        <span class="font-bold text-yellow-400 text-xs">Especial</span>
                        <div class="flex items-center gap-2">
                            <button onclick="changeSkillLevel('${char.id}', 'special', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                            <span class="text-xs font-mono font-bold text-slate-100 w-5 text-center">${uData.skills.special}</span>
                            <button onclick="changeSkillLevel('${char.id}', 'special', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                        </div>
                    </div>
                    <div class="bg-brand-card/80 p-2.5 rounded-xl border border-white/10 flex flex-col justify-between items-center text-center gap-1.5">
                        <span class="font-bold text-pink-400 text-xs">Cargado</span>
                        <div class="flex items-center gap-2">
                            <button onclick="changeSkillLevel('${char.id}', 'charged', -1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">-</button>
                            <span class="text-xs font-mono font-bold text-slate-100 w-5 text-center">${uData.skills.charged}</span>
                            <button onclick="changeSkillLevel('${char.id}', 'charged', 1)" class="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center justify-center border border-white/10 cursor-pointer">+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-1.5 ${isOwned ? '' : 'opacity-40 pointer-events-none select-none'}">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider">Equipamientos y Artefacto</span>
                <div class="grid grid-cols-5 gap-2">
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-helmet-safety text-cyan-400 text-sm mb-1"></i><span class="text-[9px] text-slate-400 font-semibold">Casco</span></div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-shirt text-cyan-400 text-sm mb-1"></i><span class="text-[9px] text-slate-400 font-semibold">Pechera</span></div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-mitten text-cyan-400 text-sm mb-1"></i><span class="text-[9px] text-slate-400 font-semibold">Guantes</span></div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-socks text-cyan-400 text-sm mb-1"></i><span class="text-[9px] text-slate-400 font-semibold">Botas</span></div>
                    <div class="aspect-square bg-purple-950/40 border border-purple-500/50 rounded-xl flex flex-col items-center justify-center p-1 text-center hover:border-purple-400 transition cursor-pointer"><i class="fa-solid fa-gem text-purple-400 text-sm mb-1"></i><span class="text-[9px] text-purple-300 font-bold">Artefacto</span></div>
                </div>
            </div>

            <div class="space-y-1.5 ${isOwned ? '' : 'opacity-40 pointer-events-none select-none'}">
                <span class="block font-title font-bold text-[11px] text-slate-300 uppercase tracking-wider">Monsterlings</span>
                <div class="grid grid-cols-4 gap-2">
                    <div class="aspect-square bg-amber-950/30 border-2 border-yellow-500 rounded-xl flex flex-col items-center justify-center p-1 text-center shadow-lg shadow-yellow-950/40 hover:scale-105 transition cursor-pointer"><i class="fa-solid fa-link text-yellow-400 text-base mb-1"></i><span class="text-[9px] text-yellow-300 font-extrabold">Link</span></div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-paw text-slate-400 text-lg"></i></div>
                    <div class="aspect-square bg-slate-900/90 border border-white/10 rounded-xl flex items-center justify-center hover:border-cyan-400 transition cursor-pointer"><i class="fa-solid fa-paw text-slate-400 text-lg"></i></div>
                    <div class="aspect-square bg-red-950/40 border border-red-500/60 rounded-xl flex items-center justify-center hover:border-red-400 transition cursor-pointer"><i class="fa-solid fa-dragon text-red-400 text-lg"></i></div>
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
