<template>
  <span class="checkbox">
    <input :id="labelFor" type="checkbox" v-bind="$attrs">
    <span class="check-indicator"></span>
  </span>
  <label class="px-2 font-weight-bold figure-caption" :for="labelFor">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "BaseCheck",
  props: {
    labelFor: {
      type: String,
      default: 'checkbox'
    }
  }
}
</script>

<style scoped lang="scss">
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.checkbox {
  border: 2px solid var(--lt-primary);
  width: 18px;
  height: 18px;

  position: relative;

  border-radius: 50%;

.check-indicator {
  width: 10px;
  height: 10px;
  display: none;
  border-radius: 50%;
  background-color: var(--lt-primary);
@include center;
}
input[type="checkbox"] {
@include center;
  opacity: 0;
  z-index: 10;

&:checked + .check-indicator {
   display: block;
   transition: all 100ms ease-in;
 }
}

}
</style>