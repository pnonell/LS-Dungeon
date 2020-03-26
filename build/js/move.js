// Función que hace que la posición y la orientación del jugador sea el origen del mapa actual
function colocarEnInicioMapa() {
  partida.jugador.posicion.x = partida.mapas[partida.jugador.posicion.mapa].origen[0];
  partida.jugador.posicion.y = partida.mapas[partida.jugador.posicion.mapa].origen[1];
  partida.jugador.posicion.orientacion = partida.mapas[partida.jugador.posicion.mapa].orientacion;
}

// Función que mueve el jugador en la dirección indicada
function mover(dir){
  if(!disableControls){
    switch (dir){
      case 'up':
        if(!(partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1] > 9)){
          if(computeCurrentFront() != 10 && !(computeCurrentFront() >= 30 && computeCurrentFront() <= 39)){
            partida.jugador.posicion.x += partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y += partida.jugador.posicion.orientacion[1];
            comprovarPosicion();
          }
          //else if (computeCurrentFront() >= 30 && computeCurrentFront() <= 39) {
            //alert('No puedes ir hacia delante porque tienes un enemigo delante.');
          //}
        }
        break;
      case 'down':
        if(!(partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] < 0 || partida.jugador.posicion.x - partida.jugador.posicion.orientacion[0] > 9 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] < 0 || partida.jugador.posicion.y - partida.jugador.posicion.orientacion[1] > 9)){
          if(computeCurrentBack() != 10 && !(computeCurrentBack() >= 30 && computeCurrentBack() <= 39)){
            partida.jugador.posicion.x -= partida.jugador.posicion.orientacion[0];
            partida.jugador.posicion.y -= partida.jugador.posicion.orientacion[1];
            comprovarPosicion();
          }
          //else if (computeCurrentBack() >= 30 && computeCurrentBack() <= 39) {
            //alert('No puedes ir hacia atrás porque tienes un enemigo detrás.');
          //}
        }
        break;
      case 'right':
        if(partida.jugador.posicion.orientacion[0] == 0){
          partida.jugador.posicion.orientacion[0] = partida.jugador.posicion.orientacion[1];
          partida.jugador.posicion.orientacion[1] = 0;
        }else{
          partida.jugador.posicion.orientacion[1] = partida.jugador.posicion.orientacion[0] * -1;
          partida.jugador.posicion.orientacion[0] = 0;
        }
        pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
        // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
        comprobarEnemigo();
      break;
      case 'left':
        if(partida.jugador.posicion.orientacion[0] == 0){
          partida.jugador.posicion.orientacion[0] = partida.jugador.posicion.orientacion[1] * -1;
          partida.jugador.posicion.orientacion[1] = 0;
        }else{
          partida.jugador.posicion.orientacion[1] = partida.jugador.posicion.orientacion[0];
          partida.jugador.posicion.orientacion[0] = 0;
        }
        pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
        // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
        comprobarEnemigo();
      break;
    }
    actualizarMapa();
  }
}

