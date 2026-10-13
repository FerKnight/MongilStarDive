const charactersData = [
    // --- 5 ESTRELLAS ---
    { 
        id: "isabella", name: "Isabella", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Cañón Láser", 
        image: "assets/images/Character_Portrait/portrait_Isabella_01.png"
    },
    { 
        id: "vivian", name: "Vivian", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Vivian_01.png"
    },
    { 
        id: "brisshell", name: "Brisshell", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Brishell_01.png"
    },
    { 
        id: "mabel", name: "Mabel", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Mabel_01.png"
    },
    { 
        id: "francis_summer", name: "Francis: Summer Dive!", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_FrancisSummer_01.png"
    },
    { 
        id: "verna_summer", name: "Verna: Summer Dive!", rarity: "5★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_VernaSummer_01.png"
    },
    { 
        id: "nagi", name: "Nagi", rarity: "5★", element: "Rayo", role: "Asesino", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Nagi_01.png"
    },
    { 
        id: "narae", name: "Narae", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Escudo", 
        image: "assets/images/Character_Portrait/portrait_Narae_01.png"
    },
    { 
        id: "mina", name: "Mina", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Mina_01.png"
    },
    { 
        id: "esther", name: "Esther", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Esther_01.png"
    },
    { 
        id: "ophelia_5", name: "Ophelia", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Ophelia_01.png"
    },
    { 
        id: "flare_5", name: "Flare", rarity: "5★", element: "Fuego", role: "Destructor", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Flare_01.png"
    },
    { 
        id: "sangun_5", name: "Sangun", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Sangun_01.png"
    },
    { 
        id: "gabi_5", name: "Gabi", rarity: "5★", element: "Tierra", role: "Luchador", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Gabi_01.png"
    },
    { 
        id: "penny_5", name: "Penny", rarity: "5★", element: "Rayo", role: "Luchador", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Penny_01.png"
    },
    { 
        id: "jiwon", name: "Jiwon", rarity: "5★", element: "Viento", role: "Soporte", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Jiwon_01.png"
    },
    // --- 4 ESTRELLAS ---
    { 
        id: "leeho", name: "Leeho", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Leeho_01.png"
    },
    { 
        id: "cloud_4", name: "Cloud", rarity: "4★", element: "Hielo", role: "Destructor", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Cloud_01.png"
    },
    { 
        id: "verna_4", name: "Verna", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Verna_01.png"
    },
    { 
        id: "reina", name: "Reina", rarity: "4★", element: "Rayo", role: "Destructor", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Reina_01.png"
    },
    { 
        id: "francis_4", name: "Francis", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Francis_01.png"
    },
    { 
        id: "bonnie", name: "Bonnie", rarity: "4★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Bonnie_01.png"
    },
    { 
        id: "ellie", name: "Ellie", rarity: "4★", element: "Tierra", role: "Destructor", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Ellie_01.png"
    },
    { 
        id: "daisy", name: "Daisy", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Daisy_01.png"
    },
    { 
        id: "sera", name: "Sera", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Sera_01.png"
    },
    { 
        id: "benjamin", name: "Benjamin", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Benjamin_01.png"
    },
    { 
        id: "angel", name: "Angel", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Angel_00.png"
    },
    { 
        id: "yeonhwa", name: "Yeonhwa", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Yeonhwa_01.png"
    }
];

const equipData = [
    { name: "Cañón Criogénico Gaba", rarity: "5★", type: "Cañón", stat: "+22% Daño Hielo", desc: "Arma insignia de Isabella. Aumenta la tasa crítica en enemigos congelados.", image: "assets/images/Equipment/icon_equip_cannon.png" },
    { name: "Sable de Viento de Belana", rarity: "5★", type: "Espada Ligera", stat: "+18% Prob. CRIT", desc: "Incrementa el daño de ataque normal tras cambiar de personaje.", image: "assets/images/Equipment/icon_equip_sword.png" },
    { name: "Maza de Titán del Vacío", rarity: "5★", type: "Mandoble", stat: "+25% Ruptura", desc: "Destruye la defensa de los jefes de Conquest Raids.", image: "assets/images/Equipment/icon_equip_mace.png" },
    { name: "Grimorio Celestial", rarity: "4★", type: "Báculo", stat: "+15% Recarga Energía", desc: "Aumenta la curación efectuada a los miembros del equipo.", image: "assets/images/Equipment/icon_equip_book.png" }
];

