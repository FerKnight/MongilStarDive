let deferredPrompt;

// FILTRADO COMBINABLE Y RENDERIZADO CON EVENTO DE CLICK
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

    charGrid.innerHTML = list.map(c => `
        <div onclick="openCharacterModal('${c.id}')" class="bg-brand-card border border-white/10 rounded-xl p-3 hover:border-cyan-400 cursor-pointer active:scale-95 transition transform">
            <div class="w-10 h-10 rounded-lg bg-purple-900/50 text-cyan-400 flex items-center justify-center text-lg mb-2">
                <i class="fa-solid ${c.icon}"></i>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="font-title font-bold text-sm text-slate-100">${c.name}</h3>
                <span class="text-[10px] text-yellow-400 font-bold">${c.rarity}</span>
            </div>
            <p class="text-[10px] text-cyan-400 font-semibold mb-1">${c.element} • ${c.role}</p>
            <p class="text-[11px] text-slate-400 line-clamp-2">${c.desc}</p>
            <span class="inline-block mt-2 text-[9px] text-purple-400 font-bold"><i class="fa-solid fa-circle-info"></i> Ver Detalles</span>
        </div>
    `).join('');
}

// SUBMENÚ / MODAL DETALLADO
function openCharacterModal(charId) {
    const char = charactersData.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById('charModal');
    const modalContent = document.getElementById('charModalContent');

    modalContent.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-purple-900/60 text-cyan-400 flex items-center justify-center text-2xl">
                    <i class="fa-solid ${char.icon}"></i>
                </div>
                <div>
                    <h3 class="font-title font-black text-lg text-slate-100">${char.name}</h3>
                    <p class="text-xs text-yellow-400 font-bold">${char.rarity} | <span class="text-cyan-400">${char.element}</span> | <span class="text-purple-300">${char.role}</span></p>
                </div>
            </div>
            <button onclick="closeCharacterModal()" class="w-8 h-8 rounded-lg bg-brand-card hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm">
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

// Mantener el resto de funciones (renderAll, switchTab, saveProfile, etc.) igual...
