<template>
  <div class='test'>
    <TestComponent>
      <Randomizer />
    </TestComponent>
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent.vue";
import Randomizer from "@/components/randomizer/Randomizer.vue";

export default {
  name: "Test",
  components: {
    TestComponent,
    Randomizer
  }
};
</script>

<style>
</style>
