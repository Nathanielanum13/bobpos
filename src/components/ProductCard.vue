<template>
  <div class="card product-card w-100 h-100">
    <div class="card-img product-image text-center">
      <object
        :data="product.url"
        class="img-fluid image"
      >
        <img
          :alt="product.name"
          class="img-fluid image"
          height="200"
          src="@/assets/img/products/no-photo.png"
        />
      </object>
      <!-- <img
        :alt="product.name"
        class="img-fluid image"
        height="200"
        src="https://cdn.pixabay.com/photo/2015/11/07/11/22/pillows-1031079_960_720.jpg"
      /> -->
      <!-- <img :alt="product.name" class="img-fluid image" height="200" :src="`data:image/jpeg;base64,` + product.image">-->
    </div>
    <div class="card-body text-center">
      <h6
        :data-caption="product.name"
        class="card-title font-weight-bold text-truncate product-title"
      >
        {{ product.name }}
      </h6>
      <span class="figure-caption font-weight-bold">
        {{ product.weight }} |
        <span
          :class="
            product.stock > 50
              ? 'text-success'
              : 50 > product.stock && product.stock > 25
              ? 'text-warning'
              : 'text-danger'
          "
          >{{ product.stock }}
        </span>
        in stock
      </span>
      <div class="row mx-0 w-100 align-items-center">
        <div class="col-6 px-0">
          <span class="h5 font-weight-bold product-price"
            >C{{ product.price }}</span
          >
        </div>
        <div class="col-6 px-0 text-center">
          <span
            class="text-danger ri-add-circle-fill fa-2x product-add"
            @click.stop="addToLocalCart(product)"
          ></span>
        </div>
      </div>
    </div>
    <div
      class="edit-product"
      v-if="showEditProduct"
      @click="editProduct(product.id)"
    >
      <span class="fa fa-pencil"></span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  setup() {
    const store = useStore();

    const addToLocalCart = (product) => {
      store.dispatch("addToCart", product);
    };

    const showEditProduct = computed(
      () => store.state.auth.isAuthorizedToWrite
    );

    const router = useRouter();
    const editProduct = (id) => {
      router.push(`/home/products/${id}`);
    };

    return {
      addToLocalCart,
      editProduct,
      showEditProduct,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/product-card";
</style>