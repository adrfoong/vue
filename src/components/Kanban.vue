<template>
    <div :class="['kanban', {dark: dark, 'focus-mode': focus}]">
        <h2 class="focus-persistent">Kanban</h2>
        <div class="test-controls focus-persistent">
            <h4>Test Controls</h4>
            <label for="verbose">
                <input type="checkbox" id="verbose" v-model="verbose">
                Verbose
            </label>
            <label for="colors">
                <input type="checkbox" id="colors" v-model="colors">
                Colors: Urgency
            </label>
            <label for="ascending">
                <input type="checkbox" id="ascending" v-model="ascending">
                Ascending: Urgency
            </label>
            <label for="decay">
                <input type="checkbox" id="decay" v-model="decay">
                Decay Fade
            </label>
            <label for="dark">
                <input type="checkbox" id="dark" v-model="dark">
                Dark Themez
            </label>
            <label for="focus">
                <input type="checkbox" id="focus" v-model="focus">
                Focus Mode
            </label>
        </div>
        <div v-show="!focus" class="column-container">
            <div class="column" v-for="(category, key) in sortedIssues" :key='category.id'>
                <h4 class="column-title">{{key}}</h4>
                <div v-if="category.length === 0" class="column-card empty">
                    Empty
                </div>
                <Card @toggle-issue-focus="toggleIssueFocus(issue)" v-for="issue in category" :issue="issue" :colors="colors" :decay="decay" :verbose="verbose" :key="issue.id"/>
            </div>
        </div>
        <div v-show="focus && focusedIssues.length > 0" class="column-container focus-persistent">
          <div class="column">
            <h4 class="column-title">Focused</h4> 
            <Card :idle="true" v-for="issue in focusedIssues" :issue="issue" :colors="colors" :decay="decay" :verbose="verbose" :key="issue.id"/>
          </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import Card from "@/components/Card";
