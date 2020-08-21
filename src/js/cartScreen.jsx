import React, { useEffect, useState } from 'react'
import { useShoppingContext } from '../contexts/shoppingContext'
import TopBar from './topbar'
import CloseIcon from '@material-ui/icons/Close';


export default function CartScreen () {
    const shoppingContext = useShoppingContext()

   let [cartContent, setCartContent] = useState([]);

   useEffect(() => {
        setCartContent(<div>{renderCartItems()}</div>)
   }, [shoppingContext.cartIsDirty])

    function renderCartItems() {
        let cartItems = []
        let total = 0.00;
        for (let i = 0; i < shoppingContext.cart.length; i++) {
            console.log(shoppingContext.cart[i].price)
            total = total + shoppingContext.cart[i].price
            cartItems.push(
                <div id="CartItem">
                    <img id = "CartItemImage" src = {shoppingContext.cart[i].imageUrl}></img>
                    <div id="CartItemTexts">
                        <span id="CartItemTextName">{shoppingContext.cart[i].name}</span>
                        <span id="CartItemTextPrice">${Math.round(shoppingContext.cart[i].price)}</span>
                        <div id = "CartExitIcon" onClick={() => shoppingContext.removeCartItem(i)}><CloseIcon/></div>
                    </div>
                </div>
            )
        }
        return (
            <div id = "CartItems">{cartItems}
                <div id="Total">Total: ${total}</div>
            </div>
        )
    }

    

    return (
        <div>
            <TopBar
                title = {"Cart"}
            />
            {cartContent}
            
        </div>
    )
}