const monsterData = [
    { name: "Cappyberry", habitat: "Praderas Centralia", rarity: "Raro", skill: "Incrementa la probabilidad crítica del equipo en un 8%.", image: "assets/images/Monsterling_Icons/icon_monster_cappyberry.png" },
    { name: "Cappy Mama", habitat: "Bosque Encantado", rarity: "Épico", skill: "Activa una cura de emergencia al bajar del 30% de vida.", image: "assets/images/Monsterling_Icons/icon_monster_cappymama.png" },
    { name: "King Slime", habitat: "Cueva Cristalina", rarity: "Épico", skill: "Derriba a los enemigos pequeños con impacto terrestre.", image: "assets/images/Monsterling_Icons/icon_monster_kingslime.png" },
    { name: "Gaba Turtle", habitat: "Archipiélago Gaba (1.4)", rarity: "Leyenda", skill: "Otorga un escudo equivalente al 15% de la salud máxima.", image: "assets/images/Monsterling_Icons/icon_monster_gabaturtle.png" },
    { name: "Reginula", habitat: "Nido Real", rarity: "Legendario", skill: "Crea una zona de daño masivo y aumenta el ataque del grupo.", image: "assets/images/Monsterling_Icons/icon_monster_reginula.png" },
    { name: "Sorin", habitat: "Deadlands", rarity: "Legendario", skill: "Invoca meteoros que reducen la resistencia del jefe.", image: "assets/images/Monsterling_Icons/icon_monster_sorin.png" }
];

const artifactData = [
    { name: "Eco del Vacío", set2: "ATK +12%", set4: "+25% Daño al romper la barra Stagger del jefe.", image: "assets/images/Icon_Artifact/artifact_void_eco.png" },
    { name: "Guardián de Belana", set2: "DEF +15%", set4: "Genera un escudo del 20% de la vida al hacer cambio de personaje (Tag).", image: "assets/images/Icon_Artifact/artifact_belana_guardian.png" },
    { name: "Congelación Profunda", set2: "Daño Hielo +10%", set4: "+20% Prob. CRIT contra enemigos afectados por estado Hielo.", image: "assets/images/Icon_Artifact/artifact_deep_freeze.png" },
    { name: "Frenesí Elemental", set2: "Recarga +15%", set4: "Reduce el tiempo de recarga de habilidades tras detonar una reacción.", image: "assets/images/Icon_Artifact/artifact_elemental_frenzy.png" }
];

const buildsData = [
    { name: "Composición Congelación 1.4", chars: "Isabella + Jiwon + Gabi", desc: "Utiliza el control helado de Isabella potenciado por el soporte de velocidad de Gabi." },
    { name: "Hypercarry Fuego Meta", chars: "Leeho + Verna + Esther", desc: "Maximiza el daño de Fuego mediante quemaduras en cadena con Leeho y escudos de Esther." },
    { name: "Ruptura de Jefes (Boss Stagger)", chars: "Cloud + Mabel + King Slime", desc: "Diseñado para derribar jefes de raid como Sorin en pocos segundos." }
];

const mapData = [
    { region: "Archipiélago de Gaba (NUEVO 1.4)", desc: "Región insular del Episodio 7. Hábitat de 29 nuevos Monsterlings y materiales de ascensión." },
    { region: "Centralia", desc: "Praderas iniciales llenas de cofres, misiones de historia y campamentos de entrenamiento." },
    { region: "Deadlands", desc: "Zona de alto riesgo habitada por el jefe legendario Sorin y recursos de alto nivel." }
];

const eventsData = [
    { title: "Medio Aniversario: 150 Tiradas Gratis", date: "En curso", desc: "Inicia sesión diariamente para reclamar hasta 150 boletos de invocación." },
    { title: "Misiones Especiales de Isabella & Leeho", date: "Hasta fin de versión", desc: "Completa los desafíos en el Archipiélago Gaba para desbloquear recompensas exclusivas." },
    { title: "Santuario Elemental", date: "Permanente", desc: "Nuevo modo de juego para desbloquear y subir de nivel habilidades pasivas." }
];

const newsData = [
    { tag: "VER. 1.4", title: "Lanzamiento de la Versión 1.4: Half Anniversary", desc: "Añadida la nueva heroína 5★ Isabella, la región Archipiélago Gaba, el Episodio 7 de la historia y el jefe Sorin." },
    { tag: "MANTENIMIENTO", title: "Notas del Parche 1.4.1", desc: "Ajustes de equilibrio para habilidades de ruptura y optimizaciones en la versión de PC y móvil." },
    { tag: "ANUNCIO", title: "Modo AR Móvil ya disponible", desc: "Tómate fotos en el mundo real con tus personajes y Monsterlings preferidos." }
];
