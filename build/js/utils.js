// Función para saber en que nivel está el jugador mediante sus xp
function getNivel(xp){
  var nivel = 1;
  var puntos = xp;
  while(puntos > 0){
    puntos = puntos - ((nivel+1) * 10);
    if(puntos >= 0){
      nivel++;
    }
  }
  return nivel;
}

// Función para determinar qué es lo que hay en la casilla de enfrente dada una posición, con x e y
function computeFront(x, y) {
  if (partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]] !== undefined) {
    if (partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]][y + partida.jugador.posicion.orientacion[1]] !== undefined) {
      return partida.mapas[partida.jugador.posicion.mapa].distribucion[x + partida.jugador.posicion.orientacion[0]][y + partida.jugador.posicion.orientacion[1]];
    }
    else {
      return -1;
    }
  }
  else {
    return -1;
  }
}

// Función para determinar qué es lo que hay en la casilla de enfrente mediante la posición actual del jugador
function computeCurrentFront() {
  return computeFront(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

// Función para determinar las coordenadas de la casilla de enfrente mediante la posición actual del jugador
function computeCurrentFrontCoords() {
  return [partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0], partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]];
}

// Función para determinar qué es lo que hay en la casilla de detrás dada una posición, con x e y
function computeBack(x, y) {
  if (partida.mapas[partida.jugador.posicion.mapa].distribucion[x - partida.jugador.posicion.orientacion[0]] !== undefined) {
    if (partida.mapas[partida.jugador.posicion.mapa].distribucion[x - partida.jugador.posicion.orientacion[0]][y - partida.jugador.posicion.orientacion[1]] !== undefined) {
      return partida.mapas[partida.jugador.posicion.mapa].distribucion[x - partida.jugador.posicion.orientacion[0]][y - partida.jugador.posicion.orientacion[1]];
    }
    else {
      return -1;
    }
  }
  else {
    return -1;
  }
}

// Función para determinar qué es lo que hay en la casilla de detrás mediante la posición actual del jugador
function computeCurrentBack() {
  return computeBack(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

// Función que suma puntos xp y muestra si has subido de nivel y actualiza la vida máxima, el ataque y la defensa.
function sumXp(xp){
  var firstLevel =getNivel(partida.jugador.experiencia);
  partida.jugador.experiencia += xp;
  var lastLevel = getNivel(partida.jugador.experiencia);
  partida.jugador.nivel = lastLevel;
  var ataque = 0;
  for(var i = 2; i <= lastLevel; i++){
    if(i%2){
      ataque++;
    }
  }
  var defensa = 0;
  for(i = 1; i < lastLevel; i++){
    defensa++;
  }

  partida.jugador.ataque = ataque;
  partida.jugador.defensa = defensa;

  if(firstLevel != lastLevel){
    var dif = lastLevel - firstLevel;
    var vida = partida.jugador.vida;
    for(i = 1; i <= dif; i++){
      vida += (firstLevel + i) * 10;
    }
    partida.jugador.vida = vida;
    messageToConsole('Has subido al nivel ' + lastLevel + ' de experiencia');
    swal({
      title: "Level UP!",
      text: "¡Has subido de nivel! Ahora estás en el nivel " + lastLevel + " de experiencia, ¡eso significa que tus habilidades han aumentado!",
      imageUrl: 'media/images/levelup.gif',
      showConfirmButton: true,
      confirmButtonColor: '#6aade4',
      confirmButtonText: 'Ok',
    });
  }
  mostrarInformacion();
}

// Función que retorna la vida máxima que se podria tener en el nivel d'exepriencia, eso nos será útil para pintar la barra de infromación del jugador
function getMaxVidas(nivel){
  var vidaMax = 10;
  for(var i = 2; i <= nivel; i++){
    vidaMax += 10 * i;
  }
  return vidaMax;
}

// Función que retorna la suma de ataque de jugador y los objetos que tiene en las manos
function getAtaque(){
  var ataque = partida.jugador.ataque;
  if(partida.jugador.manos.der != null){
    ataque += partida.jugador.manos.der.atributos.ataque;
  }
  if(partida.jugador.manos.izq != null){
    ataque += partida.jugador.manos.izq.atributos.ataque;
  }
  return ataque;
}

// Función que retorna la suma de defensa de jugador y los objetos que tiene en las manos
function getDefensa(){
  var defensa = partida.jugador.defensa;
  if(partida.jugador.manos.der != null){
    defensa += partida.jugador.manos.der.atributos.defensa;
  }
  if(partida.jugador.manos.izq != null){
    defensa += partida.jugador.manos.izq.atributos.defensa;
  }
  return defensa;
}

// Función que devuelve todo el minimapa a su estado original (negro)
function limpiaMapa(){
  var id;

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      id = i*10 + j;

      $("#"+id).css("background-image", "url(media/images/mapa_blanco.png)");
      $("#"+id).attr("src","media/images/mapa_null.png");
    }
  }
  pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
}

