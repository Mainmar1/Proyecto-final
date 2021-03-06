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

    template.querySelector('.btn-info').dataset.id = producto.id
    template.querySelector('.btn-danger').dataset.id = producto.id
    

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
})

items.appendChild(fragment)

pintarFooter()
accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () =>{

footer.innerHTML = ''

if(Object.keys(carrito).length === 0){

    footer.innerHTML = `<th scope="row" colspan="5">Carrito vac??o!</th>`

    return

}

const template = document.querySelector('#template-footer').content
const fragment = document.createDocumentFragment()


const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

template.querySelectorAll('td')[0].textContent = nCantidad
template.querySelector('span').textContent = nPrecio



const clone = template.cloneNode(true)

fragment.appendChild(clone)

footer.appendChild(fragment)


const boton = document.querySelector('#vaciar-carrito')
boton.addEventListener('click', ()=>{
    carrito = {}
    pintarCarrito()
})
}

const accionBotones = () =>{

const botonesAgregar = document.querySelectorAll('#items .btn-info')
const botonesEliminar = document.querySelectorAll('#items .btn-danger')

botonesAgregar.forEach(btn =>{
    btn.addEventListener('click', ()=>{
const producto = carrito[btn.dataset.id]
producto.cantidad ++

carrito[btn.dataset.id] = {...producto}
pintarCarrito()

    })
})

botonesEliminar.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        
        const producto = carrito[btn.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){

          delete carrito[btn.dataset.id]

        }else {
            carrito[btn.dataset.id] = {...producto}
        }
        pintarCarrito()
    })
})
    
}


document.getElementById("btn_cerrar_sesion").addEventListener('click', ()=>{

    // let rta = confirm("Desea cerrar sesion?");


    // if(rta){
    //     window.location.href = "./index.html";
    //     swal("??La sesion se cerrro con exito!","","success");
    // }

    swal({
        title: "Esas seguro que deseas cerrar sesion?",
        text: "Si cierras sesion se perdera lo almacenado en el carrito",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("La cuenta se cerro con exito!", {
            icon: "success",
            
          });
          window.location.href = "./index.html";
        } else {
          swal("A seguir comprando!");
        }
      });
    

})











