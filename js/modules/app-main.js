document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar perfil local si existe
    if (typeof loadProfile === 'function') loadProfile();
    
    // 2. Renderizar lista de personajes
    if (typeof renderCharacters === 'function') renderCharacters();
    
    // 3. Renderizar equipamientos
    renderEquipment();

    // 4. Renderizar otras secciones generales
    if (typeof renderAll === 'function') renderAll();

    // 5. Recuperar la última pestaña activa (por defecto 'inicio')
    const savedTab = localStorage.getItem('mongil_active_tab') || 'inicio';
    if (typeof switchTab === 'function') {
        switchTab(savedTab);
    }

    // 6. Cambiar aleatoriamente el icono superior desde assets/images/Monsterling_Icons al recargar
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
            // Solo aquellos que TENGAN 2 piezas y NO TENGAN 4 piezas
            matchPieces = !!eq.effect2 && !eq.effect4;
        } else if (piecesVal === '4') {
            // Solo aquellos que TENGAN efecto de 4 piezas
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
