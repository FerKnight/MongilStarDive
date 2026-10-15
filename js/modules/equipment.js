// LÓGICA DE EQUIPAMIENTOS CON ICONOS DINÁMICOS
function renderEquipment() {
    const container = document.getElementById('equipGrid');
    if (!container) return;
    container.innerHTML = '';

    const search = document.getElementById('equipSearch')?.value.toLowerCase() || '';
    const piecesFilter = document.getElementById('equipPiecesFilter')?.value || 'all';
    const sortOrder = document.getElementById('equipSort')?.value || 'az';

    const sourceData = typeof equipmentData !== 'undefined' ? equipmentData : [];

    const filtered = sourceData.filter(item => {
        const matchSearch = item.conjuntos.toLowerCase().includes(search);
        const has2 = item['conjunto de 2'] && item['conjunto de 2'] !== '-';
        const has4 = item['conjunto de 4'] && item['conjunto de 4'] !== '-';

        let matchPieces = true;
        if (piecesFilter === '2') matchPieces = has2;
        if (piecesFilter === '4') matchPieces = has4;

        return matchSearch && matchPieces;
    }).sort((a, b) => {
        if (sortOrder === 'az') return a.conjuntos.localeCompare(b.conjuntos);
        if (sortOrder === 'za') return b.conjuntos.localeCompare(a.conjuntos);
        return 0;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center text-slate-500 py-12 text-xs bg-brand-surface border border-purple-500/20 rounded-xl">No se encontraron equipamientos.</div>`;
        return;
    }

    filtered.forEach(eq => {
        const cleanName = eq.conjuntos.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const iconPath = `assets/images/Equipment/equip_${cleanName}.png`;

        const card = document.createElement('div');
        card.className = "bg-brand-surface border border-purple-500/30 rounded-xl p-4 hover:border-cyan-400/50 transition text-xs shadow-md space-y-2";
        card.innerHTML = `
            <div class="flex items-center gap-3 border-b border-purple-500/20 pb-2">
                <div class="w-10 h-10 rounded-lg bg-brand-card border border-purple-500/30 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="${iconPath}" alt="${eq.conjuntos}" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\'fa-solid fa-shield-halved text-cyan-400 text-base\'></i>'">
                </div>
                <div>
                    <h4 class="font-bold text-slate-100 uppercase tracking-wide text-sm">${eq.conjuntos}</h4>
                    <span class="text-[10px] text-cyan-400">Conjunto de Equipo</span>
                </div>
            </div>
            <div class="space-y-1.5 pt-1">
                ${eq['conjunto de 2'] && eq['conjunto de 2'] !== '-' ? `
                    <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                        <span class="text-[10px] font-bold text-purple-400 uppercase block mb-0.5">2 Piezas</span>
                        <p class="text-slate-300">${eq['conjunto de 2']}</p>
                    </div>
                ` : ''}
                ${eq['conjunto de 4'] && eq['conjunto de 4'] !== '-' ? `
                    <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                        <span class="text-[10px] font-bold text-cyan-400 uppercase block mb-0.5">4 Piezas</span>
                        <p class="text-slate-300">${eq['conjunto de 4']}</p>
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}
