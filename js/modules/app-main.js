document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar perfil local si existe
    if (typeof loadProfile === 'function') loadProfile();
    
    // 2. Renderizar lista de personajes
    if (typeof renderCharacters === 'function') renderCharacters();
    
    // 3. Renderizar otras secciones generales
    if (typeof renderAll === 'function') renderAll();

    // 4. Recuperar la última pestaña activa (por defecto 'inicio')
    const savedTab = localStorage.getItem('mongil_active_tab') || 'inicio';
    if (typeof switchTab === 'function') {
        switchTab(savedTab);
    }
});

window.renderAll = function() {
    // Renderizado secundario de otros módulos
};
