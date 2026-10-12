const charactersData = [
    // ==========================================
    // --- 5 ESTRELLAS (16 PERSONAJES) ---
    // ==========================================
    { 
        id: "isabella", name: "Isabella", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Cañón Láser", 
        desc: "Genial ingeniera de la Ver. 1.4. Dispara ráfagas heladas que ralentizan y congelan jefes.", icon: "fa-atom",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Isabella_01.png",
        skillPassive: "Reacción Criogénica: Congela enemigos tras 5 ataques consecutivos.", skillActive: "Ráfaga Ártica: Lanza un cañonazo láser helado de gran alcance.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "vivian", name: "Vivian", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Báculo", 
        desc: "Maga de hielo refinada que otorga escudos congelantes y amplifica el daño elemental del grupo.", icon: "fa-snowflake",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Vivian_01.png",
        skillPassive: "Aura de Escarcha: Incrementa la resistencia helada del equipo.", skillActive: "Prisma Glacial: Crea un campo de fuerza que absorbe impactos.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "brishell", name: "Brishell", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        desc: "Veloz combatiente de viento capaz de cortar a través de las defensas enemigas en segundos.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Brrishell_01.png",
        skillPassive: "Corte Cero: Bonificación de probabilidad crítica contra objetivos aislados.", skillActive: "Vendaval Mortal: Serie de estocadas aéreas continuas.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "mabel", name: "Mabel", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        desc: "Guerrera imponente de tierra que pulveriza el equilibrio de los jefes.", icon: "fa-gavel",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Mabel_01.png",
        skillPassive: "Impacto Tectónico: +20% de daño a la barra Stagger.", skillActive: "Furia Sísmica: Golpe terrestre masivo con onda expansiva.", monsterlingCombo: "King Slime"
    },
    { 
        id: "francis_summer", name: "Francis: Summer Dive!", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Espada corta", 
        desc: "Edición veraniega especial de Francis. Combina estocadas aerodinámicas con gran agilidad.", icon: "fa-umbrella-beach",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Francis_01.png",
        skillPassive: "Marea Festiva: Restaura energía al asestar golpes críticos.", skillActive: "Corte Brisa: Desplazamiento de viento de alto impacto.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "verna_summer", name: "Verna: Summer Dive!", rarity: "5★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        desc: "Variante veraniega de Verna. Inflige daño de fuego explosivo en área.", icon: "fa-sun",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Verna_01.png",
        skillPassive: "Sol Radiante: Aumenta la velocidad de ataque durante el evento.", skillActive: "Tajo Solar: Embate ardiente que quema a múltiples objetivos.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "nagi", name: "Nagi", rarity: "5★", element: "Rayo", role: "Asesino", weapon: "Lanza", 
        desc: "Ataques relámpago de gran alcance y letalidad en enfrentamientos veloces.", icon: "fa-bolt-lightning",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Nagi_01.png",
        skillPassive: "Conductividad: Infunde electricidad en las habilidades del equipo.", skillActive: "Descarga Rayo: Atraviesa múltiples objetivos en línea recta.", monsterlingCombo: "King Slime"
    },
    { 
        id: "narae", name: "Narae", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Escudo", 
        desc: "Baluarde defensivo con mitigación de daño y escudos protectores.", icon: "fa-shield",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Narae_01.png",
        skillPassive: "Baluarde de Hielo: Reduce el daño recibido en un 20%.", skillActive: "Sismo Glacial: Escudos masivos para el grupo.", monsterlingCombo: "King Slime"
    },
    { 
        id: "mina", name: "Mina", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        desc: "Agilidad extrema con golpes críticos en ráfaga e invisibilidad temporal.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Mina_01.png",
        skillPassive: "Efecto Ráfaga: Aumenta el daño crítico con cada esquiva perfecta.", skillActive: "Danza del Viento: Serie de estocadas invisibles a hipervelocidad.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "esther", name: "Esther", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Báculo", 
        desc: "Especialista en potenciar el ataque del grupo mediante estocadas de viento furtivas.", icon: "fa-wand-magic-sparkles",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Esther_01.png",
        skillPassive: "Aura de Caza: Multiplicadores altos en ataques por la espalda.", skillActive: "Emboscada Eólica: Ataque sorpresa de gran precisión.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "ophelia_5", name: "Ophelia", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        desc: "Maestra de la lanza con control de hielo que destroza la postura enemiga.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Ophelia_01.png",
        skillPassive: "Presión Glacial: Incrementa el alcance de estocada.", skillActive: "Tornado Congelante: Empuja y rompe el equilibrio del objetivo.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "flare_5", name: "Flare", rarity: "5★", element: "Fuego", role: "Destructor", weapon: "Dagas", 
        desc: "Versión de elite con potentes ráfagas de fuego y capacidad de romper escudos.", icon: "fa-flame",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Flare_01.png",
        skillPassive: "Combustión Avanzada: Quemaduras en cadena a enemigos cercanos.", skillActive: "Daga Incandescente: Rompe defensas de fuego.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "sangun_5", name: "Sangun", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Mandoble", 
        desc: "Fuerza imponente de viento con mecánicas de atracción y combos constantes.", icon: "fa-gavel",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Sangun_01.png",
        skillPassive: "Presión Continua: Aumenta la velocidad de ataque en combate.", skillActive: "Huracán de Mandoble: Golpes sucesivos en área.", monsterlingCombo: "King Slime"
    },
    { 
        id: "gabi_5", name: "Gabi", rarity: "5★", element: "Tierra", role: "Luchador", weapon: "Catalizador", 
        desc: "Potenciadora experta de tierra que aplica control de masas y petrificación.", icon: "fa-feather",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Gabi_01.png",
        skillPassive: "Petrificación: Inmoviliza objetivos con ataques terrestres.", skillActive: "Golpe Telúrico: Daño masivo de área.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "penny_5", name: "Penny", rarity: "5★", element: "Rayo", role: "Luchador", weapon: "Báculo", 
        desc: "Especialista a distancia con alta frecuencia de ataques y control de energía.", icon: "fa-hand-holding-droplet",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Penny_01.png",
        skillPassive: "Moneda de Oro: Sustenta la stamina y ataques rápidos.", skillActive: "Rayo Eléctrico: Descarga de energía continua.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "jiwon", name: "Jiwon", rarity: "5★", element: "Viento", role: "Soporte", weapon: "Lanza", 
        desc: "Soporte especializado en potenciar el daño de Viento y reducir el consumo de stamina.", icon: "fa-snowflake",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Jiwon_01.png",
        skillPassive: "Melodía Divina: Otorga bonificaciones al equipo de Viento.", skillActive: "Agrupación Eólica: Reúne a los enemigos en un punto.", monsterlingCombo: "Cappy Mama"
    },

    // ==========================================
    // --- 4 ESTRELLAS (12 PERSONAJES) ---
    // ==========================================
    { 
        id: "leeho", name: "Leeho", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Espada corta", 
        desc: "Luchador felino de fuego con marca de cazador y reducción de resistencia elemental.", icon: "fa-cat",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Leeho_01.png",
        skillPassive: "Marca del Cazador: Estabilidad de daño continuo y quemadura.", skillActive: "Zarpazo Ígneo: Cortes veloces en cadena.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "cloud_4", name: "Cloud", rarity: "4★", element: "Hielo", role: "Destructor", weapon: "Mandoble", 
        desc: "Guerrero de hielo experto en disparos y ataques perforantes de gran alcance.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Cloud_01.png",
        skillPassive: "Generación de Cristales: Escala según los enemigos golpeados.", skillActive: "Flecha Glacial: Disparo perforante de alta eficacia.", monsterlingCombo: "King Slime"
    },
    { 
        id: "verna_4", name: "Verna", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        desc: "Versión base de la aventurera Verna con daño de fuego equilibrado.", icon: "fa-fire",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Verna_01.png",
        skillPassive: "Chispa: Otorga probabilidad de quemadura al golpear.", skillActive: "Corte Ígneo: Tajo frontal envuelto en llamas.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "reina", name: "Reina", rarity: "4★", element: "Rayo", role: "Destructor", weapon: "Dagas", 
        desc: "Especialista en romper la barra Stagger acumulando energía eléctrica.", icon: "fa-fire-burner",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Reina_01.png",
        skillPassive: "Acumulación de Voltio: Potencia el golpe final de ruptura.", skillActive: "Estocada Eléctrica: Corte fulminante.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "francis_4", name: "Francis", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Espada corta", 
        desc: "Hechicera de apoyo que convierte defensa en curación y aplica veneno protector.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Francis_01.png",
        skillPassive: "Bruma Curativa: Otorga regeneración y buffs de daño crítico.", skillActive: "Niebla de Tierra: Debilita la armadura rival.", monsterlingCombo: "King Slime"
    },
    { 
        id: "bonnie", name: "Bonnie", rarity: "4★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        desc: "Soporte táctico de viento que destaca en la resonancia contra hordas de enemigos.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Bonnie_01.png",
        skillPassive: "Resonancia Eólica: Aumenta la sinergia de equipo.", skillActive: "Pulso de Viento: Barrido defensivo.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "ellie", name: "Ellie", rarity: "4★", element: "Tierra", role: "Destructor", weapon: "Espada corta", 
        desc: "Especialista en daño de neutralización y ruptura con atributos terrestres.", icon: "fa-snowflake",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Ellie_01.png",
        skillPassive: "Impacto Telúrico: Rompe la guardia enemiga.", skillActive: "Tajo de Roca: Golpe frontal contundente.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "daisy", name: "Daisy", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Báculo", 
        desc: "Soporte de apoyo basado en la sabiduría de las reinas elfas y barreras de piedra.", icon: "fa-shield-halved",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Daisy_01.png",
        skillPassive: "Escudo Ancestral: Absorbe daño físico.", skillActive: "Protección de Gaia: Cura y defiende al grupo.", monsterlingCombo: "King Slime"
    },
    { 
        id: "sera", name: "Sera", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        desc: "Lancera híbrida Viento-Hielo capaz de congelar de forma permanente a los jefes.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Sera_01.png",
        skillPassive: "Control Glacial: Extiende la duración de los estados de hielo.", skillActive: "Estocada Polar: Congelación instantánea.", monsterlingCombo: "King Slime"
    },
    { 
        id: "benjamin", name: "Benjamin", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Mandoble", 
        desc: "Soporte eléctrico de alta asistencia que despliega clones y fuentes de aflicción.", icon: "fa-shield-heart",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Benjamin_01.png",
        skillPassive: "Eco Eléctrico: Activa ataques de asistencia al usar habilidades.", skillActive: "Clon Voltio: Descarga secundaria automática.", monsterlingCombo: "King Slime"
    },
    { 
        id: "angel", name: "Angel", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Báculo", 
        desc: "Sub-DPS de fuego con asistencia fuera de campo para limpiar oleadas rápidamente.", icon: "fa-heart",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Angel_01.png",
        skillPassive: "Cooperación de Fuego: Daño automático al cambiar de personaje.", skillActive: "Lluvia Incandescente: Daño masivo en área.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "yeonhwa", name: "Yeonhwa", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Catalizador", 
        desc: "Asesina centrada en críticos con ataques fantasma coordinados de rayo.", icon: "fa-ice-cream",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Yeonhwa_01.png",
        skillPassive: "Ejecución Eléctrica: Alta bonificación de daño crítico.", skillActive: "Ráfaga Voltio: Golpes fantasma múltiples.", monsterlingCombo: "Gaba Turtle"
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