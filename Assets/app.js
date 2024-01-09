let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Stephen Curry 2010 Nike Hyperdunk',
        image: '1.png',
        price: 4875
    },
    {
        id: 2,
        name: 'Nike Air Jordan 1 Mid Orange',
        image: '2.PNG',
        price: 840
    },
    {
        id: 3,
        name: 'Nike Lebron Witness ',
        image: '3.PNG',
        price: 540
    },
    {
        id: 4,
        name: "Nike Kyrie 5 'Spongebob Squarepants'",
        image: '4.PNG',
        price: 2315
    },
    {
        id: 5,
        name: "Nike LeBron 12 'Buckets'",
        image: '5.PNG',
        price: 1950
    },
    {
        id: 6,
        name: 'Nike Air Force 1',
        image: '6.PNG',
        price: 800
    }
];
let listCards = [];
function initApp() {
    products.forEach((product) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.setAttribute('data-id', product.id);
        newDiv.innerHTML = `
        <img src="image/${product.image}">
        <div class="title">${product.name}</div>
        <div class="price">${product.price.toLocaleString()}</div>
        <button class="addToCart" onclick="addToCart">Adicionar ao carrinho</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCart(id) {
    const productToAdd = products.find(product => product.id === id);
    const existingItem = listCards.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = { ...productToAdd, quantity: 1 };
        listCards.push(newItem);
    }

    reloadCart();
}

function reloadCart() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((item) => {
        totalPrice += item.price * item.quantity;
        count += item.quantity;

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="image/${item.image}"/></div>
            <div>${item.name}</div>
            <div>${(item.price * item.quantity).toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <div class="count">${item.quantity}</div>
                <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(id, quantity) {
    const selectedItem = listCards.find(item => item.id === id);

    if (quantity <= 0) {
        listCards = listCards.filter(item => item.id !== id);
    } else {
        selectedItem.quantity = quantity;
    }

    reloadCart();
}

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('addToCart')) {
        const selectedItem = event.target.closest('.item');
        const productId = parseInt(selectedItem.getAttribute('data-id'));
        addToCart(productId);
    }
});

openShopping.addEventListener('click', () => {
    body.classList.add('active');
    reloadCart(); // Recarrega o carrinho ao abri-lo
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});