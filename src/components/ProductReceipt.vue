<template>
  <div class="product-receipt" id="product-receipt">
    <div class="header">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="logo">
      </div>
      <div class="company-name">{{ companyDetails.name }}</div>
      <div class="receipt-number">RECEIPT No. <b>{{ sales.receiptNumber }}</b></div>
      <div class="date-time">{{ new Date().toLocaleString() }}</div>
    </div>
    <div class="content">
      <table class="table">
        <thead>
        <tr>
          <td>ITEM</td>
          <td>QTN</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cartable in sales.cart" :key="cartable.id">
          <td>{{ cartable.name.substr(0, 8) }}</td>
          <td>{{ cartable.counter }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <br>
  </div>
</template>

<script>
import {toRef} from "vue";

export default {
  name: "CustomerReceipt",
  props: {
    companyDetails: {
      type: Object,
      default: {}
    },
    sales: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/components/receipt";
</style>