// Función que se encarga de actualizar el campo visibilidad de la variable partida y dibuja el minimapa en funcion de visibilidad
function actualizarMapa() {

  var cas;

  var id = partida.jugador.posicion.x * 10 + partida.jugador.posicion.y;
  var idaux;

  var oid = 0;
  var ocasilla = 0;
  var oposx = partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0];
  var oposy = partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1];

  partida.mapas[partida.jugador.posicion.mapa].visibilidad[partida.jugador.posicion.x][partida.jugador.posicion.y] = true;

  //decide si la casilla a la que el jugador mira deberia ser visible
  if ( oposx > -1 && oposy > -1 && oposx < 10 && oposy < 10) {
    oid = (partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]) * 10 + (partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]);
    ocasilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x + partida.jugador.posicion.orientacion[0]][partida.jugador.posicion.y + partida.jugador.posicion.orientacion[1]];

    if (ocasilla == 10) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
    else if (ocasilla == 12) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
    else if (ocasilla == 14) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
    else if (ocasilla == 15) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
    else if (ocasilla >= 30) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
    else if (ocasilla >= 20 && ocasilla < 30) {
      partida.mapas[partida.jugador.posicion.mapa].visibilidad[oposx][oposy] = true;
    }
  }

  //mira el mapa de visibilidad y dibuja las casilla que sean visibles
  for (var k = 0; k < 10; k++) {
    for (var l = 0; l < 10; l++) {
      //se asegura que la flecha del jugador solo este en la casilla actual haciendo un barrido de todo el mapa
      $("#"+idaux).attr("src","media/images/mapa_null.png");

      //si esa casilla tiene visibilidad activada dibujara el tile correspondiente a su ID
      if (partida.mapas[partida.jugador.posicion.mapa].visibilidad[k][l] == true) {

        idaux = k*10 + l;
        cas = partida.mapas[partida.jugador.posicion.mapa].distribucion[k][l];

        switch (true) {
          case (cas == 10):
            $("#"+idaux).css("background-image", "url(media/images/mapa_pared.png)");
          break;
          case (cas == 11):
            $("#"+idaux).css("background-image", "url(media/images/mapa_suelo.png)");
          break;
          case (cas == 12):
            $("#"+idaux).css("background-image", "url(media/images/mapa_salida.png)");
          break;
          case (cas == 13):
            $("#"+idaux).css("background-image", "url(media/images/mapa_origen.png)");
          break;
          case (cas == 15 || cas == 14):
            $("#"+idaux).css("background-image", "url(media/images/mapa_objeto.png)");
          break;
          case (cas >= 20 && cas < 30):
            $("#"+idaux).css("background-image", "url(media/images/mapa_objeto.png)");
          break;
          case (cas >= 30):
            $("#"+idaux).css("background-image", "url(media/images/mapa_enemigo.png)");
          break;
          default:
          break;
        }
      }
    }
  }

  //decide en que direccion y posicion se pondra la flecha del jugador
  switch (partida.jugador.posicion.orientacion.join(' ')) {
    case "0 1":
      $("#"+id).attr("src","media/images/mapa_derecha.png");
    break;
    case "0 -1":
      $("#"+id).attr("src","media/images/mapa_izquierda.png");
    break;
    case "1 0":
      $("#"+id).attr("src","media/images/mapa_abajo.png");
    break;
    case "-1 0":
      $("#"+id).attr("src","media/images/mapa_arriba.png");
    break;
    default:
    break;
  }

  //poner nivel de mapa
  switch(partida.jugador.posicion.mapa){
    case 0:
    $('#nivel-actual').html('Nivel -3');
    break;
    case 1:
    $('#nivel-actual').html('Nivel -2');
    break;
    case 2:
    $('#nivel-actual').html('Nivel -1');
    break;
  }
}

// Función que comprueba la posición actual del jugador y, si hay que hacer alguna acción especial, la hace
function comprovarPosicion(){
  var casilla = partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y];
  //si está en una casilla sin ninguna acción solo pintamos esta
  if(casilla == 11 || casilla == 13){
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
  }
  //si es otro tipo de casilla, realizaremos la acción pertinente a esa casilla.
  if(casilla == 12){
    //salida
    subirPiso();
  }
  if(casilla == 14){
    //puntos xp
    sumXp(10);
    partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y] = 11;
    messageToConsole('Has encontrado 10 puntos xp extras!');
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
  }
  if (casilla == 15) {
    //portal al primer piso
    primerPiso();
  }
  if(casilla >= 20 && casilla <= 29){
    //objeto
    recogerObjeto(casilla);
    pintaPosicion(partida.jugador.posicion.x, partida.jugador.posicion.y);
    // Quitamos el objeto para que no lo pueda volver a coger. Ponemos suelo (11)
    partida.mapas[partida.jugador.posicion.mapa].distribucion[partida.jugador.posicion.x][partida.jugador.posicion.y] = 11;
  }
  if(casilla >= 30 && casilla <= 39){
    //enemigo
  }
  // Comprobamos si delante tenemos un enemigo (se está viendo un enemigo en el visor)
  comprobarEnemigo();
}

// Función que hace un salto (movimiento de dos casillas hacia adelante)
function saltar(){
  mover('up');
  mover('up');
}