export default {
  name: "Kanban",
  components: { Card },
  created() {
    this.fetchData();
  },
  data: function() {
    return {
      issues: {},
      verbose: false,
      colors: false,
      ascending: false,
      decay: false,
      dark: false,
      focus: false,
      focusedIssues: []
    };
  },
  computed: {
    sortedIssues() {
      this.sortByUrgency();
      this.computeDaysElapsed();
      return this.issues;
    }
  },
  watch: {
    dark(val) {
      if (val) {
        this.setDarkTheme();
      } else {
        this.unsetDarkTheme();
      }
    }
  },
  methods: {
    toggleIssueFocus(issue) {
      console.log("toggling in kanban");
      const index = this.focusedIssues.indexOf(issue);
      if (index < 0) {
        this.focusedIssues = [...this.focusedIssues, issue];
      } else {
        this.focusedIssues = [
          ...this.focusedIssues.slice(0, index),
          ...this.focusedIssues.slice(index + 1)
        ];
      }
    },
    setDarkTheme() {
      // TODO: Clean up css for theming
      const container = document.querySelector(".kanban");
      const setProperty = container.style.setProperty;
      //   container.style.setProperty("--urgency-1-background", "red");
      container.style.setProperty("--column-background", "#8dacc64d");
      container.style.setProperty("--column-card-background", "#18191A");
      container.style.setProperty("--column-title-background", "#45a26a");
      container.style.setProperty("--column-card-title-background", "#283243");
      container.style.setProperty("--colored-card-text-color", "#2c3e50");
      container.style.setProperty("--text-color", "#f0f2dc");
      container.style.setProperty("--link-color", "#F0F2DC");
      container.style.setProperty("--issue-details-background", "transparent");
      container.style.setProperty("--issue-summary-background", "transparent");
      container.style.setProperty("--card-border-color", "#18191A80");
      container.style.setProperty("--card-border-shadow-color", "#18191A");
      container.style.setProperty(
        "--simplified-details-background",
        "transparent"
      );
      container.style.setProperty("--main-background", "#283243");
      container.style.setProperty("--main-text-color", "#f0f2dc");
    },
    unsetDarkTheme() {
      const container = document.querySelector(".kanban");
      //   container.style.setProperty("--urgency-1-background", "initial");
      //   container.style.setProperty("--urgency-2-background", "initial");
      //   container.style.setProperty("--urgency-3-background", "initial");
      //   container.style.setProperty("--urgency-4-background", "initial");
      //   container.style.setProperty("--urgency-5-background", "initial");
      container.style.setProperty("--column-background", "unset");
      container.style.setProperty("--column-card-background", "unset");
      container.style.setProperty("--column-title-background", "unset");
      container.style.setProperty("--column-card-title-background", "unset");
      container.style.setProperty("--colored-card-text-color", "unset");
      container.style.setProperty("--text-color", "unset");
      container.style.setProperty("--link-color", "unset");
      container.style.setProperty("--issue-details-background", "unset");
      container.style.setProperty("--issue-summary-background", "unset");
      container.style.setProperty("--card-border-color", "unset");
      container.style.setProperty("--card-border-shadow-color", "unset");
      container.style.setProperty("--simplified-details-background", "unset");
      container.style.setProperty("--main-background", "unset");
      container.style.setProperty("--main-text-color", "unset");
    },
    createDecayStyle(opacity) {
      return {
        opacity
      };
    },
    computeTimeFade(days) {
      const MIN_OPACITY = 0.2;
      const STEP = 3;
      const opacityDecrease = Math.floor(days / STEP) * 0.1;
      return Math.max(MIN_OPACITY, 1 - opacityDecrease);
    },
    computeDaysElapsed() {
      for (let category in this.issues) {
        this.issues[category].forEach(issue => {
          issue.daysElapsed = moment().diff(issue.dateCreated, "days");
          issue.fadeOpacity = this.computeTimeFade(issue.daysElapsed);
        });
      }
    },
    sortByUrgency() {
      for (let category in this.issues) {
        this.issues[category].sort((a, b) => {
          if (this.ascending) {
            return a.urgency - b.urgency;
          } else {
            return b.urgency - a.urgency;
          }
        });
      }
    },
    fetchData() {
      const issues = [
        {
          id: "AN-100101",
          summary: "Problem doing something",
          status: "In Progress",
          urgencyLabel: "P4 - Minor",
          urgency: 4,
          priority: "Normal",
          points: 2,
          dateCreated: moment("October 23, 2018"),
          link: "link.com"
        },
        {
          id: "AN-100102",
          summary: "Problem with something",
          status: "Under Review",
          urgencyLabel: "P3 - Normal",
          urgency: 3,
          priority: "Normal",
          points: 2,
          dateCreated: moment("November 2, 2018"),
          isP2E: true,
          link: "link.com"
        },
        {
          id: "AN-100131",
          summary: "Bug bug bug something",
          status: "Verified",
          urgencyLabel: "P1 - Critical",
          urgency: 1,
          priority: "Normal",
          points: 2,
          dateCreated: moment("November 1, 2018"),
          link: "link.com"
        },
        {
          id: "AN-100401",
          summary: "Problem doing another something",
          status: "Resolved",
          urgencyLabel: "P5 - Trivial",
          urgency: 5,
          priority: "Normal",
          points: 2,
          dateCreated: moment("October 2, 2018"),
          link: "link.com"
        },
        {
          id: "AN-100431",
          summary: "Problem another something",
          status: "New",
          urgencyLabel: "P2 - Major",
          urgency: 2,
          priority: "Normal",
          points: 2,
          dateCreated: moment("October 15, 2018"),
          link: "link.com"
        },
        {
          id: "AN-100491",
          summary: "Problem 12 23 doing another something",
          status: "Resolved",
          urgencyLabel: "P3 - Normal",
          urgency: 3,
          priority: "Normal",
          points: 2,
          dateCreated: moment("November 2, 2018"),
          link: "link.com"
        }
      ];

      const categories = [
        "New",
        "In Progress",
        "Under Review",
        "Resolved",
        "Verified"
      ];

      function categorize(issues) {
        let issueMap = {};

        categories.forEach(category => {
          issueMap[category] = [];
        });

        issues.forEach(issue => {
          const category = issue.status;
          issueMap[category].push(issue);
        });

        return issueMap;
      }

      this.issues = categorize(issues);
    }
  }
};
</script>

