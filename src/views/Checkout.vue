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
          <div class="card-body text-center px-3 py-4">
            <span class="ri-bill-fill mr-2"></span>
            <span class="font-weight-bold">Print Receipt</span>
          </div>
        </div>
        <!--Cash drawer card-->
        <div class="card bg-success save-card mt-2 position-relative" @click="toggleSalesDrawer">
          <div class="card-body text-center px-3 py-4">
            <span class="ri-archive-drawer-fill mr-2 text-white"></span>
            <span class="font-weight-bold text-white">Sales Drawer <span class="sales-counter ml-2 position-absolute">{{ sales.length }}</span></span>
          </div>
        </div>
        <!--Undo Transaction card-->
        <div class="card bg-danger save-card mt-2">
          <div class="card-body text-center px-3 py-4">
            <span class="ri-archive-drawer-fill mr-2 text-white"></span>
            <span class="font-weight-bold text-white">Undo Sale</span>
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
      </div>
    </div>
  </div>
  <transition name="slide">
    <div class="sales-drawer-container" ref="salesContainer" v-show="showSalesDrawer && sales.length !== 0">
      <div class="handle" ref="salesHandler"></div>
      <div class="row mx-0 w-100 mt-3 h-100 align-items-center">
        <div class="col-sm-12 col-md-9 sales">
          <div class="sale row w-100 mx-0 align-items-center p-2 my-1" v-for="sale in sales" :key="sale.receiptNumber">
            <div class="col-md-2 text-center p-1 bg-light border sale-receipt-number">
              <span class="font-weight-bold">RNo.{{ sale.receiptNumber }}</span>
            </div>
            <div class="col-md-6 text-truncate px-3 py-1">
              <span class="text-dark" v-for="cartItem in sale.cart" :key="cartItem.id">{{ cartItem.name + ' | ' }}</span>
            </div>
            <div class="col-md-2 text-center">
              <span class="font-weight-bold text-dark">{{ sale.totalPrice }}</span>
            </div>
            <div class="col-md-2 text-center">
              <button class="btn btn-success btn-sm btn-block">Approve</button>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 p-4">
          <div class="action-calls card bg-danger text-light text-center p-2 border-0">
            <!--<span class="card-img fa fa-close fa-2x pt-2"></span>-->
            <span class="font-weight-bold my-2">Cancel All Sales</span>
          </div>
          <div class="action-calls card bg-success text-light text-center p-2 border-0 mt-2">
            <!--<span class="card-img fa fa-check fa-2x pt-2"></span>-->
            <span class="font-weight-bold my-2">Approve All Sales</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <div class="receipt-container">
    <CustomerReceipt :sales="printableSales" :tax.number="tax" :company-details="companyDetails" />
    <ProductReceipt :sales="printableSales" :company-details="companyDetails" />
  </div>
</template>

<script>
import {useStore} from "vuex"
import {ref, computed} from "vue"
import Drag from "../services/utils/drag";
import CustomerReceipt from "../components/CustomerReceipt";
import ProductReceipt from "../components/ProductReceipt";
export default {
  name: "Dashboard",
  components: {
    CustomerReceipt,
    ProductReceipt
  },
  setup() {
    const store = useStore()

    const cart = computed(() => store.state.cart.cart)

    const clearCart = () => store.dispatch('cart/resetCart')
    const removeItem = (itemId) => store.dispatch('cart/removeCartable', itemId)


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

    // Printing Receipt Functionalities
    const companyDetails = {
      name: 'TINA COLD Ventures',
      email: 'nathanielanum13@gmail.com',
      phone: '+(233)509131631'
    }
    const printableSales = ref({})
    const printCartReceipt = () => {
      // Edge case for empty cart
      if (cart.value.length === 0) return
      // Generate and save sale
      let sales = {
        receiptNumber: Math.floor(Math.random() * 1_000_000),
        totalPrice: (total.value + tax.value).toFixed(2),
        cart: cart.value
      }
      store.dispatch('cart/addCartSale', sales)

      // Print sales receipt
      printableSales.value = sales

      setTimeout(() => {
        printJS({
          printable: 'receipt',
          type: 'html',
          targetStyles: ['*']
        })
      }, 0)
    }

    // Sales drawer functionalities
    const salesContainer = ref(null)
    const salesHandler = ref(null)
    const showSalesDrawer = ref(false)

    const toggleSalesDrawer = () => {
      const draggableContainer = new Drag(salesContainer?.value, salesHandler?.value, { max: 600, min: 400 })
      showSalesDrawer.value = !showSalesDrawer.value
      if (showSalesDrawer.value) {
        // salesContainer?.value.setAttribute("style", "height: 60vh")
        draggableContainer.listen()
      } else {
        draggableContainer.end()
      }
    }

    return {
      clearCart,
      removeItem,
      printCartReceipt,
      toggleSalesDrawer,
      cart,
      total,
      tax,
      sales,
      showSalesDrawer,
      salesContainer,
      salesHandler,
      companyDetails,
      printableSales
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/views/checkout-view";
.receipt-container {
  position: absolute;
  bottom: -200vh;
  font-size: 10px;
}
</style>