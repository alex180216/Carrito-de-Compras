//------------------------------VARIABLES

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

//-----------------------EVENTLISTENERS
cargarEventListeners();

function cargarEventListeners() {  
    //delegacion
    //evento cuando se presiona "agregar carrito"
    listaCursos.addEventListener('click', comprarCurso);

    //eliminar curso del carrito
    listaCarrito.addEventListener('click', eliminarCurso);

    //vacia carrito
    vaciarCarrito.addEventListener('click', eliminarCarrito)

    //al cargar pagina mostrar LOcal storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//----------------------------FUNCIONES

function comprarCurso(e){
    e.preventDefault();
    /* console.log('hiciste click en listacursos'); */

    if(e.target.classList.contains('agregar-carrito')){
        //obtenemos el card donde hicimos click
        const curso = e.target.parentElement.parentElement;

        //leemos los datos: nombre, img, precio del curso
        leerDatosCurso(curso);
    }
}

function eliminarCurso(e){
    e.preventDefault();
    
    let curso, cursoId;
    //clickear en la x
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    };
    
    eliminarCursoLocalStorage(cursoId);
}

function eliminarCarrito(e){
    console.log('elimina el carrito');

    while(listaCarrito.firstChild){//mientras listaCursos siga teniendo al menos un hijo
        listaCarrito.removeChild(listaCarrito.firstChild);//remuevelo

    }

    //vaciar localStorage
    vaciarLocalStorage();
    return false;
}

function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(curso => {
        //construir template por cada curso en carrito
        listaCarrito.innerHTML +=   `<tr>
                                        <th><img src="${curso.imagen}" width="100px" heigth="80px" alt="" srcset=""></th>
                                        <td>${curso.titulo}</td>
                                        <td>${curso.precio}</td>
                                        <td>
                                            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                                        </td>
                                    </tr>`;
    });
}

//lee los datos del curso
function leerDatosCurso(curso){
    //obj de lo que leo
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.children[1].children[0].textContent,
        precio: curso.children[1].children[3].querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    //para insertar al carrito
    insertarCarrito(infoCurso);
}

//muestra el curso seleccionado y lo inserta en el carrito
function insertarCarrito(curso){
    //insertar template
    listaCarrito.innerHTML +=   `<tr>
                                    <th><img src="${curso.imagen}" width="100px" heigth="80px" alt="" srcset=""></th>
                                    <td>${curso.titulo}</td>
                                    <td>${curso.precio}</td>
                                    <td>
                                        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                                    </td>
                                </tr>`;

    //Guardar curso LocalStorage
    guardarCursoLocalStorage(curso);                            
}

//almacemar cursos de carrito en local storage
function guardarCursoLocalStorage(curso){
    let cursos;

    //toma el valor de lo que este en local storage
    cursos = obtenerCursoLocalStorage();

    //el curso seleccionado se arregla al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//leer cursos del local storage
function obtenerCursoLocalStorage(){
    let cursosLS;

    //comprobamos si hay algo en Local Storage
    if(localStorage.getItem('cursos') === null){
        //si no hay nada, dame un arreglo vacio
        cursosLS = [];

    }else{//si hay algo, damelo
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
        //se parse a json para que me lo traiga como un arreglo
        
    }
    return cursosLS;
}

//eliminar curso por id en local storage
function eliminarCursoLocalStorage(id){
    let cursosLS;

    
    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(function(idls, index){
        if(idls.id === id){
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//vaciar todo el carrido desde localStorage
function vaciarLocalStorage(){
    localStorage.clear();
}