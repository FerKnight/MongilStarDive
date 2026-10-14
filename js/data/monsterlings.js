const monsterlingsData = [
    // REGION: ISLA DEL DESPERTAR
    { region: "Isla del Despertar", nro: "001", name: "Seta Parlante", effect: "Ataque +12", chain: "-" },
    { region: "Isla del Despertar", nro: "002", name: "Mosquito Parlante", effect: "PV +110", chain: "Ataque +12" },
    { region: "Isla del Despertar", nro: "003", name: "Duende", effect: "Defensa +12", chain: "-" },
    { region: "Isla del Despertar", nro: "004", name: "Jabalí", effect: "PV +110", chain: "Defensa +12" },
    { region: "Isla del Despertar", nro: "005", name: "Rey Seta", effect: "Índice de crítico +0,6%", chain: "Ataque +18" },
    { region: "Isla del Despertar", nro: "006", name: "Murciélago Rey", effect: "Defensa +18", chain: "-" },
    { region: "Isla del Despertar", nro: "007", name: "Jefe Duende", effect: "PV +165", chain: "Defensa +18" },
    { region: "Isla del Despertar", nro: "008", name: "Piedra Guardiana de la Isla del Despertar", effect: "Ataque +18", chain: "-" },
    { region: "Isla del Despertar", nro: "009", name: "Aves de Muerte", effect: "Res a crítico +0,6%", chain: "-" },
    { region: "Isla del Despertar", nro: "010", name: "Jabalí Furioso", effect: "Res a daño crítico +0,9%", chain: "PV +165" },

    // REGION: PLAZA DEL TEMPLO
    { region: "Plaza del Templo", nro: "011", name: "Cráneo Espinoso", effect: "PV +110", chain: "-" },
    { region: "Plaza del Templo", nro: "012", name: "Duende de Bosque Humedales", effect: "Res a crítico +0,4%", chain: "-" },
    { region: "Plaza del Templo", nro: "013", name: "Oso de Bosque Humedales", effect: "Daño crítico +0,6%", chain: "PV +110" },
    { region: "Plaza del Templo", nro: "014", name: "Lagarto Parlante", effect: "Ataque +12", chain: "-" },
    { region: "Plaza del Templo", nro: "015", name: "Cráneo Espinoso Rey", effect: "Defensa +18", chain: "Ataque +18" },
    { region: "Plaza del Templo", nro: "016", name: "Cazador Duende de Bosque Humedales", effect: "PV +165", chain: "-" },
    { region: "Plaza del Templo", nro: "017", name: "Oso Gigante de Bosque Humedales", effect: "Ataque +18", chain: "Daño crítico +0,9%" },
    { region: "Plaza del Templo", nro: "018", name: "Gran Lagarto Parlante", effect: "Res a crítico +0,6%", chain: "Defensa +18" },

    // REGION: PLANICIES DEL SILENCIO
    { region: "Planicies del Silencio", nro: "019", name: "Lobo de Planicies del Silencio", effect: "Ataque +12", chain: "-" },
    { region: "Planicies del Silencio", nro: "020", name: "Duende de Planicies del Silencio", effect: "Defensa +12", chain: "-" },
    { region: "Planicies del Silencio", nro: "021", name: "Espantapájaros Parlante", effect: "PV +110", chain: "Ataque +12" },
    { region: "Planicies del Silencio", nro: "022", name: "Flor Carnívora", effect: "Res a crítico +0,4%", chain: "-" },
    { region: "Planicies del Silencio", nro: "023", name: "Lobo Gigante de Planicies del Silencio", effect: "Índice de crítico +0,6%", chain: "Ataque +18" },
    { region: "Planicies del Silencio", nro: "024", name: "Mago Duende de Planicies del Silencio", effect: "PV +165", chain: "-" },
    { region: "Planicies del Silencio", nro: "025", name: "Espantapájaros de Sombrero Parlante", effect: "Defensa +18", chain: "PV +165" },
    { region: "Planicies del Silencio", nro: "026", name: "Flor Carnívora Gigante", effect: "Ataque +18", chain: "Res a crítico +0,6%" },

    // REGION: PUERTO DE GARRAS
    { region: "Puerto de Garras", nro: "027", name: "Bandido de Puerto de Garras", effect: "PV +110", chain: "-" },
    { region: "Puerto de Garras", nro: "028", name: "Hombre Lagarto de Puerto de Garras", effect: "Ataque +12", chain: "Defensa +12" },
    { region: "Puerto de Garras", nro: "029", name: "Pirata de Puerto de Garras", effect: "Res a crítico +0,4%", chain: "-" },
    { region: "Puerto de Garras", nro: "030", name: "Jefe Bandido de Puerto de Garras", effect: "Defensa +18", chain: "PV +165" },
    { region: "Puerto de Garras", nro: "031", name: "Guerrero Hombre Lagarto de Puerto de Garras", effect: "Ataque +18", chain: "Defensa +18" },
    { region: "Puerto de Garras", nro: "032", name: "Capitán Pirata de Puerto de Garras", effect: "PV +165", chain: "Res a crítico +0,6%" },

    // REGION: RUINAS DE ANKORA
    { region: "Ruinas de Ankora", nro: "033", name: "Golem de Ruinas de Ankora", effect: "Defensa +12", chain: "-" },
    { region: "Ruinas de Ankora", nro: "034", name: "Gárgola de Ruinas de Ankora", effect: "PV +110", chain: "Ataque +12" },
    { region: "Ruinas de Ankora", nro: "035", name: "Espíritu de Ruinas de Ankora", effect: "Ataque +12", chain: "-" },
    { region: "Ruinas de Ankora", nro: "036", name: "Gran Golem de Ruinas de Ankora", effect: "PV +165", chain: "Defensa +18" },
    { region: "Ruinas de Ankora", nro: "037", name: "Gárgola Real de Ruinas de Ankora", effect: "Daño crítico +0,9%", chain: "Ataque +18" },
    { region: "Ruinas de Ankora", nro: "038", name: "Espíritu Antiguo de Ruinas de Ankora", effect: "Defensa +18", chain: "PV +165" },

    // REGION: VALLE DE LAS SOMBRAS
    { region: "Valle de las Sombras", nro: "039", name: "Araña de Valle de las Sombras", effect: "Ataque +12", chain: "-" },
    { region: "Valle de las Sombras", nro: "040", name: "Esqueleto de Valle de las Sombras", effect: "Defensa +12", chain: "PV +110" },
    { region: "Valle de las Sombras", nro: "041", name: "Sombra de Valle de las Sombras", effect: "PV +110", chain: "-" },
    { region: "Valle de las Sombras", nro: "042", name: "Araña Gigante de Valle de las Sombras", effect: "Índice de crítico +0,6%", chain: "Ataque +18" },
    { region: "Valle de las Sombras", nro: "043", name: "Guerrero Esqueleto de Valle de las Sombras", effect: "PV +165", chain: "Defensa +18" },
    { region: "Valle de las Sombras", nro: "044", name: "Sombra Oscura de Valle de las Sombras", effect: "Res a crítico +0,6%", chain: "PV +165" },

    // REGION: MONTAÑA DE HIELO
    { region: "Montaña de Hielo", nro: "045", name: "Yeti de Montaña de Hielo", effect: "PV +110", chain: "-" },
    { region: "Montaña de Hielo", nro: "046", name: "Lobo Nival de Montaña de Hielo", effect: "Ataque +12", chain: "Defensa +12" },
    { region: "Montaña de Hielo", nro: "047", name: "Elemental de Hielo", effect: "Defensa +12", chain: "-" },
    { region: "Montaña de Hielo", nro: "048", name: "Yeti Gigante de Montaña de Hielo", effect: "Defensa +18", chain: "PV +165" },
    { region: "Montaña de Hielo", nro: "049", name: "Lobo Nival Alfa", effect: "Ataque +18", chain: "Ataque +18" },
    { region: "Montaña de Hielo", nro: "050", name: "Elemental de Hielo Antiguo", effect: "Res a daño crítico +0,9%", chain: "Defensa +18" },

    // REGION: CUMBRE CELESTIAL
    { region: "Cumbre Celestial", nro: "051", name: "Águila Celestial", effect: "Ataque +12", chain: "-" },
    { region: "Cumbre Celestial", nro: "052", name: "Guardia Celestial", effect: "Defensa +12", chain: "PV +110" },
    { region: "Cumbre Celestial", nro: "053", name: "Rey Águila Celestial", effect: "Daño crítico +0,9%", chain: "Ataque +18" }
];
