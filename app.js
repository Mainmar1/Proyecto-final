document.addEventListener("DOMContentLoaded", ()=>{
    fetchData()
})

const fetchData = async () => {
    try{
const res = await fetch('api.json')
const data = await res.json()

// console.log(data)

pintarProductos(data)
detectarBotones(data)
    }
    catch (error){
        console.log(error)
    }
}

// PRODUCTOS EN HTML CON UN FOREACH

const contenedor_productos = document.querySelector('#contenedor_productos')

const pintarProductos = (data) => {

    const template = document.querySelector('#template_productos').content
    const fragment = document.createDocumentFragment()
   
    data.forEach(producto =>{

        // console.log(producto)

        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)

    })

    contenedor_productos.appendChild(fragment)
}

let carrito = {}
 

const detectarBotones = (data) => {
const botones = document.querySelectorAll('.card button')
botones.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const producto = data.find(item => item.id === parseInt(btn.dataset.id))
        producto.cantidad = 1
        if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
        }

        carrito[producto.id] = {...producto}
        pintarCarrito()
    })
})
// console.log(botones)
}

const items = document.querySelector('#items')

const pintarCarrito = () =>{

items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
Object.values(carrito).forEach(producto =>{
    template.querySelector('th').textContent = producto.id
    template.querySelectorAll('td')[0].textContent = producto.title
    template.querySelectorAll('td')[1].textContent = producto.cantidad
    template.querySelector('span').textContent = producto.precio * producto.cantidad

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
})

items.appendChild(fragment)

}









