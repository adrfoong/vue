<template>
    <div :class="['column-card', {colored: colors, 'decay-border': !colors && issue.fadeOpacity < 0.4, 'focused': this.focused}]" @click="toggleIssueFocus(issue)" :key="issue.id">
        <div :style="decay ? createDecayStyle(issue.fadeOpacity) : {}" class="column-card-content" :class="[`urgency-${issue.urgency}`]">
            <div class="column-card-title"><a :href="issue.link">{{issue.id}}</a></div>
                <div class="issue-details" v-if="verbose">
                    <div class="detail-item">Urgency: {{issue.urgencyLabel}}</div>
                    <div class="detail-item">Priority: {{issue.priority}}</div>
                    <div class="detail-item">Points: {{issue.points}}</div>
                    <div class="detail-item">Days since created: {{issue.daysElapsed}}</div>
                    <div v-if="issue.isP2E" class="detail-item label">P2E</div>
                </div>
                <div class="issue-details simplified" v-else>
                    <span class="detail-item">Urg: {{issue.urgency}}</span>
                    <span class="detail-item">Pr: {{issue.priority.split('')[0]}}</span>
                    <span class="detail-item">S: {{issue.points}}</span>
                    <span v-if="issue.isP2E" class="detail-item tag">P2E</span>
                </div>
            <div class="issue-summary">
                {{issue.summary}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return { focused: false };
  },
  props: ["issue", "colors", "decay", "verbose", "idle"],
  methods: {
    toggleIssueFocus(issue) {
      if (this.$props.idle) {
        return;
      }
      this.focused = !this.focused;
      //   issue.focused = !issue.focused;
      this.$emit("toggle-issue-focus");
    },
    createDecayStyle(opacity) {
      return {
        opacity
      };
    }
  }
};
</script>

<style>
</style>
