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

    // 5. Cambiar aleatoriamente el icono superior desde assets/images/Monsterling_Icons al recargar
    initHeaderMonsterlingIcon();
});

window.renderAll = function() {
    // Renderizado secundario de otros módulos
};

function initHeaderMonsterlingIcon() {
    const iconEl = document.getElementById('headerDynamicIcon');
    if (!iconEl) return;

    // Lista de nombres de archivos .png típicos en Monsterling_Icons (puedes ampliarla o ajustarla según tus archivos)
    // Usamos monsterlingsData si está disponible para extraer sus identificadores automáticamente
    let monsterIcons = [];
    if (typeof monsterlingsData !== 'undefined' && Array.isArray(monsterlingsData)) {
        monsterIcons = monsterlingsData.map(m => m.imageName || m.id || m.name);
    }

    // Fallback con algunos nombres estándar si el códice está vacío
    if (monsterIcons.length === 0) {
        monsterIcons = ['monster_01', 'monster_02', 'monster_03', 'gaba_spirit', 'belana_beast'];
    }

    // Seleccionar un icono al azar cada vez que se recarga la página
    const randomIndex = Math.floor(Math.random() * monsterIcons.length);
    const selectedIcon = monsterIcons[randomIndex];

    iconEl.src = `assets/images/Monsterling_Icons/${selectedIcon}.png`;
}
