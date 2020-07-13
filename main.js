let basket = document.querySelectorAll('.add-to-basket');

let products = [
  {
      name: 'Secret Pearl',
      tag: 'secretpearl',
      price: 200 ,
      inBasket:0
  },

  {
    name: 'Straw Circles', 
    tag: 'strawcircles',
    price: 170 , 
    inBasket:0
  },

  {
    name: 'Azure', 
    tag: 'circles',
    price: 195,
    inBasket:0
  },

  {
    name: 'Kissed by the sun', 
    tag: 'gold',
    price: 195,
    inBasket:0
  },
  {
    name: 'Azure', 
    tag: 'silver',
    price: 195,
    inBasket:0
  },
  {
    name: 'Kissed by the sun', 
    tag: 'bottomball',
    price: 195,
    inBasket:0
  },
  {
    name: 'Perfect', 
    tag: 'jeans',
    price: 195,
    inBasket:0
  },
  {
    name: 'Double Balls', 
    tag: 'double',
    price: 195,
    inBasket:0
  }


]

for (let i = 0; i < basket.length; i++) {
  basket[i].addEventListener('click', ()  => {
    basketNumbers (products[i]);
    totalCost(products[i])

  })
}

function onLoadBasketNumbers () {
    let productNumber = localStorage.getItem('basketNumbers');

   if(productNumber) {
    document.querySelector('.basket span').textContent = productNumber;
   }

}



function basketNumbers (products) {
    
  let productNumber = localStorage.getItem('basketNumbers');
  productNumber = parseInt(productNumber);

  if(productNumber) {
    localStorage.setItem('basketNumbers', productNumber + 1);
    document.querySelector('.basket span').textContent = productNumber + 1 ;
  } else {
    localStorage.setItem('basketNumbers',  1);
    document.querySelector('.basket span').textContent = 1;
  }
  
  setItems(products);
}

function setItems (products) {
    let basketItems = localStorage.getItem('productsInBasket');
    basketItems = JSON.parse(basketItems);
    

    if(basketItems != null) {
        if ( basketItems[products.tag] == undefined) {
            basketItems = {
                ...basketItems,
                [products.tag]:products
            }
        }
        basketItems[products.tag].inBasket += 1; 
    } else {
         products.inBasket = 1;
         basketItems = {
              [products.tag]:products
        }
    }
   localStorage.setItem('productsInBasket',JSON.stringify(basketItems))
}

function totalCost (products) {
    // console.log ('The product price is', products.price);

     let basketCost = localStorage.getItem('totalCost');
     
     console.log("My basketCost is ", basketCost);
     console.log(typeof  basketCost);

     if(basketCost != null) {
        basketCost = parseInt(basketCost);
        localStorage.setItem("totalCost", basketCost + products.price);

     } else {
         localStorage.setItem('totalCost', products.price);
     }

    
}

function displayBasket() {
     let basketItems = localStorage.getItem("productsInBasket");
     basketItems = JSON.parse(basketItems);
    let productsContainer = document.querySelector(".products");
    let basketCost = localStorage.getItem('totalCost');

    console.log(basketItems);
    if( basketItems && productsContainer ) {
      productsContainer.innerHTML = '';
      Object.values(basketItems).map(item => {
        productsContainer.innerHTML += `
        <div class = "product">
            <ion-icon name="close-circle-outline"></ion-icon>
             <img src = "../img/${item.tag}.jpg">  
            <span>${item.name}</span>
        </div>    
        <div class = "price">${item.price},00</div>
        <div class = "quantity">
        <ion-icon class = "decrease" name="caret-back-outline"></ion-icon>
           <span>${item.inBasket}</span>
        <ion-icon class = "increase" name="caret-forward-outline"></ion-icon>   
        </div>
        <div class = "total">
        ${item.inBasket * item.price},00
        </div>
        `;
      })

    productsContainer.innerHTML += ` 
       <div class = "basketTotalContainer">
       <h4 class = "basketTotalTitle">
          Basket Total 
       </h4>
       <h4 class = "basketTotal">
        ${basketCost},00
       </h4>   
    `

    }
}

onLoadBasketNumbers ();
displayBasket();