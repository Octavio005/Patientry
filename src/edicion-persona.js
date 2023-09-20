const fs = require('fs');

const personaString = localStorage.getItem('personaEditar');
let personaEditada = JSON.parse(personaString);

const botonGuardar = document.getElementById('guardarPersona');
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
});