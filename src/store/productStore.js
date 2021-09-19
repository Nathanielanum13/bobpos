import axios from "axios"
import authHeader from "../services/utils/authHeader"

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    mutations: {
        UPDATE_PRODUCTS: (state, products) => {
            state.products = products.map((product => ({...product, temp_stock: product.stock})))
        },
        UPDATE_PRODUCT_STOCK: (state, { id, stock }) => {
            state.products = state.products.map(product => {
                return product.id === id ? {
                    ...product,
                    stock: stock,
                    temp_stock: stock
                } : product
            })
        },
        UPDATE_TEMP_PRODUCT_STOCK: (state, { id, stock }) => {
            state.products = state.products.map(product => {
                return product.id === id ? {
                    ...product,
                    temp_stock: stock
                } : product
            })
        },
        ADD_TO_TEMP_PRODUCT_STOCK: (state, { id, stock }) => {
            state.products = state.products.map(product => product.id === id ? {
                ...product,
                temp_stock: +product.temp_stock + +stock
            } : product)
        },

        ADD_TO_PRODUCT_STOCK: (state, { id, stock }) => {
            state.products = state.products.map(product => product.id === id ? {
                ...product,
                stock: +product.stock + +stock
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
        updateTempProductStock: ({ commit }, { id, stock }) => {
            commit('UPDATE_TEMP_PRODUCT_STOCK', { id, stock })
        },
        addTempProductStock: ({ commit }, { id, stock }) => {
            commit('ADD_TO_TEMP_PRODUCT_STOCK', { id, stock })
        },
        saveProductStockTransaction: async({ commit }, productToUpdate) => {
            try {
                await axios.put(
                    `${process.env.VUE_APP_API}/products/${productToUpdate.id}`,
                    JSON.stringify({ ...productToUpdate, counter: null }), {
                        headers: {...authHeader()}
                    }
                ).then(resp => resp.data)
                    .then(data => commit('UPDATE_PRODUCT_STOCK', {
                        id: data?.id, stock: data?.stock
                    }))
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