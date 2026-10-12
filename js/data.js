const charactersData = [
    { 
        id: "isabella", name: "Isabella", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Cañón Láser", 
        desc: "Genial ingeniera de la Ver. 1.4. Dispara ráfagas heladas que ralentizan y congelan jefes.", icon: "fa-atom",
        skillPassive: "Reacción Criogénica: Congela enemigos tras 5 ataques consecutivos.", skillActive: "Ráfaga Ártica: Lanza un cañonazo láser helado de gran alcance.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "verna", name: "Verna", rarity: "5★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        desc: "Protagonista aventurera. Ejecuta potentes tajos ardientes con gran velocidad.", icon: "fa-fire",
        skillPassive: "Furia Ígnea: Aumenta la velocidad de ataque al acumular golpes.", skillActive: "Tajo Devastador: Embate frontal envuelto en llamas.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "cloud", name: "Cloud", rarity: "5★", element: "Rayo", role: "Destructor", weapon: "Mandoble", 
        desc: "Guerrero silencioso enfocado en romper la barra Stagger de los enemigos rápidamente.", icon: "fa-bolt",
        skillPassive: "Impacto Pesado: Genera un 25% más de daño de ruptura.", skillActive: "Corte Relámpago: Golpe descendente que aturde a jefes de raid.", monsterlingCombo: "King Slime"
    },
    { 
        id: "esther", name: "Esther", rarity: "5★", element: "Fuego", role: "Soporte", weapon: "Báculo", 
        desc: "Especialista en potenciar el ataque del grupo y crear escudos protectores.", icon: "fa-wand-magic-sparkles",
        skillPassive: "Aura Bendita: Incrementa el ATK del equipo en un 15%.", skillActive: "Escudo Solar: Absorbe daño equivalente a la vida máxima de Esther.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "jiwon", name: "Jiwon", rarity: "5★", element: "Hielo", role: "Asesino", weapon: "Lanza", 
        desc: "Aplica embates veloces de hielo e interrumpe ataques cargados.", icon: "fa-snowflake",
        skillPassive: "Filo Congelante: Los golpes críticos extienden la congelación.", skillActive: "Estocada Glacial: Penetración de defensa directa.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "mina", name: "Mina", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        desc: "Agilidad extrema con golpes críticos en ráfaga.", icon: "fa-wind",
        skillPassive: "Efecto Ráfaga: Aumenta el daño crítico con cada esquiva perfecta.", skillActive: "Danza del Viento: Serie de estocadas invisibles a hipervelocidad.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "narae", name: "Narae", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Escudo", 
        desc: "Gran mitigación de daño e impactos pesados de tierra.", icon: "fa-shield",
        skillPassive: "Baluarde de Piedra: Reduce el daño recibido en un 20%.", skillActive: "Sismo Terrestre: Aplasta el suelo creando una onda expansiva.", monsterlingCombo: "King Slime"
    },
    { 
        id: "nagi", name: "Nagi", rarity: "5★", element: "Rayo", role: "Asesino", weapon: "Lanza", 
        desc: "Ataques relámpago de gran alcance y daño en área.", icon: "fa-bolt-lightning",
        skillPassive: "Conductividad: Infunde electricidad en las habilidades del equipo.", skillActive: "Descarga Rayo: Atraviesa múltiples objetivos en línea recta.", monsterlingCombo: "King Slime"
    },
    { 
        id: "flare", name: "Flare", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Dagas", 
        desc: "Ataques veloces que provocan quemaduras acumulativas.", icon: "fa-flame",
        skillPassive: "Combustión: Inflige daño continuo por quemadura.", skillActive: "Daga Incandescente: Lanza proyectiles de fuego veloz.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "gabi", name: "Gabi", rarity: "4★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        desc: "Acelera la velocidad de movimiento y recarga el medidor de relevo.", icon: "fa-feather",
        skillPassive: "Viento Ligero: Incrementa la velocidad del equipo un 10%.", skillActive: "Torbellino de Curación: Regenera energía de Relevo (Tag).", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "chloe", name: "Chloe", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Escudo", 
        desc: "Especialista defensiva introducida en la región del Archipiélago de Gaba.", icon: "fa-shield-heart",
        skillPassive: "Barrera Robusta: Escudo pasivo al cambiar de héroe.", skillActive: "Fortaleza de Gaba: Otorga inmunidad a derribos temporales.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "penny", name: "Penny", rarity: "4★", element: "Hielo", role: "Soporte", weapon: "Báculo", 
        desc: "Regeneración constante de vida e incremento de resistencia elemental.", icon: "fa-hand-holding-droplet",
        skillPassive: "Gota de Rocío: Cura gradualmente al héroe activo.", skillActive: "Marea Curativa: Manta de curación masiva para todo el grupo.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "sangun", name: "Sangun", rarity: "4★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        desc: "Impactos pesados que rompen la postura enemiga.", icon: "fa-gavel",
        skillPassive: "Fuerza Bruta: Aumenta la potencia de aturdimiento.", skillActive: "Martillazo Titánico: Rompe defensas de escudos.", monsterlingCombo: "King Slime"
    },
    { 
        id: "yeonhwa", name: "Yeonhwa", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Catalizador", 
        desc: "Control de masas mediante ráfagas de congelación de área.", icon: "fa-snowflake",
        skillPassive: "Escarcha: Ralentiza a los enemigos cercanos.", skillActive: "Explosión Helada: Ráfaga de hielo en forma de cono.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "francis", name: "Francis", rarity: "4★", element: "Rayo", role: "Luchador", weapon: "Espada corta", 
        desc: "Espadachín eléctrico experto en ataques en cadena.", icon: "fa-bolt",
        skillPassive: "Sobrecarga: Genera chispas adicionales en golpes críticos.", skillActive: "Corte Voltio: Desplazamiento rápido entre enemigos.", monsterlingCombo: "King Slime"
    },
    { 
        id: "ofelia", name: "Ofelia", rarity: "4★", element: "Viento", role: "Destructor", weapon: "Lanza", 
        desc: "Ataques de empuje y ruptura impulsados por corrientes de aire.", icon: "fa-wind",
        skillPassive: "Tornado: Aumenta el alcance de estocada.", skillActive: "Ráfaga Perforante: Empuja y rompe el equilibrio del objetivo.", monsterlingCombo: "Cappyberry"
    }
];

