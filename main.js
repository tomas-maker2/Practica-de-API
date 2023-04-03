// CAROSUEL

// const fila = document.querySelector(`.contenedor-carousel`)

// const peliculas = document.querySelectorAll(`.pelicula`)

// const flechaIzquierza = document.getElementById(`flecha-izquierda`)

// const flechaDerecha = document.getElementById(`flecha-derecha`)



// flechaDerecha.addEventListener(`click`, () => {
//     fila.scrollLeft += fila.offsetWidth
// })


// flechaIzquierza.addEventListener(`click`, () => {
//     fila.scrollLeft -= fila.offsetWidth
// })


// // PAGINACION

// const numeroPaginas = Math.ceil(peliculas.lenght / 5);
// for( let i = o ; i < numeroPaginas; i++){
//     const indicador = document.createElement(`button`)

//     if(i === 0){
//         indicador.classList.add(`activo`)
//     }

//     document.querySelector(`.indicadores`).appendChild(indicador)
//     indicador.addEventListener(`click` , (e) => {
//         fila.scrollLeft = i * fila.offsetWidth;
//     })
// }




// PAGINADO DE LAS PELICULAS

const nav = document.querySelector("#nav")
const abrir = document.querySelector("#abrir")
const cerrar = document.querySelector("#cerrar")

abrir.addEventListener(`click`, ()=>{
    nav.classList.add("visible")
})

cerrar.addEventListener(`click`, () => {
    nav.classList.remove("visible")
})


let pagina = 1;


const btnAnterior = document.getElementById(`btn-anterior`)
const btnSiguiente = document.getElementById(`btn-siguiente`)

btnSiguiente.addEventListener(`click`, ()=> {
    if(pagina < 1000) {
        pagina += 1;
        cargarPelis();
    }
});


btnAnterior.addEventListener(`click`, () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPelis()
    }
})


// USO DE API Y CARGAR PELICULAS
const cargarPelis = async () => {


    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2a496fe66536a5c2c46ae7bd5c55ea18&language=es-MX&page=${pagina}`)
        
        console.log(respuesta)


        if(respuesta.status === 200){
            const datos = await respuesta.json()
            
            let peliculas= ``;
            datos.results.forEach( pelicula =>{
                peliculas += `
                
                <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="img-fluid rounded-start" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.title}</h5>
                        <p class="card-text fs-5">${pelicula.release_date}</p>
                    </div>
                </div>
                        `
            })

            document.getElementById(`contenedor`).innerHTML = peliculas
        } else if (respuesta.status === 401){
            console.log(`La llave esta mal `)
        } else if ( respuesta.status === 404){
            console.log(`La pelicula que buscas no existe`)
        } else{
            console.log(`Hubo un error`)
        }


    }catch(error){
        console.log(error)
    }

    } 

cargarPelis()