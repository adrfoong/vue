<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <slot name="list-item" :item="item" :index="index">
        {{item}}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    items: Array,
  }
}
</script>

<style>

</style>
