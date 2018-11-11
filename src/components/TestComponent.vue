<template functional>
  <div class="test-component">
      <slot>This is a slot</slot>
  </div>
</template>

<script>
export default {
  name: "TestComponent"
};
</script>

<style>
.test-component {
  margin: auto;
  border-radius: 20px;
  background: rgb(246, 250, 250);
  overflow: hidden;
  border: 1px solid rgb(196, 231, 231);
  padding: 5px 0;
}
</style>
