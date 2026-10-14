document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadProfile === 'function') loadProfile();
    if (typeof renderCharacters === 'function') renderCharacters();
    if (typeof renderAll === 'function') renderAll();

    const savedMenuMode = localStorage.getItem('mongil_menu_mode') || 'bottom';
    applyMenuMode(savedMenuMode);
});

window.renderAll = function() {
    // Renderizado de otras secciones de la PWA si existen
};
