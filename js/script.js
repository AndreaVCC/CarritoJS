$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


let productos = [
    {
        id: 1,
        imagen: "img/thelastofus2.webp",
        producto: "The Last Of Us II",
        precio: 59990
    },
    {
        id: 2,
        imagen: "./img/minecraft.webp",
        producto: "Minecraft Starter Refresh",
        precio: 32000
    },
    {
        id: 3,
        imagen: "./img/horizon.webp",
        producto: "Horizon Zero Dawn Complete Edition",
        precio: 19990
    },
    {
        id: 4,
        imagen: "./img/gt.webp",
        producto: "Gran Turismo Sport",
        precio: 49990
    },
    {
        id: 5,
        imagen: "./img/codv.webp",
        producto: "Call Of Duty Vanguard",
        precio: 64990
    
    },
    {
        id: 6,
        imagen: "./img/ghost.webp",
        producto: "Ghost Of Tsushima Directors Cut",
        precio: 54990
    
    },
    {
        id: 7,
        imagen: "./img/spider.webp",
        producto: "Spiderman Miles Morales Marvel",
        precio: 49990
    }
]

let inputBuscador;


let prueba = document.getElementById("prueba"); //se guarda el lugar donde se imprimira

//Funcion que carga todos los productos
function principal() {
    prueba.innerHTML = ""; //limpiar html
    productos.map(function (item) { //se recorre el array de objetos con .map
        prueba.innerHTML += ` 
        <article class="card">
        <picture class="text-center">
            <img src=${item.imagen} class="" alt="flores">
        </picture>
        <div class="card-content">
          <h3 class="card__title">${item.producto}</h3>
       </div>
        <div class="card__footer d-flex align-items-end align-items-lg-center justify-content-lg-between  flex-column flex-lg-row"> 
            <p class="m-0">$${item.precio}</p>
            <button onclick="addToCart(${item.id})" class="btn btn-sm btn-2" data-toggle="tooltip" data-placement="top"
            title="Añadir al carrito">Comprar</button>
        </div>
      </article>
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

    // console.log(arrayFiltrado);
    if (arrayFiltrado.length === 0) { //si el largo del array es 0 entonces imprime mensaje
        prueba.innerHTML += `  
        <h3>Producto no encontrado</h3>
        `

    } else { //si el array viene con elementos entonces los pinta en el html
        arrayFiltrado.map(function (item) {
            prueba.innerHTML += `
            <article class="card">
            <picture class="text-center">
                <img src=${item.imagen} class="" alt="flores">
            </picture>
            <div class="card-content">
              <h3 class="card__title">${item.producto}</h3>
           </div>
            <div class="card__footer "> 
                <p class="m-0">$${item.precio}</p>
                <button onclick="addToCart(${item.id})" class="btn btn-sm btn-2" data-toggle="tooltip" data-placement="top"
                title="Añadir al carrito">Comprar</button>
            </div>
          </article>


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


let contadorCarrito = 0;

let ubicacionContadorCarrito = document.getElementById("contadorCarrito");

function contador () {

}

function addToCart(idProduct) {
    // console.log(idProduct)
    let producto = productos.filter(item => item.id === idProduct)
    // console.log(producto)
    // console.log(producto[0])
    let boolean = cartNuevo.some(item => item.id === idProduct)
    // console.log(boolean)
    if (boolean) {
        contadorCarrito= contadorCarrito + 1;
        console.log(contadorCarrito)

        producto[0].count = producto[0].count + 1;
        producto[0].subTotal = producto[0].subTotal + producto[0].precio;
        mostrarCarritoEnHtml()
    } else {
        contadorCarrito= contadorCarrito + 1;
        console.log(contadorCarrito)

        producto[0].count = 1;
        producto[0].subTotal = producto[0].precio;
        cartNuevo.push(producto[0])
        mostrarCarritoEnHtml()
    }
   
    // console.log("nuevo arreglo", cartNuevo);
}





let total = 0;
function mostrarCarritoEnHtml() {
    document.querySelector(".cart").innerHTML = "";

    ubicacionContadorCarrito.innerHTML = "";
    ubicacionContadorCarrito.innerHTML = contadorCarrito;

 
    cartNuevo.map(function (item,index) {

        total = item.subTotal + total;
      
        document.querySelector(".cart").innerHTML += `
                <tr class="pb-2">
                <td scope="row">${item.producto} </td>
                <td>$${item.precio}</td>
                <td class="text-center">${item.count}</td>
                <td>$${item.subTotal}</td>
                <td> <button onclick="eliminarProducto(${item.id})" class="ml-1 text-right btn p-1"><img src="trash.svg"></button> <td>
                </tr>
     `
        document.querySelector(".valor").innerHTML = `
        <div class="valortotal d-flex justify-content-between align-items-center">
            <p onclick="vaciarCarrito()" class=" d-inline  btnvaciar m-0 p-1 ">Vaciar carrito</p>
            <p class="m-0 d-inline ">Total: $${total}</p>
        </div>
    `
        
        // console.log(total)
    });
    total = 0
}


// console.log(total)

function eliminarProducto(itemProducto) {
    cartNuevo = cartNuevo.filter(item => item.id != itemProducto)
    ubicacionContadorCarrito.innerHTML = "";
    contadorCarrito--
    document.querySelector(".valor").innerHTML = "";
    mostrarCarritoEnHtml()
}

function vaciarCarrito() {
    ubicacionContadorCarrito.innerHTML = "";
    contadorCarrito--
    cartNuevo = [];
    document.querySelector(".valor").innerHTML = "";
    document.querySelector(".cart").innerHTML = "";
}



