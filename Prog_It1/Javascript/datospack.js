document.addEventListener('DOMContentLoaded', function() {
    let todosPaquetes = [];
    
    fetch('Datos/paquetes.json') /* Obtiene respuesta */
        .then(res => res.json())
        .then(datos => {
            if (datos.promociones && datos.promociones.length > 0) { /* si existe y mas de 0 */
                const promo = datos.promociones[0];
                document.querySelector('.promociones h2').textContent = promo.titulo;
                document.querySelector('.promociones p').textContent = promo.descripcion;
            }
            todosPaquetes = datos.paquetes;
            mostrarPaquetes(todosPaquetes);
            configurarBusqueda(todosPaquetes);
            configurarFiltrosPais(todosPaquetes);
        })
        .catch(err => console.log('Error:', err));

    /* Menu */
    document.querySelector(".btn_hamb").addEventListener("click", () => {
            document.querySelector(".menu_url").classList.toggle("activo");
    });
});

function mostrarPaquetes(paquetes) {
    const contenedor = document.querySelector('.tarjetas');
    contenedor.innerHTML = '';  /* Limpia */
    
    if (paquetes.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }
    
    paquetes.forEach(p => {
        contenedor.innerHTML += `
            <div class="tarjeta">
                <img src="${p.imagen}" alt="${p.titulo}">
                <div class="tarjeta-contenido">
                    <h3>${p.titulo}</h3>
                    <p>${p.descripcion_corta}</p>
                    <a href="detalle-paquete.html?id=${p.id}">Ver detalles</a>
                </div>
            </div>
            <br>
        `;
    });
}

function configurarBusqueda(paquetes) {
    const input = document.querySelector('.busqueda input');
    
    input.addEventListener('input', function() {
        const texto = this.value.toLowerCase();
        
        if (!texto) {
            mostrarPaquetes(paquetes);
            return;
        }
        
        const resultados = paquetes.filter(p => 
            p.titulo.toLowerCase().includes(texto) ||
            p.descripcion_corta.toLowerCase().includes(texto) ||
            p.paises.some(pais => pais.toLowerCase().includes(texto))

        );
        
        mostrarPaquetes(resultados);
    });
}

function configurarFiltrosPais(paquetes) {
    document.querySelectorAll('.menu a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();     /* Cancela recarga */
            const pais = this.textContent;
            
            if (pais === 'Mostrar todos') {
                mostrarPaquetes(paquetes);
            } else {
                const filtrados = paquetes.filter(p => 
                    p.paises.some(pa => 
                        pa.toLowerCase().includes(pais.toLowerCase())
                    )
                );
                mostrarPaquetes(filtrados);
            }
        });
    });
}

