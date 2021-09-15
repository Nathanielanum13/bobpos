<template>
  <div class="row w-100 mx-0 mt-3 product-row pt-2">
    <div
      v-for="product in products"
      :key="product"
      class="col-sm-12 col-md-4 p-2"
    >
      <ProductCardSkeleton :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

export default {
  name: "AllProductsSkeleton",
  components: {
    ProductCardSkeleton,
  },
  setup() {
    const products = [1, 2, 3, 4, 5, 6]
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
}
</style>