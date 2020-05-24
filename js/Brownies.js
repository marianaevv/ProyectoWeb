    let btnsDec = document.querySelectorAll('.btnDec');
    let inputs = document.querySelectorAll('.cantidadInput');
    let btnsInc = document.querySelectorAll('.btnInc');
    let toppingsInfo = document.querySelectorAll('.toppingInfo');
    let arrayInput = [0,0,0,0,0,0,0,0,0];
    let pedidosAgregados = [];
    let products = [
        {topping: 'Snicker', tag: 'snicker', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'M&M', tag: 'm&m', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Oreo', tag: 'oreo', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Bubulubu', tag: 'bubulubu', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Hershey', tag: 'hershey', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Crunch', tag: 'crunch', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Milky Way', tag: 'milkyway', precio: 15, inCart: 0, inCartReal: 0 },
        {topping: 'Ferrero', tag: 'ferrero', precio: 20, inCart: 0, inCartReal: 0 },
        {topping: 'Kinder Bueno', tag: 'kinderbueno', precio: 20, inCart: 0, inCartReal: 0 },
    ]
    /*var productsJSON = [
        {"topping": "Snicker", "tag": "snicker", "precio": 15, "inCart":0},
        {"topping": "M&M", "tag": "m&m", "precio": 15, "inCart": 0},
        {"topping": "Oreo", "tag": "oreo", "precio": 15, "inCart": 0},
        {"topping": "Bubulubu", "tag": "bubulubu", "precio": 15, "inCart": 0},
        {"topping": "Hershey", "tag": "hershey", "precio": 15, "inCart": 0},
        {"topping": "Crunch", "tag": "crunch", "precio": 15, "inCart": 0},
        {"topping": "Milky Way", "tag": "milkyway", "precio": 15, "inCart": 0},
        {"topping": "Ferrero", "tag": "ferrero", "precio": 20, "inCart": 0},
        {"topping": "Kinder Bueno", "tag": "kinderbueno", "precio": 20, "inCart": 0 },
    ];*/

   // function incrementarDecrementar(){
        for(let i = 0; i< btnsDec.length;i++){
            btnsDec[i].addEventListener("click",(event)=>{
                event.preventDefault();
                if (arrayInput[i] > 0){
                    arrayInput[i] = arrayInput[i] -1;
                    inputs[i].value = arrayInput[i];
                }
            });
        }
        for(let i = 0; i<btnsInc.length;i++){
            btnsInc[i].addEventListener("click",(event)=>{
            event.preventDefault();
            console.log("click inc button")
            arrayInput[i] = arrayInput[i] + 1 ;
            inputs[i].value = arrayInput[i];
        });
        } 
 //   }

    let n = [{number:0}];
    let addedProducts = [];
    //function agregarPedido(){
        let input = document.querySelectorAll('.toppingInfo input');
        let btnAgregarPedido = document.querySelector('.btnAgregarPedido');
        var totalPorPedido = 0;
        var total = 0;
        btnAgregarPedido.addEventListener("click", (event)=>{
            event.preventDefault();
            totalPorPedido = 0; 
          addedProducts = [];
             for(let i =0; i<toppingsInfo.length;i++){
                if(input[i].value > 0 ){
                    for(let j = 0; j<input[i].value;j++){
                        addedProducts.push(products[i]);
                    }
                    totalPorPedido = totalPorPedido + (products[i].precio * inputs[i].value)
                    }
                    
            }
          //  total = total + totalPorPedido;
            costoTotal(totalPorPedido);
           let addedProductsContados = [];
           let cont = 1;
           let aux = 0;
           let k = 0;
          for(let i =0; i<addedProducts.length;i++){
              k = i + 1;
              if(k>=addedProducts.length ){
                addedProductsContados.push(addedProducts[i]);
                addedProductsContados[aux].inCart = cont;
              }else{
                  if(addedProducts[i].tag === addedProducts[k].tag){
                    cont = cont + 1;
                }else{
                    
                    addedProductsContados.push(addedProducts[i]);
                    addedProductsContados[aux].inCart = cont;
                    aux = aux + 1;
                    cont = 1;
                }
              }        
          }
          console.log("TOTAL", totalPorPedido);
            //pedidosAgregados.push(JSON.stringify(addedProductsContados)); 
          //  console.log("PRODUCTOS FINALES", pedidosAgregados);
          pedidosAgregados.push(addedProductsContados);
            cartNumber(pedidosAgregados);
            //LIMIPIAMOS INPUTS
            for(let i =0; i<inputs.length;i++){
                inputs[i].value = 0;
                arrayInput[i]=0;
            } 

        });
    //}

    function cartNumber(product){
        let productNumbers = localStorage.getItem('cartNumber');
        productNumbers = parseInt(productNumbers);
        if(productNumbers){
            localStorage.setItem('cartNumber', productNumbers + 1);
            document.querySelector('.itemNumberCart p').textContent = productNumbers + 1;
        }else{
            localStorage.setItem('cartNumber',1 );
            document.querySelector('.itemNumberCart p').textContent = 1;
        }
        setItems(product);
    }
    
    function setItems(pedidosAgr){
        let cartItems = [localStorage.getItem('productsInCart')];
        if(cartItems != null){
            if(cartItems[pedidosAgr.tag]== undefined){
                cartItems = {
                    ...cartItems,
                    [pedidosAgr.tag]:pedidosAgr
                }
            }
            cartItems[pedidosAgr.tag].inCart +=1;
        }else{
            pedidosAgr.inCart = 1;
            cartItems = {
                    [pedidosAgr.tag]:pedidosAgr
                }            
        }
       /* for(let i =0;i<pedidosAgr.length;i++){
            cartItems[i] = {[pedidosAgr[i].tag]: pedidosAgr[i]};
            
        }
       for(let i =0;i<cartItems.length;i++){
            console.log("My CartItems are", cartItems[i]);
          
        }*/
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }


  function costoTotal(costo){
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("TIPO", typeof(cartCost));
    if(cartCost != null){
        cartCost =  parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + costo);
    }else{
        localStorage.setItem('totalCost', costo)
    }
    ;
}
function onLoadCartNumbers(productosAgregados){
    let productNumbers = localStorage.getItem('cartNumber');
    if(productNumbers){
        document.querySelector('.itemNumberCart p').textContent = productNumbers;
    }
}



//incrementarDecrementar();
onLoadCartNumbers(); 
//agregarPedido(); 