import axios from "axios"
import authHeader from "../services/utils/authHeader"

export default {
    state() {
        return {
            products: []
        }
    },
    mutations: {
        UPDATE_PRODUCTS: (state, products) => {
            state.products = products
        },
        UPDATE_PRODUCT_STOCK: (state, targetProduct) => {
            state.products = state.products.map((product) => {
                return product.id === targetProduct.id ? {
                    ...product,
                    stock: targetProduct.stock
                } : product
            })
        },
        ADD_TO_PRODUCT_STOCK: (state, targetProductID, stockToAdd) => {
            state.products = state.products.map((product) => product.id === targetProductID ? {
                ...product,
                stock: +product.stock + stockToAdd
            } : product)
        }
    },
    actions: {
        getProducts: async({ commit }) => {
            try {
                await axios.get(`${process.env.VUE_APP_API}/products`, {
                    headers: { 'Content-type': 'application/json' }
                }).then(resp => commit('UPDATE_PRODUCTS', resp.data))
            } catch (error) {
                throw (`Error at getProduct() \n ${error}`)
            }
        },
        reduceProductStock: ({ commit }, product) => {
            commit('UPDATE_PRODUCT_STOCK', product)
        },
        addProductStock: ({ commit }, productId, stockToAdd) => {
            commit('ADD_TO_PRODUCT_STOCK', productId, stockToAdd)
        },
        saveProductStockTransaction: async({ commit }, productToUpdate) => {
            try {
                await axios.put(
                    `${process.env.VUE_APP_API}/products/${productToUpdate.id}`,
                    JSON.stringify({...productToUpdate, counter: null }), {
                        headers: {...authHeader()}
                    }
                ).then(resp => commit('UPDATE_PRODUCT_STOCK', resp.data))
            } catch (error) {
                throw (`Error at saveProductStockTransaction() \n ${error}`)
            }
        }
    },
    getters: {
        productCategories: (state) => {
            let categories = []

            state.products.forEach(product => {
                let category = product["category"]
                if (!categories.includes(category)) {
                    categories.push(category)
                }
            })
            return categories
        },
        getProductById: (state) => (id) => {
            return state.products.find(product => product.id === +id)
        }
    }
}