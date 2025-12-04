document.addEventListener('DOMContentLoaded', function() {
    let todosPaquetes = [];
    
    fetch('Datos/paquetes.json')
        .then(res => res.json())
        .then(datos => {
            if (datos.promociones?.[0]) {
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
});

function mostrarPaquetes(paquetes) {
    const contenedor = document.querySelector('.tarjetas');
    contenedor.innerHTML = '';
    
    if (paquetes.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }
    
    paquetes.forEach(p => {
        contenedor.innerHTML += `
            <div class="tarjeta">
                <img src="${p.imagen}" alt="${p.titulo}">
                <div class="tarjeta-content">
                    <h3>${p.titulo}</h3>
                    <p>${p.descripcion_corta}</p>
                    <a href="detalle-paquete.html?id=${p.id}">Ver detalles</a>
                </div>
            </div>
        `;
    });
}

function configurarBusqueda(paquetes) {
    const input = document.querySelector('.search-box input');
    
    input.addEventListener('input', function() {
        const texto = this.value.toLowerCase();
        
        if (!texto) {
            mostrarPaquetes(paquetes);
            return;
        }
        
        const resultados = paquetes.filter(p => 
            p.titulo.toLowerCase().includes(texto) ||
            p.descripcion_corta.toLowerCase().includes(texto) ||
            (p.paises && p.paises.some(pais => pais.toLowerCase().includes(texto)))
        );
        
        mostrarPaquetes(resultados);
    });
}

function configurarFiltrosPais(paquetes) {
    document.querySelectorAll('nav a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const pais = this.textContent;
            
            if (pais === 'Mostrar todos') {
                mostrarPaquetes(paquetes);
            } else {
                const filtrados = paquetes.filter(p => 
                    p.paises && p.paises.some(pa => 
                        pa.toLowerCase().includes(pais.toLowerCase())
                    )
                );
                mostrarPaquetes(filtrados);
            }
        });
    });
}