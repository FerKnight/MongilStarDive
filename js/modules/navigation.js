// LÓGICA DE NAVEGACIÓN Y PESTAÑAS (PERSISTENCIA AL RECARGAR VÍA SESSIONSTORAGE)
const CURRENT_TAB_KEY = 'mongil_active_tab';

function switchTab(tabId) {
    if (!tabId) return;

    // 1. Ocultar todas las secciones de contenido
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
        sec.classList.add('hidden');
    });

    // 2. Mostrar la sección seleccionada
    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.remove('hidden');
    }

    // 3. Actualizar estado activo en la barra de navegación lateral / menú
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => {
        item.classList.remove('bg-purple-500/20', 'text-cyan-400', 'font-bold');
        item.classList.add('text-slate-300');
    });

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add('bg-purple-500/20', 'text-cyan-400', 'font-bold');
        activeNav.classList.remove('text-slate-300');
    }

    // 4. Guardar la pestaña activa en sessionStorage
    sessionStorage.setItem(CURRENT_TAB_KEY, tabId);

    // 5. Scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar || !overlay) return;

    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

// RESTAURACIÓN DE PESTAÑA AL CARGAR / RECARGAR
document.addEventListener('DOMContentLoaded', () => {
    // Leemos si hay una pestaña activa previamente guardada en esta sesión
    const savedTab = sessionStorage.getItem(CURRENT_TAB_KEY);

    // Damos un pequeño margen para asegurar que todo el HTML esté listo
    setTimeout(() => {
        if (savedTab && document.getElementById(`tab-${savedTab}`)) {
            switchTab(savedTab);
        } else {
            switchTab('inicio');
        }
    }, 50);
});
