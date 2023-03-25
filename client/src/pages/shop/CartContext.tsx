import { createContext, useState, ReactNode, useCallback } from "react";
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
    
    const getProductQuantity = useCallback((id: string) => {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        if ((quantity === undefined) || (quantity === null)) {
            return 0;
        }
        return quantity;
    }, [ cartProducts ]);

    const addOneToCart = useCallback((id: string) => {
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
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity + 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }, [cartProducts, getProductQuantity]);

    const removeOneFromCart = useCallback((id: string) => {
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
    }, [setCartProducts, getProductQuantity, cartProducts]);

    function deleteFromCart(id: string) {
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
        return totalCost.toFixed(2);
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