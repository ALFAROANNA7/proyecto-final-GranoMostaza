const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')
let carrito = []

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cant}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cant * prod.precio, 0)

}

botonVaciar.addEventListener('click', () => {
    carrito = []
    localStorage.clear()
    actualizarCarrito()
})
/* Se conecta el archivo js con JSON */
let productos = []

const obtenerProductos = async (productos) => {
    return await fetch("./elementos.json")
        .then(resp => resp.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                productos.push(data[i])
            }
            return productos
        })

}

obtenerProductos(productos).then(productos => productos.map(producto => {
    const div = document.createElement('div')
    contenedorProductos.appendChild(div)
    div.classList.add('producto')
    div.innerHTML = `
                <img src=${producto.img} alt= "">
                <h3>${producto.nombre}</h3>
                <p>${producto.desc}</p>
                <p>Tiempo aproximado de entrega: ${producto.talle}</p>
                <p class="precioProducto">Precio:$ ${producto.precio}</p>
                <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        
            `
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
}))

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some(prod => prod.id === prodId) 

    if (existe) { 
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cant++
            }
        })
    } else {
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    Toastify({
        text: "Se agregó un elemento",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, rgb(219, 100, 13), rgb(207, 100, 126)",
        },
        onClick: function(){}
      }).showToast();
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    Toastify({
        text: "Se eliminó un elemento",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to left, rgb(219, 255, 13), rgb(207, 100, 126)",
        },
        onClick: function(){} 
      }).showToast();
    actualizarCarrito() 
    console.log(carrito)
}


