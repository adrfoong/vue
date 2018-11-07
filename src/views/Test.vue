<template>
  <div class='test'>
    <TestComponent>
      <kanban />
    </TestComponent>
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent";
import Kanban from "@/components/Kanban";

export default {
  name: "Test",
  components: {
    TestComponent,
    Kanban
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
