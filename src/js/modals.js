var newGameModalDisableClose = false;
var loadGameModalDisableClose = false;
var saveGameModalDisableClose = false;


// Función que abre el modal #newGameForm con la configuración para iniciar una nueva partida
function modalNuevaPartida() {
  $('#name').prop('value', '');
  $('#avatarId').prop('value', 0);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#iniciarPartidaButton').prop('hidden', false);
  $('#newGameModal-info').prop('hidden', false);
  $('#cambiarInfoButton').prop('hidden', true);
  $('#newGameModalLabel').html('NUEVA PARTIDA');
  $('#newGameModal').modal('show');
  $('#newGameModal').on('hide.bs.modal', function(e) {
    if (newGameModalDisableClose) {
      e.preventDefault();
    }
   });
}

// Función que se llama si falla descargar la configuración de nueva partida
function volverModalNuevaPartida() {
  // Hacemos que el modal se pueda cerrar
  newGameModalDisableClose = false;
  $('#newGameModalClose').fadeTo('fast', 1);
  // Quitamos el aviso de que estamos descargando la configuración de partida nueva
  $('#newGameModal-info').slideDown();
  $('#newGameForm').slideDown();
  $('#iniciarPartidaButton').fadeTo('fast', 1);
  $('#newGameModal-info-downloading').slideUp();
}

// Función que se llama al iniciar partida en el modal
function iniciarPartida() {
  if ($('#name').val() != '' && $('#avatarId').val() != 0) {
    // Hacemos que el modal no se pueda cerrar
    newGameModalDisableClose = true;
    $('#newGameModalClose').fadeTo('fast', 0);
    // Avisamos al usuario de que estamos descargando la configuración de partida nueva
    $('#newGameModal-info').slideUp();
    $('#newGameForm').slideUp();
    $('#iniciarPartidaButton').fadeTo('fast', 0);
    $('#newGameModal-info-downloading').slideDown();
    // Realizamos la petición para descargar la configuración de partida nueva
    descargarPartidaNueva(function() {
      partida.jugador.nombre = $('#name').val();
      partida.jugador.avatar = $('#avatarId').val();
      if($('#avatarId').val() == 1 || $('#avatarId').val() == 3){
        partida.jugador.sexo = 'mujer';
      }else{
        partida.jugador.sexo = 'hombre';
      }
      colocarEnInicioMapa();
      refrescarInfoJugador();
      mostrarMenusPartida();
      // Hacemos que el modal se pueda cerrar
      newGameModalDisableClose = false;
      $('#newGameModalClose').fadeTo('fast', 1);
      // Cerramos el modal
      $('#newGameModal').modal('hide');
      messageToConsole('¡Bienvenid@, ' + partida.jugador.nombre + '! ¿List@ para enfrentarte a los peligros de LaSalle?');
      //habilitamos los controles y mostramos la pantalla
      disableControls = false;
      comprovarPosicion();
      mostrarInformacion();
      actualizarMapa();
      cargarMochilaYManos();
    });
  }
}

// Función que cierra el modal de cargar partida
function closeLoadGameModal() {
  // Hacemos que el modal se pueda cerrar
  loadGameModalDisableClose = false;
  $('#loadGameModalClose').fadeTo('fast', 1);
  // Cerramos el modal
  $('#loadGameModal').modal('hide');
}