const equipData = [
    { name: "Cañón Criogénico Gaba", rarity: "5★", type: "Cañón", stat: "+22% Daño Hielo", desc: "Arma insignia de Isabella. Aumenta la tasa crítica en enemigos congelados." },
    { name: "Sable de Viento de Belana", rarity: "5★", type: "Espada Ligera", stat: "+18% Prob. CRIT", desc: "Incrementa el daño de ataque normal tras cambiar de personaje." },
    { name: "Maza de Titán del Vacío", rarity: "5★", type: "Mandoble", stat: "+25% Ruptura", desc: "Destruye la defensa de los jefes de Conquest Raids." },
    { name: "Grimorio Celestial", rarity: "4★", type: "Báculo", stat: "+15% Recarga Energía", desc: "Aumenta la curación efectuada a los miembros del equipo." }
];

const monsterData = [
    { name: "Cappyberry", habitat: "Praderas Centralia", rarity: "Raro", skill: "Incrementa la probabilidad crítica del equipo en un 8%." },
    { name: "Cappy Mama", habitat: "Bosque Encantado", rarity: "Épico", skill: "Activa una cura de emergencia al bajar del 30% de vida." },
    { name: "King Slime", habitat: "Cueva Cristalina", rarity: "Épico", skill: "Derriba a los enemigos pequeños con impacto terrestre." },
    { name: "Gaba Turtle", habitat: "Archipiélago Gaba (1.4)", rarity: "Leyenda", skill: "Otorga un escudo equivalente al 15% de la salud máxima." },
    { name: "Scarlet Queen", habitat: "Tierras Áridas", rarity: "Leyenda", skill: "Aumenta el daño de Fuego en un 20% durante 10s." }
];

const artifactData = [
    { name: "Eco del Vacío", set2: "ATK +12%", set4: "+25% Daño al romper la barra Stagger del jefe." },
    { name: "Guardián de Belana", set2: "DEF +15%", set4: "Genera un escudo del 20% de la vida al hacer cambio de personaje (Tag)." },
    { name: "Congelación Profunda", set2: "Daño Hielo +10%", set4: "+20% Prob. CRIT contra enemigos afectados por estado Hielo." },
    { name: "Frenesí Elemental", set2: "Recarga +15%", set4: "Reduce el tiempo de recarga de habilidades tras detonar una reacción." }
];

const buildsData = [
    { name: "Composición Congelación 1.4", chars: "Isabella + Jiwon + Gabi", desc: "Utiliza el control helado de Isabella potenciado por el soporte de velocidad de Gabi." },
    { name: "Hypercarry Fuego Meta", chars: "Verna + Esther + Flare", desc: "Maximiza el daño de Fuego mediante quemaduras en cadena y escudos de Esther." },
    { name: "Ruptura de Jefes (Boss Stagger)", chars: "Cloud + Chloe + Cappy Mama", desc: "Diseñado para derribar jefes de raid como Sorin en pocos segundos." }
];

const mapData = [
    { region: "Archipiélago de Gaba (NUEVO 1.4)", desc: "Región insular del Episodio 7. Hábitat de 29 nuevos Monsterlings y materiales de ascensión." },
    { region: "Centralia", desc: "Praderas iniciales llenas de cofres, misiones de historia y campamentos de entrenamiento." },
    { region: "Deadlands", desc: "Zona de alto riesgo habitada por el jefe legendario Sorin y recursos de alto nivel." }
];

const eventsData = [
    { title: "Medio Aniversario: 150 Tiradas Gratis", date: "En curso", desc: "Inicia sesión diariamente para reclamar hasta 150 boletos de invocación." },
    { title: "Misiones Especiales de Isabella", date: "Hasta fin de versión", desc: "Completa los desafíos en el Archipiélago Gaba para desbloquear recompensas exclusivas." },
    { title: "Santuario Elemental", date: "Permanente", desc: "Nuevo modo de juego para desbloquear y subir de nivel habilidades pasivas." }
];

const newsData = [
    { tag: "VER. 1.4", title: "Lanzamiento de la Versión 1.4: Half Anniversary", desc: "Añadida la nueva heroína 5★ Isabella, la región Archipiélago Gaba, el Episodio 7 de la historia y el jefe Sorin." },
    { tag: "MANTENIMIENTO", title: "Notas del Parche 1.4.1", desc: "Ajustes de equilibrio para habilidades de ruptura y optimizaciones en la versión de PC y móvil." },
    { tag: "ANUNCIO", title: "Modo AR Móvil ya disponible", desc: "Tómate fotos en el mundo real con tus personajes y Monsterlings preferidos." }
];
