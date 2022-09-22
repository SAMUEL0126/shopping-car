// se crean las constantes y se llaman las id
//querySelector es para seleccionar toda la etiqueta
const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");
const selectPrices = document.getElementById('filtro_price');
const createProducto = document.getElementById("create-producto");
const closeCreateProduct = document.getElementById('close_createP');

//esta variable es para las notificaciones de las compras
let cant = 1;

//esta variable permite contar el numero de productos que se llevan


//esta variable tomara la imagen
let imgSelect = " ";

//se crean las constantes para la creacion del nuevo producto por el usuario
const nameNewProduct = document.getElementById('nameNewProduct');
const priceNewProduct = document.getElementById('priceNewProduct');
const imgNewProduct = document.getElementById('imgNewProduct');
const createProductoPerson = document.getElementById('crearProductoPerson');

//se crea la constante para que aparezca la modal de los productos 
//que ya se ha comprado
const createModal = document.getElementById('car_shoping');

//se le asigna el evento
createModal.addEventListener('click',CreateModalShop);

//y con esta funcion mostramos la nueva modal
function CreateModalShop() {
  const compras = document.getElementById('compras');
  compras.style.display ="flex";
}

//se crea contante para enlazar el boton del cierre de
//la nueva modal
const CloseModal = document.getElementById('CloseModal');

//se le agrega un evento
CloseModal.addEventListener('click', CloseNewModal);

//y con esta funcion hacemos que el boton (X) cierre 
//la Modal
function CloseNewModal() {
  const cerrarModal = document.getElementById('compras');
  cerrarModal.style.display = "none";
}

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);

selectPrices.addEventListener('change', listPrice);

//con esto importamos la imagen en la nueva carta para crear
imgNewProduct.addEventListener('change',importImg);
function importImg(event) {
  //files no te trae el valor sino las caracterisrticas del objeto
  const valImg = event.target.files[0];

  //URL.createObjectURL hace que lo que contenga la constante se convierta en URL
  const UrlImg = URL.createObjectURL(valImg);
  imgSelect = UrlImg;
}
let idProducto ;
let nameId = "part-";
let idFinish = 11;
//aqui creamos un nuevo producto por el usuario
createProductoPerson.addEventListener('click', creador);
function creador() {

  idProducto = nameId+(idFinish++);
  const title = nameNewProduct.value;
  const price = priceNewProduct.value;
  const idP = idProducto;

  //creamos un objeto nuevo y remplazamos los valores por las nuevas 
  //constantes
  const newPartBmx = {id: idP ,product: title ,price: price, image: imgSelect}

  //aqui enviamos el nuevo objeto al arreglo
  parts.push(newPartBmx);
  console.log(parts);
  //aqui hacemos que el nuevo producto aparezca en la lista
  listSelect();

  //y aqui hacemos desaparecer el formulario despues de completarlo
  const crear = document.getElementById('crear');
  crear.style.display = "none";
}


//esta funcion es para crear un contenedor en caso de que se selccione algo del menu de despliegue
function renderCards() {
  parts.map(parts => { parts.product === selectProducts.value ? createCards(parts) : null});
}

//en esta funcion se muestran en un menu los elementos de un arreglo
function listSelect() {
  selectProducts.innerHTML = '';
  const primaryOption = document.createElement('option');
  selectProducts.appendChild(primaryOption);
  primaryOption.textContent = "Seleccione una pieza";
  parts.map(parts => {
    const opcion = document.createElement("option");
    opcion.value = parts.product;
    opcion.textContent = parts.product;
    selectProducts.appendChild(opcion);
  })
}

// en esta funcion se muestran opciones para escojer un producto
//dependiendo del precio
function listPrice(event) {
  const menorA = event.target.value === "menor a 500000" ? parts.filter(part => part.price < 500000)
  : event.target.value === "entre 500000 y 700000" ? parts.filter(part => part.price >= 500000 && part.price <= 700000)
  : event.target.value  === "mayor a 700000" ? parts.filter(part => part.price > 700000)  
  : null

  mainCards.innerHTML='';
  menorA.map(part => createCards(part));

}
/*-------------------------------------------- */

