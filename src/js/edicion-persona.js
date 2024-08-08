const fs = require('fs');

const personaString = localStorage.getItem('personaEditar');
let personaEditada = JSON.parse(personaString);

const botonGuardar = document.getElementById('guardarPersona');
const info = document.getElementById('info');
info.style.opacity = 0;
document.getElementById('nombre').value = personaEditada.nombre;
document.getElementById('apellido').value = personaEditada.apellido;
document.getElementById('edad').value = personaEditada.edad;
document.getElementById('domicilio').value = personaEditada.domicilio;
document.getElementById('telefono').value = personaEditada.telefono;
document.getElementById('dni').value = personaEditada.dni;
document.getElementById('obraSocial').value = personaEditada.obraSocial;
document.getElementById('numAfiliado').value = personaEditada.numAfiliado;
document.getElementById('notas').value = personaEditada.notas;


botonGuardar.addEventListener('click', () => {

    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    edad = document.getElementById('edad').value;
    domicilio = document.getElementById('domicilio').value;
    telefono = document.getElementById('telefono').value;
    dni = document.getElementById('dni').value;
    obraSocial = document.getElementById('obraSocial').value;
    numAfiliado = document.getElementById('numAfiliado').value;
    notas = document.getElementById('notas').value;

    //Creación de lista para validar que no hayan elementos vacíos
    const datos = [nombre, apellido, edad, domicilio, telefono, dni, obraSocial, numAfiliado];
    let hayElementoVacio = false;
    datos.forEach(dato => {
      if(dato == ''){
        hayElementoVacio = true;
        return;
      }
    })

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
        return;
    } if(!validar(dni, /^\d{7,8}$/)){
        nombreError = 'El DNI debe consistir de un número de 7 u 8 dígitos';
        llamarError(nombreError);
        return;
    }
    //Validaciones números de afiliado por obra social 
    if(obraSocial.toLowerCase() == 'osde'){
        if(!validar(numAfiliado, /^\d{11}$/)){
            nombreError = 'El número de afiliado de OSDE debe tener 11 dígitos';
            llamarError(nombreError);
            return;
        }
    } else if(obraSocial.toLowerCase() == 'ioma'){
        if(!validar(numAfiliado, /^\d{12}$/)){
            nombreError = 'El número de afiliado de IOMA debe tener 12 dígitos';
            llamarError(nombreError);
            return;
        }
    }

    personaEditada.nombre = document.getElementById('nombre').value;
    personaEditada.apellido = document.getElementById('apellido').value;
    personaEditada.edad = document.getElementById('edad').value;
    personaEditada.domicilio = document.getElementById('domicilio').value;
    personaEditada.telefono = document.getElementById('telefono').value;
    personaEditada.dni = document.getElementById('dni').value;
    personaEditada.obraSocial = document.getElementById('obraSocial').value;
    personaEditada.numAfiliado = document.getElementById('numAfiliado').value;
    personaEditada.notas = document.getElementById('notas').value;

    let personasFiltradas = [];

    fs.readFile('personas.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const personas = JSON.parse(data);
        
        //Se elimina al objeto persona anterior y se reemplaza por el nuevo
        personas.forEach((persona) => {
            if(persona.dni == personaEditada.dni){
                personasFiltradas = personas.filter(persona => persona.dni !== personaEditada.dni);
            }
        });
        
        personasFiltradas.push(personaEditada);

        // Convertir el objeto persona a JSON
        const personaJSON = JSON.stringify(personasFiltradas);

        // Guardar el objeto en el archivo JSON
        fs.writeFile('personas.json', personaJSON, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Persona editada guardada.');
        });
    });

    confirmarCreacion(personaEditada);
});

let validar = (nombre, patron) => {
    console.log(nombre)
    //Validación de datos
    if(!patron.test(nombre)){
    return false;
    }
    return true;
  }

let llamarError = (nombreError) => {  
    info.textContent = nombreError;
    info.style.opacity = 100;
  }

let confirmarCreacion = (persona) => {
    info.textContent = `¡Los datos de ${persona.nombre} ${persona.apellido} han sido editados correctamente!`;
    info.style.opacity = 100;
    info.style.color = 'Green';
  }