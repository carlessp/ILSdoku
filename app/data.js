window.ILSDOKU_CASES = [
  {
    "id": "el-primer-dia",
    "title": "El primer dia",
    "difficulty": "molt fàcil",
    "grid": {
      "w": 5,
      "h": 5
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          2
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          3,
          4
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          0,
          2,
          2
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          3,
          2,
          4
        ],
        "color": "#dcefdd"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          3,
          0,
          4,
          2
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          3,
          3,
          4,
          4
        ],
        "color": "#ece0f6"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 1,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 0,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 1,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 2,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 3,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 2,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 2,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 3,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era al costat del rellotge.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla era a l'EA La Industrial.",
        "solution": [
          0,
          3
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit no era mai sobre cap estoreta.",
        "solution": [
          2,
          0
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era al costat d'una catifa.",
        "solution": [
          4,
          4
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era l'única ILS sobre una estoreta.",
        "solution": [
          3,
          1
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era mai sobre cap catifa.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R3 C1, al FEP Aprenents EE, sobre una catifa. Judit hi podia seure, i Laura M no, perquè no era mai sobre cap catifa. Per això Laura M es queda sense plaça.",
    "hints": [
      "Miriam: la pista «Miriam era l'única ILS sobre una estoreta» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 4, columna 2 (Salvador Seguí).",
      "Carla: fixa't sobretot en «Carla era a l'EA La Industrial»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 1, columna 4 (La Industrial).",
      "Oscar: fixa't sobretot en «Oscar era al costat del rellotge»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 2, columna 3 (FEP Aprenents).",
      "Judit: fixa't sobretot en «Judit no era mai sobre cap estoreta»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 1 (FEP Aprenents).",
      "Aroha: fixa't sobretot en «Aroha era al costat d'una catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 5 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R3 C1, al FEP Aprenents EE, sobre una catifa. Judit hi podia seure, i Laura M no, perquè no era mai sobre cap catifa. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "la-benvinguda",
    "title": "La benvinguda",
    "difficulty": "molt fàcil",
    "grid": {
      "w": 5,
      "h": 5
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          2
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          3,
          4
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          0,
          2,
          2
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          3,
          2,
          4
        ],
        "color": "#dcefdd"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          3,
          0,
          4,
          2
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          3,
          3,
          4,
          4
        ],
        "color": "#ece0f6"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 4,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 0,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 3,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 4,
        "c": 0,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 1,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 4,
        "c": 3,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era al costat de la pissarra.",
        "solution": [
          0,
          3
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era sobre una estoreta.",
        "solution": [
          2,
          1
        ]
      },
      {
        "id": "marianuria",
        "name": "María Nuria",
        "torn": "matí",
        "initial": "MN",
        "clue": "María Nuria no era mai sobre cap catifa.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era sobre una estoreta.",
        "solution": [
          4,
          0
        ]
      },
      {
        "id": "tatiana",
        "name": "Tatiana",
        "torn": "tarda",
        "initial": "T",
        "clue": "Tatiana era l'única ILS sobre un banc.",
        "solution": [
          3,
          4
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc del FEP Aprenents EE.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R2 C3, al FEP Aprenents EE. María Nuria hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.",
    "hints": [
      "Oscar: la pista «Oscar era al costat de la pissarra» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 1, columna 4 (La Industrial).",
      "Judit: la pista «Judit era sobre una estoreta» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 2 (FEP Aprenents).",
      "Aroha: la pista «Aroha era sobre una estoreta» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 1 (Salvador Seguí).",
      "María Nuria: fixa't sobretot en «María Nuria no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "María Nuria: és a la fila 2, columna 3 (FEP Aprenents).",
      "Tatiana: fixa't sobretot en «Tatiana era l'única ILS sobre un banc»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Tatiana: és a la fila 4, columna 5 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R2 C3, al FEP Aprenents EE. María Nuria hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "lhora-del-pati",
    "title": "L'hora del pati",
    "difficulty": "fàcil",
    "grid": {
      "w": 6,
      "h": 6
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          5
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          0,
          3,
          2
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          3,
          3,
          5
        ],
        "color": "#dcefdd"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          0,
          5,
          2
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          3,
          5,
          5
        ],
        "color": "#ece0f6"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 4,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 1,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 0,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 4,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 5,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 3,
        "c": 3,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 5,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 3,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar no era mai sobre cap catifa.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier era al costat del rellotge. José Javier era en una cantonada de la seva sala.",
        "solution": [
          3,
          0
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla era al costat de la pissarra.",
        "solution": [
          0,
          3
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat del rellotge.",
        "solution": [
          2,
          4
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era l'única ILS sobre una cadira.",
        "solution": [
          4,
          1
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era al costat d'un banc.",
        "solution": [
          5,
          5
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc del FEP Aprenents EE.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R2 C3, al FEP Aprenents EE, sobre un banc. Oscar hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.",
    "hints": [
      "Aroha: la pista «Aroha era l'única ILS sobre una cadira» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 2 (Escola del Treball).",
      "Carla: fixa't sobretot en «Carla era al costat de la pissarra»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 1, columna 4 (Inst. dels Aliments).",
      "Oscar: fixa't sobretot en «Oscar no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 2, columna 3 (FEP Aprenents).",
      "Judit: fixa't sobretot en «Judit era al costat del rellotge»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 5 (Inst. dels Aliments).",
      "Miriam: fixa't sobretot en «Miriam era al costat d'un banc»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 6, columna 6 (Inst. de Logística).",
      "José Javier: fixa't en «José Javier era en una cantonada de la seva sala» i «José Javier era al costat del rellotge»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 4, columna 1 (FEP Aprenents).",
      "Per acabar, la incògnita: L'última plaça lliure era R2 C3, al FEP Aprenents EE, sobre un banc. Oscar hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "lhora-destudi",
    "title": "L'hora d'estudi",
    "difficulty": "fàcil",
    "grid": {
      "w": 6,
      "h": 6
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          5
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          0,
          3,
          1
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          2,
          3,
          4
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          5,
          3,
          5
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          0,
          5,
          2
        ],
        "color": "#ece0f6"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          3,
          5,
          5
        ],
        "color": "#e6f0d8"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 1,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 1,
        "c": 4,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 2,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 3,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 3,
        "c": 3,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 4,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 2,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 5,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar no era mai sobre cap catifa.",
        "solution": [
          1,
          5
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier seia en un banc. José Javier era en una cantonada de la seva sala.",
        "solution": [
          0,
          2
        ]
      },
      {
        "id": "marc",
        "name": "Marc",
        "torn": "matí",
        "initial": "Mc",
        "clue": "Marc era al costat d'una cadira.",
        "solution": [
          2,
          3
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era en una cantonada de la seva sala. Judit era al FEP Aprenents EE.",
        "solution": [
          3,
          1
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era en una cantonada del tauler.",
        "solution": [
          5,
          0
        ]
      },
      {
        "id": "tatiana",
        "name": "Tatiana",
        "torn": "tarda",
        "initial": "T",
        "clue": "Tatiana no era en cap cantonada de la seva sala.",
        "solution": [
          4,
          4
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc de l'EA La Industrial.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R2 C6, a l'EA La Industrial. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'EA La Industrial. Per això Laura M es queda sense plaça.",
    "hints": [
      "Aroha: la pista «Aroha era en una cantonada del tauler» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 6, columna 1 (Escola del Treball).",
      "Oscar: fixa't sobretot en «Oscar no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 2, columna 6 (La Industrial).",
      "Marc: fixa't sobretot en «Marc era al costat d'una cadira»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Marc: és a la fila 3, columna 4 (Inst. dels Aliments).",
      "Tatiana: fixa't sobretot en «Tatiana no era en cap cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Tatiana: és a la fila 5, columna 5 (Inst. de Logística).",
      "José Javier: fixa't en «José Javier seia en un banc» i «José Javier era en una cantonada de la seva sala»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 1, columna 3 (Inst. dels Aliments).",
      "Judit: fixa't en «Judit era en una cantonada de la seva sala» i «Judit era al FEP Aprenents EE»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 4, columna 2 (FEP Aprenents).",
      "Per acabar, la incògnita: L'última plaça lliure era R2 C6, a l'EA La Industrial. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'EA La Industrial. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "el-forat-de-lhorari",
    "title": "El forat de l'horari",
    "difficulty": "fàcil",
    "grid": {
      "w": 7,
      "h": 7
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          6
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 3,
        "zone": "mati",
        "rect": [
          0,
          0,
          3,
          3
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          4,
          3,
          6
        ],
        "color": "#dcefdd"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          4,
          0,
          6,
          4
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          5,
          6,
          6
        ],
        "color": "#ece0f6"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 0,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 1,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 2,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 0,
        "c": 5,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 0,
        "c": 6,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 0,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 3,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 3,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 6,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 3,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 3,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 3,
        "c": 5,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 6,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 0,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 3,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 5,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 4,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 5,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 6,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 0,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 2,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 4,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 6,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era sobre una catifa.",
        "solution": [
          0,
          1
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier era sobre una estoreta.",
        "solution": [
          1,
          3
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla seia en un banc.",
        "solution": [
          2,
          0
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit no era mai sobre cap catifa.",
        "solution": [
          3,
          5
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era a l'INS Escola del Treball.",
        "solution": [
          4,
          2
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era al costat de la pissarra.",
        "solution": [
          5,
          4
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene era l'única ILS de la seva sala.",
        "solution": [
          6,
          6
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no seia mai en cap cadira.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R4 C6, a l'Institut dels Aliments, sobre una cadira. Judit hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça.",
    "hints": [
      "Oscar: la pista «Oscar era sobre una catifa» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 1, columna 2 (FEP Aprenents).",
      "José Javier: la pista «José Javier era sobre una estoreta» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 2, columna 4 (FEP Aprenents).",
      "Carla: la pista «Carla seia en un banc» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 3, columna 1 (FEP Aprenents).",
      "Judit: fixa't sobretot en «Judit no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 4, columna 6 (Inst. dels Aliments).",
      "Aroha: fixa't sobretot en «Aroha era a l'INS Escola del Treball»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 3 (Escola del Treball).",
      "Miriam: fixa't sobretot en «Miriam era al costat de la pissarra»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 6, columna 5 (Escola del Treball).",
      "Irene: fixa't sobretot en «Irene era l'única ILS de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 7, columna 7 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R4 C6, a l'Institut dels Aliments, sobre una cadira. Judit hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "canvi-de-classe",
    "title": "Canvi de classe",
    "difficulty": "mitjà",
    "grid": {
      "w": 7,
      "h": 7
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          6
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          0,
          1,
          3
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 1,
        "zone": "mati",
        "rect": [
          2,
          0,
          3,
          3
        ],
        "color": "#dcefdd"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          4,
          3,
          6
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          4,
          0,
          6,
          4
        ],
        "color": "#ece0f6"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          5,
          6,
          6
        ],
        "color": "#e6f0d8"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 0,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 0,
        "c": 5,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 2,
        "c": 0,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 1,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 5,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 3,
        "c": 6,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 1,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 3,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 6,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 3,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 4,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 3,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 6,
        "c": 6,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era exactament 1 columna a la dreta de José Javier.",
        "solution": [
          0,
          1
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier era en una cantonada de la seva sala.",
        "solution": [
          1,
          0
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla no era mai sobre cap catifa.",
        "solution": [
          3,
          6
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat d'una catifa.",
        "solution": [
          2,
          2
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era l'única ILS sobre una estoreta.",
        "solution": [
          4,
          3
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era l'única ILS de la seva sala.",
        "solution": [
          6,
          5
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene seia en una cadira.",
        "solution": [
          5,
          4
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no seia mai en cap cadira.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R4 C7, a l'Institut Salvador Seguí, sobre una cadira. Carla hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça.",
    "hints": [
      "Oscar: fixa't sobretot en «Oscar era exactament 1 columna a la dreta de José Javier»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 1, columna 2 (FEP Aprenents).",
      "José Javier: fixa't sobretot en «José Javier era en una cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 2, columna 1 (FEP Aprenents).",
      "Judit: fixa't sobretot en «Judit era al costat d'una catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 3 (Inst. dels Aliments).",
      "Carla: fixa't sobretot en «Carla no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 4, columna 7 (Salvador Seguí).",
      "Aroha: fixa't sobretot en «Aroha era l'única ILS sobre una estoreta»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 4 (Escola del Treball).",
      "Irene: fixa't sobretot en «Irene seia en una cadira»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 6, columna 5 (Escola del Treball).",
      "Miriam: fixa't sobretot en «Miriam era l'única ILS de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 7, columna 6 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R4 C7, a l'Institut Salvador Seguí, sobre una cadira. Carla hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "portes-obertes",
    "title": "Portes obertes",
    "difficulty": "mitjà",
    "grid": {
      "w": 7,
      "h": 7
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          6
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          0,
          1,
          3
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "mati",
        "rect": [
          2,
          0,
          3,
          3
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          4,
          3,
          6
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          4,
          0,
          6,
          3
        ],
        "color": "#ece0f6"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          4,
          6,
          6
        ],
        "color": "#e6f0d8"
      }
    ],
    "objects": [
      {
        "r": 1,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 2,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 3,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 6,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 3,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 3,
        "c": 0,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 2,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 1,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 2,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 5,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 6,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 2,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 1,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 2,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 6,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar anava amb Carla.",
        "solution": [
          2,
          5
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla era en una cantonada de la seva sala.",
        "solution": [
          0,
          4
        ]
      },
      {
        "id": "marc",
        "name": "Marc",
        "torn": "matí",
        "initial": "Mc",
        "clue": "Marc no era mai sobre cap catifa.",
        "solution": [
          1,
          3
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat d'una catifa.",
        "solution": [
          3,
          1
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era al costat del rellotge.",
        "solution": [
          4,
          0
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era en una cantonada del tauler.",
        "solution": [
          6,
          6
        ]
      },
      {
        "id": "tatiana",
        "name": "Tatiana",
        "torn": "tarda",
        "initial": "T",
        "clue": "Tatiana seia en una cadira.",
        "solution": [
          5,
          2
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era mai sobre cap estoreta.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R2 C4, al FEP Aprenents EE, sobre una estoreta. Marc hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça.",
    "hints": [
      "Carla: fixa't sobretot en «Carla era en una cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 1, columna 5 (La Industrial).",
      "Marc: fixa't sobretot en «Marc no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Marc: és a la fila 2, columna 4 (FEP Aprenents).",
      "Oscar: fixa't sobretot en «Oscar anava amb Carla»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 3, columna 6 (La Industrial).",
      "Judit: fixa't sobretot en «Judit era al costat d'una catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 4, columna 2 (Salvador Seguí).",
      "Aroha: fixa't sobretot en «Aroha era al costat del rellotge»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 1 (Escola del Treball).",
      "Tatiana: fixa't sobretot en «Tatiana seia en una cadira»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Tatiana: és a la fila 6, columna 3 (Escola del Treball).",
      "Miriam: fixa't sobretot en «Miriam era en una cantonada del tauler»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 7, columna 7 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R2 C4, al FEP Aprenents EE, sobre una estoreta. Marc hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "doble-torn",
    "title": "Doble torn",
    "difficulty": "mitjà",
    "grid": {
      "w": 8,
      "h": 8
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          7
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          0,
          1,
          2
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "mati",
        "rect": [
          2,
          0,
          3,
          2
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          3,
          3,
          5
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          0,
          7,
          2
        ],
        "color": "#ece0f6"
      },
      {
        "id": "fpv",
        "name": "Institut d'FP Sanitària Vall d'Hebron",
        "short": "FP Vall d'Hebron",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          3,
          7,
          5
        ],
        "color": "#e6f0d8"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          4,
          6,
          7,
          7
        ],
        "color": "#fde8dc"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 4,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 0,
        "c": 6,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 3,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 6,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 6,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 7,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 0,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 1,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 5,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 6,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 7,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 0,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 3,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 6,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 7,
        "c": 1,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 7,
        "c": 3,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 5,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 7,
        "c": 7,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era a l'Institut Salvador Seguí. Oscar era exactament 2 columnes a l'esquerra de José Javier.",
        "solution": [
          3,
          1
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier era en una cantonada de la seva sala. José Javier no seia mai en cap banc.",
        "solution": [
          0,
          3
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla no era mai sobre cap catifa.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit no era en cap cantonada de la seva sala.",
        "solution": [
          2,
          5
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha no era en cap cantonada de la seva sala. Aroha era a l'Institut d'FP Sanitària Vall d'Hebron.",
        "solution": [
          4,
          4
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era al costat d'una estoreta. Miriam era a l'INS Escola del Treball.",
        "solution": [
          5,
          0
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene era al costat d'una estoreta. Irene era en una cantonada de la seva sala.",
        "solution": [
          7,
          6
        ]
      },
      {
        "id": "laurag",
        "name": "Laura G",
        "torn": "tarda",
        "initial": "LG",
        "clue": "Laura G no era mai sobre cap estoreta.",
        "solution": [
          6,
          7
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc del FEP Aprenents EE.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R2 C3, al FEP Aprenents EE. Carla hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.",
    "hints": [
      "Carla: fixa't sobretot en «Carla no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 2, columna 3 (FEP Aprenents).",
      "Judit: fixa't sobretot en «Judit no era en cap cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 6 (Inst. dels Aliments).",
      "Laura G: fixa't sobretot en «Laura G no era mai sobre cap estoreta»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Laura G: és a la fila 7, columna 8 (Inst. de Logística).",
      "José Javier: fixa't en «José Javier era en una cantonada de la seva sala» i «José Javier no seia mai en cap banc»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 1, columna 4 (Inst. dels Aliments).",
      "Oscar: fixa't en «Oscar era a l'Institut Salvador Seguí» i «Oscar era exactament 2 columnes a l'esquerra de José Javier»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 4, columna 2 (Salvador Seguí).",
      "Aroha: fixa't en «Aroha era a l'Institut d'FP Sanitària Vall d'Hebron» i «Aroha no era en cap cantonada de la seva sala»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 5, columna 5 (FP Vall d'Hebron).",
      "Miriam: fixa't en «Miriam era a l'INS Escola del Treball» i «Miriam era al costat d'una estoreta»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 6, columna 1 (Escola del Treball).",
      "Irene: fixa't en «Irene era en una cantonada de la seva sala» i «Irene era al costat d'una estoreta»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 8, columna 7 (Inst. de Logística).",
      "Per acabar, la incògnita: L'última plaça lliure era R2 C3, al FEP Aprenents EE. Carla hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "la-sala-de-professors",
    "title": "La sala de professors",
    "difficulty": "mitjà",
    "grid": {
      "w": 8,
      "h": 8
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          7
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          0,
          1,
          2
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 1,
        "zone": "mati",
        "rect": [
          2,
          0,
          3,
          2
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          3,
          3,
          5
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          6,
          3,
          7
        ],
        "color": "#ece0f6"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          0,
          5,
          3
        ],
        "color": "#e6f0d8"
      },
      {
        "id": "fpv",
        "name": "Institut d'FP Sanitària Vall d'Hebron",
        "short": "FP Vall d'Hebron",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          4,
          5,
          7
        ],
        "color": "#fde8dc"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          6,
          0,
          7,
          7
        ],
        "color": "#e4eef6"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 0,
        "c": 2,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 4,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 3,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 4,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 5,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 0,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 3,
        "c": 0,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 0,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 1,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 2,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 4,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 6,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 7,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      },
      {
        "r": 5,
        "c": 2,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 4,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 5,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 6,
        "c": 0,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "w": 2,
        "h": 1
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era al costat de la pissarra. Oscar no era en cap cantonada de la seva sala.",
        "solution": [
          2,
          5
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier no era mai sobre cap catifa.",
        "solution": [
          0,
          6
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla era al costat d'un ordinador.",
        "solution": [
          3,
          1
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat d'una cadira.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era al costat del rellotge.",
        "solution": [
          5,
          7
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam anava amb Irene.",
        "solution": [
          6,
          4
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene era en una cantonada del tauler.",
        "solution": [
          7,
          0
        ]
      },
      {
        "id": "laurag",
        "name": "Laura G",
        "torn": "tarda",
        "initial": "LG",
        "clue": "Laura G era al costat d'una estoreta.",
        "solution": [
          4,
          3
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc de l'Institut Salvador Seguí.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R1 C7, a l'Institut Salvador Seguí. José Javier hi podia seure, i Laura M no, perquè no era enlloc de l'Institut Salvador Seguí. Per això Laura M es queda sense plaça.",
    "hints": [
      "José Javier: fixa't sobretot en «José Javier no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 1, columna 7 (Salvador Seguí).",
      "Judit: fixa't sobretot en «Judit era al costat d'una cadira»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 2, columna 3 (FEP Aprenents).",
      "Carla: fixa't sobretot en «Carla era al costat d'un ordinador»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 4, columna 2 (La Industrial).",
      "Laura G: fixa't sobretot en «Laura G era al costat d'una estoreta»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Laura G: és a la fila 5, columna 4 (Escola del Treball).",
      "Aroha: fixa't sobretot en «Aroha era al costat del rellotge»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 6, columna 8 (FP Vall d'Hebron).",
      "Miriam: fixa't sobretot en «Miriam anava amb Irene»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 7, columna 5 (Inst. de Logística).",
      "Irene: fixa't sobretot en «Irene era en una cantonada del tauler»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 8, columna 1 (Inst. de Logística).",
      "Oscar: fixa't en «Oscar era al costat de la pissarra» i «Oscar no era en cap cantonada de la seva sala»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 3, columna 6 (Inst. dels Aliments).",
      "Per acabar, la incògnita: L'última plaça lliure era R1 C7, a l'Institut Salvador Seguí. José Javier hi podia seure, i Laura M no, perquè no era enlloc de l'Institut Salvador Seguí. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "setmana-cultural",
    "title": "La setmana cultural",
    "difficulty": "difícil",
    "grid": {
      "w": 9,
      "h": 9
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          3
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          4,
          8
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          0,
          1,
          3
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "mati",
        "rect": [
          2,
          0,
          3,
          3
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          4,
          3,
          8
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          4,
          0,
          5,
          4
        ],
        "color": "#ece0f6"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          6,
          0,
          7,
          4
        ],
        "color": "#e6f0d8"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 3,
        "zone": "tarda",
        "rect": [
          4,
          5,
          8,
          8
        ],
        "color": "#fde8dc"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 4,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 7,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 2,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 7,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 1,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 4,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 7,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 8,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 2,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 5,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 8,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 1,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 7,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 8,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 3,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 8,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 2,
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 5,
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 6,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 7,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 7,
        "c": 8,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 8,
        "c": 1,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 8,
        "c": 5,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 8,
        "c": 6,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar era al costat d'una estoreta. Oscar era al FEP Aprenents EE.",
        "solution": [
          0,
          2
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla era al costat d'una cadira.",
        "solution": [
          1,
          6
        ]
      },
      {
        "id": "joan",
        "name": "Joan",
        "torn": "matí",
        "initial": "Jn",
        "clue": "Joan no era mai sobre cap catifa.",
        "solution": [
          2,
          1
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat del prestatge.",
        "solution": [
          3,
          4
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha era a l'Institut dels Aliments. Aroha era en una cantonada de la seva sala.",
        "solution": [
          7,
          0
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era sobre una estoreta.",
        "solution": [
          4,
          5
        ]
      },
      {
        "id": "tatiana",
        "name": "Tatiana",
        "torn": "tarda",
        "initial": "T",
        "clue": "Tatiana era en una cantonada del tauler.",
        "solution": [
          8,
          8
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene no era en cap cantonada de la seva sala.",
        "solution": [
          5,
          3
        ]
      },
      {
        "id": "laurag",
        "name": "Laura G",
        "torn": "tarda",
        "initial": "LG",
        "clue": "Laura G era al costat de la taula.",
        "solution": [
          6,
          7
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era mai sobre cap estoreta.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R3 C2, a l'Institut Salvador Seguí, sobre una estoreta. Joan hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça.",
    "hints": [
      "Tatiana: la pista «Tatiana era en una cantonada del tauler» ja la situa tota sola. Mira el tauler i troba la seva casella!",
      "Tatiana: és a la fila 9, columna 9 (Inst. de Logística).",
      "Carla: fixa't sobretot en «Carla era al costat d'una cadira»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 2, columna 7 (La Industrial).",
      "Joan: fixa't sobretot en «Joan no era mai sobre cap catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Joan: és a la fila 3, columna 2 (Salvador Seguí).",
      "Judit: fixa't sobretot en «Judit era al costat del prestatge»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 4, columna 5 (La Industrial).",
      "Miriam: fixa't sobretot en «Miriam era sobre una estoreta»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 5, columna 6 (Inst. de Logística).",
      "Irene: fixa't sobretot en «Irene no era en cap cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 6, columna 4 (Escola del Treball).",
      "Laura G: fixa't sobretot en «Laura G era al costat de la taula»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Laura G: és a la fila 7, columna 8 (Inst. de Logística).",
      "Oscar: fixa't en «Oscar era al FEP Aprenents EE» i «Oscar era al costat d'una estoreta»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 1, columna 3 (FEP Aprenents).",
      "Aroha: fixa't en «Aroha era en una cantonada de la seva sala» i «Aroha era a l'Institut dels Aliments»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 8, columna 1 (Inst. dels Aliments).",
      "Per acabar, la incògnita: L'última plaça lliure era R3 C2, a l'Institut Salvador Seguí, sobre una estoreta. Joan hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça."
    ]
  },
  {
    "id": "tot-el-curs",
    "title": "Tot el curs",
    "difficulty": "difícil",
    "grid": {
      "w": 9,
      "h": 9
    },
    "zones": [
      {
        "id": "mati",
        "name": "Matí",
        "rows": [
          0,
          4
        ],
        "color": "#eaf3fc"
      },
      {
        "id": "tarda",
        "name": "Tarda",
        "rows": [
          5,
          8
        ],
        "color": "#fdf2e4"
      }
    ],
    "centres": [
      {
        "id": "fep",
        "name": "FEP Aprenents EE",
        "short": "FEP Aprenents",
        "demand": 2,
        "zone": "mati",
        "rect": [
          0,
          0,
          2,
          3
        ],
        "color": "#d8ecfa"
      },
      {
        "id": "ind",
        "name": "EA La Industrial",
        "short": "La Industrial",
        "demand": 1,
        "zone": "mati",
        "rect": [
          0,
          4,
          2,
          8
        ],
        "color": "#dcefdd"
      },
      {
        "id": "ali",
        "name": "Institut dels Aliments",
        "short": "Inst. dels Aliments",
        "demand": 2,
        "zone": "mati",
        "rect": [
          3,
          0,
          4,
          8
        ],
        "color": "#fbe2cf"
      },
      {
        "id": "esc",
        "name": "INS Escola del Treball",
        "short": "Escola del Treball",
        "demand": 2,
        "zone": "tarda",
        "rect": [
          5,
          0,
          8,
          3
        ],
        "color": "#ece0f6"
      },
      {
        "id": "seg",
        "name": "Institut Salvador Seguí",
        "short": "Salvador Seguí",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          5,
          4,
          8,
          5
        ],
        "color": "#e6f0d8"
      },
      {
        "id": "log",
        "name": "Institut de Logística de Barcelona",
        "short": "Inst. de Logística",
        "demand": 1,
        "zone": "tarda",
        "rect": [
          5,
          6,
          8,
          8
        ],
        "color": "#fde8dc"
      }
    ],
    "objects": [
      {
        "r": 0,
        "c": 1,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 3,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 4,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 0,
        "c": 6,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 0,
        "c": 7,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 0,
        "c": 8,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 1,
        "c": 0,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 6,
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 7,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 1,
        "c": 8,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 1,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 2,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 2,
        "c": 4,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 5,
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true
      },
      {
        "r": 2,
        "c": 8,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 3,
        "c": 2,
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 2,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 4,
        "c": 4,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      },
      {
        "r": 4,
        "c": 8,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 4,
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false
      },
      {
        "r": 5,
        "c": 6,
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true
      },
      {
        "r": 5,
        "c": 8,
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false
      },
      {
        "r": 6,
        "c": 0,
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true
      },
      {
        "r": 7,
        "c": 0,
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true
      },
      {
        "r": 8,
        "c": 8,
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false
      }
    ],
    "glossary": [
      {
        "name": "Cadira",
        "icon": "🪑",
        "img": "img/cadira.png",
        "occupiable": true,
        "desc": "Seient de classe; una ILS s'hi pot asseure."
      },
      {
        "name": "Catifa",
        "icon": "🟫",
        "img": "img/catifa.png",
        "occupiable": true,
        "desc": "Catifa de terra de l'aula; també és ocupable."
      },
      {
        "name": "Estoreta",
        "icon": "🟩",
        "img": "img/estoreta.png",
        "occupiable": true,
        "desc": "Estoreta per seure a terra (n'hi ha una de sola)."
      },
      {
        "name": "Banc",
        "icon": "🛋️",
        "img": "img/banc.png",
        "occupiable": true,
        "desc": "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."
      },
      {
        "name": "Ordinador",
        "icon": "💻",
        "img": "img/ordinador.png",
        "occupiable": false,
        "desc": "Ordinador de l'aula."
      },
      {
        "name": "Pissarra",
        "icon": "📝",
        "img": "img/pissarra.png",
        "occupiable": false,
        "desc": "Pissarra de classe."
      },
      {
        "name": "Taula",
        "icon": "🍽️",
        "img": "img/taula.png",
        "occupiable": false,
        "desc": "Taula de treball o de menjador."
      },
      {
        "name": "Prestatge",
        "icon": "📚",
        "img": "img/prestatge.png",
        "occupiable": false,
        "desc": "Prestatge de llibres."
      },
      {
        "name": "Lavabo",
        "icon": "🚻",
        "img": "img/lavabo.png",
        "occupiable": false,
        "desc": "Lavabo del centre."
      },
      {
        "name": "Màquina de cafè",
        "icon": "☕",
        "img": "img/maquina_cafe.png",
        "occupiable": false,
        "desc": "Màquina de cafè de la sala de professors."
      },
      {
        "name": "Rellotge",
        "icon": "🕐",
        "img": "img/rellotge.png",
        "occupiable": false,
        "desc": "Rellotge de paret; n'hi ha un de sol."
      }
    ],
    "ils": [
      {
        "id": "oscar",
        "name": "Oscar",
        "torn": "matí",
        "initial": "O",
        "clue": "Oscar no seia mai en cap banc.",
        "solution": [
          3,
          8
        ]
      },
      {
        "id": "josejavier",
        "name": "José Javier",
        "torn": "matí",
        "initial": "JJ",
        "clue": "José Javier era sobre una catifa. José Javier no era en cap cantonada de la seva sala.",
        "solution": [
          0,
          1
        ]
      },
      {
        "id": "carla",
        "name": "Carla",
        "torn": "matí",
        "initial": "C",
        "clue": "Carla no era en cap cantonada de la seva sala.",
        "solution": [
          4,
          5
        ]
      },
      {
        "id": "judit",
        "name": "Judit",
        "torn": "matí",
        "initial": "J",
        "clue": "Judit era al costat d'una cadira. Judit no era en cap cantonada de la seva sala.",
        "solution": [
          2,
          6
        ]
      },
      {
        "id": "marc",
        "name": "Marc",
        "torn": "matí",
        "initial": "Mc",
        "clue": "Marc era al FEP Aprenents EE.",
        "solution": [
          1,
          2
        ]
      },
      {
        "id": "aroha",
        "name": "Aroha",
        "torn": "tarda",
        "initial": "A",
        "clue": "Aroha no era al costat de la màquina de cafè.",
        "solution": [
          6,
          7
        ]
      },
      {
        "id": "miriam",
        "name": "Miriam",
        "torn": "tarda",
        "initial": "M",
        "clue": "Miriam era en una cantonada de la seva sala.",
        "solution": [
          8,
          4
        ]
      },
      {
        "id": "irene",
        "name": "Irene",
        "torn": "tarda",
        "initial": "I",
        "clue": "Irene era al costat d'una catifa.",
        "solution": [
          7,
          0
        ]
      },
      {
        "id": "laurag",
        "name": "Laura G",
        "torn": "tarda",
        "initial": "LG",
        "clue": "Laura G era en una cantonada de la seva sala. Laura G era a l'INS Escola del Treball.",
        "solution": [
          5,
          3
        ]
      },
      {
        "id": "lauram",
        "name": "Laura M",
        "torn": "matí",
        "initial": "LM",
        "clue": "Laura M no era enlloc de l'Institut dels Aliments.",
        "solution": null
      }
    ],
    "reveal": "L'última plaça lliure era R4 C9, a l'Institut dels Aliments. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'Institut dels Aliments. Per això Laura M es queda sense plaça.",
    "hints": [
      "Marc: fixa't sobretot en «Marc era al FEP Aprenents EE»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Marc: és a la fila 2, columna 3 (FEP Aprenents).",
      "Oscar: fixa't sobretot en «Oscar no seia mai en cap banc»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Oscar: és a la fila 4, columna 9 (Inst. dels Aliments).",
      "Carla: fixa't sobretot en «Carla no era en cap cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Carla: és a la fila 5, columna 6 (Inst. dels Aliments).",
      "Aroha: fixa't sobretot en «Aroha no era al costat de la màquina de cafè»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Aroha: és a la fila 7, columna 8 (Inst. de Logística).",
      "Irene: fixa't sobretot en «Irene era al costat d'una catifa»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Irene: és a la fila 8, columna 1 (Escola del Treball).",
      "Miriam: fixa't sobretot en «Miriam era en una cantonada de la seva sala»: amb la resta del tauler, aquesta pista ja la fixa. Mira el tauler i troba la seva casella!",
      "Miriam: és a la fila 9, columna 5 (Salvador Seguí).",
      "José Javier: fixa't en «José Javier era sobre una catifa» i «José Javier no era en cap cantonada de la seva sala»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "José Javier: és a la fila 1, columna 2 (FEP Aprenents).",
      "Judit: fixa't en «Judit era al costat d'una cadira» i «Judit no era en cap cantonada de la seva sala»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Judit: és a la fila 3, columna 7 (La Industrial).",
      "Laura G: fixa't en «Laura G era en una cantonada de la seva sala» i «Laura G era a l'INS Escola del Treball»: creuades amb la resta del tauler, ja la fixen. Mira el tauler i troba la seva casella!",
      "Laura G: és a la fila 6, columna 4 (Escola del Treball).",
      "Per acabar, la incògnita: L'última plaça lliure era R4 C9, a l'Institut dels Aliments. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'Institut dels Aliments. Per això Laura M es queda sense plaça."
    ]
  }
];
