let deferredPrompt;

function renderAll() {
    filterCharacters();
    updateOwnedCounter();

    const equipGrid = document.getElementById('equipGrid');
    if (equipGrid) {
        equipGrid.innerHTML = equipData.map(e => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${e.image}" alt="${e.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start mb-0.5">
                        <h3 class="font-title font-bold text-sm text-purple-300 truncate">${e.name}</h3>
                        <span class="text-xs text-yellow-400 font-bold">${e.rarity}</span>
                    </div>
                    <p class="text-xs text-cyan-400 font-semibold mb-1">${e.type} | ${e.stat}</p>
                    <p class="text-[11px] text-slate-400 line-clamp-2">${e.desc}</p>
                </div>
            </div>
        `).join('');
    }

    const monsterGrid = document.getElementById('monsterGrid');
    if (monsterGrid) {
        monsterGrid.innerHTML = monsterData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${m.image}" alt="${m.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <h3 class="font-title font-bold text-sm text-slate-100 truncate">${m.name}</h3>
                    <p class="text-[10px] text-purple-400 mb-1">${m.habitat} • <span class="text-slate-300">${m.rarity}</span></p>
                    <p class="text-[11px] text-slate-400 line-clamp-2"><strong class="text-slate-200">Habilidad:</strong> ${m.skill}</p>
                </div>
            </div>
        `).join('');
    }

    const artifactGrid = document.getElementById('artifactGrid');
    if (artifactGrid) {
        artifactGrid.innerHTML = artifactData.map(a => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src="${a.image}" alt="${a.name}" class="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/5" onerror="this.onerror=null; this.src='assets/images/Character_Portrait/portrait_Verna_01.png';">
                <div class="flex-1 min-w-0">
                    <h3 class="font-title font-bold text-sm text-cyan-300 mb-1 truncate">${a.name}</h3>
                    <p class="text-[11px] text-slate-300 mb-0.5"><strong>(2 Pcs):</strong> ${a.set2}</p>
                    <p class="text-[11px] text-slate-400"><strong>(4 Pcs):</strong> ${a.set4}</p>
                </div>
            </div>
        `).join('');
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
    if (btn) btn.classList.remove('hidden');
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
