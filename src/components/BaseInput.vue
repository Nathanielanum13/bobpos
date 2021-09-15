<template>
  <div class="input-group">
    <label v-if="label.length" :for="label" class="text-capitalize">{{
      label
    }}</label>
    <input
      :id="label"
      v-bind="$attrs"
      :class="[
        icon.length ? 'input-icon-padding' : '',
        type === 'password' ? 'password-icon-padding' : '',
      ]"
      :name="label ?? type"
      :placeholder="place ?? label"
      :required="
        label === 'username' || type === 'email' || type === 'password'
      "
      :type="type ?? 'text'"
      ref="inputReference"
    />
    <span v-if="icon.length" :class="[icon, 'icon']"></span>
    <span
      v-if="type === 'password'"
      :class="[
        isOpened ? 'fa-eye' : 'fa-eye-slash',
        'fa',
        'icon',
        'icon-eye',
        'ml-auto',
      ]"
      @click="toggleEye"
    ></span>
  </div>
</template>
<script>
import { ref, toRef } from "vue";
export default {
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: String,
    place: String,
    icon: {
      type: String,
      default: "",
    },
  },
  setup() {
    const inputReference = ref(null);

    const isOpened = ref(false);
    const toggleEye = () => {
      isOpened.value = !isOpened.value;
      isOpened.value
        ? inputReference.value.setAttribute("type", "text")
        : inputReference.value.setAttribute("type", "password");
    };
    return {
      isOpened,
      inputReference,
      toggleEye,
    };
  },
};
</script>
<style lang="scss" scoped>
.input-group {
  position: relative;
}
.icon {
  position: absolute;
  left: var(--space-sm);
  bottom: calc(var(--space-sm) - 2.5px);
}
.icon-eye {
  width: max-content;
  right: 5% !important;
}

label {
  display: block;
  font-weight: bold;
  font-size: 1em;
  text-align: left;
}

input {
  display: block;
  width: 100%;
  padding: calc(var(--space-xs) + 0.125rem) var(--space-sm);
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--lt-muted);
  background-color: var(--lt-input-bg);
  background-clip: padding-box;
  border: 1px solid var(--lt-light-muted);
  border-radius: 0.25rem;

  &:focus {
    outline: none;
    // background-color: transparent;
  }
}

.input-icon-padding {
  padding: calc(var(--space-xxs) + 0.125rem) var(--space-sm)
    calc(var(--space-xxs) + 0.125rem) var(--space-xlg);
}

.password-icon-padding {
  padding: calc(var(--space-xxs) + 0.125rem) var(--space-xlg);
}
</style>