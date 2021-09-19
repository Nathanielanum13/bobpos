<template>
  <!--Product trail-->
  <BaseTrailer :groups="groups" @search="filterProducts" />
  <!--Products-->
  <Suspense>
    <template #default>
      <AllProducts />
    </template>
    <template #fallback>
      <AllProductsSkeleton />
    </template>
  </Suspense>
  <!-- <div class="product-pagination p-3">
    <div class="row mx-0">
      <div class="col-12 px-0 text-center">
        <span
          :class="['left', currentPage === 1 ? 'text-muted' : '']"
          @click="previousPage"
        >
          <span class="fa fa-chevron-left icons"></span>
          Prev
        </span>
        <span
          v-for="page of getNumberOfPages()"
          :key="page"
          :class="['pages', 'p-1', currentPage === page ? 'active' : '']"
          @click="currentPage = page"
        >
          {{ page }}
        </span>
        <span
          :class="['right', currentPage === maxPages ? 'text-muted' : '']"
          @click="nextPage"
        >
          Next
          <span class="fa fa-chevron-right icons"></span>
        </span>
      </div>
    </div>
  </div> -->
</template>

<script>
import BaseTrailer from "@/components/BaseTrailer";
import AllProducts from "@/components/AllProducts";
import AllProductsSkeleton from "@/components/skeletons/AllProductsSkeleton";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Products",
  components: {
    BaseTrailer,
    AllProducts,
    AllProductsSkeleton
  },
  setup() {
    const store = useStore();
    const groups = computed(() => store.getters["products/productCategories"]);

    return {
      groups,
    };
  },
};
</script>

<style scoped lang="scss">

</style>