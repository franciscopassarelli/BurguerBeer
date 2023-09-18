let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})





const textoCambiar = document.getElementById("CambioTexto");
const palabras = ["Hamburguesas", "Cervezas Artesanales", "Especialidades en Papas y Batatas"];
let palabraIndex = 0;

function cambiarTexto() {
  textoCambiar.textContent = palabras[palabraIndex];
  palabraIndex = (palabraIndex + 1) % palabras.length;
}

setInterval(cambiarTexto, 5000); 







let products = [
    {
        id: 1,
        categoria:'Cervezas Artesanales',
        name: 'Beer-Golden',
        image:"golden.jpg" ,
        price: 1300
    },
    {
        id: 2,
        categoria:'Hamburguesas',
        name: 'BurguerFirst',
        image: 'burguerfirst.jpg',
        price: 3200
    },
    {
        id: 3,
        categoria:'Nuestras Papas',
        name: 'Papas-Solas',
        image: 'fritacomun.jpg',
        price: 1700
    },
    {
        id: 4,
        categoria:'Cervezas Artesanales',
        name: 'Beer-Honey',
        image: 'honey.jpg',
        price: 1500
    },
    {
        id: 5,
        categoria:'Hamburguesas',
        name: 'Bookurguer',
        image: 'bookburguer.jpg',
        price: 2900
    },
    {
        id: 6,
        categoria:'Nuestras Papas',
        name: 'Bacon-mmm!',
        image: 'fritas.jpg',
        price: 2500
    },
    {
        id: 7,
        categoria:'Cervezas Artesanales',
        name: 'Horse-Scotish',
        image: 'scotish.jpg',
        price: 1600
    },
    {
        id: 8,
        categoria:'Hamburguesas',
        name: 'LaGuerrillera',
        image: 'guerrillera.jpg',
        price: 3000
    },
    {
        id: 9,
        categoria:'Batatas!',
        name: 'Las-Verdaderas',
        image: 'batatas.jpg',
        price: 1800
    },
    { id: 10,
        categoria:'Cervezas Artesanales',
        name: 'Black-Black',
        image: 'black.jpg',
        price: 1500
},
{ id: 11,
    categoria:'Hamburguesas',
    name: 'VersdishBurguer',
    image: 'vegan.jpg',
    price: 2800
},
{ id: 12,
    categoria:'Nuestras Papas',
    name: 'The-Chedar-Extremme',
    image: 'cheddars.jpg',
    price: 2500
},
{ id: 13,
    categoria:'Cervezas Artesanales',
    name: 'Beer-Ipa',
    image: 'ipa.jpg',
    price: 1600
},
{ id: 14,
    categoria:'Hamburguesas',
    name: 'TheChesse!',
    image: 'chesse.jpg',
    price: 3500
},
{ id: 15,
    categoria:'Nuestras Papas',
    name: 'All-Stars-Special',
    image: 'fritas1.jpg',
    price: 2200
}
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})" class="BotonDeAgregar">Agregar compra</button>`;
        list.appendChild(newDiv);
       
    })
    if (listCards.length === 0) {
        listCard.innerHTML = '<div>No hay productos adheridos.</div>';
    }
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        
        // Utilizar la alerta personalizada de Swal
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: 'success',
            title: `¡"${products[key].name}" se ha añadido al carrito!`
        });
    }
    reloadCard();
}






function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
          
        }

    })

    if (count === 0) {
        listCard.innerHTML = '<div>No hay productos adheridos.</div>';
 }
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

}

function generateConfirmationMessage() {
    let totalAmount = calculateTotal();
    let productsToBuy = listCards.filter(value => value != null);

    
    

    let message = "Estás seguro de que quieres comprar:\n\n";

    productsToBuy.forEach(product => {
        message += `${product.name} - Cantidad: ${product.quantity}\n`;
    });

    message += `\nTotal: ${totalAmount.toLocaleString()}`;

    return message;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}





function calculateTotal() {
    let totalAmount = 0;

    listCards.forEach((value) => {
        if (value != null) {
            totalAmount += value.price;
         }

    });

    totalCompra = totalAmount

    return totalAmount;
}




function buy() {
const customAlertOverlay = document.getElementById("custom-alert-overlay");
const customAlertMessage = document.getElementById("custom-alert-message");
const customAlertBackButton = document.getElementById("custom-alert-back");
const customAlertButton = document.getElementById("custom-alert-button");

if (listCards.length === 0) {
    customAlertMessage.innerHTML = "No hay productos en el carrito.";
} else {
    customAlertMessage.innerHTML = generateConfirmationMessage();
}

customAlertOverlay.style.display = "flex";

customAlertBackButton.onclick = function () {
    customAlertOverlay.style.display = "none";
};

customAlertButton.onclick = function () {
    customAlertOverlay.style.display = "none";
    if (listCards.length > 0) {
        let productsPurchased = [];
        listCards.forEach((value) => {
            if (value != null) {
                productsPurchased.push(`${value.name} - Cantidad: ${value.quantity}`);
            }
        });

        const productsPurchasedString = productsPurchased.join('\n');
        listCards = [];
        reloadCard();

        customAlertButton.innerHTML = "Aceptar";
        customAlertOverlay.style.display = "flex";
        customAlertMessage.innerHTML = "¡Compra realizada con éxito!<br><br>Productos comprados:<br>" + productsPurchasedString;
        
        // Puedes acceder al total de compra aquí
        console.log("Total de compra:", totalCompra);
    }
};


 }