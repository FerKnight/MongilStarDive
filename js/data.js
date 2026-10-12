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
        id: "brrishell", name: "Brrishell", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
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
        id: "narae", name: "Narae", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Escudo", 
        desc: "Baluarde defensivo con mitigación de daño y potentes contrataques de tierra.", icon: "fa-shield",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Narae_01.png",
        skillPassive: "Baluarde de Piedra: Reduce el daño recibido en un 20%.", skillActive: "Sismo Terrestre: Aplasta el suelo creando una onda expansiva.", monsterlingCombo: "King Slime"
    },
    { 
        id: "mina", name: "Mina", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        desc: "Agilidad extrema con golpes críticos en ráfaga e invisibilidad temporal.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Mina_01.png",
        skillPassive: "Efecto Ráfaga: Aumenta el daño crítico con cada esquiva perfecta.", skillActive: "Danza del Viento: Serie de estocadas invisibles a hipervelocidad.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "esther", name: "Esther", rarity: "5★", element: "Fuego", role: "Soporte", weapon: "Báculo", 
        desc: "Especialista en potenciar el ataque del grupo y crear escudos protectores de fuego.", icon: "fa-wand-magic-sparkles",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Esther_01.png",
        skillPassive: "Aura Bendita: Incrementa el ATK del equipo en un 15%.", skillActive: "Escudo Solar: Absorbe daño equivalente a la vida máxima de Esther.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "ophelia_5", name: "Ophelia", rarity: "5★", element: "Viento", role: "Destructor", weapon: "Lanza", 
        desc: "Maestra de la lanza de viento que destroza la postura enemiga a gran distancia.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Ophelia_01.png",
        skillPassive: "Presión de Viento: Incrementa el alcance de estocada.", skillActive: "Tornado Perforante: Empuja y rompe el equilibrio del objetivo.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "flare_5", name: "Flare", rarity: "5★", element: "Fuego", role: "Luchador", weapon: "Dagas", 
        desc: "Versión de elite con potentes ráfagas de fuego y velocidad de ataque superior.", icon: "fa-flame",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Flare_01.png",
        skillPassive: "Combustión Avanzada: Quemaduras en cadena a enemigos cercanos.", skillActive: "Daga Incandescente: Lanza proyectiles de fuego veloz.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "sangun_5", name: "Sangun", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        desc: "Fuerza titánica capaz de destruir los escudos de jefes de Conquest.", icon: "fa-gavel",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Sangun_01.png",
        skillPassive: "Fuerza Bruta: Aumenta la potencia de aturdimiento.", skillActive: "Martillazo Titánico: Rompe defensas de escudos.", monsterlingCombo: "King Slime"
    },
    { 
        id: "gabi_5", name: "Gabi", rarity: "5★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        desc: "Potenciadora experta que acelera las rotaciones de equipo y la recarga de energía.", icon: "fa-feather",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Gabi_01.png",
        skillPassive: "Viento Ligero: Incrementa la velocidad del equipo un 10%.", skillActive: "Torbellino de Curación: Regenera energía de Relevo (Tag).", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "penny_5", name: "Penny", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Báculo", 
        desc: "Soporte curativo estelar con capacidad de purificar estados alterados.", icon: "fa-hand-holding-droplet",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Penny_01.png",
        skillPassive: "Gota de Rocío: Cura gradualmente al héroe activo.", skillActive: "Marea Curativa: Manta de curación masiva para todo el grupo.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "jiwon", name: "Jiwon", rarity: "5★", element: "Hielo", role: "Asesino", weapon: "Lanza", 
        desc: "Aplica embates veloces de hielo e interrumpe ataques cargados.", icon: "fa-snowflake",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Jiwon_01.png",
        skillPassive: "Filo Congelante: Los golpes críticos extienden la congelación.", skillActive: "Estocada Glacial: Penetración de defensa directa.", monsterlingCombo: "Cappy Mama"
    },

    // ==========================================
    // --- 4 ESTRELLAS (12 PERSONAJES) ---
    // ==========================================
    { 
        id: "leeho", name: "Leeho", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        desc: "Luchador felino de fuego de gran agilidad. Desata ráfagas de arañazos ígneos y ataques veloces.", icon: "fa-cat",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Leeho_01.png",
        skillPassive: "Garra Incandescente: Los golpes críticos aplican acumulaciones de quemadura.", skillActive: "Danza del Tigre Ígneo: Embate acrobático envolvente con garras de fuego.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "cloud_4", name: "Cloud", rarity: "4★", element: "Rayo", role: "Destructor", weapon: "Mandoble", 
        desc: "Guerrero silencioso enfocado en misiones de ruptura y aturdimiento básico.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Cloud_01.png",
        skillPassive: "Corte Veloz: Incrementa el daño físico básico.", skillActive: "Impacto Relámpago: Tajo descendente con carga eléctrica.", monsterlingCombo: "King Slime"
    },
    { 
        id: "verna_4", name: "Verna", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        desc: "Versión base de la aventurera Verna con equilibrado daño de fuego.", icon: "fa-fire",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Verna_01.png",
        skillPassive: "Chispa: Otorga pequeña probabilidad de quemadura.", skillActive: "Corte Ígneo: Ataque básico envuelto en llamas.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "reina", name: "Reina", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Dagas", 
        desc: "Ágil combatiente que ataca desde los flancos con cuchillas ardientes.", icon: "fa-fire-burner",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Reina_01.png",
        skillPassive: "Emboscada: Incrementa el daño por la espalda.", skillActive: "Danza Flamígera: Ráfaga rápida de cortes de fuego.", monsterlingCombo: "Scarlet Queen"
    },
    { 
        id: "francis_4", name: "Francis", rarity: "4★", element: "Rayo", role: "Luchador", weapon: "Espada corta", 
        desc: "Espadachín eléctrico experto en combos de ataques rápidos.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Francis_01.png",
        skillPassive: "Sobrecarga: Genera chispas adicionales en golpes críticos.", skillActive: "Corte Voltio: Desplazamiento rápido entre enemigos.", monsterlingCombo: "King Slime"
    },
    { 
        id: "bonnie", name: "Bonnie", rarity: "4★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        desc: "Soporte táctico que impulsa la movilidad y esquiva de sus aliados.", icon: "fa-wind",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Bonnie_01.png",
        skillPassive: "Brisa Suave: Aumenta la regeneración de aguante.", skillActive: "Escudo de Viento: Otorga inmunidad a ralentizaciones.", monsterlingCombo: "Cappyberry"
    },
    { 
        id: "ellie", name: "Ellie", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Espada corta", 
        desc: "Espadachín glacial que congela enemigos pequeños en combate cercano.", icon: "fa-snowflake",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Ellie_01.png",
        skillPassive: "Escarcha Cortante: Ralentiza al enemigo golpeado.", skillActive: "Tajo Helado: Golpe frontal con probabilidad de congelación.", monsterlingCombo: "Gaba Turtle"
    },
    { 
        id: "daisy", name: "Daisy", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Báculo", 
        desc: "Soporte defensivo que genera barreras de piedra para proteger al grupo.", icon: "fa-shield-halved",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Daisy_01.png",
        skillPassive: "Piel de Piedra: Aumenta la defensa base del equipo.", skillActive: "Barrera Rocosa: Absorbe un porcentaje de daño entrante.", monsterlingCombo: "King Slime"
    },
    { 
        id: "sera", name: "Sera", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Lanza", 
        desc: "Lancera veloz que ataca con descargas eléctricas precisas.", icon: "fa-bolt",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Sera_01.png",
        skillPassive: "Punta de Voltio: Incrementa el daño crítico de perforación.", skillActive: "Estocada Eléctrica: Estocada frontal de alta velocidad.", monsterlingCombo: "King Slime"
    },
    { 
        id: "benjamin", name: "Benjamin", rarity: "4★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        desc: "Luchador de pesada armadura especializado en romper posturas enemigas.", icon: "fa-shield-heart",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Benjamin_01.png",
        skillPassive: "Contrapeso: Reduce la probabilidad de ser interrumpido.", skillActive: "Golpe Demoledor: Gran impacto de ruptura física.", monsterlingCombo: "King Slime"
    },
    { 
        id: "angel", name: "Angel", rarity: "4★", element: "Fuego", role: "Soporte", weapon: "Báculo", 
        desc: "Sanadora de fuego que convierte el daño en curación para los aliados.", icon: "fa-heart",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Angel_01.png",
        skillPassive: "Llama Curativa: Restaura vida al detonar reacciones.", skillActive: "Bendición Calida: Curación de área para todo el equipo.", monsterlingCombo: "Cappy Mama"
    },
    { 
        id: "yeonhwa", name: "Yeonhwa", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Catalizador", 
        desc: "Control de masas mediante ráfagas de congelación de área.", icon: "fa-ice-cream",
        image: "https://raw.githubusercontent.com/iamdevlinph/msd-tracker/main/assets/images-source/Character_Portrait/portrait_Yeonhwa_01.png",
        skillPassive: "Escarcha: Ralentiza a los enemigos cercanos.", skillActive: "Explosión Helada: Ráfaga de hielo en forma de cono.", monsterlingCombo: "Gaba Turtle"
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
    { tag: "MANTENIMIENTO", title: "Notas del Parche 1.4.1", desc: "Ajustes de equilibrio para habilidades de ruptura y optimizaciones en la 
