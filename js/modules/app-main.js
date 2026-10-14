document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar perfil local si existe
    if (typeof loadProfile === 'function') loadProfile();
    
    // 2. Renderizar lista de personajes
    if (typeof renderCharacters === 'function') renderCharacters();
    
    // 3. Renderizar equipamientos
    renderEquipment();

    // 4. Renderizar Monsterlings
    renderMonsterlings();

    // 5. Renderizar otras secciones generales
    if (typeof renderAll === 'function') renderAll();

    // 6. Recuperar la última pestaña activa (por defecto 'inicio')
    const savedTab = localStorage.getItem('mongil_active_tab') || 'inicio';
    if (typeof switchTab === 'function') {
        switchTab(savedTab);
    }

    // 7. Cambiar aleatoriamente el icono superior desde assets/images/Monsterling_Icons al recargar
    initHeaderMonsterlingIcon();
});

window.renderAll = function() {
    // Renderizado secundario de otros módulos
};

function initHeaderMonsterlingIcon() {
    const iconEl = document.getElementById('headerDynamicIcon');
    if (!iconEl) return;

    let monsterIcons = [];
    if (typeof monsterlingsData !== 'undefined' && Array.isArray(monsterlingsData)) {
        monsterIcons = monsterlingsData.map(m => m.imageName || m.id || m.name);
    }

    if (monsterIcons.length === 0) {
        monsterIcons = ['monster_01', 'monster_02', 'monster_03', 'gaba_spirit', 'belana_beast'];
    }

    const randomIndex = Math.floor(Math.random() * monsterIcons.length);
    const selectedIcon = monsterIcons[randomIndex];

    iconEl.src = `assets/images/Monsterling_Icons/${selectedIcon}.png`;
}

// Renderizado y filtrado de Equipamientos (Grado 5)
function renderEquipment() {
    const container = document.getElementById('equipGrid');
    if (!container || typeof equipmentData === 'undefined') return;

    const searchVal = (document.getElementById('equipSearch')?.value || '').toLowerCase();
    const piecesVal = document.getElementById('equipPiecesFilter')?.value || 'all';
    const sortVal = document.getElementById('equipSort')?.value || 'az';

    let filtered = equipmentData.filter(eq => {
        const matchSearch = eq.name.toLowerCase().includes(searchVal);
        let matchPieces = true;
        
        if (piecesVal === '2') {
            matchPieces = !!eq.effect2 && !eq.effect4;
        } else if (piecesVal === '4') {
            matchPieces = !!eq.effect4;
        }
        
        return matchSearch && matchPieces;
    });

    // Ordenamiento
    if (sortVal === 'az') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'za') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-8 text-center text-slate-500 text-xs">
                No se encontraron conjuntos de equipamiento con esos filtros.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(eq => `
        <div class="bg-brand-surface border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-400/50 transition">
            <div>
                <div class="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                    <h3 class="font-title font-bold text-sm text-slate-100 flex items-center gap-2">
                        <i class="fa-solid fa-shield-halved text-cyan-400"></i> ${eq.name}
                    </h3>
                    <span class="text-xs font-bold text-yellow-400 bg-yellow-950/60 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                        ${eq.rarity}
                    </span>
                </div>

                <div class="space-y-2 text-xs">
                    ${eq.effect2 ? `
                        <div class="bg-brand-card/60 p-2.5 rounded-xl border border-white/5">
                            <span class="font-bold text-cyan-400 text-[11px] block mb-0.5">Conjunto de 2 piezas:</span>
                            <p class="text-slate-300 leading-relaxed">${eq.effect2}</p>
                        </div>
                    ` : ''}

                    ${eq.effect4 ? `
                        <div class="bg-brand-card/60 p-2.5 rounded-xl border border-white/5">
                            <span class="font-bold text-purple-400 text-[11px] block mb-0.5">Conjunto de 4 piezas:</span>
                            <p class="text-slate-300 leading-relaxed">${eq.effect4}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizado y filtrado de Monsterlings
function renderMonsterlings() {
    const container = document.getElementById('monsterListContainer');
    if (!container || typeof monsterlingsData === 'undefined') return;

    const searchVal = (document.getElementById('monsterSearch')?.value || '').toLowerCase();
    const regionVal = document.getElementById('monsterRegionFilter')?.value || 'all';
    const chainVal = document.getElementById('monsterChainFilter')?.value || 'all';
    const sortVal = document.getElementById('monsterSort')?.value || 'az';

    let filtered = monsterlingsData.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(searchVal);
        const matchRegion = regionVal === 'all' || m.region === regionVal;
        
        let matchChain = true;
        if (chainVal === 'withChain') {
            matchChain = m.chain !== '-';
        } else if (chainVal === 'noChain') {
            matchChain = m.chain === '-';
        }

        return matchSearch && matchRegion && matchChain;
    });

    // Ordenamiento
    if (sortVal === 'az') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === 'za') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortVal === 'numAsc') {
        filtered.sort((a, b) => parseInt(a.nro) - parseInt(b.nro));
    } else if (sortVal === 'numDesc') {
        filtered.sort((a, b) => parseInt(b.nro) - parseInt(a.nro));
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="py-8 text-center text-slate-500 text-xs">
                No se encontraron monsterlings con los filtros aplicados.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(m => `
        <div class="bg-brand-surface border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-cyan-400/40 transition">
            <div class="flex items-center gap-3">
                <span class="font-mono font-bold text-xs text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
                    N° ${m.nro}
                </span>
                <span class="font-title font-bold text-sm text-slate-100">
                    ${m.name}
                </span>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
                <div class="bg-brand-card px-2.5 py-1 rounded-lg border border-white/5">
                    <span class="text-[10px] text-slate-400 block font-semibold">Efecto Rango</span>
                    <span class="text-slate-200 font-medium">${m.effect}</span>
                </div>

                <div class="bg-brand-card px-2.5 py-1 rounded-lg border border-white/5">
                    <span class="text-[10px] text-slate-400 block font-semibold">Cadena de Enlace</span>
                    <span class="${m.chain !== '-' ? 'text-purple-300 font-bold' : 'text-slate-500'}">${m.chain}</span>
                </div>
            </div>
        </div>
    `).join('');
}
