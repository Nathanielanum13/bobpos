import { createStore } from "vuex";
import storeModuleForAuth from "./authStore"
import storeModuleForProducts from "./productStore"
import storeModuleForCart from "./cartStore"
import storeModuleForSales from "./salesStore"

export default createStore({
    modules: {
        auth: storeModuleForAuth,
        products: storeModuleForProducts,
        cart: storeModuleForCart,
        sales: storeModuleForSales,
    }
})