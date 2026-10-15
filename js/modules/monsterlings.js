// LÓGICA DE MONSTERLINGS (CONECTADO CON LA BASE DE DATOS GLOBAL)
let selectedRegions = ['All'];

function toggleRegion(regionName) {
    if (regionName === 'All') {
        selectedRegions = ['All'];
    } else {
        if (selectedRegions.includes('All')) {
            selectedRegions = [];
        }
        const index = selectedRegions.indexOf(regionName);
        if (index > -1) {
            selectedRegions.splice(index, 1);
        } else {
            selectedRegions.push(regionName);
        }
        if (selectedRegions.length === 0) {
            selectedRegions = ['All'];
        }
    }
    updateFilterButtonsUI();
    renderMonsterlings();
}

function updateFilterButtonsUI() {
    document.querySelectorAll('#regionFilters button').forEach(btn => {
        const reg = btn.getAttribute('data-region');
        if (selectedRegions.includes(reg)) {
            btn.className = "region-btn px-3 py-1.5 bg-purple-600 font-bold rounded-lg text-white shrink-0 transition shadow-md shadow-purple-900/30 cursor-pointer";
        } else {
            btn.className = "region-btn px-3 py-1.5 bg-brand-card text-slate-300 border border-purple-500/20 rounded-lg shrink-0 transition hover:bg-slate-700 cursor-pointer";
        }
    });
}

function renderMonsterlings() {
    const container = document.getElementById('monsterListContainer');
    if (!container) return;
    container.innerHTML = '';

    const searchInput = document.getElementById('monsterSearch');
    const chainSelect = document.getElementById('monsterChainFilter');
    
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const chainFilter = chainSelect ? chainSelect.value : 'all';

    const sourceData = typeof monsterlingsDatabase !== 'undefined' ? monsterlingsDatabase : [];

    const filtered = sourceData.filter(m => {
        const matchRegion = selectedRegions.includes('All') || selectedRegions.includes(m.region);
        const matchSearch = m.name.toLowerCase().includes(search) || m.nro.includes(search);
        
        let matchChain = true;
        if (chainFilter === 'withChain') {
            matchChain = m.chain && m.chain !== '-' && m.chain.trim() !== '';
        } else if (chainFilter === 'noChain') {
            matchChain = !m.chain || m.chain === '-' || m.chain.trim() === '';
        }

        return matchRegion && matchSearch && matchChain;
    }).sort((a, b) => parseInt(a.nro) - parseInt(b.nro));

    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center text-slate-500 py-12 text-xs bg-brand-surface border border-purple-500/20 rounded-xl">No se encontraron monsterlings con los filtros seleccionados.</div>`;
        return;
    }

    filtered.forEach(m => {
        const paddedNro = String(m.nro).padStart(3, '0');
        const regionClean = m.region.toLowerCase().replace(/\s+/g, '');
        const iconPath = `assets/images/Monsterlings/${regionClean}_${paddedNro}.png`;

        const card = document.createElement('div');
        card.className = "bg-brand-surface border border-purple-500/30 rounded-xl p-3 hover:border-cyan-400/50 transition text-xs shadow-md flex items-start gap-3";
        card.innerHTML = `
            <div class="w-12 h-12 rounded-lg bg-brand-card border border-purple-500/30 flex items-center justify-center overflow-hidden shrink-0">
                <img src="${iconPath}" alt="${m.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\'fa-solid fa-paw text-purple-400 text-base\'></i>'">
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-mono font-bold text-cyan-400 text-sm">#${paddedNro}</span>
                    <span class="text-[10px] uppercase px-2 py-0.5 bg-brand-card text-slate-300 rounded border border-purple-500/20 font-semibold">${m.region}</span>
                </div>
                <h4 class="font-bold text-slate-100 capitalize text-sm mb-1">${m.name}</h4>
                <p class="text-slate-300 mb-1"><strong class="text-slate-400">Efecto:</strong> ${m.effect}</p>
                <p class="text-slate-400"><strong class="text-slate-400">Cadena:</strong> ${m.chain}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Renderizado inicial al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        renderMonsterlings();
    }, 100);
});
