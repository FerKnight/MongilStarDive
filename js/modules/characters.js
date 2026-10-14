// Obtener la ruta de la imagen del personaje según su identificador o nombre especial
function getCharacterImagePath(c) {
    if (c.imageName === "VernaSummer_01") {
        return "assets/images/Character_Portrait/portrait_VernaSummer_01.png";
    }
    if (c.imageName === "FrancisSummer_01") {
        return "assets/images/Character_Portrait/portrait_FrancisSummer_01.png";
    }
    return `assets/images/Character_Portrait/portrait_${c.imageName || c.name}_00.png`;
}

function handleImageError(imgElement, c) {
    const currentSrc = imgElement.src;
    if (currentSrc.includes('_00.png')) {
        imgElement.src = currentSrc.replace('_00.png', '_01.png');
    } else if (!currentSrc.includes('portrait_Verna_01.png')) {
        imgElement.onerror = null;
        imgElement.src = 'assets/images/Character_Portrait/portrait_Verna_01.png';
    }
}

// Obtener el icono del elemento desde assets/images/elements/icons/
function getElementIconHtml(elementName) {
    const map = {
        "Fuego": "fire",
        "Hielo": "ice",
        "Rayo": "lightning",
        "Viento": "wind",
        "Tierra": "earth"
    };
    const fileName = map[elementName] || "fire";
    return `<img src="assets/images/elements/icons/${fileName}.png" alt="${elementName}" class="w-4 h-4 object-contain inline-block" onerror="this.style.display='none'">`;
}

function getUserCollection() {
    return JSON.parse(localStorage.getItem('mongil_user_collection')) || {};
}

function setUserCollection(collection) {
    localStorage.setItem('mongil_user_collection', JSON.stringify(collection));
}

function toggleCharacterOwned(charId) {
    const collection = getUserCollection();
    if (!collection[charId]) {
        collection[charId] = { owned: true, awakening: 0, basic: 1, switch: 1, special: 1, ultimate: 1 };
    } else {
        collection[charId].owned = !collection[charId].owned;
    }
    setUserCollection(collection);
    renderCharacters();
}

function updateCharacterStat(charId, field, value) {
    const collection = getUserCollection();
    if (!collection[charId]) {
        collection[charId] = { owned: true, awakening: 0, basic: 1, switch: 1, special: 1, ultimate: 1 };
    }
    collection[charId][field] = parseInt(value);
    collection[charId].owned = true;
    setUserCollection(collection);
    renderCharacters();
}

function getGridCols() {
    return localStorage.getItem('mongil_grid_cols') || 2;
}

function setGridCols(cols) {
    localStorage.setItem('mongil_grid_cols', cols);
    updateGridButtons(cols);
    renderCharacters();
}

function updateGridButtons(cols) {
    [2, 3, 4, 5].forEach(c => {
        const btn = document.getElementById(`colBtn${c}`);
        if (btn) {
            if (parseInt(c) === parseInt(cols)) {
                btn.className = "px-2 py-0.5 text-xs font-bold rounded bg-cyan-500 text-slate-900 shadow";
            } else {
                btn.className = "px-2 py-0.5 text-xs font-bold rounded text-slate-400 hover:bg-slate-700 transition";
            }
        }
    });
}

window.filterCharacters = function() {
    renderCharacters();
};

