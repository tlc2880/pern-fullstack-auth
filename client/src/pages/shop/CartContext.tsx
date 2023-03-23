import { createContext, useState, ReactNode } from "react";
import useProducts from "./useProducts";
import quantityType from '../../quantity.Type'

export const CartContext = createContext({
    items: [],
    getProductQuantity: (id: string) => {},
    addOneToCart: (id: string) => {},
    removeOneFromCart: (id: string) => {},
    deleteFromCart: (id: string) => {},
    getTotalCost: () => {}
});

type CartProviderProps = {
    children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
    const { getProductData } = useProducts();
    const [cartProducts, setCartProducts] = useState<quantityType[]>([]); 
    
    function getProductQuantity(id: string): number {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if ((quantity === undefined) || (quantity === null)) {
            return 0;
        }
        return quantity;
    }

    function addOneToCart(id: string) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) { // product is not in cart
            setCartProducts(
                [ ...cartProducts, 
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { // product is in cart
            // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity + 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function removeOneFromCart(id: string) {
        const quantity = getProductQuantity(id);
        if(quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity - 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function deleteFromCart(id: string) {
        // [] if an object meets a condition, add the object to array
        // [product1, product2, product3]
        // [product1, product3]
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })  
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach(item => {
            const productData = getProductData(item.id);
            if (productData !== undefined) {
                totalCost += (productData.price * item.quantity);
            }
            else {
                totalCost = 0;
            }
        })
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        // @ts-expect-error
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context