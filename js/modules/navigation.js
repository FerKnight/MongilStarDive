// LÓGICA DE NAVEGACIÓN Y PESTAÑAS CON SESSIONSTORAGE
function switchTab(tabId, updateHistory = true) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(`tab-${tabId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Actualizar estados visuales de los botones de navegación en el menú lateral
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    navItems.forEach(item => {
        item.classList.remove('bg-purple-500/20', 'text-cyan-400');
    });

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add('bg-purple-500/20', 'text-cyan-400');
    }

    // Guardar en sessionStorage la pestaña actual para conservarla al recargar
    sessionStorage.setItem('mongil_current_tab', tabId);

    // Scroll al inicio de la página suavemente
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

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay una pestaña guardada en la sesión actual (recarga)
    const savedTab = sessionStorage.getItem('mongil_current_tab');

    if (savedTab) {
        // Si ya estaba navegando en esta sesión, restaurar esa pestaña
        switchTab(savedTab, false);
    } else {
        // Si es la primera vez que abre la web en esta pestaña/sesión, forzar 'inicio'
        switchTab('inicio', false);
    }
});
