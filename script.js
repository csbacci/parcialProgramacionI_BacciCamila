let discos = [];

function validarString(mensaje) {
  let str;
  do {
    str = prompt(mensaje);
    if (str === "") {
      alert(
        "Por favor, ingresa un valor válido. No puedes dejar este campo vacío."
      );
    }
    // Verificar si es un número
    if (!isNaN(str) && str !== "") {
      alert(
        "Por favor, ingresa un valor válido. No puedes ingresar un número."
      );
    }
    // Repetir el bucle si es un número o si se ha dejado el campo vacío
  } while (!isNaN(str) || str === null);

  // Devolver el dato validado
  return str;
}

function validarSegundos(mensaje) {
  let n;
  do {
    let input = prompt("Ingrese la duracion de la pista expresada en segundos");
    if (input === "") {
      alert(
        "Por favor, ingresa un valor válido. No puedes dejar este campo vacío."
      );
    }
    n = parseInt(input);
    if (isNaN(n)) {
      alert("Por favor, ingresa un valor numerico");
    } else if (n < 0 || n > 7200) {
      alert("Por favor, ingresa un número entre 0 y 7200.");
    }
    // Repetir el bucle si no es un número o si está fuera del rango
  } while (isNaN(n) || n < 0 || n > 7200);
  return n;
}

let cantidadDiscosCargados = 0;

function cargarDisco() {
  let nombre = validarString("Ingrese el nombre del disco");
  let autor = validarString("Ingrese el autor");
  let codigo = validarCodigo("Ingrese el codigo del album");

  let pistas = [];

  do {
    let cancion = validarPista();
    let tiempo = validarSegundos(
      "Ingrese la duracion de la pista expresada en segundos"
    );
    let pista = {
      cancion: cancion,
      tiempo: tiempo,
    };
    pistas.push(pista);
  } while (confirm("Quiere cargar otra pista del album?"));

  let disco = {
    nombre: nombre,
    autor: autor,
    codigo: codigo,
    pistas: pistas,
  };

  discos.push(disco);

  cantidadDiscosCargados++;

  // Mostrar mensaje de confirmación
  alert(
    `Se ha cargado exitosamente el disco. Total de discos cargados: ${cantidadDiscosCargados}`
  );
}

function mostrarTotalDiscosCargados() {
  alert(`Número total de discos cargados: ${cantidadDiscosCargados}`);
}

function validarPista() {
  let nombrePista;
  do {
    nombrePista = prompt("Ingrese el nombre de una pista del álbum");
    // Comprobar si el nombre de la pista está vacío después de eliminar espacios
    if (nombrePista === "") {
      alert(
        "Por favor, ingresa un valor válido. No puedes dejar este campo vacío."
      );
    }
  } while (nombrePista === ""); // Repetir el bucle si el nombre de la pista está vacío
  return nombrePista;
}

function validarCodigo() {
  // si se ingresa un numero y no se repite se guarda sino volver a pedir

  let numero;

  do {
    let input = prompt("Ingrese un código numérico válido entre 1 y 999");
    if (input === "") {
      alert(
        "Por favor, ingresa un valor válido. No puedes dejar este campo vacío."
      );
    }

    numero = parseInt(input);

    if (isNaN(numero) || numero < 1 || numero > 999) {
      alert("Por favor, ingrese un valor numérico válido entre 1 y 999.");
    } else {
      // Comprueba si el código ya existe (asumiendo que buscarCodigo() hace esto)
      if (buscarCodigo(numero)) {
        alert("Este código ya está en uso. Por favor, ingrese otro.");
        numero = NaN; // Reinicia numero para repetir el bucle
      }
    }
  } while (isNaN(numero) || numero < 1 || numero > 999);

  // Devuelve el número validado
  return numero;
}

function buscarCodigo(codigoIngresado) {
  let encontrado = false;

  for (let d of discos) {
    if (d.codigo == codigoIngresado) encontrado = true;
  }

  return encontrado;
}

