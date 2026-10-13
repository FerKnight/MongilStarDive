let deferredPrompt;

function renderAll() {
    filterCharacters();
    updateOwnedCounter();

    // RENDERIZADO DE EQUIPAMIENTOS (SETS DE ROPA)
    const equipGrid = document.getElementById('equipGrid');
    if (equipGrid) {
        let html = equipData.map(e => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-cyan-400 transition relative overflow-hidden group">
                <div class="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 p-1">
                            <img src="${e.image}" alt="${e.name}" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='assets/images/Equipment/icon_equip_volcano.png';">
                        </div>
                        <div>
                            <h3 class="font-title font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition">${e.name}</h3>
                            <span class="text-[10px] text-yellow-400 font-extrabold px-1.5 py-0.5 bg-yellow-950/60 border border-yellow-500/30 rounded">${e.rarity}</span>
                        </div>
                    </div>
                </div>
                <div class="space-y-1">
                    <span class="text-[10px] font-title font-bold text-slate-400 uppercase tracking-wider">Piezas del Set:</span>
                    <div class="grid grid-cols-2 gap-1 text-[10px] text-slate-300 font-medium">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-helmet-safety text-cyan-400"></i> ${e.pieces[0]}</span>
                        <span class="flex items-center gap-1"><i class="fa-solid fa-shirt text-cyan-400"></i> ${e.pieces[1]}</span>
                        <span class="flex items-center gap-1"><i class="fa-solid fa-mitten text-cyan-400"></i> ${e.pieces[2]}</span>
                        <span class="flex items-center gap-1"><i class="fa-solid fa-socks text-cyan-400"></i> ${e.pieces[3]}</span>
                    </div>
                </div>
                <div class="space-y-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-white/5 text-xs">
                    <div><span class="font-bold text-cyan-400 text-[11px]">(2 Piezas):</span> <span class="text-slate-200 text-[11px]">${e.bonus2}</span></div>
                    <div><span class="font-bold text-purple-400 text-[11px]">(4 Piezas):</span> <span class="text-slate-300 text-[11px]">${e.bonus4}</span></div>
                </div>
                <div class="pt-1 flex items-center gap-2 text-[10px] text-slate-400 bg-brand-surface/80 p-2 rounded-lg border border-white/5">
                    <i class="fa-solid fa-location-dot text-cyan-400"></i>
                    <span class="truncate"><strong>Obtención:</strong> ${e.howToGet}</span>
                </div>
            </div>
        `).join('');

        if (typeof equipSources !== 'undefined' && equipSources.length > 0) {
            html += `
                <div class="col-span-full mt-4 p-3 bg-brand-surface border border-white/10 rounded-xl text-xs space-y-2">
                    <div class="flex items-center gap-2 text-cyan-400 font-title font-bold">
                        <i class="fa-solid fa-link"></i> Fuentes de Equipamientos
                    </div>
                    <div class="flex flex-wrap gap-3">
                        ${equipSources.map(s => `
                            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-cyan-300 underline flex items-center gap-1 text-[11px]">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i> ${s.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        equipGrid.innerHTML = html;
    }

    // RENDERIZADO DE MONSTERLINGS (MONPURAN) + FUENTES
    const monsterGrid = document.getElementById('monsterGrid');
    if (monsterGrid) {
        let mHtml = monsterData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${m.image}" alt="${m.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <h3 class="font-title font-bold text-sm text-slate-100 truncate">${m.name}</h3>
                    <p class="text-[10px] text-purple-400 mb-1">${m.habitat} • <span class="text-slate-300">${m.rarity}</span></p>
                    <p class="text-[11px] text-slate-400 line-clamp-2"><strong class="text-slate-200">Habilidad:</strong> ${m.skill}</p>
                </div>
            </div>
        `).join('');

        if (typeof monsterSources !== 'undefined' && monsterSources.length > 0) {
            mHtml += `
                <div class="col-span-full mt-4 p-3 bg-brand-surface border border-white/10 rounded-xl text-xs space-y-2">
                    <div class="flex items-center gap-2 text-cyan-400 font-title font-bold">
                        <i class="fa-solid fa-link"></i> Fuentes de Monpuran / Monsterlings
                    </div>
                    <div class="flex flex-wrap gap-3">
                        ${monsterSources.map(s => `
                            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-cyan-300 underline flex items-center gap-1 text-[11px]">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i> ${s.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        monsterGrid.innerHTML = mHtml;
    }

    // RENDERIZADO DE ARTEFACTOS + FUENTES
    const artifactGrid = document.getElementById('artifactGrid');
    if (artifactGrid) {
        let aHtml = artifactData.map(a => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-2">
                <div class="flex items-center gap-3">
                    <img src="${a.image}" alt="${a.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <h3 class="font-title font-bold text-sm text-cyan-300 truncate">${a.name}</h3>
                            <span class="text-[10px] text-yellow-400 font-extrabold px-1.5 py-0.5 bg-yellow-950/60 border border-yellow-500/30 rounded">${a.rarity || '5★'}</span>
                        </div>
                        <p class="text-[10px] text-slate-400"><strong>Obtención:</strong> ${a.howToGet || 'Dominio'}</p>
                    </div>
                </div>
                <div class="space-y-1 bg-slate-900/60 p-2 rounded-lg border border-white/5 text-xs">
                    <p class="text-slate-300 text-[11px]"><strong>(2 Pcs):</strong> ${a.set2}</p>
                    <p class="text-slate-400 text-[11px]"><strong>(4 Pcs):</strong> ${a.set4}</p>
                </div>
            </div>
        `).join('');

        if (typeof artifactSources !== 'undefined' && artifactSources.length > 0) {
            aHtml += `
                <div class="col-span-full mt-4 p-3 bg-brand-surface border border-white/10 rounded-xl text-xs space-y-2">
                    <div class="flex items-center gap-2 text-cyan-400 font-title font-bold">
                        <i class="fa-solid fa-link"></i> Fuentes de Artefactos
                    </div>
                    <div class="flex flex-wrap gap-3">
                        ${artifactSources.map(s => `
                            <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-purple-300 hover:text-cyan-300 underline flex items-center gap-1 text-[11px]">
                                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i> ${s.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        artifactGrid.innerHTML = aHtml;
    }

    const buildsList = document.getElementById('buildsList');
    if (buildsList) {
        buildsList.innerHTML = buildsData.map(b => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4">
                <h3 class="font-title font-bold text-base text-purple-300 mb-1">${b.name}</h3>
                <p class="text-xs text-cyan-400 font-semibold mb-2">Equipo: ${b.chars}</p>
                <p class="text-xs text-slate-300">${b.desc}</p>
            </div>
        `).join('');
    }

    const mapGrid = document.getElementById('mapGrid');
    if (mapGrid) {
        mapGrid.innerHTML = mapData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3">
                <h3 class="font-title font-bold text-sm text-cyan-400 mb-1"><i class="fa-solid fa-location-dot"></i> ${m.region}</h3>
                <p class="text-xs text-slate-300">${m.desc}</p>
            </div>
        `).join('');
    }

    const eventsList = document.getElementById('eventsList');
    if (eventsList) {
        eventsList.innerHTML = eventsData.map(ev => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex justify-between items-center">
                <div>
                    <h3 class="font-title font-bold text-sm text-slate-100">${ev.title}</h3>
                    <p class="text-xs text-slate-400">${ev.desc}</p>
                </div>
                <span class="text-[10px] px-2 py-1 bg-purple-900/60 text-purple-300 rounded font-semibold whitespace-nowrap">${ev.date}</span>
            </div>
        `).join('');
    }

    const newsList = document.getElementById('newsList');
    if (newsList) {
        newsList.innerHTML = newsData.map(n => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-4">
                <span class="text-[10px] px-2 py-0.5 bg-cyan-900/60 text-cyan-300 rounded font-bold tracking-wider">${n.tag}</span>
                <h3 class="font-title font-bold text-base text-slate-100 mt-2 mb-1">${n.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed">${n.desc}</p>
            </div>
        `).join('');
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        document.getElementById('toastMsg').innerText = msg;
        toast.classList.remove('translate-x-full');
        setTimeout(() => toast.classList.add('translate-x-full'), 2500);
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('installPwaBtn');
    if (btn) btn.classList.add('hidden');
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                document.getElementById('installPwaBtn').classList.add('hidden');
            }
            deferredPrompt = null;
        });
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registrado con éxito', reg))
            .catch(err => console.log('Error al registrar SW', err));
    });
}

window.onload = function() {
    const savedMenuMode = localStorage.getItem('mongil_menu_mode') || 'bottom';
    applyMenuMode(savedMenuMode);
    renderAll();
    loadProfile();
    switchTab('inicio');
};