<style>
.column-container {
  /* --urgency-1-background: #ff6449;
  --urgency-2-background: #f99800;
  --urgency-3-background: #ffdd2e;
  --urgency-4-background: #a2e84b;
  --urgency-5-background: #41c543; */

  display: flex;
  justify-content: space-evenly;
}

.issue-details {
  /* border-radius: 5px; */
  padding: 2px 0;
  /* background: var(--issue-details-background, rgba(255, 255, 255, 0.5)); */
}

.issue-details.simplified {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.issue-details.simplified span {
  /* background: var(--simplified-details-background, rgba(255, 255, 255, 0.75)); */
  margin: 0 5px;
  padding: 0 2px;
}

.issue-details .detail-item {
  font-size: 0.67rem;
  font-weight: bold;
}

.issue-details .detail-item.tag {
  color: red;
}

.issue-summary {
  padding: 5px;
  /* background: var(--issue-summary-background, rgba(255, 255, 255, 0.5)); */
  /* border-radius: 5px; */
  margin-top: 5px;
}

.column {
  margin: 5px 5px 0 0;
  /* border-radius: 5px; */
  width: 310px;
  padding: 0 5px;
  background: var(--column-background, rgba(158, 232, 232));
}

.column:first-child {
  margin-left: 5px;
}

.decay-border {
  /* border-width: 1px; */
  /* border-style: solid; */
  /* border-radius: 5px; */
  /* border-color: var(--card-border-color, #effafe); */

  outline: 1px solid var(--card-border-color, #effafe80);
  /* box-shadow: 0 0 5px var(--card-border-shadow-color, #effafe) inset; */
}

.focused.column-card {
  /* background: red !important; */
  outline: solid 2px red;
  /* box-shadow: 0 0 5px red inset; */
}

.column-card {
  margin: 5px 0;
  /* border-radius: 5px; */
}
.column-card.colored {
  /* border: none; */
}

.column-card.empty {
  background: rgba(138, 138, 138, 0.5);
}

.column-card-content {
  /* border-radius: 5px; */
  /* color: var(--text-color, #2c3e50); */
  background: var(--column-card-background, #effafe);
  padding: 2px;
}

.column-card-content:hover {
  opacity: 1 !important;
}

.colored {
  color: var(--colored-card-text-color, #2c3e50);
}

.colored .urgency-1 {
  background: var(--urgency-1-background, #ff6449);
}

.colored .urgency-2 {
  background: var(--urgency-2-background, #f99800);
}

.colored .urgency-3 {
  background: var(--urgency-3-background, #ffdd2e);
}

.colored .urgency-4 {
  background: var(--urgency-4-background, #a2e84b);
}

.colored .urgency-5 {
  background: var(--urgency-5-background, #41c543);
}

.column-title {
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--column-title-background, #ffffff);
  color: var(--text-color, #2c3e50);
  margin: 5px 0 0 0;
  /* border-radius: 5px; */
}

.column-card-title {
  font-size: 0.8rem;
  font-weight: bold;
  /* border-radius: 5px; */
  background: var(--column-card-title-background, #cdf2f8);
}

.colored .column-card-title {
  background: var(--column-card-title-background, #ffffff80);
}

.column-card-title a {
  color: var(--link-color, initial);
  text-decoration: none;
}

.column-card-title a:hover {
  text-decoration: underline;
}

.column-card-title.label {
  color: red;
}

.kanban {
  padding: 10px 0;
  color: var(--main-text-color, #2c3e50);
  background: var(--main-background, transparent);
}

.kanban.focus-mode > *:not(.focus-persistent) {
  /* filter: blur(3px); */
  opacity: 0;
}

.test-component {
  width: 100%;
  /* color: #f0f2dc;
  background: #272a2f; */
}

.test-controls {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
  align-items: flex-start;
}

.test-controls h4 {
  align-self: center;
}
</style>
