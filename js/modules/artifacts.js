// LÓGICA DE ARTEFACTOS CON BÚSQUEDA ROBUSTA DE ICONOS
function renderArtifacts() {
    const container = document.getElementById('artifactGrid');
    const countLabel = document.getElementById('artifactCount');
    if (!container) return;

    container.innerHTML = '';

    const search = document.getElementById('artifactSearch')?.value.toLowerCase() || '';
    const gradeFilter = document.getElementById('artifactGradeFilter')?.value || 'all';
    const classFilter = document.getElementById('artifactClassFilter')?.value || 'all';

    const sourceData = typeof artifactsData !== 'undefined' ? artifactsData : [];

    const filtered = sourceData.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search);
        const matchGrade = gradeFilter === 'all' || String(item.grade) === gradeFilter;
        const matchClass = classFilter === 'all' || item.role.toLowerCase() === classFilter.toLowerCase();

        return matchSearch && matchGrade && matchClass;
    });

    if (countLabel) {
        countLabel.innerText = `Mostrando: ${filtered.length}`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center text-slate-500 py-12 text-xs bg-brand-surface border border-purple-500/20 rounded-xl">
                No se encontraron artefactos con los filtros seleccionados.
            </div>`;
        return;
    }

    filtered.forEach(art => {
        const isGrade5 = String(art.grade) === '5';
        const gradeBadge = isGrade5 
            ? '<span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">5★ Grado 5</span>'
            : '<span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded font-bold">4★ Grado 4</span>';

        const rawName = art.originalName || art.name;
        const capitalizedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        const lowercaseName = rawName.toLowerCase();
        const iconPath = `assets/images/Icon_Artifact/${capitalizedName}.png`;
        const fallbackPath = `assets/images/Icon_Artifact/${lowercaseName}.png`;

        const card = document.createElement('div');
        card.className = "bg-brand-surface border border-purple-500/30 rounded-xl p-4 hover:border-cyan-400/50 transition text-xs shadow-md space-y-2 relative overflow-hidden";
        card.innerHTML = `
            <div class="flex justify-between items-start gap-2 border-b border-purple-500/20 pb-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-brand-card border border-purple-500/30 flex items-center justify-center overflow-hidden shrink-0">
                        <img src="${iconPath}" alt="${art.name}" class="w-full h-full object-cover" onerror="this.onerror=function(){this.src='${fallbackPath}'; this.onerror=function(){this.parentElement.innerHTML='<i class=\'fa-solid fa-gem text-cyan-400 text-base\'></i>';}};">
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-100 text-sm">${art.name}</h4>
                        <span class="text-[10px] text-cyan-400 font-semibold uppercase">${art.role}</span>
                    </div>
                </div>
                <div>${gradeBadge}</div>
            </div>

            <div class="space-y-1.5 pt-1">
                ${art.effect2P && art.effect2P !== '-' ? `
                    <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                        <span class="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-0.5">Conjunto 2 Piezas</span>
                        <p class="text-slate-300 text-xs">${art.effect2P}</p>
                    </div>
                ` : ''}
                ${art.effect4P && art.effect4P !== '-' ? `
                    <div class="bg-brand-card/60 p-2 rounded-lg border border-white/5">
                        <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">Conjunto 4 Piezas</span>
                        <p class="text-slate-300 text-xs">${art.effect4P}</p>
                    </div>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}
