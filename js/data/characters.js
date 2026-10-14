const charactersData = [
    {
        id: "mina",
        name: "Mina",
        element: "Fuego",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Luchadora de elemento Fuego con gran capacidad de daño continuo."
    },
    {
        id: "angel",
        name: "Angel",
        element: "Fuego",
        role: "Asesino",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Asesina rápida de Fuego especializada en ataques críticos."
    },
    {
        id: "vivian",
        name: "Vivian",
        element: "Fuego",
        role: "Soporte",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Unidad de apoyo de Fuego para potenciar el ataque del equipo."
    },
    {
        id: "flare",
        name: "Flare",
        element: "Fuego",
        role: "Destructor",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Especialista en romper escudos e infligir gran daño en área."
    },
    {
        id: "s_verna",
        name: "Verna: ¡Chapuzon Veraniego!",
        element: "Fuego",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Versión especial de verano de Verna de elemento Fuego."
    },
    {
        id: "verna",
        name: "Verna",
        element: "Fuego",
        role: "Luchador",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Luchadora equilibrada de elemento Fuego."
    },
    {
        id: "leeho",
        name: "Leeho",
        element: "Fuego",
        role: "Asesino",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Asesino de Fuego enfocado en infligir daño directo."
    },
    {
        id: "narae",
        name: "Narae",
        element: "Hielo",
        role: "Soporte",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Excelente soporte de Hielo que cura y otorga utilidad al grupo."
    },
    {
        id: "isabella",
        name: "Isabella",
        element: "Hielo",
        role: "Destructor",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Destructora de Hielo con alta capacidad de ruptura."
    },
    {
        id: "ophelia",
        name: "Ophelia",
        element: "Hielo",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Luchadora de Hielo resistente con gran pegada."
    },
    {
        id: "cloud",
        name: "Cloud",
        element: "Hielo",
        role: "Destructor",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Unidad de Hielo enfocada en control y neutralización."
    },
    {
        id: "sera",
        name: "Sera",
        element: "Hielo",
        role: "Luchador",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Luchadora de cuerpo a cuerpo de elemento Hielo."
    },
    {
        id: "penny",
        name: "Penny",
        element: "Rayo",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Luchadora de Rayo con ataques veloces y continuos."
    },
    {
        id: "mabel",
        name: "Mabel",
        element: "Rayo",
        role: "Destructor",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Destructora de Rayo ideal para debilitar jefes."
    },
    {
        id: "yeonhwa",
        name: "Yeonhwa",
        element: "Rayo",
        role: "Asesino",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Asesina de Rayo que aplica reducción de defensa."
    },
    {
        id: "benjamin",
        name: "Benjamin",
        element: "Rayo",
        role: "Asesino",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Unidad rápida de Rayo especializada en ráfagas de daño."
    },
    {
        id: "reina",
        name: "Reina",
        element: "Rayo",
        role: "Destructor",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Destructora de Rayo enfocada en la ruptura de postura."
    },
    {
        id: "sangun",
        name: "Sangun",
        element: "Viento",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Luchador de Viento con alto impacto en combate."
    },
    {
        id: "jiwon",
        name: "Jiwon",
        element: "Viento",
        role: "Soporte",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Soporte de Viento para mejorar la velocidad y regeneración."
    },
    {
        id: "esther",
        name: "Esther",
        element: "Viento",
        role: "Asesino",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Asesina de Viento con gran potencia de daño individual."
    },
    {
        id: "nagi",
        name: "Nagi",
        element: "Viento",
        role: "Destructor",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Destructor de Viento especializado en control del campo."
    },
    {
        id: "bonnie",
        name: "Bonnie",
        element: "Viento",
        role: "Soporte",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Unidad de apoyo de Viento útil para principiantes."
    },
    {
        id: "gabi",
        name: "Gabi",
        element: "Tierra",
        role: "Luchador",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Luchadora de Tierra resistente y con buen daño."
    },
    {
        id: "brisshell",
        name: "Brisshell",
        element: "Tierra",
        role: "Asesino",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Asesina de Tierra con potentes multiplicadores y reducción de defensa."
    },
    {
        id: "s_francis",
        name: "Francis: ¡Chapuzon Veraniego!",
        element: "Tierra",
        role: "Soporte",
        rarity: "5★",
        signatureWeapon: "No especificada",
        description: "Versión especial veraniega de Francis con gran kit de apoyo."
    },
    {
        id: "francis",
        name: "Francis",
        element: "Tierra",
        role: "Soporte",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Soporte universal de Tierra indispensable para supervivencia y potenciación."
    },
    {
        id: "daisy",
        name: "Daisy",
        element: "Tierra",
        role: "Soporte",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Unidad de apoyo de Tierra para potenciar al equipo."
    },
    {
        id: "ellie",
        name: "Ellie",
        element: "Tierra",
        role: "Destructor",
        rarity: "4★",
        signatureWeapon: "No especificada",
        description: "Destructora de Tierra clave para romper jefes y potenciar el elemento."
    }
];
