import {ref} from "vue"

const products = ref([])
const productCategories = ref([])

export default function useProduct() {
    const getProducts = async () => {
        try {
            await fetch(`${process.env.VUE_APP_BOB_POS_API}/products`, {
                method: "GET",
                headers: {
                    /*"trace-id" : "750b464c-afc1-4170-8f57-fecb37407849",*/
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((data) => {
                    products.value = data
                })
        } catch (e) {
            return e
        }
    }

    const reduceProductStock = (newProduct) => {
        products.value = products.value.map((product) => {
            let stock = product.stock
            return product.id === newProduct.id ? {
                ...product, stock: newProduct.stock
            } : product
        })
    }
    const addProductStock = (productId, stockToAdd) => {
        products.value = products.value.map((product) => product.id === productId ? {
            ...product,
            stock: product.stock + stockToAdd
        } : product)
    }
    const saveTransaction = (cart = []) => {
        cart.forEach( async (productInCart) => {
            await fetch(`${process.env.VUE_APP_BOB_POS_API}/products/${productInCart.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({...productInCart, counter: null})
                }).then((res) => res.json())
                .then((data) => reduceProductStock(data))
        })
    }

    // Get all product categories
    const getProductCategories = async() => {
        productCategories.value = []
        let data;
        try {
            data = await fetch(`${process.env.VUE_APP_BOB_POS_API}/categories`, {
                method: 'GET',
                headers: {
                    /*"trace-id": "824cbb96-ea99-4f49-afa2-dd2dfd49dd5d",*/
                    'Content-type': 'application/json'
                }
            }).then((res) => res.json())
        } catch(e) {
            console.log("Something went wrong")
        }
        data.data.forEach((data) => productCategories.value.push(data.name))
    }
    return {
        getProducts,
        reduceProductStock,
        addProductStock,
        saveTransaction,
        getProductCategories,
        products,
        productCategories
    }
}