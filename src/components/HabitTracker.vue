<template>
  <div style="text-align: center; margin-bottom: 5%" v-cloak>
    <input
      type="text"
      v-model="newHabit"
      @keyup.enter="addHabit"
      placeholder="Add a Habit to track"
    />
    <button @click="addHabit">Add Habit</button>
    <button @click="clearAllConfirmation">Clear All Checkboxes</button>
    <button @click="removeAllConfirmation">Eliminate All Habits</button>
  </div>
  <div class="table-responsive" v-if="habits.length > 0">
    <table>
      <thead>
        <td v-for="(day, colIndex) in days">
          <b>{{ day }}</b>
        </td>
      </thead>

      <tr
        v-for="(habit, rowIndex) in habits"
        :key="rowIndex"
        style="width: 100px"
      >
        <b>{{ habit.name }}</b>

        <td v-for="(cell, colIndex) in days">
          <CellApp
            class="checkbox glow-element"
            v-if="colIndex < 31"
            :initialChecked="habit.check.includes(colIndex + 1)"
            :rowIndex="rowIndex"
            :colIndex="colIndex"
            @update:checked="updateCell"
          />
          <img
            v-if="colIndex === 31"
            width="15"
            height="15"
            src="https://img.icons8.com/emoji/48/cross-mark-emoji.png"
            alt="cross-mark-emoji"
            @click="removeConfirmation(rowIndex)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CellApp from "./Cell.vue";
import { onMounted } from "vue";

export default {
  components: {
    CellApp,
  },
  data() {
    return {
      newHabit: "",
      habits: [],
      rows: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      days: [
        " ",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
    };
  },
  methods: {
    updateCell(newCheckedValue, rowIndex, colIndex) {
      if (newCheckedValue) {
        this.habits[rowIndex].check.push(colIndex + 1);
      } else {
        const valueToRemove = colIndex + 1;
        const indexToRemove =
          this.habits[rowIndex].check.indexOf(valueToRemove);

        if (indexToRemove !== -1) {
          this.habits[rowIndex].check.splice(indexToRemove, 1);
        }
        // this.habits[rowIndex].check = this.habits[rowIndex].check.filter(
        //   (number) => number !== colIndex + 1
        // );
      }

      this.saveHabitLocally();
    },
    addHabit() {
      if (this.newHabit.trim()) {
        this.habits.push({ name: this.newHabit, check: [] });
        this.newHabit = "";
        this.saveHabitLocally();
      }
    },

    saveHabitLocally() {
      localStorage.setItem("habits", JSON.stringify(this.habits));
      console.log("saved");
    },
    fetchHabitsLocally() {
      const localHabit = localStorage.getItem("habits");
      if (localHabit) {
        const localHabitItems = JSON.parse(localHabit);
        this.habits = localHabitItems;
        console.log("habits loaded");
      }
    },

    removeConfirmation(index) {
      const confirmed = window.confirm(
        "Are you sure you want to eliminate this Habit?"
      );
      if (confirmed) {
        this.removeHabit(index);
      }
    },
    removeHabit(index) {
      this.habits.splice(index, 1);
      this.saveHabitLocally();
    },

    clearAllConfirmation() {
      const confirmed = window.confirm(
        "Are you sure you want to clear ALL of your habits marks?"
      );
      if (confirmed) {
        this.clearHabits();
      }
    },
    clearHabits() {
      this.habits.forEach((habit) => {
        habit.check = [];
        console.log("loop");
      });
      this.saveHabitLocally();
      location.reload();
    },

    removeAllConfirmation() {
      const confirmed = window.confirm(
        "Are you sure you want to ELIMINATE ALL of your habits?"
      );
      if (confirmed) {
        this.removeAll();
      }
    },
    removeAll() {
      localStorage.clear("habits");
      this.habits = [];
    },
  },
  created() {
    console.log("mounted");

    this.fetchHabitsLocally();
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}

.spreadsheet {
  display: grid;
}

.completed {
  text-decoration: line-through;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.dark {
  background: var(--color-primary);
  color: white;
}

.body {
  display: grid;
  place-content: center;
  height: 100vh;
  margin: 0;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  overflow: hidden;
  * {
    outline: none;
  }
}

input[type="text"] {
  appearance: none;
  border: none;
  outline: none;
  border-bottom: 0.2em solid #8a2be2;
  background: rgba(#8a2be2, 0.2);
  border-radius: 0.2em 0.2em 0 0;
  padding: 0.4em;
  color: #8a2be2;
}

button {
  appearance: none;
  border: 0.2em solid #8a2be2;
  background: hsl(0 0 0/0);
  padding: 0.85em 1.5em;
  color: #8a2be2;
  border-radius: 2em;
  transition: 1s;
  &:hover,
  &:focus,
  &:active {
    background: #8a2be2;
    color: #fff;
  }
}

.text {
  appearance: none;
  border: none;
  outline: none;
  background: rgba(#8a2be2, 0.2);
  border-radius: 0.2em 0.2em 0 0;
  padding: 0.4em;
  color: #8a2be2;
}

.table-responsive {
  display: flex;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  flex: 1; /* Distribute available space evenly among cells */
  padding: 10px; /* Add padding for spacing */
  border: 1px solid #ddd; /* Add borders for better visibility */
  text-align: left; /* Adjust text alignment */
}
</style>
