// Función que guarda en la mochila el objeto que recibe
function guardarEnMochila(infoObjeto) {
  partida.jugador.mochila.push(infoObjeto);
  return partida.jugador.mochila.length-1;
}

// Función que muestra el objeto en la UI dentro de la mochila
function mostrarEnMochila(infoObjeto, idEnMochila) {
  $('#mochila').children().filter('i').remove();
  $('#mochila').append('<img id="objeto' + idEnMochila + '" src="' + imagenPeqObjeto(infoObjeto.id) + '" class="tooltip-element draggable drag-drop objeto-mochila" data-toggle="tooltip" title="' + infoObjeto.nombre + '" alt="' + infoObjeto.nombre + '"/>');
  $('#objeto' + idEnMochila).tooltip();
  // Actualizamos las barras de ataque y defensa
  mostrarInformacion();
}

// Función que guarda en la mochila el objeto que recibe en forma de id
function recogerObjeto(id) {
  var copiedObject = jQuery.extend(true, {}, partida.objetos[id]);// Deep copy
  var idEnMochila = guardarEnMochila(copiedObject);
  messageToConsole('Has recogido un ' + partida.objetos[id].nombre + '! Ahora esta en tu mochila');
  mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
}

// Función que guarda en la mochila los objetos que recibe en forma de array de ids
function recogerObjetos(ids) {
  for (i = 0; i < ids.length; i++) {
    var id = ids[i];
    var copiedObject = jQuery.extend(true, {}, partida.objetos[id]);// Deep copy
    var idEnMochila = guardarEnMochila(copiedObject);
    mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
  }
}

// Función que recibe el id de un objeto y devuelve la ruta a su imágen pequeña
function imagenPeqObjeto(idObjeto) {
  switch (idObjeto) {
    case 20:
      return 'media/images/square20.jpg';
    case 21:
      return 'media/images/square21.jpg';
    case 22:
      return 'media/images/square22.jpg';
    case 23:
      return 'media/images/square23.jpg';
    case 24:
      return 'media/images/square24.jpg';
  }
}

// Target elements with the "draggable" class
interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  /*restrict: {
    restriction: "parent",
    endOnly: false,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },*/
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p');

    textEl && (textEl.textContent =
      'moved a distance of '
      + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                   Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px');
  }
});

// Función que se llama para cada evento dragmove
function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// Enable draggables to be dropped into this
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.objeto-mochila',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:
  ondropactivate: onDropActivate,
  ondragenter: onDragEnter,
  ondragleave: onDragLeave,
  ondrop: onDrop,
  ondropdeactivate: onDropDeactivate
});

// Función llamada por el evento onDropActivate
function onDropActivate(event) {
  // add active dropzone feedback
  event.target.classList.add('drop-active');
}

// Función llamada por el evento onDragEnter
function onDragEnter(event) {
  var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;

  // feedback the possibility of a drop
  dropzoneElement.classList.add('drop-target');
  draggableElement.classList.add('can-drop');
  draggableElement.textContent = 'Dragged in';
}

// Función llamada por el evento onDragLeave
function onDragLeave(event) {
  // remove the drop feedback style
  event.target.classList.remove('drop-target');
  event.relatedTarget.classList.remove('can-drop');
}

// Función llamada por el evento onDrop
function onDrop(event) {
  $(event.relatedTarget).tooltip('hide');
  $(event.relatedTarget).tooltip('disable');
  deMochilaAMano(event.relatedTarget.id.substr('objeto'.length), event.target.id);
}

// Función llamada por el evento onDropDeactivate
function onDropDeactivate(event) {
  var target = event.relatedTarget;
  if (!target.classList.contains('can-drop')) {
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(0px, 0px)';
    // update the posiion attributes
    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);
  }
  // remove active dropzone feedback
  event.target.classList.remove('drop-active');
  event.target.classList.remove('drop-target');
}

// Función que transfiere un objeto de la mochila a la mano
function deMochilaAMano(idEnMochila, idMano) {
  var infoObjeto = sacarDeMochila(idEnMochila);
  ponerEnMano(infoObjeto, idMano);
}

