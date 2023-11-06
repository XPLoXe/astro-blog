<template>
  <!-- INPUT -->
  <div class="text-center mb-[5%]" v-cloak>
    <input
      type="text"
      v-model="newHabit"
      @keyup.enter="addHabit"
      placeholder="Add a Habit to track"
      class="p-2 text-purple-600 bg-purple-100 bg-opacity-0 border-b-2 border-purple-600 rounded-t focus:outline-none focus:bg-opacity-100"
    />
    <button
      @click.prevent="addHabit"
      class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 my-2 mx-1 transition duration-500 hover:bg-purple-600 hover:text-white"
    >
      Add Habit
    </button>
    <button
      @click.prevent="clearAllConfirmation"
      class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 my-2 mx-1 transition duration-500 hover:bg-purple-600 hover:text-white"
    >
      Clear All Checkboxes
    </button>
    <button
      @click.prevent="removeAllConfirmation"
      class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 my-2 mx-1 transition duration-500 hover:bg-purple-600 hover:text-white"
    >
      Eliminate All Habits
    </button>
  </div>

  <!-- SPREADSHEET -->
  <div class="overflow-x-auto" v-if="habits.length > 0" style="max-width: 100%">
    <table class="min-w-full divide-y divide-gray-200 whitespace-nowrap">
      <thead class="bg-gray-50">
        <tr>
          <td
            class="px-2 py-3 text-xs font-medium text-center text-gray-500 uppercase"
            v-for="(day, colIndex) in days"
            :key="colIndex"
          >
            <b>
              {{ colIndex === 0 ? "Habit" : day }}
            </b>
          </td>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(habit, rowIndex) in habits" :key="rowIndex">
          <td class="px-2 py-4">
            <b>{{ habit.name }}</b>
          </td>
          <td
            class="px-2 py-4"
            v-for="(cell, colIndex) in days"
            :key="colIndex"
          >
            <CellApp
              class="checkbox glow-element"
              v-if="colIndex < 31"
              :initialChecked="habit.check.includes(colIndex + 1)"
              :rowIndex="rowIndex"
              :colIndex="colIndex"
              @update:checked="updateCell"
            />
            <div v-if="colIndex === 31" class="cursor-pointer">
              <i
                class="text-red-500 fa-solid fa-trash hover:text-red-700"
                @click.prevent="removeConfirmation(rowIndex)"
              ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CellApp from "./Cell.vue";
import confetti from "canvas-confetti";

// Data
const newHabit = ref("");
const habits = ref([]);
const days = ref([
  " ",
  ...Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
]);

// Methods
const updateCell = (newCheckedValue, rowIndex, colIndex) => {
  if (newCheckedValue) {
    habits.value[rowIndex].check.push(colIndex + 1);
    triggerConfetti();
  } else {
    const valueToRemove = colIndex + 1;
    const indexToRemove = habits.value[rowIndex].check.indexOf(valueToRemove);

    if (indexToRemove !== -1) {
      habits.value[rowIndex].check.splice(indexToRemove, 1);
    }
  }

  saveHabitLocally();
};

const addHabit = () => {
  if (newHabit.value.trim()) {
    habits.value.push({ name: newHabit.value, check: [] });
    newHabit.value = "";
    saveHabitLocally();
  }
};

const saveHabitLocally = () => {
  localStorage.setItem("habits", JSON.stringify(habits.value));
  console.log("saved");
};

const fetchHabitsLocally = () => {
  const localHabit = localStorage.getItem("habits");
  if (localHabit) {
    const localHabitItems = JSON.parse(localHabit);
    habits.value = localHabitItems;
    console.log("habits loaded");
  }
};

const removeConfirmation = (index) => {
  const confirmed = window.confirm(
    "Are you sure you want to eliminate this Habit?",
  );
  if (confirmed) {
    removeHabit(index);
  }
};

const removeHabit = (index) => {
  habits.value.splice(index, 1);
  saveHabitLocally();
};

const clearAllConfirmation = () => {
  const confirmed = window.confirm(
    "Are you sure you want to clear ALL of your habits marks?",
  );
  if (confirmed) {
    clearHabits();
  }
};

const clearHabits = () => {
  habits.value.forEach((habit) => {
    habit.check = [];
    console.log("loop");
  });
  saveHabitLocally();
  location.reload();
};

const removeAllConfirmation = () => {
  const confirmed = window.confirm(
    "Are you sure you want to ELIMINATE ALL of your habits?",
  );
  if (confirmed) {
    removeAll();
  }
};

const removeAll = () => {
  localStorage.removeItem("habits");
  habits.value = [];
};

// Lifecycle Hook
onMounted(() => {
  console.log("mounted");
  fetchHabitsLocally();
});

// CONFETTI \\
//https://github.com/catdad/canvas-confetti
const canvas = null;
const triggerConfetti = () => {
  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true,
  });
  myConfetti({
    particleCount: 200,
    startVelocity: 50,
    spread: 360,
    origin: {
      x: 0.5,
      y: 0.5,
    },
  });
};
</script>
