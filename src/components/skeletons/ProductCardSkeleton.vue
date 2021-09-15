<template>
  <div class="card product-card w-100 h-100 stripe-card">
    <div class="card-img product-image"></div>
    <div class="card-body text-center">
      <span class="stripe-section">
        <span></span>
      </span>
      <div class="row mx-0 w-100 py-3 px-2">
        <div class="col-6 px-0 stripe-section-sm"></div>
        <div class="col-6 px-0 stripe-section-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCardSkeleton"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/product-card";
.stripe-card {
  min-height: 13rem;
  background-color: hsl(0, 0%, 93%);

  .product-image {
    height: 6rem;
    background-color: hsl(0, 0%, 90%);
    border-radius: 1rem 1rem 0 0;

    animation: fade-lt 0.5s ease infinite alternate-reverse forwards;
  }
  .stripe-section, .stripe-section-sm {
    height: 1.5rem;
    display: block;
    background-color: hsl(0, 0%, 80%);
    border-radius: 0.25rem;
    animation: fade-lt 1s ease infinite alternate-reverse forwards;
  }
  .stripe-section-sm {
    background-color: hsl(0, 0%, 90%);
    animation: none;
  }
}
</style>