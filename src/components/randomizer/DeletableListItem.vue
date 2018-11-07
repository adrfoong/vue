<template>
  <div class="deletable-list-item">
    <slot></slot>
    <div class="controls">
      <span class="edit-button" @click="enableEdit">
        <i class="fa fa-edit" />
      </span>
      <span class="delete-button" @click="deleteHandler">
        <i class="fa fa-times-circle" />
      </span>
    </div>
  </div>
</template>

<script>
import "../../functionalComponents/ListItem.css";

export default {
  name: "DeletableItem",
  props: {
    deleteHandler: Function,
    enableEdit: Function
  }
};
</script>

<style>
</style>
