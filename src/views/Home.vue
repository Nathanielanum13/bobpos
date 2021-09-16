<template>
  <div class="content">
    <div class="drawer">
      <div class="row mx-0 w-100 p-2 p-md-3">
        <div class="drawer-logo col-12 px-0 my-3 text-center">
          <img
            alt="software-logo"
            class="img-fluid"
            src="@/assets/img/logo.png"
            width="100"
          />
        </div>
        <div class="drawer-content col-12 mt-2">
          <ul class="list-unstyled mb-0">
            <BaseList class="mb-1 mt-3" icon="ri-dashboard-line" label="Checkout" to="home" />
            <BaseList
              class="mb-1"
              icon="ri-product-hunt-line"
              label="Products"
              to="home/products"
            />
            <BaseList
              class="mb-1"
              icon="ri-message-3-fill"
              label="Message"
              to="amount"
            />
            <BaseList
              class="mb-1"
              icon="ri-bill-line"
              label="Bills"
              to="amount"
            />
            <BaseList
              class="mb-1"
              icon="ri-settings-2-line"
              label="Settings"
              to="amount"
            />

            <li
              class="
                mt-3
                mb-2
                pl-3
                figure-caption
                font-weight-bold
                text-muted
                small-font
              "
            >
              Others
            </li>
            <BaseList
              class="mb-1"
              icon="ri-settings-2-line"
              label="Notification"
              to="amount"
            >
              <span class="float-right notification-badge">3</span>
            </BaseList>
            <BaseList
              class="mb-1"
              icon="ri-hand-heart-line"
              label="Support"
              to="amount"
            />
            <BaseList
              v-if="currentUser.type === 'entry'"
              icon="ri-product-hunt-line"
              label="Manage Products"
              to="manage-products"
            />
          </ul>
          <div class="row mx-0 mt-5 w-100 user-profile">
            <div class="col-12 p-2">
              <div class="card user-profile-card">
                <div class="user-profile-image">
                  <img
                    :src="require(`../assets/img/users/${currentUser.profile}`)"
                    alt="profile-picture"
                    class="profile-picture img-fluid"
                    width="50"
                  />
                </div>
                <div class="card-body text-center">
                  <div class="figure-caption username">
                    {{ currentUser.username }}
                  </div>
                  <div
                    class="
                      small-font
                      text-capitalize text-muted
                      font-weight-bold
                    "
                  >
                    {{ currentUser.type }}
                    personnel
                  </div>
                  <button
                    class="btn btn-sm btn-block btn-dark mt-2 open-profile"
                    @click="doLogout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main m-0 p-4">
      <div class="row mx-0 w-100 first-row mb-4">
        <div class="col-sm-8 col-md-7 p-0">
          <span class="px-3 py-2 fa ri-arrow-left-line back-arrow mr-2"></span>
          <span
            :class="[
              $route.path ? 'text-dark' : 'text-muted',
              'font-weight-bold',
              'small-font',
              'ml-2',
            ]"
          >
            {{ $route.name }}
          </span>
        </div>
        <div
          v-if="$route.path === '/home/products'"
          class="col-sm-4 col-md-2 p-0 m-auto"
        >
          <span class="fa fa-shopping-cart text-danger mr-2"></span>
          <span class="badge badge-warning font-weight-bold">{{
           cartSize
          }}</span>
        </div>
        <div class="d-none d-md-block col-md-3 p-0">
          <BaseInput
            class="search-input"
            place="Search here ..."
            type="search"
            icon="fa fa-search"
            @target="searchByQuery"
          />
        </div>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import BaseList from "@/components/BaseList";
import BaseInput from "@/components/BaseInput";

import { computed } from "vue";
import { useStore } from "vuex";
import useAuthentication from "@/services/useAuthentication";

export default {
  name: "Home",
  components: {
    BaseList,
    BaseInput,
  },
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.auth.user);
    const cartSize = computed(() => store.state.cart.cart.length)

    // Check and permissions to enable 
    // and disable certain features

    store.dispatch('checkPermission')

    const { logout } = useAuthentication()
    const doLogout = async () => {
      await logout()
    }
    return {
      currentUser,
      doLogout,
      cartSize
    };
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/views/home-view"
</style>