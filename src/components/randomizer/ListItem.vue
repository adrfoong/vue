<template>
  <div class="deletable-list-item">
    <slot name="list-item-label" :stopEditing="stopEditing" :editing="editing"></slot>
    <div class="controls">
      <span class="edit-button" @click="startEditing">
        <i class="fa fa-edit" />
      </span>
      <span class="delete-button" @click="$emit('delete')">
        <i class="fa fa-times-circle" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data: function() {
    return {
      editing: false
    };
  },
  methods: {
    stopEditing() {
      this.editing = false;
    },
    startEditing() {
      this.editing = true;
    }
  }
};
</script>

<style>
.deletable-list-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 75%;
  margin: 0 auto;
  /* padding: 0 40px; */
}

.deletable-list-item .controls {
  margin: 0 2px;
  display: flex;
  /* align-self: center; */

  position: absolute;
  right: 0px;
  opacity: 0;
  cursor: pointer;
  transform: translateX(10px);

  /* background: rgba(255, 255, 255, .75); */
  transition: all 500ms;
}

.controls .edit-button:hover {
  /* transition: none; */
  color: deepskyblue;
}

.controls .delete-button:hover {
  /* transition: none; */
  color: red;
}

.deletable-list-item:hover {
  background: papayawhip;
  /* filter: blur(2px); */
}

.deletable-list-item:hover .controls {
  /* display: inherit; */
  opacity: 1;
  transform: translateX(0);
  transition: all 500ms 200ms;
}

.deletable-list-item:hover .editable-label {
  /* filter: blur(2px); */
  opacity: 0.25;
  transition: all 500ms 200ms ease-out;
}

.deletable-list-item .item-label {
  line-height: 32px;
  flex-grow: 1;
  /* flex-basis: 300px; */
}

.deletable-list-item i {
  line-height: 24px;
  font-size: 24px;
}
</style>
