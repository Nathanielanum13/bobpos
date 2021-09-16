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
            window.sessionStorage['x-cart'] = JSON.stringify(state.cart)
    },
    actions: {
        addToCart: ({ state, commit }, productToAdd) => {
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
                            return {...cartable, counter: counter + 1, stock: stock - 1 }
                        }
                        return cartable
                    })
                } else {
                    // Else add productToAdd to cart
                    state.cart.push({...productToAdd, stock: productToAdd.stock - 1 })
                }
                commit('UPDATE_PRODUCT_STOCK', {...productToAdd, stock: productToAdd.stock - 1 })
                commit('SAVE_CART')
            } else {
                console.log("No available stock")
            }
        },
        resetCart: ({state, commit}) => {
            state.cart.forEach(cartable => commit('ADD_TO_PRODUCT_STOCK', cartable.id, cartable.counter ?? 1))
            state.cart = []
            commit('SAVE_CART')
        },
        removeCartable: ({state, commit}, productToRemoveId) => {
            state.cart = state.cart.filter((cartable) => {
                if (cartable.id === productToRemoveId) {
                    commit('ADD_TO_PRODUCT_STOCK', cartable.id, cartable.counter ?? 1)
                    return
                }
                return cartable
            })
        },
        issueCartReceipt: ({state, dispatch}) => {
            state.cart.forEach(cartable => {
                dispatch('saveProductStockTransaction', cartable)
                dispatch('resetCart', cartable)
            })
        }
    },
    getters: {}
}