function mostrar() {
  // Buscar el contenedor para las tarjetas de discos en el documento HTML
  const infoDiscos = document.getElementById("info-discos");

  const imagenDisco = "img/12in-Vinyl-LP-Record-Angle.jpg";

  // Variable para almacenar el HTML generado dinámicamente
  let html = "";
  html += `
  <div class="container justify-content-center">
  <div class="row"> `;

  for (let d of discos) {

    const cantidadPistas = d.pistas.length;
    let totalSegundos = 0;
    let pistaMasLarga = null;

    // Agregar la estructura HTML para cada disco
    html += `
        <div class="col-md-4 mb-4">
          <div class="text-center fondo">
          <img class="imagen" src="${imagenDisco}" alt="Imagen del disco" class="disco-img">
            <div class="card-body">
              <h5 class="card-title tipos clases">Nombre del disco:</h5>
              <p class="card-text">${d.nombre}</p>
              <h5 class="card-title clases">Autor:</h5>
              <p class="card-text">${d.autor}</p>
              <h5 class="card-title tipos clases">Código del disco:</h5>
              <p class="card-text ">${d.codigo}</p>
              <h5 class="card-title tipos clases">Cantidad de pistas que tiene el disco:</h5>
              <p class="card-text">${cantidadPistas}</p>`;

    // Recorrer las pistas de cada disco
    for (let p of d.pistas) {
      // Agregar información de cada pista
      html += `
              <h5 class="card-title tipos clases">Canción:</h5>
              <p class="card-text">${p.cancion}</p>
              <h5 class="card-title tipos clases">Duración de la canción:</h5>`;

      totalSegundos += p.tiempo;

      // Verificar la duración de la canción y aplicar estilo condicional
      if (p.tiempo > 180) {
        const minutos = Math.floor(p.tiempo / 60);
        const segundos = p.tiempo % 60;
        if (segundos === 0) {
            html += `<p class="card-text color">${minutos} minutos</p>`;
        } else {
            html += `<p class="card-text color">${minutos} minutos y ${segundos} segundos</p>`;
        }
    } else {
        html += `<p class="card-text">${p.tiempo} segundos</p>`;
    }

      // Actualizar la pista más larga
      if (!pistaMasLarga || p.tiempo > pistaMasLarga.tiempo) {
        pistaMasLarga = p;
      }
    }

    // Mostrar la pista más larga con el mismo formato que las demás pistas
    if (pistaMasLarga) {
      html += `
      <h5 class="card-title tipos clases">Nombre de la pista más larga:</h5>
      <p class="card-text">${pistaMasLarga.cancion}</p>
      <h5 class="card-title tipos clases">Duración de la pista más larga:</h5>
      <p class="card-text">${pistaMasLarga.tiempo} segundos</p>`;
    }

    // Cerrar las etiquetas correspondientes para cada disco
    html += `
          </div>
        </div>
      </div>`;
  }
  html += `
  </div>
</div> `;

  // Asignar el HTML generado al contenedor en el documento
  infoDiscos.innerHTML = html;
}

function resetear() {
  discos = [];
  const infoDiscos = document.getElementById("info-discos");
  infoDiscos.innerHTML = "";
}

function codigoNumerico(numeroIngresado) {
  // Buscar el elemento HTML donde se mostrará la información del disco encontrado
  const infocodigo = document.getElementById("info-codigo");
  let html = "";

  // Pedir al usuario que ingrese un código para buscar
  let buscar = parseInt(prompt("Ingrese un código para buscar"));

  // Verificar si el usuario ingresó un número válido
  if (!isNaN(buscar)) {
    // Variable para indicar si se encontró el disco con el código buscado
    let encontrado = false;

    // Recorrer el array de discos para buscar el disco con el código ingresado
    for (let d of discos) {
      if (d.codigo === buscar) {
        encontrado = true;

        // Construir la estructura HTML para mostrar la información del disco encontrado
        html += `
          <div class="container justify-content-center">
            <div class="row">
              <div class="text-center fondo">
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Disco encontrado</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-md-12 mb-12">
                  <h5 class="card-title tipos clases">Nombre del disco:</h5>
                  <p class="card-text">${d.nombre}</p>
                  <h5 class="card-title tipos clases">Autor:</h5>
                  <p class="card-text">${d.autor}</p>
                  <h5 class="card-title tipos clases">Código del disco:</h5>
                  <p class="card-text">${d.codigo}</p>`;

        // Recorrer las pistas del disco encontrado
        for (let p of d.pistas) {
          html += `
                  <h5 class="card-title tipos clases">Canción:</h5>
                  <p class="card-text">${p.cancion}</p>
                  <h5 class="card-title tipos clases">Duración de la canción:</h5>`;

          // Aplicar estilo condicional a la duración de la canción
          if (p.tiempo > 180) {
            const minutos = Math.floor(p.tiempo / 60);
            const segundos = p.tiempo % 60;
            if (segundos === 0) {
                html += `<p class="card-text color">${minutos} minutos</p>`;
            } else {
                html += `<p class="card-text color">${minutos} minutos y ${segundos} segundos</p>`;
            }
        } else {
            html += `<p class="card-text">${p.tiempo} segundos</p>`;
        } }

        // Cerrar las etiquetas correspondientes para el disco encontrado
        html += `
                  </div>
                </div>
              </div>
            </div>
          </div>`;

        // Detener la búsqueda después de encontrar el primer disco con el código buscado
        break;
      }
    }

    // Verificar si se encontró algún disco con el código buscado
    if (!encontrado) {
      html = `<p class="card-text clases"> No se encontró ningún disco con el código ${buscar}.</p>`;
    }
  } else {
    // Mostrar un mensaje de error si el usuario no ingresó un número válido
    html = `<p class="card-text clases>Debe ingresar un número válido como código.</p>`;
  }

  // Actualizar el contenido del elemento HTML con el resultado de la búsqueda
  infocodigo.innerHTML = html;

  // Devolver el código buscado (puede ser útil para más procesamiento)
  return buscar;
}