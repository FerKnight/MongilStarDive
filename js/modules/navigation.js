function switchTab(tabId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(el => el.classList.remove('active'));

    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }

    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetNav) {
        targetNav.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyMenuMode(mode) {
    const bottomNav = document.getElementById('bottomNav');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const radioBottom = document.getElementById('radioBottomNav');
    const radioSidebar = document.getElementById('radioSidebarNav');

    if (mode === 'sidebar') {
        if (bottomNav) bottomNav.classList.add('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.remove('hidden');
        if (radioSidebar) radioSidebar.checked = true;
        if (radioBottom) radioBottom.checked = false;
    } else {
        if (bottomNav) bottomNav.classList.remove('hidden');
        if (sidebarToggleBtn) sidebarToggleBtn.classList.add('hidden');
        if (radioBottom) radioBottom.checked = true;
        if (radioSidebar) radioSidebar.checked = false;
    }
}

function setMenuMode(mode) {
    localStorage.setItem('mongil_menu_mode', mode);
    applyMenuMode(mode);
    showToast(`Modo cambiado a: ${mode === 'sidebar' ? 'Menú Desplegable' : 'Menú Inferior'}`);
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

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
}