// Función que muestra el modal de cargar partida
function modalCargarPartida() {
  // En primer lugar "desatamos" (unbind) los eventos de click de los botones
  $('#slot1-load').off();
  $('#slot2-load').off();
  // Mostramos el modal
  $('#loadGameModal').modal('show');
  $('#loadGameModal').on('hide.bs.modal', function(e) {
    if (loadGameModalDisableClose) {
      e.preventDefault();
    }
   });
   descargarInfoSlots(function(json) {
     // Slot 1
     if ($.inArray('1', json) > -1) {
       // Slot 1 tiene una partida guardada
       $('#slot1-load').removeClass('disabled');
       $('#slot1-load').removeClass('btn-secondary');
       $('#slot1-load').addClass('btn-salle');
       $('#slot1-load').text('Slot 1: partida guardada (click para cargar)');
       $('#slot1-load').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         loadGameModalDisableClose = true;
         $('#loadGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos descargando la partida
         $(this).text('Descargando partida de slot 1...');
         descargarPartida('1', function() {
           // Partida descargada
           //actualizamos la Consola
           $('#first-console-text').html(partida.consola.first);
           $('#console-text').html(partida.consola.text);

          messageToConsole('Partida descargada correctamente, puedes seguir jugando!');

           // Refrescamos la info de la UI
           refrescarInfoJugador();
           mostrarMenusPartida();
           cargarMochila();
           if (partida.jugador.manos.izq != null) {
             mostrarEnMano(partida.jugador.manos.izq, 'mano-izq');
           }
           if (partida.jugador.manos.der != null) {
             mostrarEnMano(partida.jugador.manos.der, 'mano-der');
           }
           // Cerramos el modal
           closeLoadGameModal();
           //habilitamos los controles y mostramos la pantalla
           disableControls = false;
           comprovarPosicion();
           mostrarInformacion();
           actualizarMapa();
           cargarMochilaYManos();

         });
       });
     }
     else {
       // Slot 1 está vacío
       $('#slot1-load').text('Slot 1: vacío');
     }

     // Slot 2
     if ($.inArray('2', json) > -1) {
       // Slot 2 tiene una partida guardada
       $('#slot2-load').removeClass('disabled');
       $('#slot2-load').removeClass('btn-secondary');
       $('#slot2-load').addClass('btn-salle');
       $('#slot2-load').text('Slot 2: partida guardada (click para cargar)');
       $('#slot2-load').click(function() {
         // En primer lugar "desatamos" (unbind) el evento de click de este botón
         $(this).off();
         // Hacemos que el modal no se pueda cerrar
         loadGameModalDisableClose = true;
         $('#loadGameModalClose').fadeTo('fast', 0);
         // Avisamos de que estamos descargando la partida
         $(this).text('Descargando partida de slot 2...');
         descargarPartida('2', function() {
           // Partida descargada
           //actualizamos la Consola
           $('#first-console-text').html(partida.consola.first);
           $('#console-text').html(partida.consola.text);
           messageToConsole('Partida descargada correctamente, puedes seguir jugando!');

           // Refrescamos la info de la UI
           refrescarInfoJugador();
           mostrarMenusPartida();
           cargarMochila();
           if (partida.jugador.manos.izq != null) {
             mostrarEnMano(partida.jugador.manos.izq, 'mano-izq');
           }
           if (partida.jugador.manos.der != null) {
             mostrarEnMano(partida.jugador.manos.der, 'mano-der');
           }
           // Cerramos el modal
           closeLoadGameModal();
           //habilitamos los controles y mostramos la pantalla
           disableControls = false;
           comprovarPosicion();
           mostrarInformacion();
           actualizarMapa();
           cargarMochilaYManos();
         });
       });
     }
     else {
       // Slot 2 está vacío
       $('#slot2-load').text('Slot 2: vacío');
     }
   });
}

// Función que abre el modal #newGameModal con la configuración para cambiar la info
function modalCambiarInfo() {
  $('#name').prop('value', partida.jugador.nombre);
  $('#avatarId').prop('value', partida.jugador.avatar);
  $('.avatar_selected').removeClass('avatar_selected');
  $('#avatar_' + partida.jugador.avatar).addClass('avatar_selected');
  $('#newGameModal-info').show();
  $('#newGameForm').show();
  $('#iniciarPartidaButton').css('opacity', 1);
  $('#newGameModal-info-downloading').hide();
  $('#iniciarPartidaButton').prop('hidden', true);
  $('#cambiarInfoButton').prop('hidden', false);
  $('#newGameModal-info').prop('hidden', true);
  $('#newGameModalLabel').html('EDITAR INFORMACIÓN PARTIDA');
  $('#newGameModal').modal('show');
}