// Función que modifica los atributos de la la variable partida para poder canviar de mapa
function subirPiso(){

  if (partida.jugador.posicion.mapa + 1 < partida.mapas.length) {

    partida.jugador.posicion.mapa++;

    partida.jugador.posicion.x = partida.mapas[partida.jugador.posicion.mapa].origen[0];
    partida.jugador.posicion.y = partida.mapas[partida.jugador.posicion.mapa].origen[1];

    partida.jugador.orientacion = partida.mapas[partida.jugador.posicion.mapa].orientacion;

    limpiaMapa();

    messageToConsole('Has subido al siguiente piso');
    swal({
      title: "Subes de Piso!",
      text: "¡Has llegado al final del piso " + (partida.jugador.posicion.mapa - partida.mapas.length - 1) + "! ¿Estas preparado para el siguiente piso?",
      imageUrl: 'media/images/nextfloor.gif',
      showConfirmButton: true,
      confirmButtonColor: '#6aade4',
      confirmButtonText: 'Ok',
    });
  }
  else {
    //partida acabada
    victoriaJugador();
  }
}

// Función similar a la funcion subirPiso(), pero ésta devuelve al jugador al primer piso
function primerPiso() {
  partida.jugador.posicion.mapa = 0;

  partida.jugador.posicion.x = partida.mapas[partida.jugador.posicion.mapa].origen[0];
  partida.jugador.posicion.y = partida.mapas[partida.jugador.posicion.mapa].origen[1];

  partida.jugador.orientacion = partida.mapas[partida.jugador.posicion.mapa].orientacion;

  limpiaMapa();

  messageToConsole('Has perdido tu expediente por un error administrativo, tendras que volver a empezar de 0...');
  swal({
    title: "Has perdido tu expediente por un error administrativo! Tendras que volver a empezar de 0...",
    text: "Por lo menos te quedan los amigos que has hecho",
    imageUrl: 'media/images/thiswillneverend.gif',
    showConfirmButton: true,
    confirmButtonColor: '#6aade4',
    confirmButtonText: 'Ok',
  });
}

// Función que muestra un SweetAlert para la condicion de victoria
function victoriaJugador(){
  messageToConsole('Has ganado LaSalle Dungeon!');
  swal({
    title: 'Felicidades! Acabas de superar la Salle Dungeon, toma tu licenciatura y ve a buscar un trabajo',
    text: "Dale a Nueva Partida para volver a empezar",
    imageUrl: 'media/images/winner.gif',
    confirmButtonText: 'Ok',
    confirmButtonColor: '#6aade4'
  });
  disableControls = true;
  reiniciarModals();
}

// Función que activa o desactiva la música
function volume(option){
  switch(option){
    case 'on':
    $('#audio')[0].pause();
    $('#volumeOn').prop('hidden', true);
    $('#volumeOff').prop('hidden', false);
    break;
    case 'off':
    $('#audio')[0].play();
    $('#volumeOn').prop('hidden', false);
    $('#volumeOff').prop('hidden', true);
    break;
  }
}

// Función para precargar imágenes. Source: https://stackoverflow.com/questions/476679/preloading-images-with-jquery
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}
