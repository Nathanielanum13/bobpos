export default {
    state() {
        return {
            cart: []
        }
    },
    mutations: {
        LOAD_CART: (state) =>
            state.cart = JSON.parse(window.localStorage.getItem("x-cart")),
        SAVE_CART: (state) =>
            window.sessionStorage['x-cart'] = JSON.stringify(state.cart),
        ADD_TO_CART: (state, productToAdd) => {
            // Make sure there is stock to add
            if (productToAdd.stock > 0) {
                // Check if productToAdd already exist in cart
                const assumedProductToAdd = state.cart.find(cartable => cartable.id === productToAdd.id)
                if (typeof assumedProductToAdd !== "undefined") {
                    // If it does, modify the product
                    state.cart = state.cart.map((cartable) => {
                        if (cartable.id === productToAdd.id) {
                            let counter = cartable.counter ?? 1
                            let stock = cartable.stock
                            return { ...cartable, counter: counter + 1, stock: stock - 1 }
                        }
                        return cartable
                    })
                } else {
                    // Else add productToAdd to cart
                }
            } else {
                console.log("No available stock")
            }
        }
    },
    actions: {

    },
    getters: {}
}