// Función que se llama al guardar cambios del jugador en el modal
function cambiarInfoJugador() {
  if($('#name').val() != '' && $('#avatarId').val() != 0){
    partida.jugador.nombre = $('#name').val();
    partida.jugador.avatar = $('#avatarId').val();
    if($('#avatarId').val() == 1 || $('#avatarId').val() == 3){
      partida.jugador.sexo = 'mujer';
    }else{
      partida.jugador.sexo = 'hombre';
    }
    refrescarInfoJugador();
    $('#newGameModal').modal('hide');
    messageToConsole('Tus cambios se han guardado correctamente ' + partida.jugador.nombre);
  }
}

// Función que asocia el evento de hacer click en el botón que se le pasa con la acción de vaciar el slot correspondiente
function bindEmptySlotActionTo(button, slotNumber) {
  // En primer lugar "desatamos" (unbind) cualquier acción asociada al evento de click de este botón
  button.off();

  button.click(function() {
    swal({
      title: '¿Estás seguro?',
      text: 'Si vacias el slot ' + slotNumber + ' no podrás recuperar la partida guardada en él.',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#6aade4',
      confirmButtonText: 'Vaciar slot',
      cancelButtonText: 'Cancelar'
    }).then(function() {
      // El usuario ha confirmado que quiere vaciar el slot
      // Procedemos a vaciar el slot
      // En primer lugar "desatamos" (unbind) cualquier acción asociada al evento de click de este botón
      $(this).off();
      // Hacemos que el modal no se pueda cerrar
      saveGameModalDisableClose = true;
      $('#saveGameModalClose').fadeTo('fast', 0);
      // Avisamos de que estamos vaciando el slot
      $(this).text('Vaciando el slot ' + slotNumber + '...');
      vaciarSlot(slotNumber, function() {
        // Slot vaciado
        // Hacemos que el modal se pueda cerrar
        saveGameModalDisableClose = false;
        $('#saveGameModalClose').fadeTo('fast', 1);
        // Avisamos de que el slot se ha vaciado correctamente
        button.removeClass('btn-danger');
        button.addClass('btn-success');
        button.text('Slot ' + slotNumber + ': libre (click para guardar partida)');
        swal({
          title: 'Slot ' + slotNumber + ' vaciado correctamente',
          text: 'Ahora puedes usar el slot para guardar la partida.',
          type: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonColor: '#6aade4',
          confirmButtonText: 'OK',
        });
        bindFillSlotActionTo(button, slotNumber);
      });
    });
  });
}

// Función que asocia el evento de hacer click en el botón que se le pasa con la acción de guardar la partida en el slot correspondiente
function bindFillSlotActionTo(button, slotNumber) {
  // En primer lugar "desatamos" (unbind) cualquier acción asociada al evento de click de este botón
  button.off();

  button.click(function() {
    // En primer lugar "desatamos" (unbind) cualquier acción asociada al evento de click de este botón
    $(this).off();
    // Hacemos que el modal no se pueda cerrar
    saveGameModalDisableClose = true;
    $('#saveGameModalClose').fadeTo('fast', 0);
    // Avisamos de que estamos guardando la partida en el slot
    $(this).text('Guardando la partida en el slot ' + slotNumber + '...');
    guardarPartida(slotNumber, function() {
      // Partida guardada en el slot
      // Cerramos el modal
      closeSaveGameModal();
      // Avisamos de que la partida se ha guardado en el slot correctamente
      button.removeClass('btn-success');
      button.addClass('btn-danger');
      button.text('Slot ' + slotNumber + ': ocupado (click para vaciar)');
      messageToConsole('La partida se ha guardado correctamente en el slot ' + slotNumber);
      swal({
        title: 'Partida guardada correctamente',
        text: 'La partida se ha guardado en el slot ' + slotNumber + '.',
        type: 'success',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonColor: '#6aade4',
        confirmButtonText: 'OK',
      });
      bindEmptySlotActionTo(button, slotNumber);
    });
  });
}

