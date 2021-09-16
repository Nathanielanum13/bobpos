<template>
  <BaseDialog class="card" width="325">
    <div class="card-body">
      <div class="logo-container text-center p-2">
        <img
          alt="Bobpos logo"
          class="img-fluid"
          src="../assets/img/logo.png"
          width="100"
        />
      </div>
      <div class="dropdown-divider"></div>
      <h5 class="card-title font-weight-bold text-center">Login</h5>
      <form novalidate @submit.prevent="doLogin($event)">
        <BaseInput
          label="username"
          icon="fa fa-user"
          place="Please enter your username"
          type="username"
        />
        <div class="mt-2 see"></div>
        <BaseInput
          label="password"
          icon="fa fa-key"
          place="Please enter your password"
          type="password"
        />
        <p class="my-3 figure-caption">
          I have <a href="#">forgotten</a> my credentials
        </p>
        <button class="btn btn-block btn-success mt-2">Get in</button>
      </form>
    </div>
  </BaseDialog>
</template>
<script>
import BaseDialog from "@/components/BaseDialog";
import BaseInput from "@/components/BaseInput";
import BaseList from "@/components/BaseList";

import useAuthentication from "@/services/useAuthentication";

// import { useStore } from "vuex";
export default {
  name: "Login",
  components: {
    BaseDialog,
    BaseInput,
    BaseList,
  },
  setup() {
    const { login } = useAuthentication();
  
    const doLogin = async (formEvent) => {
      const formData = {
        username: formEvent.target[0].value,
        password: formEvent.target[1].value,
      };
      await login(formData)
    };

    return {
      doLogin,
    };
  },
};
</script>
<style scoped lang="scss">
.logo-container {
  border-radius: inherit;
}
</style>