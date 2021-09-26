import {customerReceipt} from "../services/utils/receiptGenerator";

export default {
    namespaced: true,
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
        addToCart: ({state, commit, dispatch}, productToAdd) => {
            // Make sure there is stock to add
            if (productToAdd.temp_stock > 0) {
                // Check if productToAdd already exist in cart
                const assumedProductToAdd = state.cart.find(cartable => cartable.id === productToAdd.id)
                if (typeof assumedProductToAdd !== "undefined") {
                    // If it does, modify the product
                    state.cart = state.cart.map((cartable) => {
                        if (cartable.id === productToAdd.id) {
                            let counter = cartable.counter ?? 1
                            let stock = cartable.temp_stock
                            return { ...cartable, counter: counter + 1, temp_stock: stock - 1 }
                        }
                        return cartable
                    })
                } else {
                    // Else add productToAdd to cart
                    state.cart.push({...productToAdd, temp_stock: productToAdd.temp_stock - 1, counter: 1})
                }
                dispatch('products/updateTempProductStock', { id: productToAdd.id, stock: productToAdd.temp_stock - 1 }, { root: true })
                commit('SAVE_CART')
            } else {
                console.log("No available stock")
            }
        },
        resetCart: ({state, commit, dispatch}) => {
            state.cart.forEach(cartable => {
                let counter = cartable.counter ?? 1
                let stockToAdd = counter - (counter - (cartable.stock - cartable.temp_stock))
                dispatch('products/addTempProductStock', {
                    id: cartable.id, stock: stockToAdd
                }, {root: true})
            })
            state.cart = []
            commit('SAVE_CART')
        },
        removeCartable: ({state, commit, dispatch}, productToRemoveId) => {
            state.cart = state.cart.filter(cartable => {
                if (cartable.id === productToRemoveId) {
                    let counter = cartable.counter ?? 1
                    let stockToAdd = counter - (counter - (cartable.stock - cartable.temp_stock))
                    dispatch('products/addTempProductStock', {
                        id: cartable.id, stock: stockToAdd }, { root: true })
                    return
                }
                return cartable
            })
            commit('SAVE_CART')
        },
        addCartSale: ({ state, dispatch, commit }, sales) => {
            // Edge case for empty cart
            if (state.cart.length === 0) return
            // Pass receipt and other details to sale drawer and save sales
            dispatch('sales/addSales', sales, { root: true })

            state.cart.forEach(cartable => {
                dispatch('products/updateTempProductStock', {
                    id: cartable.id, stock: cartable.stock - (cartable.counter ?? 1)
                }, {root: true})
            })

            state.cart = []
            commit('SAVE_CART')
        }
    },
    getters: {

    }
}