// Función que cierra el modal de guardar partida
function closeSaveGameModal() {
  // Hacemos que el modal se pueda cerrar
  saveGameModalDisableClose = false;
  $('#saveGameModalClose').fadeTo('fast', 1);
  // Cerramos el modal
  $('#saveGameModal').modal('hide');
}

// Función que refresca la información de los slots en el menú de guardar partida
function refrescarSlotsGuardarPartida() {
  descargarInfoSlots(function(json) {
    // En primer lugar "desatamos" (unbind) los eventos de click de los botones
    $('#slot1-load').off();
    $('#slot2-load').off();

    // Slot 1
    if ($.inArray('1', json) > -1) {
      // Slot 1 está ocupado
      $('#slot1-save').removeClass('disabled');
      $('#slot1-save').removeClass('btn-secondary');
      $('#slot1-save').addClass('btn-danger');
      $('#slot1-save').text('Slot 1: ocupado (click para vaciar)');
      bindEmptySlotActionTo($('#slot1-save'), 1);
    }
    else {
      // Slot 1 está libre
      $('#slot1-save').removeClass('disabled');
      $('#slot1-save').removeClass('btn-secondary');
      $('#slot1-save').addClass('btn-success');
      $('#slot1-save').text('Slot 1: libre (click para guardar partida)');
      bindFillSlotActionTo($('#slot1-save'), 1);
    }

    // Slot 2
    if ($.inArray('2', json) > -1) {
      // Slot 2 está ocupado
      $('#slot2-save').removeClass('disabled');
      $('#slot2-save').removeClass('btn-secondary');
      $('#slot2-save').addClass('btn-danger');
      $('#slot2-save').text('Slot 2: ocupado (click para vaciar)');
      bindEmptySlotActionTo($('#slot2-save'), 2);
    }
    else {
      // Slot 2 está libre
      $('#slot2-save').removeClass('disabled');
      $('#slot2-save').removeClass('btn-secondary');
      $('#slot2-save').addClass('btn-success');
      $('#slot2-save').text('Slot 2: libre (click para guardar partida)');
      bindFillSlotActionTo($('#slot2-save'), 2);
    }
  });
}

// Función que muestra el modal de guardar partida
function modalGuardarPartida() {
  // En primer lugar "desatamos" (unbind) los eventos de click de los botones
  $('#slot1-save').off();
  $('#slot2-save').off();
  // Mostramos el modal
  $('#saveGameModal').modal('show');
  $('#saveGameModal').on('hide.bs.modal', function(e) {
    if (saveGameModalDisableClose) {
      e.preventDefault();
    }
   });
   refrescarSlotsGuardarPartida();
}

// Función para salir sin guardar de la partida. Ésta pregunta al usuario si realmente quiere salir sin guardar
function salirSinGuardar() {
  swal({
    title: '¿Estás seguro?',
    text: 'Si sales perderás tus cambios no guardados.',
    type: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#6aade4',
    confirmButtonText: 'Salir',
    cancelButtonText: 'Cancelar'
  }).then(function() {
    // Salir sin guardar
    location.reload();
  });
}

// Función que resetea la configuración de los modals para un nuevo uso de ellos
function reiniciarModals(){
  var newGameModalDisableClose = false;

  $('#newGameModalClose').css('display', 'block');
  $('#newGameModal-info').css('display', 'block');
  $('#newGameForm').css('display', 'block');
  $('#iniciarPartidaButton').fadeTo('fast', 1);
  $('#newGameModal-info-downloading').css('display', 'none');
  $('#menu-nuevaPartida').prop('hidden', false);
  $('#menu-cargarPartida').prop('hidden', false);
  $('#menu-jugador').prop('hidden', true);
  $('#menu-guardarPartida').prop('hidden', true);
  $('#menu-salir').prop('hidden', true);
}
