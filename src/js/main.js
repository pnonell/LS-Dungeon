/* Inicializar la partida */
var partida = {};
partida.mapa = mapa;
partida.enemigos = [];
partida.objetos = objetos;
partida.jugador = player;

var info = {
  nivel: 0,
  xp: 0,
  ataque: 0,
  defensa: 0,
  vida: 0
};

var disableControls = true;
var actualPosition = {
  x : 0,
  y : 0
};

var enemigos = {};

// Función que da la bienvenida al jugador y prepara la web
function iniciarJuego() {
  partida.objetos = {};

  //mostramos la imagen de inicio en el visor
  pintaImagen('first-frame.png', 0, 0);

  //inicializamos los tooltips
  $('.tooltip-element').tooltip();

  //mostramos el mensaje de bienvenida por Consola
  messageToConsole('¡Bienvenido a LaSalle Dungeon! Selecciona "Nueva partida" o "Cargar partida" para empezar a jugar');
}

// Función que convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  if (!(partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] > 9)) {
    var front = computeFront(x, y);
    if (front == 11 || front == 13) {
      return ('/dungeon_step.png');
    }
    return getImgOf(front);
  }
  else {
    return ('/dungeon_wall.png');
  }
}

// Función que convierte un id de casilla en un archivo de imagen */
function getImgOf(id) {
  switch (id) {
    case 10:
      return ('/dungeon_wall.png');
    case 11:
      return ('/dungeon_step.png');
    case 12:
      return ('/dungeon_door.png');
    case 13:
      return ('/dungeon_step.png');
    case 14:
      return ('/dungeon_xp.png');
    case 15:
      return('/dungeon_reset.png');
    case 20:
      // Portátil
      return ('/dungeon_portatil.png');
    case 21:
      // Soldador
      return ('/dungeon_soldador.png');
    case 22:
      // Calculadora
      return ('/dungeon_calculador.png');
    case 23:
      // USB
      return ('/dungeon_usb.png');
    case 24:
      //justificantes
      return ('/dungeon_justificante.png');
    case 30:
      return ('/dungeon_lsmaker_standing.png');
    case 31:
      return ('/dungeon_daniel_standing.png');
    case 32:
      return ('/dungeon_emiliano_standing.png');
    case 33:
      return ('/dungeon_eva_standing.png');
    case 34:
      return ('/dungeon_guillem_standing.png');
    case 35:
      return ('/dungeon_ignasi_standing.png');
    case 36:
      return ('/dungeon_jose_standing.png');
    case 37:
      return ('/dungeon_xavier_standing.png');
  }
}
