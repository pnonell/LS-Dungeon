var token = '844dc4d3-d096-4a5b-b6bf-b6515691cce6';

// Función que realiza la llamada ajax para descargar la configuración de una partida nueva. Recibe una función (callback) para ejecutarla cuando la llamada ajax haya tenido éxito
function descargarPartidaNueva(callback) {
  $.ajax({
    dataType: 'json',
    method: 'get',
    encoding: 'UTF-8',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=nueva',
    success: function(json) {
      // Ahora que ya tenemos la información podemos inicializar la variable global de la partida
      partida = json;
      limpiaMapa();
      callback();
    },
    error: function(responseText) {
      swal({
        title: 'Error al cargar nueva partida',
        text: 'Es posible que aún no exista la configuración de partida nueva o que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      volverModalNuevaPartida();
    }
  });
}

// Función que realiza la llamada ajax para descargar la información sobre los slots. Recibe una función (callback) para ejecutarla cuando la llamada ajax haya tenido éxito
function descargarInfoSlots(callback) {
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token,
    success: function(json) {
      callback(json);
    },
    error: function(responseText) {
      swal({
        title: 'Error al cargar los slots',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      // Hacemos que el modal se pueda cerrar
      loadGameModalDisableClose = false;
      $('#loadGameModalClose').fadeTo('fast', 1);
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}

// Función que realiza la llamada ajax para descargar una partida existente. Recibe una función (callback) para ejecutarla cuando la llamada ajax haya tenido éxito
function descargarPartida(slot, callback) {
  $.ajax({
    dataType: 'json',
    method: 'get',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    success: function(json) {
      // Ahora que ya tenemos la información podemos guardarla en la variable global de la partida
      partida = json;

      callback();
    },
    error: function(responseText) {
      swal({
        title: 'Error al cargar la partida',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      // Hacemos que el modal se pueda cerrar
      loadGameModalDisableClose = false;
      $('#loadGameModalClose').fadeTo('fast', 1);
    }
  });
}

// Función que realiza la llamada ajax para guardar una partida. Recibe una función (callback) para ejecutarla cuando la llamada ajax haya tenido éxito
function guardarPartida(slot, callback) {
  $.ajax({
    dataType: 'text',
    method: 'post',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    data: {json: JSON.stringify(partida)},
    success: function(json) {
      callback();
      //refrescarSlotsGuardarPartida();
    },
    error: function(responseText) {
      swal({
        title: 'Error al guardar la partida',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      refrescarSlotsGuardarPartida();
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}

// Función que realiza la llamada ajax para vaciar un slot. Recibe una función (callback) para ejecutarla cuando la llamada ajax haya tenido éxito
function vaciarSlot(slot, callback) {
  $.ajax({
    dataType: 'text',
    method: 'delete',
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=' + token + '&slot=' + slot,
    success: function(json) {
      callback();
      //refrescarSlotsGuardarPartida();
    },
    error: function(responseText) {
      swal({
        title: 'Error al vaciar el slot',
        text: 'Es posible que no tengas conexión con el servidor. Por favor, vuelve a intentarlo.',
        type: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#6aade4',
      });
      refrescarSlotsGuardarPartida();
      // Hacemos que el modal se pueda cerrar
      saveGameModalDisableClose = false;
      $('#saveGameModalClose').fadeTo('fast', 1);
    }
  });
}
