const fs = require('fs');

const fecha = document.getElementById('fecha');
const botonVerPersonasFecha = document.getElementById('botonVerPersonasFecha');
const filePath = 'personas.json'
let infoError = document.getElementById('infoError');


botonVerPersonasFecha.addEventListener('click', () => {

    const patron = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if(patron.test(fecha.value)){
        let listaGuardar = []
    
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }    
            const personas = JSON.parse(data);
            
            personas.forEach((persona) => {
                console.log(`${persona.fechaInscripcion}` == fecha.value)
                console.log(`${persona.fechaInscripcion}`)
                console.log(fecha.value)
                if(`${persona.fechaInscripcion}` == fecha.value){
                    listaGuardar.push(persona);
                }
            });
    
            const listaJSON = JSON.stringify(listaGuardar);
            console.log(listaJSON);
    
            fs.writeFile('lista-fecha-temp.json', listaJSON, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Lista guardada');
            });
    
            localStorage.setItem('Fecha', fecha.value);
            window.location.href = 'lista-por-fecha.html';
        });
    } else {
        infoError.style.opacity = 100;
    }    
});