const addProductBtn = document.getElementById('add-product')
const form = document.getElementById('form')
console.log(form);
addProductBtn.addEventListener('click' , (e) => {
    if(form.classList.contains('show')){
        addProductBtn.innerText = "Add Product"
        form.classList.remove('show');
    }
    else{
        addProductBtn.innerText = "Done";
        form.classList.add('show')
    }
})

let myProductsForRent_ALL_PRODUCTS = [
    {
        id: '1668516905183',
        title: 'products 01',
        image: './dashboardAssets/headphone3.jpg',
        rent: 100,
        owner: 'other',
    },
    {
        id: '1668516905184',
        title: 'products 02',
        image: './dashboardAssets/sneaker2.jpg',
        rent: 200,
        owner: 'other',
    },
    {
        id: '1668516905185',
        title: 'products 03',
        image: './dashboardAssets/headphone3.jpg',
        rent: 300,
        owner: 'other',
    },
    {
        id: '1668516905186',
        title: 'products 04',
        image: './dashboardAssets/sneaker2.jpg',
        rent: 400,
        owner: 'other',
    },
    {
        id: '1668516905187',
        title: 'products 05',
        image: './dashboardAssets/headphone3.jpg',
        rent: 300,
        owner: 'me',
    },
    {
        id: '1668516905188',
        title: 'products 06',
        image: './dashboardAssets/sneaker2.jpg',
        rent: 400,
        owner: 'me',
    },
]
let myProductsToRent = myProductsForRent_ALL_PRODUCTS.filter(product => product.owner == 'me');
let myBookedProducts_tenant = [
    {
        id: '1668516905183',
        title: 'products 01',
        image: './dashboardAssets/headphone3.jpg',
        rent: 100,
        owner: 'other',
    },
    {
        id: '1668516905184',
        title: 'products 02',
        image: './dashboardAssets/sneaker2.jpg',
        rent: 200,
        owner: 'other',
    },
]
let myBookedProducts_owner = myProductsForRent_ALL_PRODUCTS.filter(product => product.owner == 'me');
let swapImage = true;
const addMyProductsToRent = (title, rent) => {
    swapImage = !swapImage;
    let image = `./dashboardAssets/${swapImage ? 'headphone3' : 'sneaker2'}.jpg`;
    let id = `${new Date().getTime()}`;
    myProductsForRent_ALL_PRODUCTS.push({
        id,
        title,
        image,
        rent,
        owner: 'me'
    });
    myProductsToRent.push({
        id,
        title,
        image,
        rent,
        owner: 'me'
    });

    // UPDATE UI OF ALL 3 TABS
    updateDashboardUI();
}

const rentAProduct = (given_id) => {
    let rentedProduct = myProductsForRent_ALL_PRODUCTS.filter(product => product.id === given_id)[0];
    switch (rentedProduct.owner) {
        case 'me':
            myBookedProducts_owner.push(rentedProduct)
            break;    
        default:
            myBookedProducts_tenant.push(rentedProduct)
            break;
    }

    // UPDATE UI OF ALL 3 TABS
    updateDashboardUI();
}

const updateDashboardUI = () => {
    updateTabOneUI();
    updateTabTwoUI();
    updateTabThreeUI();
}

const updateTabOneUI = () => {
    const tabOne = document.getElementById('tabOne');
    tabOne.innerHTML = `
    ${
        myProductsForRent_ALL_PRODUCTS.map(product =>  `
            <div class="tabOneProduct product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
            </div>
        `).join('')
    }
    `
    Array.from(document.querySelectorAll('.tabOneProduct')).forEach(product => {
        product.addEventListener('dblclick', e => {
            e.preventDefault();
            rentAProduct(product.id)
        })
    })

}
const updateTabTwoUI = () => {
    const tabTwo = document.getElementById('tabTwoProducts');
    tabTwo.innerHTML = `
    ${
        myProductsToRent.map(product => `
            <div class="product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
            </div>
        `).join('')
    }
    `
    if(myProductsToRent.length === 0) {
        tabTwo.innerHTML = '<p>No products found.</p>'
    }
}
const updateTabThreeUI = () => {
    const tenantProducts = document.getElementById('tenant-products');
    const payRentProducts = document.getElementById('pay-rent-products');
    tenantProducts.innerHTML = `
    ${
        myBookedProducts_tenant.map(product => `
            <div class="product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
            </div>
        `).join('')
    }
    `
    if(myBookedProducts_tenant.length === 0) {
        tenantProducts.innerHTML = '<p>No tenant products found.</p>'
    }
    payRentProducts.innerHTML = `
    ${
        myBookedProducts_tenant.map(product => `
            <div class="product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
                <button>Pay Rent</button>
            </div>
        `).join('')
    }
    `
    if(myBookedProducts_tenant.length === 0) {
        payRentProducts.innerHTML = '<p>No tenant products found.</p>'
    }


    const ownerProducts = document.getElementById('owner-products');
    const collectRentProducts = document.getElementById('collect-rent-products');
    ownerProducts.innerHTML = `
    ${
        myBookedProducts_owner.map(product => `
            <div class="product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
            </div>
        `).join('')
    }
    `
    if(myBookedProducts_owner.length === 0) {
        ownerProducts.innerHTML = '<p>No owner products found.</p>'
    }
    collectRentProducts.innerHTML = `
    ${
        myBookedProducts_owner.map(product => `
            <div class="product" id="${product.id}">
                ${product.owner === 'me' ? '<small>My Product</small>': ''}
                <img src="${product.image}" alt="">
                <p>${product.title}</p>
                <span>Rent : ${product.rent} USD</span>
                <button>Collect Rent</button>
            </div>
        `).join('')
    }
    `
    if(myBookedProducts_owner.length === 0) {
        collectRentProducts.innerHTML = '<p>No owner products found.</p>'
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title')
    const rent = document.getElementById('rent')
    addMyProductsToRent(title.value.trim(), rent.value);
    title.value = ''
    rent.value = ''
});

document.getElementById('goto-dashboard').addEventListener('click', e => {
    document.getElementById('pay-collect').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
})
document.getElementById('goto-pay-collect').addEventListener('click', e => {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('pay-collect').style.display = 'block';
})

updateDashboardUI();

console.log('1. productsForRent', myProductsForRent_ALL_PRODUCTS)
console.log('2. myProductsToRent', myProductsToRent)
console.log('3.1 myBookedProducts_tenant', myBookedProducts_tenant)
console.log('3.2 myBookedProducts_owner', myBookedProducts_owner)