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
    tag: 'azure ',
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

onLoadBasketNumbers ();