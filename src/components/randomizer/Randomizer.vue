<template>
  <div class="randomizer">
    <h2 class="title">Randomizer</h2>
    <list :items="items">
      <list-item :class="{temp: slotProps.item === temp, selected: slotProps.item === selected}" slot="list-item" slot-scope="slotProps" @delete="deleteFromList(slotProps.item)">
        <editable-label slot="list-item-label" slot-scope="listItemProps" class="item-label" :label="slotProps.item.label" :editing="listItemProps.editing" @save="newLabel => editEntry(slotProps.item.id, newLabel)" @blur="listItemProps.stopEditing" />
      </list-item>
    </list>
    <div class="input-control">
      <input type="text" class="input" v-model="input" @keypress.enter="addToList">
      <button class="button" :disabled="!input" @click="addToList">Add</button>
    </div>
    <button class="button" :disabled="selecting || items.length < 2" @click="selectOne">Select</button>
    <div v-if="debug">{{selected.label}}</div>
    <div v-if="debug">{{stack}}</div>
  </div>
</template>

<script>
import EditableLabel from "./EditableLabel";
import List from "./List";
import ListItem from "./ListItem";
function* RNGMaker(exclusiveMax) {
  while (true) {
    yield Math.floor(Math.random() * exclusiveMax);
  }
}

export default {
  name: "Randomizer",
  components: {
    EditableLabel,
    List,
    ListItem
  },
  data: function() {
    return {
      items: [],
      input: "",
      selected: {},
      temp: {},
      selecting: false,
      stack: [],
      debug: false
    };
  },
  methods: {
    addToList() {
      if (this.input) {
        this.items.push({ label: this.input, id: this.items.length });
        this.input = "";
      }
    },
    enableEdit(index) {
      this.$refs.list.$children[index].enableEdit();
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
    },
    randomSelect() {
      return new Promise(resolve => {
        const numJumps = 20;
        const stack = [];
        const RNG = RNGMaker(this.items.length);
        for (let i = 0; i < numJumps; i++) {
          setTimeout(() => {
            // Don't allow consecutive duplicates
            let randomIndex = RNG.next().value;
            while (stack[stack.length - 1] === randomIndex) {
              randomIndex = RNG.next().value;
            }
            stack.push(randomIndex);

            this.temp = this.items[randomIndex];
            if (numJumps === i + 1) {
              resolve({ selected: this.temp, stack });
            }
          }, this.easeInQuad(i / numJumps) * 2000);
        }
      });
    },
    easeInQuad(t) {
      return t * t;
    },
    selectOne() {
      this.selected = {};
      this.stack = [];
      if (!this.selecting) {
        this.selecting = true;
        this.randomSelect().then(({ selected, stack }) => {
          this.temp = {};
          this.selected = selected;
          this.stack = stack;
          this.selecting = false;
        });
      }
    }
  }
};
</script>

<style>
.selected {
  background: rgb(122, 199, 199);
}

.temp {
  background: paleturquoise;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

.title {
  background: rgb(196, 231, 231);
}

.input {
  line-height: 16px;
  padding: 2px 5px;
  margin: 3px;
  border: 2px solid black;
}

.input:focus {
  background: papayawhip;
  outline: none;
}

.button {
  background: white;
  border: 2px solid black;
  outline: none;
  line-height: 16px;
  padding: 2px 5px;
}

.button:hover,
.button:focus {
  background: papayawhip;
}

.button:active {
  background: lightsalmon;
}

.button:disabled {
  background: lightgray;
}

.input-control {
  margin: 3px;
}
</style>
