// LÓGICA DE PERSONAJES (OPTIMIZADA CON MULTISELECCIÓN Y ORDENAMIENTO)
let selectedRoles = ['all'];
let selectedElements = ['all'];
let characterViewMode = 'grid'; // 'grid' o 'list'

// Cargar estado de personajes obtenidos desde localStorage
function getOwnedCharacters() {
    try {
        return JSON.parse(localStorage.getItem('mongil_owned_characters') || '[]');
    } catch (e) {
        return [];
    }
}

function saveOwnedCharacters(ownedList) {
    try {
        localStorage.setItem('mongil_owned_characters', JSON.stringify(ownedList));
    } catch (e) {
        console.error("Error al guardar personajes obtenidos:", e);
    }
}

function toggleOwnedCharacter(charName) {
    let owned = getOwnedCharacters();
    const index = owned.indexOf(charName);
    if (index > -1) {
        owned.splice(index, 1);
    } else {
        owned.push(charName);
    }
    saveOwnedCharacters(owned);
    renderCharacters();
}

// Filtro multiselección de Rol
function toggleRoleFilter(role) {
    if (role === 'all') {
        selectedRoles = ['all'];
    } else {
        if (selectedRoles.includes('all')) {
            selectedRoles = [];
        }
        const index = selectedRoles.indexOf(role);
        if (index > -1) {
            selectedRoles.splice(index, 1);
        } else {
            selectedRoles.push(role);
        }
        if (selectedRoles.length === 0) {
            selectedRoles = ['all'];
        }
    }
    updateFilterButtonsUI('role');
    renderCharacters();
}

// Filtro multiselección de Elemento
function toggleElementFilter(element) {
    if (element === 'all') {
        selectedElements = ['all'];
    } else {
        if (selectedElements.includes('all')) {
            selectedElements = [];
        }
        const index = selectedElements.indexOf(element);
        if (index > -1) {
            selectedElements.splice(index, 1);
        } else {
            selectedElements.push(element);
        }
        if (selectedElements.length === 0) {
            selectedElements = ['all'];
        }
    }
    updateFilterButtonsUI('element');
    renderCharacters();
}

// Actualiza el aspecto visual de los botones de filtro active/inactive
function updateFilterButtonsUI(type) {
    if (type === 'role') {
        document.querySelectorAll('.role-filter-btn').forEach(btn => {
            const role = btn.getAttribute('data-role');
            if (selectedRoles.includes(role)) {
                btn.className = "role-filter-btn px-3 py-1.5 bg-purple-600 font-bold rounded-lg text-white text-xs shrink-0 transition shadow-md shadow-purple-900/30 cursor-pointer border border-purple-400";
            } else {
                btn.className = "role-filter-btn px-3 py-1.5 bg-brand-card text-slate-300 border border-purple-500/20 rounded-lg text-xs shrink-0 transition hover:bg-slate-700 cursor-pointer";
            }
        });
    } else if (type === 'element') {
        document.querySelectorAll('.element-filter-btn').forEach(btn => {
            const elem = btn.getAttribute('data-element');
            if (selectedElements.includes(elem)) {
                btn.className = "element-filter-btn px-3 py-1.5 bg-cyan-600 font-bold rounded-lg text-white text-xs shrink-0 transition shadow-md shadow-cyan-900/30 cursor-pointer border border-cyan-400";
            } else {
                btn.className = "element-filter-btn px-3 py-1.5 bg-brand-card text-slate-300 border border-purple-500/20 rounded-lg text-xs shrink-0 transition hover:bg-slate-700 cursor-pointer";
            }
        });
    }
}

// Cambiar modo de vista (Cuadrícula o Lista/Filas)
function setCharacterViewMode(mode) {
    characterViewMode = mode;
    const gridBtn = document.getElementById('viewGridBtn');
    const listBtn = document.getElementById('viewListBtn');

    if (gridBtn && listBtn) {
        if (mode === 'grid') {
            gridBtn.className = "px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold transition shadow cursor-pointer";
            listBtn.className = "px-3 py-1.5 bg-brand-card text-slate-400 hover:text-white rounded-lg text-xs transition cursor-pointer";
        } else {
            listBtn.className = "px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold transition shadow cursor-pointer";
            gridBtn.className = "px-3 py-1.5 bg-brand-card text-slate-400 hover:text-white rounded-lg text-xs transition cursor-pointer";
        }
    }
    renderCharacters();
}

