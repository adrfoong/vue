<template>
  <div>
    <span class="editable-label" v-show="!editing">{{label}}</span>
    <input class="editable-input" ref="input" @keydown.enter="saveLabel" @focus="$event.target.select()" @blur="cancelEdit" v-show="editing" v-model="value" />
  </div>
</template>

<script>
export default {
  name: "EditableLabel",
  props: {
    label: String,
    editing: Boolean
  },
  data: function() {
    return {
      value: this.label
    };
  },
  updated: function() {
    if (this.editing) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  methods: {
    cancelEdit() {
      this.$emit("blur");
    },

    saveLabel() {
      this.$emit("save", this.value);
      this.$emit("blur");
    }
  }
};
</script>

<style scope>
.editable-input {
  font-size: 16px;
  font-family: inherit;
  padding: 0;
  text-align: center;
  border: unset;
  outline: none;
  background: whitesmoke;
}
</style>
