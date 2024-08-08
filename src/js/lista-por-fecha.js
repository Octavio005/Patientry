const fs = require('fs');

const botonPersona = document.getElementsByClassName('button-like-link');

fs.readFile('lista-fecha-temp.json', 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    return;
    }

    const personas = JSON.parse(data); // Convierte el contenido del archivo JSON en un objeto JavaScript

    const listaPersonas = document.getElementById('datosContainer');
    const botonMenu = document.getElementById('botonMenu');
    
    personas.forEach((persona) => {
        const item = document.createElement("a");
        item.className = 'button-like-link';
        item.href = 'ver-informacion.html';
        const nombre = document.createTextNode(`${persona.nombre} ${persona.apellido}`);    
        item.appendChild(nombre);
        listaPersonas.insertBefore(item, botonMenu);

    });

    for(let i=0; i<personas.length; i++){
        botonPersona[i].addEventListener('click', (event) => {
            const target = event.target;
        // Comprueba si el elemento clickeado es un botón con la clase 'button-like-link'
        if (target.classList.contains('button-like-link')) {
            // Realiza acciones específicas para el botón clickeado
            const nombrePersona = botonPersona[i].textContent;
            const fechaPersona = localStorage.getItem('Fecha');

            personas.forEach((persona) =>{
                let nombreCompleto =  `${persona.nombre} ${persona.apellido}`;
                if(nombrePersona == nombreCompleto && fechaPersona == persona.fechaInscripcion){
                    const personaJSON = JSON.stringify([persona]);
                    fs.writeFile('persona-temp.json', personaJSON, (err) => {
                        if (err) {
                          console.error(err);
                          return;
                        }
                        console.log('Dato almacenado para su uso');
                    });
                }
            });
            
        }
        });
    }
});