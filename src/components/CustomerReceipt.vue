<template>
  <div class="receipt" id="receipt">
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
            <td>QTN/P</td>
            <td>AMT.</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cartable in sales.cart" :key="cartable.id">
            <td>{{ cartable.name.substr(0, 8) }}</td>
            <td>{{ cartable.counter + '/' + cartable.price }}</td>
            <td>{{ cartable.counter * cartable.price }}</td>
          </tr>
          <tr>
            <td><b>TAX</b></td>
            <td></td>
            <td>{{ tax.toFixed(2) }}</td>
          </tr>
          <tr>
            <td><b>TOTAL</b></td>
            <td></td>
            <td>{{ sales.totalPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <div class="footer">
      <br>
      <div class="company-name">{{ companyDetails.name }}</div>
      <div class="email">{{ companyDetails.email }}</div>
      <div class="phone">{{ companyDetails.phone }}</div>
      <br>
      <div class="email">TRANSACTION SUCCESSFUL</div>
      <div class="closure"><b>THANKS FOR YOUR PATRONAGE</b></div>
    </div>
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
    },
    tax: {
      type: Number,
      default: 0.00
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/components/receipt";
</style>