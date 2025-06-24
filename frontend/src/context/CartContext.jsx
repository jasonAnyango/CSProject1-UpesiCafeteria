import react, { createContext, useContext, useEffect, useState } from 'react'

// Create the context
const CartContext = createContext()

// Custom hook for easy access
export const useCart = () => useContext(CartContext)

// Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems')
        return storedCart ? JSON.parse(storedCart) : []
    })

    useEffect(() => {
        // Save cart items to localStorage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    // Add item to cart
    const addToCart = (item) => {
        setCartItems(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.name === item.name)

            if(existingItem) {
                // If the item is already in the cart, increase quantity
                return prevCart.map(cartItem => cartItem.name === item.name ?
                    {...cartItem, quantity: cartItem.quantity + 1} :
                    cartItem
                )
            } else {
                // If item is new, add with quantity = 1
                return [...prevCart, {...item, quantity: 1}]
            }
        })
    }

    // Remove item from cart
    const removeFromCart = (itemName) => {
        setCartItems(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.name === itemName)

            if (!existingItem) {
                return prevCart
            }

            if (existingItem.quantity > 1) {
                // Decrease quantity
                return prevCart.map(cartItem => (
                    cartItem.name === itemName
                    ? {...cartItem, quantity: cartItem.quantity - 1}
                    : cartItem
                ))
            } else {
                // Remove if quantity = 1
                return prevCart.filter(cartItem => cartItem.name !== itemName)
            }
        })
    }

    // Remove item completely regardless of quantity
    const removeItemCompletely = (itemName) => {
        setCartItems(prevCart => prevCart.filter(item => item.name !== itemName));
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeItemCompletely, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}