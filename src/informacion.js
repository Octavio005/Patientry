const fs = require('fs');

const botonVerInfo = document.getElementById('botonVerInfo');
const datoPersona = document.getElementById('datoPersona');
let infoError = document.getElementById('infoError');

botonVerInfo.addEventListener('click', () => {
    
    const filePath = 'personas.json'
    let validado = false;
    let personaAGuardar = []

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }    
        const personas = JSON.parse(data);
        
        personas.forEach((persona) => {
            if(
            `${persona.nombre} ${persona.apellido}` == datoPersona.value ||
            `${persona.dni}` == datoPersona.value ||
            `${persona.numAfiliado}` == datoPersona.value
            ){
                validado = true;
                personaAGuardar = persona;
            }
        });

        if(validado){
            const personaJSON = JSON.stringify([personaAGuardar]);
            window.location.href = 'ver-informacion.html';
            fs.writeFile('persona-temp.json', personaJSON, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Dato almacenado para uso');          
            });
        } else {
            infoError.style.opacity = 100;
        }
    });
});