import React, {useState, useContext} from 'react'

export const ShoppingContext = React.createContext(null)

export function useShoppingContext() {
    return useContext(ShoppingContext)
}

function ShoppingProvider(props) {

    const [items, setItems] = useState()
    const [categories, setCategories] = useState([])
    const [categoriesIsDirty, setCategoriesIsDirty] = useState(false)
    const [cart, setCart] = useState([])
    const [cartIsDirty, setCartIsDirty] = useState(false)

    function updateCart(newItem) {
        cart.push(newItem)
    }

    function removeCartItem(id) {
        let newCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (i != id) newCart.push(cart[i])
        }
        setCart(newCart)
        setCartIsDirty(!cartIsDirty)
    }

    function getCatalog() {
        fetch("http://localhost:8081/api/categories", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json"
            })
        }).then(r => {
            return r.json()
        }).then(r => {
            console.log(r)
            setItems(r)
            let newCategories = []
            for (let i = 0; i < r.length; i++) {
                let newCategory = {
                    name: r[i].name,
                    path: r[i].path,
                }
                newCategories.push(newCategory)
            }
            setCategories(newCategories)
            setCategoriesIsDirty(!categoriesIsDirty)
            
        })
    }

    return (
        <ShoppingContext.Provider value={{
            items,
            categories,
            getCatalog,
            categoriesIsDirty,
            updateCart, 
            cart,
            removeCartItem,
            cartIsDirty,
            setCart,
        }}>
        {props.children}
        </ShoppingContext.Provider>
    )
}

export default ShoppingProvider