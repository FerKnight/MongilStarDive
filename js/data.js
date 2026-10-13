const charactersData = [
    { 
        id: "isabella", name: "Isabella", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Cañón Láser", 
        image: "assets/images/Character_Portrait/portrait_Isabella_01.png",
        skills: {
            basic: "Lanza 3 proyectiles de energía helada consecutivos que infligen daño de Hielo a media distancia.",
            relay: "Entra al campo disparando una ráfaga criogénica que frena la velocidad de movimiento enemiga un 30%.",
            special: "Despliega un cañón láser estático que dispara automáticamente congelando al objetivo tras 5 impactos.",
            charged: "Carga energía térmica durante 1.5s para liberar un rayo concentrado que rompe la guardia enemiga."
        }
    },
    { 
        id: "vivian", name: "Vivian", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Vivian_01.png",
        skills: {
            basic: "Ataque continuo con báculo que genera pequeñas esquirlas heladas alrededor del rival.",
            relay: "Otorga inmediatamente un escudo helado al personaje entrante equivalente al 15% de su Vida Máx.",
            special: "Invoca un prisma glacial que absorbe proyectiles enemigos y regenera energía de todo el equipo.",
            charged: "Crea una onda expansiva helada en área que repele a los atacantes cercanos."
        }
    },
    { 
        id: "brishell", name: "Brishell", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Brishell_01.png",
        skills: {
            basic: "Combo de 5 estocadas hiperveloces con dalias dobles centradas en daño crítico directo.",
            relay: "Aparece tras la espalda del enemigo asestando un golpe crítico garantizado de elemento Viento.",
            special: "Ejecuta un vendaval de cortes aéreos continuos manteniendo colgado al objetivo en el aire.",
            charged: "Desplazamiento sombrío hacia adelante cortando defensas e inflando daño de sangrado."
        }
    },
    { 
        id: "mabel", name: "Mabel", rarity: "5★", element: "Tierra", role: "Destructor", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Mabel_01.png",
        skills: {
            basic: "Secuencia de 3 mandoblazos pesados con elevado multiplicador de ruptura de postura (Stagger).",
            relay: "Cae con fuerza telúrica sobre el área provocando sacudida y derribo en enemigos pequeños.",
            special: "Desencadena un sismo masivo en columna que destruye escudos y armaduras pesadas.",
            charged: "Giro continuo de mandoble que barre enemigos a su paso mientras reduce el daño recibido."
        }
    },
    { 
        id: "francis_summer", name: "Francis: Summer Dive!", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Francis_01.png",
        skills: {
            basic: "Estocadas ágiles con florete de brisa veraniega que elevan la probabilidad crítica por impacto.",
            relay: "Entra creando una corriente acuática que recupera 10 puntos de Stamina para el equipo.",
            special: "Invoca una ola eólica que arrastra a los enemigos frontales e inflige daño continuo.",
            charged: "Impulso veloz hacia el frente finalizado con un corte en espiral que dispersa a los rivales."
        }
    },
    { 
        id: "verna_summer", name: "Verna: Summer Dive!", rarity: "5★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Verna_01.png",
        skills: {
            basic: "Cortes envueltos en fuego solar que aplican marcas de quemadura acumulables hasta 3 veces.",
            relay: "Detona las marcas de quemadura existentes en los enemigos cercanos al cambiar de héroe.",
            special: "Tajo solar circular en área que incinera el suelo causando daño elemental por segundo.",
            charged: "Carga de estocada ígnea perforante que atraviesa las líneas enemigas."
        }
    },
    { 
        id: "nagi", name: "Nagi", rarity: "5★", element: "Rayo", role: "Asesino", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Nagi_01.png",
        skills: {
            basic: "Barrido continuo de lanza electrificada con largo alcance horizontal y vertical.",
            relay: "Lanza una chispa voltaica que electrocuta y paraliza momentáneamente al objetivo.",
            special: "Descarga de rayo en línea recta que transmite electricidad entre objetivos contiguos.",
            charged: "Salto aéreo con embestida descendente que crea un campo electrificado de alto voltaje."
        }
    },
    { 
        id: "narae", name: "Narae", rarity: "5★", element: "Hielo", role: "Soporte", weapon: "Escudo", 
        image: "assets/images/Character_Portrait/portrait_Narae_01.png",
        skills: {
            basic: "Golpes defensivos con broquel helado que aumentan su propia resistencia física.",
            relay: "Coloca una pared helada en el frente que bloquea proyectiles y absorbe impactos.",
            special: "Sismo glacial defensivo que reduce el daño que sufre el grupo entero un 25%.",
            charged: "Carga de escudo frontal que empuja a los enemigos y reduce sus barra de equilibrio."
        }
    },
    { 
        id: "mina", name: "Mina", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Mina_01.png",
        skills: {
            basic: "Ráfaga de cortes sigilosos con dagas gemelas de alta frecuencia de disparo.",
            relay: "Vuelve invisible al personaje entrante durante 2 segundos y aumenta su velocidad.",
            special: "Danza del viento a hipervelocidad atacando aleatoriamente entre los objetivos en pantalla.",
            charged: "Tajo ejecutador por la espalda que causa daño masivo a objetivos con menos de 30% de Vida."
        }
    },
    { 
        id: "esther", name: "Esther", rarity: "5★", element: "Viento", role: "Asesino", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Esther_01.png",
        skills: {
            basic: "Ataques mágicos a distancia que lanzan hojas eólicas afiladas.",
            relay: "Potencia el Ataque de todos los miembros del grupo un 15% durante 10 segundos.",
            special: "Emboscada eólica de precisión que concentra todos los ataques en el punto débil del jefe.",
            charged: "Crea una esfera de succión de viento que reúne a los enemigos pequeños en un punto."
        }
    },
    { 
        id: "ophelia_5", name: "Ophelia", rarity: "5★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Ophelia_01.png",
        skills: {
            basic: "Combo directo de penetración con lanza glacial de máxima estabilidad.",
            relay: "Aplica congelación directa de 1.5s al jefe o enemigo con mayor salud.",
            special: "Tornado congelante que destruye la postura enemiga provocando estado de vulnerabilidad.",
            charged: "Estocada de largo alcance que lanza proyectiles de hielo hacia adelante."
        }
    },
    { 
        id: "flare_5", name: "Flare", rarity: "5★", element: "Fuego", role: "Destructor", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Flare_01.png",
        skills: {
            basic: "Ataques veloces de fuego fátuo que derriten la armadura enemiga.",
            relay: "Aumenta la penetración de armadura del equipo un 20% al ingresar.",
            special: "Daga incandescente que detona explosiones térmicas en cadena sobre el objetivo.",
            charged: "Lanzamiento de dalias llameantes que giran en círculo alrededor del usuario."
        }
    },
    { 
        id: "sangun_5", name: "Sangun", rarity: "5★", element: "Viento", role: "Luchador", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Sangun_01.png",
        skills: {
            basic: "Cortes pesados continuos propulsados por corrientes de aire.",
            relay: "Atrae a los enemigos hacia el centro con una onda de depresión de aire.",
            special: "Huracán de mandoble que gira continuamente destruyendo todo a su paso.",
            charged: "Corte vertical cargado que proyecta una ráfaga de viento cortante a distancia."
        }
    },
    { 
        id: "gabi_5", name: "Gabi", rarity: "5★", element: "Tierra", role: "Luchador", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Gabi_01.png",
        skills: {
            basic: "Proyección de rocas mágicas que colisionan y rompen guardia.",
            relay: "Petrifica a los enemigos menores en el área de impacto durante 2 segundos.",
            special: "Golpe telúrico masivo que levanta pilares de piedra del suelo.",
            charged: "Genera una muralla rocosa que aturde a los rivales que colisionen contra ella."
        }
    },
    { 
        id: "penny_5", name: "Penny", rarity: "5★", element: "Rayo", role: "Luchador", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Penny_01.png",
        skills: {
            basic: "Disparos de centellas eléctricas a media y larga distancia.",
            relay: "Restaura instantáneamente 15 puntos de energía de habilidad activa.",
            special: "Rayo eléctrico continuo que mantiene electrocutado al objetivo principal.",
            charged: "Orbe de energía voltio que orbita al personaje dañando al contacto."
        }
    },
    { 
        id: "jiwon", name: "Jiwon", rarity: "5★", element: "Viento", role: "Soporte", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Jiwon_01.png",
        skills: {
            basic: "Estocadas rítmicas que regeneran stamina para sí misma.",
            relay: "Aumenta la velocidad de ataque del equipo en un 20% durante 8 segundos.",
            special: "Vórtice de agrupación eólica que succiona a todos los rivales del mapa.",
            charged: "Impulso aéreo que lanza plumas de viento aFiladas hacia abajo."
        }
    },
    // --- 4 ESTRELLAS ---
    { 
        id: "leeho", name: "Leeho", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Leeho_01.png",
        skills: {
            basic: "Zarpazos felinos de fuego rápidos con alta probabilidad de golpe crítico.",
            relay: "Aplica la Marca del Cazador, aumentando el daño infligido contra ese objetivo.",
            special: "Combo acrobático ígneo de 7 golpes que finaliza con una quemadura profunda.",
            charged: "Salto frontal con tajo doble envuelto en llamas."
        }
    },
    { 
        id: "cloud_4", name: "Cloud", rarity: "4★", element: "Hielo", role: "Destructor", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Cloud_01.png",
        skills: {
            basic: "Impactos lentos con mandoble de hielo de gran alcance.",
            relay: "Dispara un proyectil glacial que congela al primer enemigo impactado.",
            special: "Flecha glacial perforante que atraviesa y rompe la postura de múltiples rivales.",
            charged: "Carga terrestre que genera espinas de hielo al avanzar."
        }
    },
    { 
        id: "verna_4", name: "Verna", rarity: "4★", element: "Fuego", role: "Luchador", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Verna_01.png",
        skills: {
            basic: "Secuencia clásica de espada corta con remate de fuego.",
            relay: "Entra asestando un tajo ígneo ascendente.",
            special: "Corte circular envolvente en llamas de alcance medio.",
            charged: "Estocada recta que prende fuego al objetivo."
        }
    },
    { 
        id: "reina", name: "Reina", rarity: "4★", element: "Rayo", role: "Destructor", weapon: "Dagas", 
        image: "assets/images/Character_Portrait/portrait_Reina_01.png",
        skills: {
            basic: "Cortes con dalias que acumulan carga estática en el oponente.",
            relay: "Descarga la electricidad acumulada en el objetivo causando gran ruptura.",
            special: "Estocada eléctrica fulminante con desplazamiento rápido.",
            charged: "Chispazo giratorio que repele a los enemigos agrupados."
        }
    },
    { 
        id: "francis_4", name: "Francis", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Francis_01.png",
        skills: {
            basic: "Cortes ligeros que combinan veneno protector.",
            relay: "Despliega una bruma curativa que regenera salud por segundo.",
            special: "Niebla de tierra que debilita la armadura y defensa del rival.",
            charged: "Golpe de escudo terrestre que reduce la agresividad del enemigo."
        }
    },
    { 
        id: "bonnie", name: "Bonnie", rarity: "4★", element: "Viento", role: "Soporte", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Bonnie_01.png",
        skills: {
            basic: "Proyectiles eólicos suaves a distancia.",
            relay: "Otorga resonancia eólica acelerando la recarga de energía del equipo.",
            special: "Pulso de viento defensivo que repele hordas de enemigos.",
            charged: "Esfera eólica que permanece flotando y dañando a los rivales."
        }
    },
    { 
        id: "ellie", name: "Ellie", rarity: "4★", element: "Tierra", role: "Destructor", weapon: "Espada corta", 
        image: "assets/images/Character_Portrait/portrait_Ellie_01.png",
        skills: {
            basic: "Ataques terrestres enfocados en romper posturas defensivas.",
            relay: "Impacto telúrico que desequilibra a los jefes.",
            special: "Tajo de roca contundente frontal.",
            charged: "Ráfaga de golpes pesados cargados sobre el suelo."
        }
    },
    { 
        id: "daisy", name: "Daisy", rarity: "4★", element: "Tierra", role: "Soporte", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Daisy_01.png",
        skills: {
            basic: "Disparos de luz telúrica curativa.",
            relay: "Genera una barrera de piedra protectora alrededor del grupo.",
            special: "Protección de Gaia que cura salud y aumenta la defensa temporalmente.",
            charged: "Onda de choque mágica que aturde a enemigos de menor tamaño."
        }
    },
    { 
        id: "sera", name: "Sera", rarity: "4★", element: "Hielo", role: "Luchador", weapon: "Lanza", 
        image: "assets/images/Character_Portrait/portrait_Sera_01.png",
        skills: {
            basic: "Estocadas de lanza helada fluidas.",
            relay: "Prolonga el estado de congelación activo en los enemigos un 50%.",
            special: "Estocada polar con helada instantánea.",
            charged: "Giro de lanza que proyecta ráfagas de escarcha."
        }
    },
    { 
        id: "benjamin", name: "Benjamin", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Mandoble", 
        image: "assets/images/Character_Portrait/portrait_Benjamin_01.png",
        skills: {
            basic: "Trazos pesados con mandoble envuelto en electricidad.",
            relay: "Invoca un clon de voltio que asiste con ataques automáticos.",
            special: "Descarga secundaria coordinada entre el usuario y su clon.",
            charged: "Carga frontal con barrido eléctrico."
        }
    },
    { 
        id: "angel", name: "Angel", rarity: "4★", element: "Fuego", role: "Asesino", weapon: "Báculo", 
        image: "assets/images/Character_Portrait/portrait_Angel_00.png",
        skills: {
            basic: "Lanzamiento de orbes ardientes.",
            relay: "Inicia asistencia de fuego fuera de campo al cambiar de personaje.",
            special: "Lluvia incandescente masiva sobre el área seleccionada.",
            charged: "Explosión ígnea concéntrica."
        }
    },
    { 
        id: "yeonhwa", name: "Yeonhwa", rarity: "4★", element: "Rayo", role: "Asesino", weapon: "Catalizador", 
        image: "assets/images/Character_Portrait/portrait_Yeonhwa_01.png",
        skills: {
            basic: "Ataques mágicos de voltio de alta velocidad.",
            relay: "Aumenta el Daño Crítico del personaje entrante un 25%.",
            special: "Ráfaga de golpes fantasma múltiples de electricidad.",
            charged: "Chispa concentrada de penetración."
        }
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
    { name: "Scarlet Queen", habitat: "Tierras Áridas", rarity: "Leyenda", skill: "Aumenta el daño de Fuego en un 20% durante 10s.", image: "assets/images/Monsterling_Icons/icon_monster_scarletqueen.png" }
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
