document.addEventListener('DOMContentLoaded', function() {
    const id = new URLSearchParams(window.location.search).get('id'); /* Obtiene id */
    
    fetch('Datos/paquetes.json')
        .then(res => res.json())
        .then(datos => {
            const paquete = datos.paquetes.find(p => p.id === id);
            if (paquete) {
                actuTodo(paquete);
            }
        })
        .catch(err => console.log('Error:', err));
});

function actuTodo(paquete) {

    const cabSection = document.querySelector('.cab');
    if (cabSection) {
        cabSection.innerHTML = `
            <img src="${paquete.imagen}" alt="${paquete.titulo}">
            <div class="cab-contenido">
                <h2>${paquete.titulo.toUpperCase()}</h2>
                <p class="cab-subtitulo">${paquete.paises ? paquete.paises.join(' - ') : 'Destino Especial'}</p>
                <p class="cab-descripcion">PAQUETE TURÍSTICO ${paquete.duracion ? paquete.duracion.toUpperCase() : ''}</p>
                
                <div class="cab-info">
                    <ul>
                        ${paquete.paises ? `<li>Países: ${paquete.paises.join(', ')}</li>` : ''}
                        ${paquete.duracion ? `<li>Duración: ${paquete.duracion}</li>` : ''}
                        ${paquete.grupo ? `<li>Grupo: ${paquete.grupo}</li>` : ''}
                        ${paquete.precio_desde ? `<li><strong>Precio desde: $${paquete.precio_desde} USD</strong></li>` : ''}
                    </ul>
                </div>
            </div>
        `;
    }
    
    const descSection = document.querySelector('.descripcion');
    if (descSection && paquete.descripcion_larga) {
        descSection.innerHTML = `
            <h3>Descripción del Tour</h3>
            <p>${paquete.descripcion_larga}</p>
        `;
    }
    
    const itinerarioSection = document.querySelector('.itinerario');
    if (itinerarioSection && paquete.itinerario) {
        let diasHTML = '';
        paquete.itinerario.forEach(dia => {
            diasHTML += `
                <div class="dia">
                    <span class="dia-numero">${dia.dia}</span>
                    <span class="dia-titulo">${dia.titulo}</span>
                    <p class="dia-descripcion">${dia.descripcion}</p>
                </div>
            `;
        });
        
        itinerarioSection.innerHTML = `
            <h3>Itinerario del Tour</h3>
            ${diasHTML}
        `;
    }
    
}