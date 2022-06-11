let addButtons=document.querySelectorAll('.cartItem__addToCartBtn-body');

    let names=document.body.querySelectorAll('.cartItem__discription');
    let aidArray=[];
    names.forEach(item=>{
        aidArray.push(item.getElementsByTagName('span'))  ;
    })
    names=[];
    aidArray.forEach(i=>{
        names.push(i[0].outerText);
    })
/**--------------------------------------------------------------------get names of goods */


    let prices=document.body.querySelectorAll('.cartItem__price');
    let aidArray2=[];
    prices.forEach(i=>{

      
       aidArray2.push((i.innerText.replace(/[А-Я]/gui,'').substring(0,i.innerText.replace(/[А-Я]/gui,'').lastIndexOf('.'))).trim());

    })

    prices=JSON.parse(JSON.stringify(aidArray2));

/**--------------------------------------------------------------------get prices of goods */

let codes=document.body.querySelectorAll('.cartItem__code');
let aidArray3=[];
codes.forEach(item=>{
    aidArray3.push(item.getElementsByTagName('span'))  ;
})
codes=[];
aidArray3.forEach(i=>{
    codes.push(i[0].outerText);
})


/**--------------------------------------------------------------------get codes of goods */


let products=[];

for(let i=0;i<codes.length;i++){
    products.push({
        name:names[i],
        codeID:codes[i],
        price:prices[i],
        inCart:0,
    })
}
/**--------------------------------------------------------------------produce goods collection */

/*addButtons.forEach(item=>{
    item.addEventListener('click',()=>{
        setStorage();
    })
})*/

for(let i=0;i<products.length;i++){
    addButtons[i].addEventListener('click',()=>{
        setStorage(products[i]);
        countTotalPrice(products[i]);
    })
}

function onLoadCartNumbers(){
    let productsNumbers=+(localStorage.getItem('cartNumbers'));
    if(productsNumbers){
        let banerOfNum=document.body.querySelector('.iconsHeader__numbersInCart');
        if(banerOfNum!=null){
            banerOfNum.classList.add('showMe');
            banerOfNum.innerHTML=productsNumbers;
        }
    }
}
onLoadCartNumbers();


function setStorage(product){
    let productsNumbers=+(localStorage.getItem('cartNumbers'));
    if(productsNumbers){
        localStorage.setItem('cartNumbers',productsNumbers+1);
        let banerOfNum=document.body.querySelector('.iconsHeader__numbersInCart');
        banerOfNum.classList.add('showMe');
        banerOfNum.innerHTML=productsNumbers;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        let banerOfNum=document.body.querySelector('.iconsHeader__numbersInCart');
        if(banerOfNum!=null){
            banerOfNum.classList.add('showMe');
            banerOfNum.innerHTML=1;
        }

    }
    setItem(product)
}
console.log(1);
function setItem(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    console.log(cartItems);

    if(cartItems!= null){

        if(cartItems[product.name]==undefined){
            cartItems={   ...cartItems,
                [product.name]:product
            };

        }
        cartItems[product.name].inCart+=1;

    }
    else{
        product.inCart=1;
        cartItems={
            [product.name]:product
        }
    }
    console.log(JSON.parse(localStorage.getItem('productsInCart')) );
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function countTotalPrice(product){
    let cartCost=localStorage.getItem('totalCost');
    if(cartCost!=null){
        cartCost=+cartCost;
        localStorage.setItem('totalCost',cartCost+(+product.price));
    }
    else{
        localStorage.setItem('totalCost',+product.price);
    }
}
function displayCart(){
let cartItems=JSON.parse(localStorage.getItem('productsInCart'));
let productsInnerPoint=document.body.querySelector('.toBuy__downsideRow-body');
console.log(productsInnerPoint);

if(cartItems && productsInnerPoint){
    productsInnerPoint.innerHTML='';
    Object.values(cartItems).map(item=>{
        console.log(item.name.replace(/ /gm,''));
        productsInnerPoint.innerHTML+=`
        <div class="toBuy__item">
        <div class="toBuy__item-body">
            <div class="toBuy__imgContainer">
                <img src="../img/catalog/${item.name.replace(/ /gm,'')}.png" alt="jar of paint">
            </div>
            <div class="toBuy__discription">
                <div class="toBuy__characteristic">
                    Краска для винила и кожи белая MOTIP 400мл 04065 
                </div>
                <div class="toBuy__color">
                    <span>Цвет:</span>    Белый
                </div>
                <div class="toBuy__volume">
                    <span>Обьем</span>    400 мл
                </div>
            </div>
            <div class="toBuy__codeNumbers">
                <div class="toBuy__codeNumbers-body">
                    <span>КОД:</span>${item.codeID}
                </div>
            </div>
            <div class="toBuy__amountInCart">
                <div class="toBuy__minus-body">
                    <div class="toBuy__minus-cyst">
                        <div class="toBuy__minus"></div>
                    </div>
                </div>
                <div class="toBuy__amountNumber-body">
                    <p class="toBuy__count">
                        ${item.inCart}
                    </p>
                </div>
                <div class="toBuy__plus-body">
                    <div class="toBuy__plus-cyst">
                        <div class="toBuy__plus-first"></div>
                        <div class="toBuy__plus-second"></div>
                    </div>
                </div>
                <div class="toBuy__delete-body">
                    <div class="toBuy__delete-cyst">
                        <div class="toBuy__delete">
                            <div class="toBuy__delete-right"></div>
                            <div class="toBuy__delete-left"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="toBuy__perUnit">
                <div class="toBuy__price">${item.price}
                    <p class="toBuy__priceCurrency">грн.</p>
                </div>
            </div>
            <div class="toBuy__forAllInUnit">
                <div class="toBuy__priceAll">${item.inCart*item.price}
                    <p class="toBuy__priceCurrencyAll">грн.</p>
                </div>
            </div>
        </div>
    </div>
        `
    })
    let cartCost=localStorage.getItem('totalCost');
    let allPriceInnerPoint=document.body.querySelectorAll('.rightButtom__preliminarily-number');
    console.log(allPriceInnerPoint[2]);
    allPriceInnerPoint[2].innerHTML='';
    allPriceInnerPoint[2].innerHTML+=(+cartCost).toFixed(2) ;
}
}
displayCart();