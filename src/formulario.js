const fs = require('fs');

// Seleccionar el botón por su ID
const guardarButton = document.getElementById('crearPersona');
let infoError = document.getElementById('infoError');
// Definir la ruta del archivo donde se guardará
const filePath = 'personas.json';

// Agregar un controlador de eventos al botón
guardarButton.addEventListener('click', () => {
  // Obtener los valores del formulario y crear el objeto persona
  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const edad = document.querySelector('#edad').value;
  const domicilio = document.querySelector('#domicilio').value;
  const telefono = document.querySelector('#telefono').value;
  const dni = document.querySelector('#dni').value;
  const obraSocial = document.querySelector('#obraSocial').value;
  const numAfiliado = document.querySelector('#numAfiliado').value;
  const notas = document.querySelector('#notas').value;

  let nombreError = '';

  //Creo una lista para validar si algún elemento está vacío con un forEach
  //Notas no está incluido ya que no hay problema si está vacío
  const datos = [nombre, apellido, edad, domicilio, telefono, dni, obraSocial, numAfiliado];
  let hayElementoVacio = false;
  datos.forEach(dato => {
    if(dato == ''){
      hayElementoVacio = true;
      return;
    }
  })

  const data = fs.readFileSync(filePath, 'utf8');
  const personas = JSON.parse(data);

  const duplicadoEncontrado = personas.some((persona) => persona.dni.trim() === dni.trim());

  if (duplicadoEncontrado) {
    infoError.style.color = 'red';
    llamarError('¡Ya existe una persona con ese número de DNI!');
    return;
  }

  if(hayElementoVacio){
    nombreError = 'Alguno de los datos está vacío';
    llamarError(nombreError);
    return;
  } if(!validar(nombre, /^[A-Za-z\s]+$/) || !validar(apellido, /^[A-Za-z\s]+$/)){
    nombreError = 'El nombre y/o el apellido no está compuesto únicamente letras y espacios';
    llamarError(nombreError);
    return;
  } if(!validar(edad, /^(12[0-0]|1[01][0-9]|[1-9]?[0-9])$/)){
    nombreError =  'La edad debe ser un número entre 0 y 120';
    llamarError(nombreError);
    return;
  } if(!validar(telefono, /^-?\d+(\.\d+)?$/)){
    nombreError = 'El número de teléfono debe consistir únicamente de números';
    llamarError(nombreError);
    return
  } if(!validar(dni, /^\d{7,8}$/)){
    nombreError = 'El DNI debe consistir de un número de 7 u 8 dígitos';
    llamarError(nombreError);
    return
  }
  //Validaciones números de afiliado por obra social 
  if(obraSocial.toLowerCase() == 'osde'){
    if(!validar(numAfiliado, /^\d{11}$/)){
      nombreError = 'El número de afiliado de OSDE debe tener 11 dígitos';
      llamarError(nombreError);
    return
    }
  } else if(obraSocial.toLowerCase() == 'ioma'){
    if(!validar(numAfiliado, /^\d{12}$/)){
      nombreError = 'El número de afiliado de IOMA debe tener 12 dígitos';
      llamarError(nombreError);
    return
    }
  }
  
  const persona = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    domicilio: domicilio,
    telefono: telefono,
    dni: dni,
    obraSocial: obraSocial,
    numAfiliado: numAfiliado,
    notas: notas,
    fechaInscripcion: obtenerFecha()
  };


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const personas = JSON.parse(data);

    //data.push(personasMap);
    personas.push(persona);

    // Convertir el objeto persona a JSON
    const personaJSON = JSON.stringify(personas);

    // Guardar el objeto en el archivo JSON
    fs.writeFile(filePath, personaJSON, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Los datos se han guardado en el archivo JSON.');
      confirmarCreacion(persona);
    });
  });
});


let validar = (nombre, patron) => {
  //Validación de nombre
  if(!patron.test(nombre)){
  return false;
  }
  return true;
}

let obtenerFecha = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // Añadir un cero delante del mes si es menor a 10
  if (month < 10) {
    month = `0${month}`;
  }
  let currentDate = `${day}/${month}/${year}`;
  return currentDate;
}

let llamarError = (nombreError) => {  
  infoError.textContent = nombreError;
  infoError.style.opacity = 100;
}

let confirmarCreacion = (persona) => {
  infoError.textContent = `¡La persona ${persona.nombre} ${persona.apellido} ha sido creada!`;
  infoError.style.opacity = 100;
  infoError.style.color = 'Green';
}