// Renderizado de la lista de Personajes
function renderCharacters() {
    const container = document.getElementById('characterGrid');
    const countLabel = document.getElementById('characterCount');
    if (!container) return;

    container.innerHTML = '';

    const searchInput = document.getElementById('charSearch');
    const sortSelect = document.getElementById('charSortFilter');
    const ownedSelect = document.getElementById('charOwnedFilter');

    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const sortBy = sortSelect ? sortSelect.value : 'stars-desc';
    const ownedFilter = ownedSelect ? ownedSelect.value : 'all';

    const sourceData = typeof charactersData !== 'undefined' ? charactersData : [];
    const ownedList = getOwnedCharacters();

    // 1. Filtrar los personajes
    let filtered = sourceData.filter(char => {
        // Filtro por Búsqueda de Texto
        const matchSearch = char.nombre.toLowerCase().includes(search);

        // Filtro Multiselección por Rol
        const matchRole = selectedRoles.includes('all') || selectedRoles.map(r => r.toLowerCase()).includes(char.rol.toLowerCase());

        // Filtro Multiselección por Elemento
        const matchElement = selectedElements.includes('all') || selectedElements.map(e => e.toLowerCase()).includes(char.elemento.toLowerCase());

        // Filtro por Estado de Obtención
        const isOwned = ownedList.includes(char.nombre);
        let matchOwned = true;
        if (ownedFilter === 'owned') matchOwned = isOwned;
        if (ownedFilter === 'unowned') matchOwned = !isOwned;

        return matchSearch && matchRole && matchElement && matchOwned;
    });

    // 2. Ordenar los personajes
    filtered.sort((a, b) => {
        const gradeA = parseInt(a.grado) || 0;
        const gradeB = parseInt(b.grado) || 0;
        const nameA = a.nombre.toLowerCase();
        const nameB = b.nombre.toLowerCase();

        if (sortBy === 'stars-desc') {
            if (gradeB !== gradeA) return gradeB - gradeA; // Mayor a menor estrellas
            return nameA.localeCompare(nameB); // A-Z como segundo criterio
        } else if (sortBy === 'stars-asc') {
            if (gradeA !== gradeB) return gradeA - gradeB; // Menor a mayor estrellas
            return nameA.localeCompare(nameB); // A-Z como segundo criterio
        } else if (sortBy === 'name-asc') {
            return nameA.localeCompare(nameB); // A-Z
        } else if (sortBy === 'name-desc') {
            return nameB.localeCompare(nameA); // Z-A
        }
        return 0;
    });

    // Actualizar contador
    if (countLabel) {
        countLabel.innerText = `Mostrando: ${filtered.length} de ${sourceData.length}`;
    }

    if (filtered.length === 0) {
        container.className = "w-full";
        container.innerHTML = `
            <div class="text-center text-slate-500 py-12 text-xs bg-brand-surface border border-purple-500/20 rounded-xl">
                No se encontraron personajes con los filtros seleccionados.
            </div>`;
        return;
    }

    // Configurar clases del contenedor según el modo de vista
    if (characterViewMode === 'grid') {
        container.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3";
    } else {
        container.className = "flex flex-col gap-2";
    }

    // 3. Renderizar Tarjetas
    filtered.forEach(char => {
        const isOwned = ownedList.includes(char.nombre);
        const gradeStars = '★'.repeat(parseInt(char.grado) || 0);
        const portraitPath = `assets/images/Character_Portrait/portrait_${char.nombre.replace(/\s+/g, '')}_01.png`;

        const card = document.createElement('div');

        if (characterViewMode === 'grid') {
            // VISTA EN CUADRÍCULA
            card.className = `bg-brand-surface border ${isOwned ? 'border-cyan-500/50 shadow-cyan-950/30' : 'border-purple-500/20 opacity-75'} rounded-xl p-3 hover:border-cyan-400 transition flex flex-col justify-between items-center text-center relative group overflow-hidden shadow-md`;
            card.innerHTML = `
                <button onclick="toggleOwnedCharacter('${char.nombre}')" class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition ${isOwned ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/80 text-slate-500 hover:text-slate-300'} text-xs z-10" title="${isOwned ? 'Marcar como no obtenido' : 'Marcar como obtenido'}">
                    <i class="fa-solid fa-check"></i>
                </button>
                <div class="w-16 h-16 rounded-full p-0.5 bg-brand-card border border-purple-500/30 overflow-hidden mb-2 mt-1 shrink-0">
                    <img src="${portraitPath}" alt="${char.nombre}" class="w-full h-full rounded-full object-cover object-top" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-user text-purple-400 text-xl flex items-center justify-center h-full\\'></i>';">
                </div>
                <h4 class="font-bold text-slate-100 text-xs truncate w-full">${char.nombre}</h4>
                <div class="text-amber-400 text-[10px] my-0.5 font-bold">${gradeStars}</div>
                <div class="flex items-center gap-1 mt-1 text-[10px]">
                    <span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-semibold">${char.rol}</span>
                    <span class="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded font-semibold">${char.elemento}</span>
                </div>
            `;
        } else {
            // VISTA EN FILAS / LISTA
            card.className = `bg-brand-surface border ${isOwned ? 'border-cyan-500/50' : 'border-purple-500/20 opacity-75'} rounded-xl p-2.5 hover:border-cyan-400 transition flex items-center justify-between text-xs shadow-md gap-3`;
            card.innerHTML = `
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-brand-card border border-purple-500/30 overflow-hidden shrink-0">
                        <img src="${portraitPath}" alt="${char.nombre}" class="w-full h-full object-cover object-top" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-user text-purple-400 text-base flex items-center justify-center h-full\\'></i>';">
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-bold text-slate-100 text-sm truncate">${char.nombre}</h4>
                        <div class="text-amber-400 text-[10px] font-bold">${gradeStars}</div>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-semibold text-[10px]">${char.rol}</span>
                    <span class="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded font-semibold text-[10px]">${char.elemento}</span>
                    <button onclick="toggleOwnedCharacter('${char.nombre}')" class="w-7 h-7 rounded-lg flex items-center justify-center transition ${isOwned ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-slate-300'} text-xs ml-1" title="${isOwned ? 'Marcar como no obtenido' : 'Marcar como obtenido'}">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </div>
            `;
        }

        container.appendChild(card);
    });
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        renderCharacters();
    }, 100);
});
