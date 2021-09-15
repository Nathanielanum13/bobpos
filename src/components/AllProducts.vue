<template>
  <div class="row w-100 mx-0 mt-3 product-row pt-2">
    <div
      v-for="product in products"
      :key="product.id"
      class="col-sm-12 col-md-4 p-2"
    >
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ProductCard from "@/components/ProductCard";

export default {
  name: "AllProducts",
  components: {
    ProductCard,
  },
  async setup() {
    const store = useStore()
    const products = computed(() => store.state.products.products)

    // Fetch all products 
    await store.dispatch('getProducts')

    return {
      products,
    };
  },
};
</script>

<style scoped lang="scss">
.product-row {
  max-height: 77vh;
  overflow: hidden scroll;
  transition: all .5s ease;
}
</style>