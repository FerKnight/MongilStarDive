function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });

    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const navItem = document.getElementById(`nav-${tabId}`);
    if (navItem) {
        navItem.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

function setMenuMode(mode) {
    localStorage.setItem('mongil_menu_mode', mode);
    applyMenuMode(mode);
    closeSettingsModal();
    if (typeof saveCloudData === 'function') saveCloudData();
}

function applyMenuMode(mode) {
    const bottomNav = document.getElementById('bottomNav');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');

    if (mode === 'sidebar') {
        if (bottomNav) bottomNav.classList.add('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.remove('hidden');
    } else {
        if (bottomNav) bottomNav.classList.remove('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.add('hidden');
    }

    const radioBottom = document.getElementById('radioBottomNav');
    const radioSidebar = document.getElementById('radioSidebarNav');
    if (radioBottom && radioSidebar) {
        radioBottom.checked = (mode === 'bottom');
        radioSidebar.checked = (mode === 'sidebar');
    }
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toastMsg');
    if (toast && msgEl) {
        msgEl.innerText = message;
        toast.classList.remove('translate-x-full');
        setTimeout(() => {
            toast.classList.add('translate-x-full');
        }, 3000);
    }
}

let deferredPrompt = null;
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
                showToast('¡Aplicación instalada con éxito!');
            }
            deferredPrompt = null;
        });
    }
}
