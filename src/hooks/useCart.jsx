 
const useCart = ()=>{
        const addCart = (currentCart , product , customer ,quantity = 0)=>{
          let currentCartItem = [...currentCart.items] ; 
           if(currentCartItem.length > 0 ){
            let productExists = currentCartItem.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItem.findIndex((item) => item.id === product.id)
                if(productExists){
                    if(quantity){
                        currentCartItem.splice(productExistsIndex , 1 , {...productExists , purchaseQuantity : quantity})
                    }else{
                        currentCartItem.splice(productExistsIndex , 1 , {...productExists , purchaseQuantity : productExists.purchaseQuantity + 1})
                    }
                    
                }else{
                    if(quantity){
                        currentCartItem.push({...product ,purchaseQuantity : quantity})
                    }else{
                        currentCartItem.push({...product ,purchaseQuantity : 1})
                    }
                    
                }
           }else{
            if(quantity){
                currentCartItem.push({...product ,purchaseQuantity : quantity})
            }else{
                currentCartItem.push({...product ,purchaseQuantity : 1})
            }           }
           currentCart.customer = customer
           currentCart.items = currentCartItem
           currentCart.subTotal = 0;
           currentCart.tax = 0;
           currentCart.grandTotal = 0;
    
          for ( const item of currentCart.items ) {
            currentCart.subTotal += +item.price  * item.purchaseQuantity
 
        }
        currentCart.grandTotal = currentCart.subTotal + currentCart.tax 

        return currentCart
    }
        const updateCart = (currentCart , product , quantity)=>{
            let currentCartItem = [...currentCart.items] ; 
           if(currentCartItem.length > 0 ){
            let productExists = currentCartItem.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItem.findIndex((item) => item.id === product.id)
                if(productExists){
                    currentCartItem.splice(productExistsIndex , 1 , {...productExists , purchaseQuantity : quantity})
                } 
           } 
           currentCart.items = currentCartItem
           currentCart.subTotal = 0;
           currentCart.tax = 0;
           currentCart.grandTotal = 0;
    
          for ( const item of currentCart.items ) {
            currentCart.subTotal += +item.price  * item.purchaseQuantity
           
        }
        currentCart.grandTotal = currentCart.subTotal + currentCart.tax 

        return currentCart
        }
         
        const deleteCart = (currentCart , product)=>{
            let currentCartItem = [...currentCart.items] ; 
           if(currentCartItem.length > 0 ){
            let productExists = currentCartItem.find((item) => item.id === product.id)
            let productExistsIndex = currentCartItem.findIndex((item) => item.id === product.id)
                if(productExists){
                    currentCartItem.splice(productExistsIndex , 1)
                } 
           } 
           currentCart.items = currentCartItem
           currentCart.subTotal = 0;
           currentCart.tax = 0;
           currentCart.grandTotal = 0;
    
          for ( const item of currentCart.items ) {
            currentCart.subTotal += +item.price  * item.purchaseQuantity
           
        }
        currentCart.grandTotal = currentCart.subTotal + currentCart.tax 

        return currentCart
        }

        return [addCart , updateCart , deleteCart]
}

export default useCart