function renderCharacters() {
    const container = document.getElementById('charGrid');
    if (!container || typeof charactersData === 'undefined') return;

    const collection = getUserCollection();
    const cols = getGridCols();
    updateGridButtons(cols);

    const gridClasses = {
        2: "grid grid-cols-2",
        3: "grid grid-cols-3",
        4: "grid grid-cols-2 sm:grid-cols-4",
        5: "grid grid-cols-2 sm:grid-cols-5"
    };
    container.className = `${gridClasses[cols] || gridClasses[2]} gap-2 sm:gap-3`;

    const searchVal = (document.getElementById('charSearch')?.value || '').toLowerCase();
    const rarityVal = document.getElementById('charRarity')?.value || 'all';
    const roleVal = document.getElementById('charRole')?.value || 'all';
    const elementVal = document.getElementById('charElement')?.value || 'all';
    const sortVal = document.getElementById('charSort')?.value || 'default';

    let filtered = charactersData.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchVal);
        const matchRarity = rarityVal === 'all' || c.rarity === rarityVal;
        const matchRole = roleVal === 'all' || c.role === roleVal;
        const matchElement = elementVal === 'all' || c.element === elementVal;
        return matchSearch && matchRarity && matchRole && matchElement;
    });

    // Ordenamiento
    if (sortVal === 'default') {
        filtered.sort((a,b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'za') {
        filtered.sort((a,b) => b.name.localeCompare(a.name));
    } else if (sortVal === 'rarity-desc') {
        filtered.sort((a,b) => b.rarity.localeCompare(a.rarity));
    } else if (sortVal === 'rarity-asc') {
        filtered.sort((a,b) => a.rarity.localeCompare(b.rarity));
    }

    let totalOwned = 0;
    charactersData.forEach(c => {
        if (collection[c.id]?.owned) totalOwned++;
    });

    const ownedCountEl = document.getElementById('ownedCount');
    if (ownedCountEl) ownedCountEl.innerText = `${totalOwned}/${charactersData.length}`;

    const charCountEl = document.getElementById('charCount');
    if (charCountEl) charCountEl.innerText = `Mostrando: ${filtered.length}`;

    container.innerHTML = filtered.map(c => {
        const userChar = collection[c.id] || { owned: false, awakening: 0, basic: 1, switch: 1, special: 1, ultimate: 1 };
        const isOwned = userChar.owned;
        const initialImagePath = getCharacterImagePath(c);
        const elementIcon = getElementIconHtml(c.element);

        return `
            <div class="bg-brand-surface border ${isOwned ? 'border-cyan-500/50' : 'border-white/10'} rounded-2xl p-2.5 flex flex-col justify-between relative group hover:border-cyan-400 transition duration-200">
                
                <!-- Imagen con Nombre, Despertar y Stats B, C, E, S dentro de la Imagen -->
                <div class="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-2 cursor-pointer" onclick="openCharacterModal('${c.id}')">
                    <img src="${initialImagePath}" alt="${c.name}" class="w-full h-full object-cover object-top ${!isOwned ? 'grayscale opacity-40' : ''} transition duration-300 group-hover:scale-105" onerror="handleImageError(this, ${JSON.stringify(c).replace(/"/g, '&quot;')})">
                    
                    <!-- Rareza -->
                    <div class="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-bold text-yellow-400 flex items-center gap-0.5 z-10">
                        <i class="fa-solid fa-star text-[8px]"></i> ${c.rarity}
                    </div>

                    <!-- Nombre del Personaje y Despertar (Arriba) -->
                    <div class="absolute top-0 inset-x-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-1.5 pt-1 flex items-center justify-between gap-1 z-10">
                        <span class="font-title font-bold text-[11px] text-slate-100 truncate pl-12">${c.name}</span>
                        ${isOwned ? `
                            <span class="bg-cyan-950/90 border border-cyan-400 text-cyan-300 px-1.5 py-0.5 rounded text-[9px] font-title font-bold flex-shrink-0">
                                D${userChar.awakening ?? 0}
                            </span>
                        ` : ''}
                    </div>

                    <!-- Info B, C, E, S en la Parte Inferior DENTRO de la Imagen -->
                    ${isOwned ? `
                        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-1 pt-3 grid grid-cols-4 gap-0.5 text-[8px] font-mono text-center z-10">
                            <div class="bg-black/50 rounded py-0.5 border border-white/10" title="Ataque Básico">
                                <span class="text-slate-400 font-bold block text-[7px]">B</span>
                                <span class="text-cyan-300 font-bold">${userChar.basic ?? 1}</span>
                            </div>
                            <div class="bg-black/50 rounded py-0.5 border border-white/10" title="Habilidad de Cambio">
                                <span class="text-slate-400 font-bold block text-[7px]">C</span>
                                <span class="text-cyan-300 font-bold">${userChar.switch ?? 1}</span>
                            </div>
                            <div class="bg-black/50 rounded py-0.5 border border-white/10" title="Habilidad Especial">
                                <span class="text-slate-400 font-bold block text-[7px]">E</span>
                                <span class="text-cyan-300 font-bold">${userChar.special ?? 1}</span>
                            </div>
                            <div class="bg-black/50 rounded py-0.5 border border-white/10" title="Habilidad Suprema">
                                <span class="text-slate-400 font-bold block text-[7px]">S</span>
                                <span class="text-purple-300 font-bold">${userChar.ultimate ?? 1}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Rol y Elemento -->
                <div class="flex items-center justify-between gap-1 text-[10px] text-slate-400 mb-2 px-1">
                    <span class="font-semibold text-slate-300">${c.role}</span>
                    <span class="px-1.5 py-0.5 rounded bg-brand-card border border-white/5 flex items-center gap-1">
                        ${elementIcon} ${c.element}
                    </span>
                </div>

                <!-- Botón de Estado -->
                <button onclick="toggleCharacterOwned('${c.id}')" class="w-full py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${isOwned ? 'bg-cyan-600/80 hover:bg-cyan-500 text-white' : 'bg-brand-card hover:bg-slate-700 text-slate-400 border border-white/10'}">
                    <i class="fa-solid ${isOwned ? 'fa-check' : 'fa-plus'}"></i> ${isOwned ? 'Obtenido' : 'Marcar'}
                </button>
            </div>
        `;
    }).join('');
}

function openCharacterModal(charId) {
    const c = charactersData.find(item => item.id === charId);
    if (!c) return;

    const collection = getUserCollection();
    const userChar = collection[c.id] || { owned: false, awakening: 0, basic: 1, switch: 1, special: 1, ultimate: 1 };
    const modal = document.getElementById('charModal');
    const content = document.getElementById('charModalContent');
    const elementIcon = getElementIconHtml(c.element);

    if (content) {
        content.innerHTML = `
            <button onclick="closeCharacterModal()" class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-brand-card hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm cursor-pointer z-10">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="flex gap-4 items-center mb-4">
                <div class="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/40 flex-shrink-0">
                    <img src="${getCharacterImagePath(c)}" alt="${c.name}" class="w-full h-full object-cover object-top" onerror="handleImageError(this, ${JSON.stringify(c).replace(/"/g, '&quot;')})">
                </div>
                <div>
                    <span class="text-[10px] text-yellow-400 font-bold bg-yellow-950/60 border border-yellow-500/30 px-2 py-0.5 rounded-full">${c.rarity}</span>
                    <h3 class="font-title font-black text-lg text-slate-100 mt-1">${c.name}</h3>
                    <p class="text-xs text-cyan-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        ${elementIcon} ${c.role} • ${c.element}
                    </p>
                </div>
            </div>

            <!-- Menús Desplegables de Habilidades y Despertar -->
            <div class="space-y-2 text-xs bg-brand-card p-3 rounded-xl border border-white/10 mb-4">
                <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-semibold">Despertar:</span>
                    <select onchange="updateCharacterStat('${c.id}', 'awakening', this.value)" class="bg-brand-surface border border-cyan-500/40 rounded px-2 py-1 text-cyan-300 font-title font-bold focus:outline-none">
                        ${[0,1,2,3,4,5,6].map(d => `<option value="${d}" ${(userChar.awakening ?? 0) === d ? 'selected' : ''}>D${d}</option>`).join('')}
                    </select>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-semibold">Ataques básicos:</span>
                    <select onchange="updateCharacterStat('${c.id}', 'basic', this.value)" class="bg-brand-surface border border-white/20 rounded px-2 py-1 text-slate-200 font-title font-bold focus:outline-none">
                        ${Array.from({length: 16}, (_, i) => i + 1).map(n => `<option value="${n}" ${(userChar.basic ?? 1) === n ? 'selected' : ''}>Nv. ${n}</option>`).join('')}
                    </select>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-semibold">Habilidad de cambio:</span>
                    <select onchange="updateCharacterStat('${c.id}', 'switch', this.value)" class="bg-brand-surface border border-white/20 rounded px-2 py-1 text-slate-200 font-title font-bold focus:outline-none">
                        ${Array.from({length: 16}, (_, i) => i + 1).map(n => `<option value="${n}" ${(userChar.switch ?? 1) === n ? 'selected' : ''}>Nv. ${n}</option>`).join('')}
                    </select>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-semibold">Habilidad especial:</span>
                    <select onchange="updateCharacterStat('${c.id}', 'special', this.value)" class="bg-brand-surface border border-white/20 rounded px-2 py-1 text-slate-200 font-title font-bold focus:outline-none">
                        ${Array.from({length: 16}, (_, i) => i + 1).map(n => `<option value="${n}" ${(userChar.special ?? 1) === n ? 'selected' : ''}>Nv. ${n}</option>`).join('')}
                    </select>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-slate-300 font-semibold">Habilidad suprema:</span>
                    <select onchange="updateCharacterStat('${c.id}', 'ultimate', this.value)" class="bg-brand-surface border border-white/20 rounded px-2 py-1 text-slate-200 font-title font-bold focus:outline-none">
                        ${Array.from({length: 16}, (_, i) => i + 1).map(n => `<option value="${n}" ${(userChar.ultimate ?? 1) === n ? 'selected' : ''}>Nv. ${n}</option>`).join('')}
                    </select>
                </div>
            </div>

            <button onclick="toggleCharacterOwned('${c.id}'); closeCharacterModal();" class="w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${userChar.owned ? 'bg-red-600/80 hover:bg-red-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}">
                ${userChar.owned ? 'Quitar de mi colección' : 'Añadir a mi colección'}
            </button>
        `;
    }

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeCharacterModal() {
    const modal = document.getElementById('charModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}
