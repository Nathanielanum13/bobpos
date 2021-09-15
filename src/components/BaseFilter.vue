<template>
  <div class="filter row mx-0 p-1">
    <div class="col-8 col-sm-10 p-0">
      <span class="px-2 figure-caption font-weight-bold">Today</span>
    </div>
    <div class="col-4 col-sm-2 p-0 text-center">
      <span class="fa fa-chevron-down text-muted filter-arrow"></span>
    </div>
    <div class="filter-content">
      <label for="search">
        <span class="fa fa-search px-2"></span>
      </label>
      <input id="search" class="w-100 form-control" placeholder="Type search key" type="search">
      <div class="mt-2 figure-caption font-weight-bold">
        <span class="px-2 ri-filter-3-fill"></span>
        Filter by :
      </div>
      <div class="mt-2">
        <div class="row mx-0">
          <div class="col-4 p-2">
            <ul class="list-unstyled mb-0">
              <li class="row mx-0 mb-2">
                <BaseCheck for="name">Name</BaseCheck>
              </li>
              <li class="row mx-0 mb-2">
                <BaseCheck for="type">Type</BaseCheck>
              </li>
              <li class="row mx-0 mb-2">
                <BaseCheck for="weight">Weight</BaseCheck>
              </li>
            </ul>
          </div>
          <div class="col-4 p-0">
            <label class="figure-caption font-weight-bold" for="range">Price range</label>
            <input id="range" v-model="range" class="price-range" type="range" max="2000">
            <div class="font-weight-bold figure-caption mt-2">
              0 - {{ range }}
            </div>
          </div>
          <div class="col-4 p-2">
            <ul class="list-unstyled mb-0">
              <li class="row mx-0 mb-2">
                <BaseCheck for="all">All</BaseCheck>
              </li>
              <li class="row mx-0 mb-2">
                <BaseCheck for="recent">Recent</BaseCheck>
              </li>
              <li class="row mx-0 mb-2">
                <BaseCheck for="today" checked>Today</BaseCheck>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput"
import BaseCheck from "@/components/BaseCheck";

export default {
  name: "BaseSelect",
  data() {
    return {
      range: 0
    }
  },
  components: {
    BaseInput,
    BaseCheck
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  min-width: 150px;
  height: 100%;

  z-index: 10;

  border: 1px solid #80808020;
  border-radius: .25rem;
  cursor: pointer;
  position: relative;

  .filter-arrow {
    font-size: 70%;
    font-weight: lighter;
  }

  .filter-content {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;

    background-color: #fff;
    border: 1px solid #80808015;
    min-width: calc(50vw - 50px);

    padding: 10px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .05);
    border-radius: 0 0 1rem 1rem;

    #range {
      height: 2px;
      outline: none;
      background-color: var(--lt-primary);
    }

    #search {
      font-size: 90%;
      font-weight: bolder;

      &:hover, &:focus, &:focus-within {
        outline: none;
        box-shadow: none;
        border: 1px solid #80808020;
      }
    }
  }

  &:hover {
    .filter-arrow {
      transition: all 200ms ease-in;
      transform: rotate(180deg);
    }

    .filter-content {
      display: block;
      opacity: 1;
      animation: fade-in(var(--lt-primary), .8);

    }
  }
}
</style>