//aqui hacemos que al darle click al boton de crear producto aparezca el formulario para crearlo
createProducto.addEventListener('click', createProduct);
function createProduct(event) {
  const crear = document.getElementById('crear');
  crear.style.display = "flex";
  console.log(event.target.value);
}

//y aqui hacemos que el boton (X) del formulario haga la accion de
//cerrar el formulario al darle click
closeCreateProduct.addEventListener('click',closeCreateP);
function closeCreateP() {
  const closeForm = document.getElementById('crear');
  closeForm.style.display = "none";
}

/*esta funcion sirve para crear los contenedores en este caso las
   cartas*/ 
function createCards(parts) {
  // esta linea es para destructurizar el objeto es decir sacar cosa por cosa como el producto despues la imagen
  // despues el precio etc.
  const {product, image,id,price} = parts; 

  //aqui se crea el div o contenedor 
  const card = document.createElement('div');
  //y con esta linea se enlaza con la clase que haz puesto en css
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.classList.add('img-product');
  
  //aqui se enlaza la constante con la src de la imagen que esta en el objeto y lo mismo con el alt
  imgCard.setAttribute('src', image);
  imgCard.setAttribute('alt',product);

  const nameCard = document.createElement('p');
  nameCard.classList.add('name-product');
  nameCard.setAttribute('id',id);

  //se utiliza para llamar el valor de la llave producto 
  nameCard.textContent = product;


  const priceCard = document.createElement('p');
  priceCard.classList.add('price-product');
  priceCard.setAttribute('id',id);

  //se utiliza para llamar el valor de la llave price (precio)
  priceCard.textContent = price;

  //se agrega un boton
  const btnAdd = document.createElement('button');
  //se enlaza con la etiqueta de estilos del boton
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');

  //se le agrega un texto al boton (comprar)
  btnAdd.textContent = 'comprar';
  btnAdd.style.textAlign = 'center';
  btnAdd.addEventListener('click', funcionTienda)


  //se agrega otro boton
  const btn_removeAdd = document.createElement('button');
  btn_removeAdd.classList.add('btn-remove');
  btn_removeAdd.setAttribute('id',id);

  //se agrega un texto al otro boton (X)
  btn_removeAdd.textContent = 'X';
  btn_removeAdd.style.textAlign = 'center';

  //funcion para darle la accion al boton de eliminar una carta del producto
  btn_removeAdd.addEventListener('click',quitarCard);
  function quitarCard() {
    card.remove();
  }

  //con esto se agregan a l contenedor card las img los name el price etc.
  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);
  card.appendChild(btn_removeAdd);

  //y con esto se agergan las cards en el main para que aparezcan
  mainCards.appendChild(card);
}
//== A G R E G A R   A L   C A R R I T O   D E   C O M P R A S ========================>

const compras = document.getElementById('compras');

function funcionTienda(event) {
  parts.map( element => {
    if (element.id === event.target.id) {
      crearTienda(element);
    }
  })
}

let total = 0;
let add = 1;

