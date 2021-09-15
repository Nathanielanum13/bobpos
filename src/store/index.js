import { createStore } from "vuex";
import storeModuleForAuth from "./authStore"
import storeModuleForProducts from "./productStore"
import storeModuleForCart from "./cartStore"

export default createStore({
    modules: {
        auth: storeModuleForAuth,
        products: storeModuleForProducts,
        cart: storeModuleForCart
    }
})