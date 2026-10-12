let deferredPrompt;

function renderAll() {
    const charGrid = document.getElementById('charGrid');
    if (charGrid) {
        charGrid.innerHTML = charactersData.map(c => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3 hover:border-cyan-400/50 transition">
                <div class="w-10 h-10 rounded-lg bg-purple-900/50 text-cyan-400 flex items-center justify-center text-lg mb-2">
                    <i class="fa-solid ${c.icon}"></i>
                </div>
                <div class="flex items-center justify-between">
                    <h3 class="font-title font-bold text-sm text-slate-100">${c.name}</h3>
                    <span class="text-[10px] text-yellow-400 font-bold">${c.rarity}</span>
                </div>
                <p class="text-[10px] text-cyan-400 font-semibold mb-1">${c.element} • ${c.role}</p>
                <p class="text-[11px] text-slate-400 line-clamp-2">${c.desc}</p>
            </div>
        `).join('');
    }

    const equipGrid = document.getElementById('equipGrid');
    if (equipGrid) {
        equipGrid.innerHTML = equipData.map(e => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-title font-bold text-sm text-purple-300">${e.name}</h3>
                    <span class="text-xs text-yellow-400 font-bold">${e.rarity}</span>
                </div>
                <p class="text-xs text-cyan-400 font-semibold mb-2">${e.type} | ${e.stat}</p>
                <p class="text-xs text-slate-400">${e.desc}</p>
            </div>
        `).join('');
    }

    const monsterGrid = document.getElementById('monsterGrid');
    if (monsterGrid) {
        monsterGrid.innerHTML = monsterData.map(m => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3">
                <h3 class="font-title font-bold text-sm text-slate-100">${m.name}</h3>
                <p class="text-[10px] text-purple-400 mb-1">${m.habitat} • <span class="text-slate-300">${m.rarity}</span></p>
                <p class="text-xs text-slate-400"><strong class="text-slate-200">Habilidad:</strong> ${m.skill}</p>
            </div>
        `).join('');
    }

    const artifactGrid = document.getElementById('artifactGrid');
    if (artifactGrid) {
        artifactGrid.innerHTML = artifactData.map(a => `
            <div class="bg-brand-card border border-white/10 rounded-xl p-3">
                <h3 class="font-title font-bold text-sm text-cyan-300 mb-1">${a.name}</h3>
                <p class="text-xs text-slate-300 mb-1"><strong>(2 Pcs):</strong> ${a.set2}</p>
                <p class="text-xs text-slate-400"><strong>(4 Pcs):</strong> ${a.set4}</p>
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

function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) targetSection.classList.add('active');

    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetNav) targetNav.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveProfile() {
    const profile = {
        name: document.getElementById('pName').value,
        uid: document.getElementById('pUID').value,
        friendCode: document.getElementById('pFriendCode').value,
        message: document.getElementById('pMessage').value,
        icon: document.getElementById('avatarIcon').className
    };
    localStorage.setItem('mongil_player_profile', JSON.stringify(profile));
    showToast('Perfil guardado correctamente');
}

function loadProfile() {
    const saved = localStorage.getItem('mongil_player_profile');
    if (saved) {
        const profile = JSON.parse(saved);
        if (profile.name) document.getElementById('pName').value = profile.name;
        if (profile.uid) document.getElementById('pUID').value = profile.uid;
        if (profile.friendCode) document.getElementById('pFriendCode').value = profile.friendCode;
        if (profile.message) document.getElementById('pMessage').value = profile.message;
        if (profile.icon) document.getElementById('avatarIcon').className = profile.icon;
    }
}

function setAvatar(iconClass) {
    document.getElementById('avatarIcon').className = `fa-solid ${iconClass}`;
    saveProfile();
}

function copyField(elementId) {
    const input = document.getElementById(elementId);
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('¡Copiado al portapapeles!');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        document.getElementById('toastMsg').innerText = msg;
        toast.classList.remove('translate-x-full');
        setTimeout(() => toast.classList.add('translate-x-full'), 2500);
    }
}

// Evento de instalación PWA
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

// Registro del Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registrado con éxito', reg))
            .catch(err => console.log('Error al registrar SW', err));
    });
}

window.onload = function() {
    renderAll();
    loadProfile();
};
