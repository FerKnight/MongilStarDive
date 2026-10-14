const equipmentData = [
    {
        id: "abismo",
        name: "Abismo",
        rarity: "5★",
        effect2: "Daño de viento +10 % durante 5 s al usar una habilidad especial",
        effect4: "Daño de viento +10 % durante 5 s al asestar un golpe crítico"
    },
    {
        id: "arbol_milenario",
        name: "Árbol Milenario",
        rarity: "5★",
        effect2: "Daño de fuego de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo",
        effect4: null
    },
    {
        id: "banquete_grandioso_gloton",
        name: "Banquete Grandioso de Glotón",
        rarity: "5★",
        effect2: "Res al fuego del objetivo -6% durante 5s al impactar con una habilidad de relevo",
        effect4: null
    },
    {
        id: "corazon_escarche_eterna",
        name: "Corazón de Escarcha Eterna",
        rarity: "5★",
        effect2: "Daño de aturdimiento de ataque de rayo +7,5%",
        effect4: null
    },
    {
        id: "destructor_despiadado",
        name: "Destructor Despiadado",
        rarity: "5★",
        effect2: "Los ataques básicos infligen 5% más de daño de viento",
        effect4: "Al usar la habilidad suprema, la res a viento del objetivo se reduce en 10% durante 5s"
    },
    {
        id: "devorador_del_abismo",
        name: "Devorador del Abismo",
        rarity: "5★",
        effect2: "Daño de neutralización de ataque de hielo +7,5%",
        effect4: null
    },
    {
        id: "el_sin_nombre",
        name: "El Sin Nombre",
        rarity: "5★",
        effect2: "Los ataques básicos infligen 5% más de daño de viento",
        effect4: "Al usar una habilidad suprema, la res a viento del objetivo se reduce un 10% durante 5s"
    },
    {
        id: "espiritu_lucha_zorro_youkai",
        name: "Espíritu de Lucha Zorro Youkai",
        rarity: "5★",
        effect2: "Res al rayo -6% durante 5s al usar una habilidad de relevo",
        effect4: null
    },
    {
        id: "flores_todo_su_esplendor",
        name: "Flores en Todo su Esplendor",
        rarity: "5★",
        effect2: "Daño de hielo +7,5% durante 5s al usar una habilidad especial",
        effect4: null
    },
    {
        id: "juez",
        name: "Juez",
        rarity: "5★",
        effect2: "Daño de hielo +10% durante 5s al usar una habilidad de cambio",
        effect4: "Daño de hielo +10% al atacar a un enemigo con aflicción de hielo"
    },
    {
        id: "nivel_gloton",
        name: "Nivel de Glotón",
        rarity: "5★",
        effect2: "Res de viento del objetivo -6% durante 5s al ejecutar con éxito una habilidad especial",
        effect4: "Índice de crítico de todos los compañeros +6% durante 5s al usar una habilidad de relevo"
    },
    {
        id: "noche_luna_llena",
        name: "Noche de Luna Llena",
        rarity: "5★",
        effect2: "Daño de fuego +7,5% durante 5s al usar una habilidad especial",
        effect4: "Daño de fuego +7,5% al atacar a un enemigo con aflicción de fuego"
    },
    {
        id: "piedra_ancestral",
        name: "Piedra Ancestral",
        rarity: "5★",
        effect2: "Daño de neutralización de ataque de viento +7,5%",
        effect4: null
    },
    {
        id: "poder_imponente_monte_tai",
        name: "Poder Imponente del Monte Tai",
        rarity: "5★",
        effect2: "Índice de crítico +5% durante 5s al usar una habilidad de cambio",
        effect4: "Daño de rayo +7,5% durante 5s al usar una habilidad especial"
    },
    {
        id: "rey_espiritual",
        name: "Rey Espiritual",
        rarity: "5★",
        effect2: "Daño de rayo +8 % durante 3 s al usar un ataque básico",
        effect4: "Daño de rayo +10 % al atacar a un enemigo con aflicción de rayo"
    },
    {
        id: "ritos_general_victorioso",
        name: "Ritos del General Victorioso",
        rarity: "5★",
        effect2: "Daño de neutralización de ataque de tierra +7,5%",
        effect4: null
    },
    {
        id: "rugido_hanul",
        name: "Rugido de Hanul",
        rarity: "5★",
        effect2: "Daño de fuego +10 % durante 5 s al usar una habilidad suprema",
        effect4: "Daño crítico +10 % al atacar a un enemigo con aflicción de fuego"
    },
    {
        id: "senor_de_la_cienaga",
        name: "Señor de la Ciénaga",
        rarity: "5★",
        effect2: "Daño de hielo de todos los compañeros +5% durante 5s al conceder un escudo",
        effect4: "Daño de debilidad elemental recibido por el objetivo +10% durante 5s al atacar a un enemigo que sufra aflicción de hielo y aturdimiento"
    },
    {
        id: "sirius",
        name: "Sirius",
        rarity: "5★",
        effect2: "Daño de tierra de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo",
        effect4: "Daño de apoyo +7,5% durante 5s al usar una habilidad de cambio"
    },
    {
        id: "tirano_del_bosque",
        name: "Tirano del Bosque",
        rarity: "5★",
        effect2: "Daño de hielo +7,5% durante 3s al usar un ataque básico",
        effect4: "Índice de crítico +5%% durante 5s al atacar a un enemigo con aflicción de hielo"
    },
    {
        id: "vanguardia_de_victoria",
        name: "Vanguardia de Victoria",
        rarity: "5★",
        effect2: "Daño de debilidad elemental del objetivo recibido +10% durante 5s al atacar a un enemigo con aflicción de tierra",
        effect4: null
    },
    {
        id: "viento_de_poniente",
        name: "Viento de Poniente",
        rarity: "5★",
        effect2: "Daño de tierra +8 % durante 3 s al usar un ataque básico",
        effect4: "Daño de tierra +10 % durante 5 s al usar una habilidad de cambio contra un enemigo con aflicción de tierra"
    }
];
