const equipSources = [
    { name: "GameWith.ai Equipment DB (Español)", url: "https://gamewith.ai/mongil-stardive/es/equipment-db" },
    { name: "MSD Tracker Equipment Database", url: "https://msd-tracker.debu.games/equipments" },
    { name: "Game8 / GameWith Mongil: Star Dive Wiki", url: "https://game8.co/games/Mongil-Star-Dive/archives/592051" },
    { name: "Kaiden.gg Equipment Guides", url: "https://www.kaiden.gg/mongil/" }
];

const equipData = [
    // --- SETS DE 5★ ---
    {
        id: "set_furia_volcanica",
        name: "Set Furia Volcánica",
        rarity: "5★",
        pieces: ["Casco Volcánico", "Pechera Volcánica", "Guantes Volcánicos", "Botas Volcánicas"],
        bonus2: "Daño de Fuego +15%",
        bonus4: "Al infligir daño de Fuego, aumenta el Ataque del equipo un 20% durante 10 s (Efecto acumulable hasta 2 veces).",
        howToGet: "Modo Conquista (Conquest Stage 10+) / Crafteo con Materiales de Jefe",
        image: "assets/images/Equipment/icon_equip_volcano.png"
    },
    {
        id: "set_escudo_guardian",
        name: "Set Fortaleza del Guardián",
        rarity: "5★",
        pieces: ["Casco de Guardián", "Pechera de Guardián", "Guantes de Guardián", "Botas de Guardián"],
        bonus2: "Defensa +20%",
        bonus4: "Al realizar un Cambio de Personaje (Tag), otorga a todo el equipo un escudo equivalente al 25% de la DEF máxima por 8 s.",
        howToGet: "Raid de Conquista: Jefes Semanales (Sorin / King Slime)",
        image: "assets/images/Equipment/icon_equip_guardian.png"
    },
    {
        id: "set_viento_mortal",
        name: "Set Cazador del Viento",
        rarity: "5★",
        pieces: ["Casco del Cazador", "Pechera del Cazador", "Guantes del Cazador", "Botas del Cazador"],
        bonus2: "Probabilidad CRÍT +12%",
        bonus4: "Aumenta el Daño CRÍT un 35% contra enemigos afectados por Ruptura o Stagger.",
        howToGet: "Dominio de Crafteo: Minerales Raros y Encargos de Monstruos 5★",
        image: "assets/images/Equipment/icon_equip_wind.png"
    },
    {
        id: "set_sombra_asombrosa",
        name: "Set Sombra Fulgurante",
        rarity: "5★",
        pieces: ["Casco Sombrío", "Pechera Sombría", "Guantes Sombríos", "Botas Sombrías"],
        bonus2: "Daño de Rayo +15%",
        bonus4: "Aumenta la velocidad de ataque un 15% y los ataques básicos generan un 30% más de energía para la Habilidad Especial.",
        howToGet: "Modo Conquista (Etapas de Alto Nivel) / Menú de Crafteo",
        image: "assets/images/Equipment/icon_equip_shadow.png"
    },

    // --- SETS DE 4★ ---
    {
        id: "set_caballero_inicio",
        name: "Set Caballero de Centralia",
        rarity: "4★",
        pieces: ["Casco de Caballero", "Pechera de Caballero", "Guantes de Caballero", "Botas de Caballero"],
        bonus2: "Ataque +10%",
        bonus4: "Aumenta el daño del Ataque Cargado un 20%.",
        howToGet: "Misión Principal 'Do It Yourself!' (Episodio 1) y Cofres de Exploración",
        image: "assets/images/Equipment/icon_equip_knight.png"
    },
    {
        id: "set_medico_tactico",
        name: "Set Médico Táctico",
        rarity: "4★",
        pieces: ["Casco Táctico", "Pechera Táctica", "Guantes Tácticos", "Botas Tácticas"],
        bonus2: "Bono de Curación +15%",
        bonus4: "Usar la Habilidad de Relevo restaura un 10% de la vida máxima a todos los aliados.",
        howToGet: "Encargos Diarios de Monstruos y Crafteo Básico",
        image: "assets/images/Equipment/icon_equip_medic.png"
    },
    {
        id: "set_peregrino_hielo",
        name: "Set Peregrino Escarchado",
        rarity: "4★",
        pieces: ["Casco de Escarcha", "Pechera de Escarcha", "Guantes de Escarcha", "Botas de Escarcha"],
        bonus2: "Resistencia Elemental +15%",
        bonus4: "Reduce el tiempo de recarga (Cooldown) de la Habilidad Especial en un 15%.",
        howToGet: "Misiones del Cap. 4-6 y Tienda de Intercambio de Recursos",
        image: "assets/images/Equipment/icon_equip_frost.png"
    }
];
