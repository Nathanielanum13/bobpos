export default {
    namespaced: true,
    state() {
        return {
            sales: []
            // { receiptNumber, total }
        }
    },
    mutations: {
        ADD_SALES: (state, sale) => {
            state.sales.push(sale)
        }
    },
    actions: {
        // approve sale...
        // 1. Make api call to approve sales
        // 2. Reflect changes in UI

        // add sales
        addSales: ({commit}, sale) => {
            commit('ADD_SALES', sale)
        }
        // Remove sales
    },
    getters: {}
}