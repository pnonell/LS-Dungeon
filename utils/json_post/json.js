var json = `
{
  "jugador": {
    "nivel": 1,
    "experiencia": 0,
    "ataque": 0,
    "defensa": 0,
    "vida": 10,
    "posicion": {
      "mapa": 0,
      "orientacion": [],
      "x": null,
      "y": null
    },
    "mochila": [],
    "manos": {
        "izq": null,
        "der": null
    },
    "lucha": {
        "activa": false,
        "turnoJugador": null,
        "vidaEnemigo": null,
        "animoEnemigo": null
    },
    "numEnemigosMuertos": 0
  },
  "terreno": [
    {
      "nombre": "Pared",
      "id": 10
    },
    {
      "nombre": "Suelo",
      "id": 11
    },
    {
      "nombre": "Salida",
      "id": 12
    },
    {
      "nombre": "Origen",
      "id": 13
    }
  ],
  "objetos": {
    "20": {
      "nombre": "Portátil",
      "id": 20,
      "atributos": {
        "ataque": 3,
        "defensa": 5,
        "durabilidad": 30,
        "accionHuir": false
      }
    },
    "21": {
      "nombre": "Soldador",
      "id": 21,
      "atributos": {
        "ataque": 5,
        "defensa": 1,
        "durabilidad": 30,
        "accionHuir": false
      }
    },
    "22": {
      "nombre": "Calculadora",
      "id": 22,
      "atributos": {
        "ataque": 3,
        "defensa": 3,
        "durabilidad": 30,
        "accionHuir": false
      }
    },
    "23": {
      "nombre": "USB",
      "id": 23,
      "atributos": {
        "ataque": 3,
        "defensa": 2,
        "durabilidad": 50,
        "accionHuir": false
      }
    },
    "24": {
      "nombre": "Justificante médico",
      "id": 24,
      "atributos": {
        "ataque": 1,
        "defensa": 1,
        "durabilidad": 30,
        "accionHuir": true
      }
    }
  },
  "enemigos": {
    "30": {
      "nombre": "LSMaker",
      "id": 30,
      "objetos": [
        23
      ],
      "atributos": {
        "ataque": 2,
        "defensa": 3,
        "vida": 10,
        "xp": 4
      }
    },
    "31": {
      "nombre": "Daniel",
      "id": 31,
      "objetos": [
        20,
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "32": {
      "nombre": "Emiliano",
      "id": 32,
      "objetos": [
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "33": {
      "nombre": "Eva",
      "id": 33,
      "objetos": [
        21,
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "34": {
      "nombre": "Guillem",
      "id": 34,
      "objetos": [
        23
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "35": {
      "nombre": "Ignasi",
      "id": 35,
      "objetos": [
        20,
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "36": {
      "nombre": "Jose Antonio",
      "id": 36,
      "objetos": [
        22,
        22
      ],
      "atributos": {
        "ataque": 4,
        "defensa": 4,
        "vida": 15,
        "xp": 6
      }
    },
    "37": {
      "nombre": "Xavier",
      "id": 37,
      "objetos": [
        21,
        21
      ],
      "atributos": {
        "ataque": 6,
        "defensa": 5,
        "vida": 15,
        "xp": 10
      }
    }
  },
  "mapas" :[
    {
    "origen": [
      8,
      5
    ],
    "orientacion": [
      1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        10,
        31,
        11,
        11,
        11,
        11,
        31,
        10,
        10
      ],
      [
        10,
        11,
        11,
        10,
        10,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        20,
        11,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        11,
        11,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        11,
        30,
        10,
        10,
        10,
        11,
        10,
        10
      ],
      [
        10,
        11,
        10,
        11,
        11,
        10,
        11,
        30,
        11,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        10,
        11,
        10,
        11,
        10
      ],
      [
        10,
        30,
        11,
        22,
        11,
        13,
        11,
        21,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  },{
    "origen": [
      9,
      4
    ],
    "orientacion": [
      1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        35,
        11,
        11,
        11,
        11,
        11,
        11,
        33,
        10
      ],
      [
        10,
        11,
        10,
        10,
        34,
        11,
        10,
        10,
        11,
        10
      ],
      [
        10,
        11,
        30,
        10,
        11,
        10,
        10,
        10,
        30,
        10
      ],
      [
        10,
        11,
        10,
        10,
        11,
        11,
        30,
        10,
        11,
        10
      ],
      [
        10,
        30,
        10,
        11,
        30,
        11,
        10,
        10,
        30,
        10
      ],
      [
        10,
        11,
        11,
        11,
        10,
        22,
        11,
        10,
        11,
        10
      ],
      [
        10,
        11,
        10,
        10,
        10,
        10,
        11,
        10,
        30,
        10
      ],
      [
        10,
        11,
        23,
        11,
        11,
        11,
        11,
        11,
        21,
        10
      ],
      [
        10,
        10,
        10,
        10,
        13,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  },
  {
    "origen": [
      9,
      4
    ],
    "orientacion": [
      -1,
      0
    ],
    "distribucion": [
      [
        10,
        10,
        10,
        10,
        12,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        11,
        11,
        11,
        11,
        11,
        37,
        11,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        11,
        11,
        10,
        10,
        11,
        10
      ],
      [
        10,
        22,
        11,
        23,
        10,
        10,
        10,
        30,
        11,
        10
      ],
      [
        10,
        10,
        10,
        11,
        11,
        11,
        11,
        11,
        21,
        10
      ],
      [
        10,
        30,
        10,
        11,
        10,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        11,
        11,
        36,
        11,
        11,
        11,
        10,
        20,
        10
      ],
      [
        10,
        21,
        10,
        11,
        11,
        10,
        30,
        11,
        11,
        10
      ],
      [
        10,
        10,
        10,
        10,
        11,
        10,
        10,
        10,
        10,
        10
      ],
      [
        10,
        10,
        10,
        10,
        13,
        10,
        10,
        10,
        10,
        10
      ]
    ]
  }]
}
`;
