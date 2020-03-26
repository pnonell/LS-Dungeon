// Función que remarca el avatar selecionado en el modal
function selectAvatar(id) {
  $('#avatarId').prop('value', id);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + id).addClass('avatar_selected');
}

// Función que actualiza la información del jugador en la UI
function refrescarInfoJugador() {
  $('header .player-name').html(partida.jugador.nombre);
  $('header .avatar').prop('src', 'media/images/avatar' + partida.jugador.avatar + '.png');
}

// Función que muestra los menús necesarios para cuando se ha iniciado una partida
function mostrarMenusPartida() {
  $('#menu-nuevaPartida').prop('hidden', true);
  $('#menu-cargarPartida').prop('hidden', true);
  $('#menu-jugador').prop('hidden', false);
  $('#menu-guardarPartida').prop('hidden', false);
  $('#menu-salir').prop('hidden', false);
}

// Función que va añadiendo mensajes a la consola y que usa la librería moment.js para poner la hora
function messageToConsole(msg) {
  var now = new moment();
  $('#console-text').prepend($('#first-console-text').html());
  $('#first-console-text').html('[' + now.format("HH:mm:ss") + '] ' + msg + '<br>');
  if(partida.consola != null){
    partida.consola.first = $('#first-console-text').html();
    partida.consola.text = $('#console-text').html();
  }
}

// Función que al llamarla actualiza las barras de xp, ataque, defensa y vida
function mostrarInformacion(){
  var nextLevelP = 20;
  var distPoints = 20;
  while(nextLevelP < partida.jugador.experiencia){
    nextLevelP += distPoints + 10;
    distPoints += 10;
  }
  if(nextLevelP == partida.jugador.experiencia){
    nextLevelP += distPoints + 10;
  }

  $('#progress-bar-xp').attr('aria-valuemax', nextLevelP).attr('aria-valuenow', partida.jugador.experiencia).css('width', partida.jugador.experiencia/$('#progress-bar-xp').attr('aria-valuemax') *100 + '%');
  $('#label-xp').html(partida.jugador.experiencia + '/' + $('#progress-bar-xp').attr('aria-valuemax') + ' (Nivel ' + getNivel(partida.jugador.experiencia) + ')');

  var ataqueIzq = 0;
  var defensaIzq = 0;
  if(partida.jugador.manos.izq != null){
    ataqueIzq = partida.jugador.manos.izq.atributos.ataque;
    defensaIzq = partida.jugador.manos.izq.atributos.defensa;
  }

  var ataqueDer = 0;
  var defensaDer = 0;
  if(partida.jugador.manos.der != null){
    ataqueDer = partida.jugador.manos.der.atributos.ataque;
    defensaDer = partida.jugador.manos.der.atributos.defensa;
  }

  $('#progress-bar-ataque').html(partida.jugador.ataque + " + " + ataqueIzq + " + " + ataqueDer);
  $('#label-ataque').html(getAtaque());
  $('#progress-bar-defensa').html(partida.jugador.defensa + " + " + defensaIzq + " + " + defensaDer);
  $('#label-defensa').html(getDefensa());

  $('#progress-bar-vida').css('width', partida.jugador.vida/getMaxVidas(partida.jugador.nivel) *100 + '%');
  $('#label-vida').html(partida.jugador.vida + '/' + getMaxVidas(partida.jugador.nivel));
}

// Función que actualizar el visor con la imagen de la casilla que hay delante
function refrescarVisor() {
  var path = getImgOf(computeCurrentFront());
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images"+path;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, 0, 0);
  };
}
