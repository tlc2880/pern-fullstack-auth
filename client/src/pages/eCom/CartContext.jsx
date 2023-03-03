import { createContext, useState } from "react";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},

});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]); 
    // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]
    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context