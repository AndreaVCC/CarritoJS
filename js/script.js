$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

function datos() {
    //Solicitud de datos
    let nameClient = prompt("Ingresa tu nombre");
    let lastNameClient = prompt("Ingresa tu apellido");

    //Imprimiendo datos
    document.getElementById("name-client").innerHTML = nameClient;


    let lastName = document.getElementById("last-name-client");
    lastName.innerHTML = lastNameClient;
}

let i = 0;

function incremento() {
    ++i;
    document.querySelector(".contador").innerHTML = i;
    console.log(i)
    if (i >= 20) {
        document.querySelector(".contador").style.color = "green";
    } else {
        document.querySelector(".contador").style.color = "black";
    }

}
function decremento() {
    --i;
    document.querySelector(".contador").innerHTML = i;
    console.log(i)
    if (i < 0) {
        document.querySelector(".contador").style.color = "red";
    } else {
        document.querySelector(".contador").style.color = "black";
    }
}

let productos = [
    {
        id: 1,
        imagen: "./img/img-1.jpeg",
        producto: "Girasol",
        precio: 300
    },
    {
        id: 2,
        imagen: "./img/img-2.jpeg",
        producto: "Margarita",
        precio: 200
    },
    {
        id: 3,
        imagen: "./img/img-3.jpeg",
        producto: "Tulipan",
        precio: 100
    },
    {
        id: 4,
        imagen: "./img/img-4.jpeg",
        producto: "Gladiolo",
        precio: 400
    }
]

let inputBuscador;

let prueba = document.getElementById("prueba"); //se guarda el lugar donde se imprimira

//Funcion que carga todos los productos
function principal() {
    prueba.innerHTML = ""; //limpiar html
    productos.map(function (item) { //se recorre el array de objetos con .map
        prueba.innerHTML += ` 
        <div  class="col-12 col-sm-4 col-md-3 p-3">
        <div class="card text-dark ">                       
            <h3 class="card__title p-3">${item.producto}</h3>
            <img src=${item.imagen} class="card__img rounded-circle px-5" alt="flores">
            <div class="card-body">
                <p class="card__text">Precio: $${item.precio}</p>
                <button onclick="addToCart(${item.id})" type="button" class="btn btn-sm btn-2" data-toggle="tooltip" data-placement="top"
                title="Añadir al carrito">Comprar</button>
            </div>
        </div>
        </div>
        `
    })
}

//funcion que se usa para filtrar
function buscar2() {
    prueba.innerHTML = "";
    inputBuscador = document.getElementById("buscador").value; //se guarda valor del input

    let arrayFiltrado = productos.filter(function (cosa) { //se filtra el array de objetos creando un nuevo array con elementos filtrados
        // console.log(cosa)
        let buscarProducto = cosa.producto;
        let transformarNombre = buscarProducto.toLowerCase();

        return transformarNombre.includes(inputBuscador.toLowerCase()) //se compara el objeto que se busca con el valor del input
    })

    console.log(arrayFiltrado);
    if (arrayFiltrado.length === 0) { //si el largo del array es 0 entonces imprime mensaje
        prueba.innerHTML += `  
        <h3>Producto no encontrado</h3>
        `

    } else { //si el array viene con elementos entonces los pinta en el html
        arrayFiltrado.map(function (item) {
            prueba.innerHTML += `
            <div  class="col-12 col-sm-4 col-md-3 p-3">
            <div class="card text-dark ">                       
                <h3 class="card__title p-3">${item.producto}</h3>
                <img src=${item.imagen} class="card__img rounded-circle px-5" alt="flores">
                <div class="card-body">
                    <p class="card__text">Precio: $${item.precio}</p>
                    <button onclick="addToCart(${item.id})" type="button" class="btn btn-sm btn-2" data-toggle="tooltip" data-placement="top"
                    title="Añadir al carrito">Comprar</button>
                </div>
            </div>
            </div>
        `
        })
    }
}

//funcion ejecuta al cargar la pagina
function ejecutar() {
    inputBuscador = document.getElementById("buscador").value; // se captuta valor del input
    if (inputBuscador == "") { //si el input esta vacio ejecuta la funcion proincipal
        principal();
    } else { // si no ejecuta buscar2
        buscar2();
    }
}
ejecutar();

let cartNuevo = [];

function addToCart(idProduct) {
    // console.log(idProduct)
    let producto = productos.filter(item => item.id === idProduct)
    console.log(producto)
    console.log(producto[0])
    let boolean = cartNuevo.some(item => item.id === idProduct)
    console.log(boolean)
    if (boolean) {
        producto[0].count = producto[0].count + 1;
        producto[0].subTotal = producto[0].subTotal + producto[0].precio;
        mostrarCarritoEnHtml()
    } else {
        producto[0].count = 1;
        producto[0].subTotal = producto[0].precio;
        cartNuevo.push(producto[0])
        mostrarCarritoEnHtml()
    }
    console.log("nuevo arreglo", cartNuevo);
}



let total = 0;
function mostrarCarritoEnHtml() {
    document.querySelector(".cart").innerHTML = "";
    cartNuevo.map(function (item) {
        total = item.subTotal + total;
        document.querySelector(".cart").innerHTML += `
        
            <div class="cart-item row px-md-5 ">
                <div class="col-1 mb-1 d-none d-sm-block ">
                    <img class="cart-item__img" src="${item.imagen}" alt="img">
                </div>
                <div class="col-3  mb-1 ">
                    <p class="col-2 p-0 mb-0 cart-item__name">${item.producto}</p>
                </div>
                <div class="col-2 mb-1">
                    <p class="cart-item__price mb-0">$${item.precio}</p>
                </div>
                <div class="col-2  mb-1">
                    <p class="cart-item__counts mb-0">${item.count}</p>
                </div>
                <div class="col-2 mb-1">
                    <p class="cart-item__price mb-0">$${item.subTotal}</p>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <button onclick="eliminarProducto(${item.id})" class=" my-1 text-right cart-item__count btn btn-2">X</button>
                </div>
            </div>
        
     `

        document.querySelector(".valor").innerHTML = `
        <div class="d-flex justify-content-end">
            <button onclick="vaciarCarrito()" class=" py-0 mx-4  d-inline  btn btn-2">Vaciar carrito</button>
            <h3 class=" my-3 mr-md-5 d-inline ">Total: ${total}</h3>
        </div>
    `
        
        console.log(total)
    });
    total = 0
}

console.log(total)

function eliminarProducto(itemProducto) {
    cartNuevo = cartNuevo.filter(item => item.id != itemProducto)
    document.querySelector(".valor").innerHTML = "";
    mostrarCarritoEnHtml()
}

function vaciarCarrito() {
    cartNuevo = [];
    document.querySelector(".valor").innerHTML = "";
    document.querySelector(".cart").innerHTML = "";
}



