// LÓGICA DE EQUIPAMIENTOS (RENDERIZADO E IMÁGENES)
function renderEquipment() {
    const container = document.getElementById('equipmentGrid');
    const countLabel = document.getElementById('equipmentCount');
    if (!container) return;

    container.innerHTML = '';

    const searchInput = document.getElementById('equipSearch');
    const setTypeSelect = document.getElementById('equipSetFilter');

    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const setFilter = setTypeSelect ? setTypeSelect.value : 'all';

    const sourceData = typeof equipmentDatabase !== 'undefined' ? equipmentDatabase : [];

    const filtered = sourceData.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search);
        
        let matchSet = true;
        if (setFilter === '2p') {
            matchSet = item.effect2P && item.effect2P !== '-';
        } else if (setFilter === '4p') {
            matchSet = item.effect4P && item.effect4P !== '-';
        }

        return matchSearch && matchSet;
    });

    if (countLabel) {
        countLabel.innerText = `Mostrando: ${filtered.length}`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center text-slate-500 py-12 text-xs bg-brand-surface border border-purple-500/20 rounded-xl">
                No se encontraron equipamientos con los filtros seleccionados.
            </div>`;
        return;
    }

    filtered.forEach(eq => {
        // Normalización exacta del nombre para generar las rutas de imagen
        const cleanSlug = eq.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        const basePath = `assets/images/Icon_Equipment/${cleanSlug}`;
        const mainIconPath = `${basePath}.png`;
        const helmetPath = `${basePath}_casco.png`;
        const chestPath = `${basePath}_pechera.png`;
        const glovesPath = `${basePath}_guantes.png`;
        const bootsPath = `${basePath}_calzado.png`;

        const card = document.createElement('div');
        card.className = "bg-brand-surface border border-purple-500/30 rounded-xl p-4 hover:border-cyan-400/50 transition text-xs shadow-md space-y-3 relative overflow-hidden flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <!-- Encabezado e Icono Principal del Set -->
                <div class="flex items-center gap-3 border-b border-purple-500/20 pb-3 mb-3">
                    <div class="w-12 h-12 rounded-lg bg-brand-card border border-purple-500/30 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="${mainIconPath}" alt="${eq.name}" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-shield-halved text-purple-400 text-lg\\'></i>';">
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-100 text-sm">${eq.name}</h4>
                        <span class="text-[10px] text-cyan-400 font-semibold uppercase">Conjunto de Equipamiento</span>
                    </div>
                </div>

                <!-- Piezas Individuales del Set -->
                <div class="grid grid-cols-4 gap-1.5 mb-3 bg-brand-card/40 p-2 rounded-lg border border-purple-500/10">
                    <div class="flex flex-col items-center gap-1" title="Casco">
                        <div class="w-8 h-8 rounded bg-brand-card border border-purple-500/20 flex items-center justify-center overflow-hidden">
                            <img src="${helmetPath}" alt="Casco" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-helmet-safety text-slate-500 text-xs\\'></i>';">
                        </div>
                        <span class="text-[9px] text-slate-400 font-medium">Casco</span>
                    </div>
                    <div class="flex flex-col items-center gap-1" title="Pechera">
                        <div class="w-8 h-8 rounded bg-brand-card border border-purple-500/20 flex items-center justify-center overflow-hidden">
                            <img src="${chestPath}" alt="Pechera" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-shirt text-slate-500 text-xs\\'></i>';">
                        </div>
                        <span class="text-[9px] text-slate-400 font-medium">Pechera</span>
                    </div>
                    <div class="flex flex-col items-center gap-1" title="Guantes">
                        <div class="w-8 h-8 rounded bg-brand-card border border-purple-500/20 flex items-center justify-center overflow-hidden">
                            <img src="${glovesPath}" alt="Guantes" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-mitten text-slate-500 text-xs\\'></i>';">
                        </div>
                        <span class="text-[9px] text-slate-400 font-medium">Guantes</span>
                    </div>
                    <div class="flex flex-col items-center gap-1" title="Calzado">
                        <div class="w-8 h-8 rounded bg-brand-card border border-purple-500/20 flex items-center justify-center overflow-hidden">
                            <img src="${bootsPath}" alt="Calzado" class="w-full h-full object-cover" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=\\'fa-solid fa-shoe-prints text-slate-500 text-xs\\'></i>';">
                        </div>
                        <span class="text-[9px] text-slate-400 font-medium">Calzado</span>
                    </div>
                </div>

                <!-- Efectos de Conjunto -->
                <div class="space-y-2">
                    ${eq.effect2P && eq.effect2P !== '-' ? `
                        <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                            <span class="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-0.5">Conjunto (2 Piezas)</span>
                            <p class="text-slate-300 text-xs">${eq.effect2P}</p>
                        </div>
                    ` : ''}
                    ${eq.effect4P && eq.effect4P !== '-' ? `
                        <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                            <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">Conjunto (4 Piezas)</span>
                            <p class="text-slate-300 text-xs">${eq.effect4P}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        renderEquipment();
    }, 100);
});
