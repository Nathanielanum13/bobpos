<template>
  <div class="dashboard w-100 m-0 p-0">
    <div class="row w-100 mx-0">
      <div class="col-9 p-2 product-section">
        <div class="row w-100 mx-0 my-2 product-row">
          <div class="col-1 p-0 clear-all">
            <span class="fa fa-times p-2 text-white bg-danger" @click="clearCart"></span>
          </div>
          <div class="col-4 px-1 text-truncate">
            <span class="font-weight-bold">Product name</span>
          </div>
          <div class="col-2 px-1 text-truncate">
            <span class="font-weight-bold">Qn.</span>
          </div>
          <div class="col-2 px-1 text-truncate">
            <span class="font-weight-bold">Price</span>
          </div>
          <div class="col-3 px-1 text-truncate">
            <span class="font-weight-bold">Amount</span>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="product-data">
          <div v-for="item in cart" :key="item.id" class="row w-100 mx-0 my-2 product-row-data">
            <div class="col-1 p-0 clear">
              <span class="fa fa-minus p-2 text-white" @click="removeItem(item.id)"></span>
            </div>
            <div class="col-4 px-1 text-truncate">
              <span class="figure-caption font-weight-bold">{{ item.name }}</span>
            </div>
            <div class="col-2 px-1 text-truncate">
              <span class="figure-caption font-weight-bold">
                <input v-model="item.counter" class="form-control number font-weight-bold" min="1" placeholder="1"
                       type="number" :max="item.stock">
              </span>
            </div>
            <div class="col-2 px-1 text-truncate">
              <span class="figure-caption font-weight-bold">{{ item.price }}</span>
            </div>
            <div class="col-3 px-1 text-truncate">
              <span class="figure-caption font-weight-bold">{{ (item.price * (item.counter ?? 1)).toFixed(2) }}</span>
            </div>
          </div>
          <div class="row w-100 mx-0 p-3 product-footer">
            <div class="col-12 p-2 product-footer-data">
              <div class="row w-100 mx-0 align-items-center">
                <div class="col-5 px-3 text-right text-truncate font-weight-bold">
                  <div><span class="font-weight-bold figure-caption">Subtotal : </span>{{ total.toFixed(2) }}</div>
                  <div><span class="font-weight-bold figure-caption">Tax : </span>{{ tax.toFixed(2) }}</div>
                </div>
                <div class="col-7 px-3 text-left text-truncate">
                  <span class="display-4 font-weight-bold">{{ (total + tax).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 p-2 payment-section">
        <!--Print receipt card-->
        <div class="card bg-warning save-card" @click="printCartReceipt">
          <div class="card-body text-center p-3">
            <span class="ri-bill-fill mr-2"></span>
            <span class="font-weight-bold">Print Receipt</span>
          </div>
        </div>
        <!--History on sales-->
        <div class="card history-card mt-4">
          <div class="row w-100 mx-0 mt-2 px-2">
            <div class="col-12">
              <span class="figure-caption font-weight-bold float-left">History</span>
              <span class="ri-delete-bin-4-fill text-danger float-right"></span>
            </div>
          </div>
          <div class="dropdown-divider mb-0"></div>
          <div class="card-body p-2 history-content">
            <ul class="list-unstyled figure-caption font-weight-bold">
              <li class="text-truncate">
                <span class="fa fa-check-circle text-success mr-2"></span>
                18 May 2021 13:53:21
              </li>
              <div class="dropdown-divider"></div>
              <li class="text-truncate">
                <span class="fa fa-check-circle text-success mr-2"></span>
                18 May 2021 05:03:21
              </li>
              <div class="dropdown-divider"></div>
            </ul>
          </div>
        </div>
        <!--Cash drawer card-->
        <div class="card bg-success save-card mt-4">
          <div class="card-body text-center p-3">
            <span class="ri-archive-drawer-fill mr-2 text-white"></span>
            <span class="font-weight-bold text-white">Sales Drawer {{ sales.length }}</span>
          </div>
        </div>
        <!--Undo Transaction card-->
        <div class="card bg-danger save-card mt-2">
          <div class="card-body text-center p-3">
            <span class="ri-archive-drawer-fill mr-2 text-white"></span>
            <span class="font-weight-bold text-white">Undo Sale</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {ref, watchEffect, computed} from "vue"

export default {
  name: "Dashboard",
  setup() {
    const store = useStore()

    const cart = computed(() => store.state.cart.cart)
    const clearCart = () => store.dispatch('cart/resetCart')
    const removeItem = (itemId) => store.dispatch('cart/removeCartable', itemId)
    const printCartReceipt = () => store.dispatch('cart/issueCartReceipt')

    const total = computed(() => {
      let totalPrice = 0.00
      cart.value.forEach(cartable => {
        let counter = cartable.counter ?? 1
        totalPrice = totalPrice + (cartable.price * counter)
      })
      return totalPrice
    })

    const tax = computed(() => 0.035 * total.value)

    const sales = computed(() => store.state.sales.sales)


    return {
      clearCart,
      removeItem,
      printCartReceipt,
      cart,
      total,
      tax,
      sales
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/views/checkout-view";
</style>