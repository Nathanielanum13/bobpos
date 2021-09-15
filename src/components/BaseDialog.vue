<template>
  <div v-bind="$attrs" :style="{ width: width + 'px', height: height + 'px'}" class="dialog">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    width: '',
    height: ''
  }
}
</script>

<style scoped>
.dialog {
  border-radius: var(--space-xs);
  width: auto;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
}
.card {
  background-color: var(--lt-lighter);
  color: var(--lt-default-text-color);
  transition: all .25s ease;
}
</style>