// Función que saca un objeto de la mochila
function sacarDeMochila(idEnMochila) {
  var infoObjeto = partida.jugador.mochila.splice(idEnMochila, 1);// The second parameter of splice is the number of elements to remove
  cargarMochila();
  return infoObjeto[0];
}

// Función que muestra en la UI los objetos que hay en la mochila
function cargarMochila() {
  $('#mochila').children().each(function() {
    $(this).remove();
  });
  partida.jugador.mochila.forEach(function(element, index) {
    mostrarEnMochila(element, index);
  });
  if (partida.jugador.mochila == 0) {
    $('#mochila').append('<i class="vacia">Mochila vacía</i>');
  }
}

// Función que pone en la mano el objeto que recibe (tanto internamente como en la UI)
function ponerEnMano(infoObjeto, idMano) {
  if (idMano == 'mano-izq') {
    mostrarEnMano(infoObjeto, idMano);
    if (partida.jugador.manos.izq != null) {
      deManoAMochila(partida.jugador.manos.izq);
    }
    partida.jugador.manos.izq = infoObjeto;
  }
  else if (idMano == 'mano-der') {
    mostrarEnMano(infoObjeto, idMano);
    if (partida.jugador.manos.der != null) {
      deManoAMochila(partida.jugador.manos.der);
    }
    partida.jugador.manos.der = infoObjeto;
  }
  // Actualizamos las barras de ataque y defensa
  mostrarInformacion();
  //comprobamos si tenemos un justificante en la mano
  comprobarJustificante();
}

// Función que muestra en la UI el objeto en la mano
function mostrarEnMano(infoObjeto, idMano) {
  if (idMano == 'mano-izq') {
    $('#info-mano-izq').show();
    $('#nombre-mano-izq').html(infoObjeto.nombre);
    $('#ataque-mano-izq').html(infoObjeto.atributos.ataque);
    $('#defensa-mano-izq').html(infoObjeto.atributos.defensa);
    $('#durabilidad-mano-izq').html(infoObjeto.atributos.durabilidad);
    $('#' + idMano).css('background-image', 'url("' + imagenPeqObjeto(infoObjeto.id) + '")');
    $('#' + idMano).off();
    $('#' + idMano).hover(
      function(){
        $(this).toggleClass('mano-hover');
      },
      function(){
        $(this).toggleClass('mano-hover');
      }
    );
    $('#' + idMano).click(function() {
      $(this).off();
      deManoAMochila(partida.jugador.manos.izq);
      partida.jugador.manos.izq = null;
      comprobarJustificante();

      $(this).unbind('mouseenter mouseleave');
      $(this).removeClass('mano-hover');
      $(this).css('background-image', 'none');
      $('#info-mano-izq').hide();

      mostrarInformacion();
    });
  }
  else if (idMano == 'mano-der') {
    $('#info-mano-der').show();
    $('#nombre-mano-der').html(infoObjeto.nombre);
    $('#ataque-mano-der').html(infoObjeto.atributos.ataque);
    $('#defensa-mano-der').html(infoObjeto.atributos.defensa);
    $('#durabilidad-mano-der').html(infoObjeto.atributos.durabilidad);
    $('#' + idMano).css('background-image', 'url("' + imagenPeqObjeto(infoObjeto.id) + '")');
    $('#' + idMano).off();
    $('#' + idMano).hover(
      function(){
        $(this).toggleClass('mano-hover');
      },
      function(){
        $(this).toggleClass('mano-hover');
      }
    );
    $('#' + idMano).click(function() {
      $(this).off();
      deManoAMochila(partida.jugador.manos.der);
      partida.jugador.manos.der = null;
      comprobarJustificante();

      $(this).unbind('mouseenter mouseleave');
      $(this).removeClass('mano-hover');
      $(this).css('background-image', 'none');
      $('#info-mano-der').hide();

      mostrarInformacion();
    });
  }
}

