import {ref} from 'vue'
import useProductFactory from "@/services/useProductFactory";

const cart = ref(JSON.parse(window.sessionStorage.getItem('x-cart')) ?? [])
export default function useCart() {
    const {reduceProductStock, addProductStock, saveTransaction} = useProductFactory()

    // Add to cart
    const addToCart = (productObject) => {
        // Check if there is stock
        if (productObject.number_in_stock > 0) {
            // Check if the product exits in the cart
            const filteredProduct = ref(cart.value.filter(product => product.id === productObject.id)[0])
            if (cart.value.length && typeof filteredProduct.value !== "undefined" && filteredProduct.value.id === productObject.id) {
                cart.value = cart.value.map((product) => {
                    let counter = product.counter ?? 1
                    let stock = product.stock
                    return product.id === productObject.id ? {
                        ...product,
                        counter: counter + 1,
                        stock: stock - 1
                    } : product
                })
                // Change product stock value
                reduceProductStock({...productObject, stock: productObject.stock - 1})

            } else {
                // Add object to cart array; Where stock = stock - 1
                cart.value.push({...productObject, stock: productObject.stock - 1})
                // Reduce Product stock by 1
                reduceProductStock({...productObject, stock: productObject.stock - 1})
            }
        } else {
            console.log('No stock available')
        }
        saveCart()
    }
    // Remove from cart
    const removeProduct = (productId) => {
        // Get counter as stockToAdd
        let stockToAdd = 1
        cart.value.filter((product) => product.id === productId ? stockToAdd = product.counter ?? 1 : stockToAdd)

        // Removing item from cart
        cart.value = cart.value.filter((product) => product.id !== productId)

        // Add removed item stocks to target product stock
        addProductStock(productId, stockToAdd)

        saveCart()
    }
    // Reset cart
    const resetCart = () => {
        // Use cart counter value to update product stocks
        for (let productInCart = 0; productInCart < cart.value.length; productInCart++) {
            addProductStock(cart.value[productInCart].id, cart.value[productInCart].counter ?? 1)
        }
        // Empty the cart
        cart.value = []
        saveCart()
    }

    const printCartReceipt = () => {
        // Save Transaction
        saveTransaction(cart.value)
        // TODO Issue a receipt
        // Clear the cart
        resetCart()
    }

    const saveCart = () => window.sessionStorage['x-cart'] = JSON.stringify(cart.value)

    return {
        cart,
        addToCart,
        removeProduct,
        resetCart,
        printCartReceipt
    }
}