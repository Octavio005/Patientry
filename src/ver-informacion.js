const fs = require('fs');

const botonEditar = document.getElementById('botonEditar');
let personas = ''

fs.readFile('persona-temp.json', 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return;
    }

    personas = JSON.parse(data); // Convierte el contenido del archivo JSON en un objeto JavaScript
    // Luego, puedes procesar los datos y mostrarlos en tu aplicación Electron.

    let tituloInfo = document.getElementById('tituloInfo');
    tituloInfo.textContent = `Información de ${personas[0].nombre} ${personas[0].apellido}`;
    const listaPersonas = document.getElementById('datosContainer');
    const botonEditar = document.getElementById('botonEditar');
    
    const item = document.createElement("h3");
    item.class = 'ElementoInfo';
    const nombre = document.createTextNode(`Nombre: ${personas[0].nombre}`);
    const apellido = document.createTextNode(`Apellido: ${personas[0].apellido}`);
    const edad = document.createTextNode(`Edad: ${personas[0].edad} años`);
    const domicilio = document.createTextNode(`Domicilio: ${personas[0].domicilio}`);
    const telefono = document.createTextNode(`Teléfono: ${personas[0].telefono}`);
    const dni = document.createTextNode(`DNI: ${personas[0].dni}`);
    const obraSocial = document.createTextNode(`Obra social: ${personas[0].obraSocial}`);
    const numAfiliado = document.createTextNode(`Número de afiliado: ${personas[0].numAfiliado}`);
    const fecha = document.createTextNode(`Fecha de inscripción: ${personas[0].fechaInscripcion}`);
    const notas = document.createTextNode(`Notas: ${personas[0].notas}`);

    
    item.appendChild(nombre);    
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));
    item.appendChild(apellido);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));
    item.appendChild(edad);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));
    item.appendChild(domicilio);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(telefono);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(dni);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(obraSocial);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(numAfiliado);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(fecha);
    item.appendChild(document.createElement('br'));
    item.appendChild(document.createElement('br'));  
    item.appendChild(notas);
    listaPersonas.insertBefore(item, botonEditar);
});


botonEditar.addEventListener('click', () => {
    const personaGuardar = JSON.stringify(personas[0])
    localStorage.setItem('personaEditar', personaGuardar);
    window.location.href = 'edicion-persona.html';
});