// Función que transfiere un objeto de la mano a la mochila
function deManoAMochila(infoObjeto) {
  var idEnMochila = guardarEnMochila(infoObjeto);
  mostrarEnMochila(partida.jugador.mochila[idEnMochila], idEnMochila);
}

// Función que muestra en la UI lo que hay en las manos y en la mochila
function cargarMochilaYManos() {
  cargarMochila();// Vacia visualmente la mochila y muestra lo que hay
  if (partida.jugador.manos.izq != null) {
    mostrarEnMano(partida.jugador.manos.izq, 'mano-izq');
  }
  else {
    $('#mano-izq').off();
    $('#mano-izq').unbind('mouseenter mouseleave');
    $('#mano-izq').removeClass('mano-hover');
    $('#mano-izq').css('background-image', 'none');
    $('#info-mano-izq').hide();
  }
  if (partida.jugador.manos.der != null) {
    mostrarEnMano(partida.jugador.manos.der, 'mano-der');
  }
  else {
    $('#mano-der').off();
    $('#mano-der').unbind('mouseenter mouseleave');
    $('#mano-der').removeClass('mano-hover');
    $('#mano-der').css('background-image', 'none');
    $('#info-mano-der').hide();
  }
}

// Función que comprueba si se puede utilizar el justificante medico
function comprobarJustificante(){
  if(partida.jugador.lucha.activa && ((partida.jugador.manos.izq != null && partida.jugador.manos.izq.id == 24) || (partida.jugador.manos.der != null && partida.jugador.manos.der.id == 24))){
    $('#huirButton').prop('hidden', false);
  }else{
    $('#huirButton').prop('hidden', true);
  }
}

// Función que quita el objeto que tiene la mano, tanto internamente como en la UI
function vaciarMano(idMano) {
  if (idMano == 'mano-izq') {
    $('#' + idMano).off();
    partida.jugador.manos.izq = null;
    comprobarJustificante();

    $('#' + idMano).unbind('mouseenter mouseleave');
    $('#' + idMano).removeClass('mano-hover');
    $('#' + idMano).css('background-image', 'none');
    $('#info-mano-izq').hide();
  }
  else if (idMano == 'mano-der') {
    $('#' + idMano).off();
    partida.jugador.manos.der = null;
    comprobarJustificante();

    $('#' + idMano).unbind('mouseenter mouseleave');
    $('#' + idMano).removeClass('mano-hover');
    $('#' + idMano).css('background-image', 'none');
    $('#info-mano-der').hide();
  }
}

// Función que reduce en una unidad la durabilidad de los objetos que tiene en las manos
function afectarDurabilidad() {
  if (partida.jugador.manos.izq != null) {
    // Hay algo. Afectamos a su durabilidad
    partida.jugador.manos.izq.atributos.durabilidad -= 1;
    messageToConsole('Se ha reducido en 1 la durabilidad del objeto que tienes en tu mano izquierda.');
    // Refrescamos la durabilidad visualmente
    $('#durabilidad-mano-izq').html(partida.jugador.manos.izq.atributos.durabilidad);
    if (partida.jugador.manos.izq.atributos.durabilidad <= 0) {
      vaciarMano('mano-izq');
      messageToConsole('Se ha agotado la durabilidad del objeto que tenías en tu mano izquierda, así que lo has perdido.');
      mostrarInformacion();
    }
  }
  if (partida.jugador.manos.der != null) {
    // Hay algo. Afectamos a su durabilidad
    partida.jugador.manos.der.atributos.durabilidad -= 1;
    messageToConsole('Se ha reducido en 1 la durabilidad del objeto que tienes en tu mano derecha.');
    // Refrescamos la durabilidad visualmente
    $('#durabilidad-mano-der').html(partida.jugador.manos.der.atributos.durabilidad);
    if (partida.jugador.manos.der.atributos.durabilidad <= 0) {
      vaciarMano('mano-der');
      messageToConsole('Se ha agotado la durabilidad del objeto que tenías en tu mano derecha, así que lo has perdido.');
      mostrarInformacion();
    }
  }
}
