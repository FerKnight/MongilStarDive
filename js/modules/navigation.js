function switchTab(tabId) {
    // 1. Guardar la pestaña activa en localStorage
    localStorage.setItem('mongil_active_tab', tabId);

    // 2. Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // 3. Mostrar la sección seleccionada
    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.add('active');
    }

    // 4. Resaltar elemento activo en la barra lateral
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.classList.remove('bg-brand-card', 'text-cyan-400');
        item.classList.add('text-slate-300');
    });

    const navItem = document.getElementById(`nav-${tabId}`);
    if (navItem) {
        navItem.classList.add('bg-brand-card', 'text-cyan-400');
        navItem.classList.remove('text-slate-300');
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
