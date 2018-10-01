<template>
  <div class='test'>
    <TestComponent>
    </TestComponent>
  </div>
</template>

<script>
import TestComponent from "@/components/TestComponent";

export default {
  name: "Test",
  components: {
    TestComponent
  },
  data: function() {
    return {
      items: [
        { id: 1, label: "one" },
        { id: 2, label: "two" },
        { id: 3, label: "three" }
      ]
    };
  },
  methods: {
    editHandler() {
      console.log("Edit");
    },
    deleteHandler() {
      console.log("Delete");
    },
    editEntry(id, label) {
      const entryToEdit = this.items.find(entry => id === entry.id);
      if (entryToEdit) {
        entryToEdit.label = label;
      }
    },
    deleteFromList(entryToRemove) {
      const index = this.items.indexOf(entryToRemove);
      this.items = [
        ...this.items.slice(0, index),
        ...this.items.slice(index + 1)
      ];
    }
  }
};
</script>

<style>
</style>
