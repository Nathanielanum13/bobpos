<template>
  <li :class="[$route.path === `/${to}` ? 'active-list' : '', 'row', 'mx-0', 'w-100', 'list']"
      @click="$router.push(`/${to}`)">
    <div class="col-3 p-0 text-white icon">
      <span :class="[icon, 'icon-i', 'text-muted']"></span>
    </div>
    <div class="col-9 label">{{ label }} <slot></slot> </div>
  </li>
</template>
<script>
export default {
  name: 'BaseInput',
  props: {
    to: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'List Name'
    },
    icon: {
      type: String,
      default: 'ri-user-2-fill'
    }
  }
}
</script>
<style lang="scss" scoped>
li.active-list {
  background: var(--lt-primary);

  div.label,
  .icon > .icon-i {
    color: var(--lt-dark) !important;
  }

  .icon {
    background: var(--lt-primary);
  }
}
li.list {
  cursor: pointer;
  border-radius: 10px;
  font-size: .9rem;

  &:not(:hover) {
    transition: background-color 200ms ease-out;
    .icon {
      transition: background-color 200ms ease-out;
    }
  }
  &:hover {
    transition: background-color 200ms ease-in;
    background-color: var(--lt-light);

    div.label,
    .icon > .icon-i {
      color: var(--lt-dark) !important;
    }

    .icon {
      transition: background-color 200ms ease-in;
      background: var(--lt-primary);
    }
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  padding: 10px 0;
}

.label {
  padding: 10px 5px 10px 10px ;
  color:getColor(default-text-color);
  font-weight: 600 !important;
  font-size: 85%;
}
</style>