function crearTienda(parts) {
  const  {id,product,price,image} = parts;

  const notification = document.getElementById('notification');
  notification.style.visibility = "visible";

  let cantidad = document.getElementById('Notification');
  cantidad.textContent = cant++;


  //se crea el primer contenedor
  const div1 = document.createElement('div');
  //se le pasa los estilos para que tome su forma
  div1.classList.add('Venta');

  //se crea el contenedor para el boton de
  //cerrar la compra
  const cerrarC = document.createElement('div');
  cerrarC.classList.add('cerrarC');

  const closeBuy = document.createElement('button');
  closeBuy.classList.add('closeBuy');
  //texto que contrndra el objeto
  closeBuy.textContent = "X";

  const ContConfirmBuy = document.createElement('div');
  ContConfirmBuy.classList.add('ContConfirmBuy');

  const confirmBuy = document.createElement('button');
  confirmBuy.classList.add('confirmBuy');
  confirmBuy.textContent = "Comprar";


  /*                 C E R R A R                */
  closeBuy.addEventListener('click', closeVenta);
  function closeVenta() {
    div1.style.display = 'none';
    
  }

  //esta funcion es para restar el numero de notificaciones
  //de compras: se crea esta funcion
  closeBuy.onclick = function () {
    //se llama a la variable del encabezado de arriba y se iguala
    //al contenido de cantidad para despues restarlo
    cant = cantidad.textContent;
    cantidad.textContent = cant - 1;

    //y si esta condicion es para cuando el numero de notificacines
    //llegue a 0 desaparezca
    if (cantidad.textContent == 0) {
      notification.style.visibility = "hidden";
    }
  }
/*----------------------------------------------------*/

//           C O M P R A D O 
  confirmBuy.addEventListener('click', comprado);

  function comprado() {
    div1.style.display = "none";
  }
  confirmBuy.onclick = function () {
    cant = cantidad.textContent;
    cantidad.textContent = cant - 1;
    if (cantidad.textContent == 0) {
      notification.style.visibility = "hidden";
    }
  }
  /*--------------------------------------------*/ 

  //se crea segundo contenedor
  const div2 = document.createElement('div');
  //se crae el parrafo (NOMBRE) 
  let LabelNombre = document.createElement('p');
  //textContent para agregar el texto que llevara
  LabelNombre.textContent = "Nombre";
    LabelNombre.classList.add('labelPiezas');
    let pNombre = document.createElement('p');
    pNombre.textContent = product;
    pNombre.setAttribute('id', id);
  

  //se crea el tercer contenedor
  const div3 = document.createElement('div');
  let labelPrecio = document.createElement('p');
  labelPrecio.classList.add('labelPiezas');
  labelPrecio.textContent = "Precio";
    let pPrecio = document.createElement('p');
    //se agrega el valor que tiene el objeto en este caso el precio (price)
    pPrecio.textContent = price;
    pPrecio.setAttribute('id', id);


  const div4 = document.createElement('div');
  let labelCantidad = document.createElement('p');
  labelCantidad.classList.add('labelPiezas');
  labelCantidad.textContent = "Cantidad";
    let nCantidad = document.createElement('p');
    nCantidad.textContent = '1';
    nCantidad.setAttribute('id', id);

  const div5 = document.createElement('div');
  let labelMas = document.createElement('p');
  labelMas.classList.add('labelPiezas');
    const btnM = document.createElement('button');
    btnM.classList.add('mas');
    btnM.textContent = '+';
    btnM.setAttribute('id', id);



  const div6 = document.createElement('div');
  let labelMenos = document.createElement('p');
  labelMenos.classList.add('labelPiezas');
    const btnMe = document.createElement('button');
    btnMe.classList.add('menos');
    btnMe.textContent = "-";
    btnMe.setAttribute('id', id);


    const div7 = document.createElement('div');
    let labelImg = document.createElement('p');
    labelImg.classList.add('labelPiezas');
      const img = document.createElement('img');
      img.classList.add('imagendelacompra');
      img.setAttribute('src', image);

 

  div2.appendChild(LabelNombre);
  div2.appendChild(pNombre);

  div3.appendChild(labelPrecio);
  div3.appendChild(pPrecio);

  div4.appendChild(labelCantidad);
  div4.appendChild(nCantidad);

  div5.appendChild(labelMas);
  div5.appendChild(btnM);

  div6.appendChild(labelMenos);
  div6.appendChild(btnMe);

  div7.appendChild(labelImg);
  div7.appendChild(img);
  cerrarC.appendChild(closeBuy);
  ContConfirmBuy.appendChild(confirmBuy);

  div1.appendChild(div2);
  div1.appendChild(div3);
  div1.appendChild(div4);
  div1.appendChild(div5);
  div1.appendChild(div6);
  div1.appendChild(div7);
  div1.appendChild(cerrarC);
  div1.appendChild(ContConfirmBuy);

  compras.appendChild(div1);

}