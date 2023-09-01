<template>
  <div class="min-h-[37vh]">
    <div class="text-center mb-4">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
        class="border-b-2 border-purple-600 bg-purple-100 rounded-t p-2 text-purple-600"
      />
      <button
        @click="addTodo"
        class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"
      >
        Add
      </button>
      <button
        @click="clearToDos"
        class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"
      >
        Clear All
      </button>
    </div>
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="index"
        class="drag-item"
        :draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver"
        @drop="handleDrop(index)"
      >
        <div
          class="bg-white p-5 rounded-lg shadow-md mb-5 cursor-move flex justify-between items-center"
        >
          <input
            type="checkbox"
            class="cursor-pointer glow-element"
            @change="completeToDo(index)"
            :checked="todo.completed"
          />
          <span
            :class="{
              'line-through': todo.completed,
              'text-center': true,
              'flex-grow': true,
            }"
          >
            {{ todo.text }}
          </span>
          <button
            @click="removeTodo(index)"
            class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"
          >
            Remove
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import confetti from "canvas-confetti";

onMounted(() => {
  console.log("Component mounted");
  fetchToDoLocally();
});
onUnmounted(() => {});

const newTodo = ref("");
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value, completed: false });
    newTodo.value = "";
    saveToDoLocally();
  }
};

const clearToDos = () => {
  localStorage.removeItem("todos");
  todos.value = [];
};

const saveToDoLocally = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
  saveToDoLocally();
};

const completeToDo = (index) => {
  todos.value[index].completed = !todos.value[index].completed;
  if (todos.value[index].completed) {
    triggerConfetti();
  }
  saveToDoLocally();
};

const fetchToDoLocally = () => {
  const localToDo = localStorage.getItem("todos");
  if (localToDo) {
    todos.value = JSON.parse(localToDo);
  }
};

let draggedIndex;

const handleDragStart = (index) => {
  draggedIndex = index;
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (targetIndex) => {
  const draggedItem = todos.value[draggedIndex];
  todos.value.splice(draggedIndex, 1);
  todos.value.splice(targetIndex, 0, draggedItem);
  saveToDoLocally();
};

// CONFETTI \\
//https://github.com/catdad/canvas-confetti
const triggerConfetti = () => {
  confetti({
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

<style>
input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #8a2be2;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: inline-block;
  place-content: center;
  &::before {
    content: "";
    display: grid;
    width: 0.75em;
    height: 0.75em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #8a2be2;
    background-color: CanvasText;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform-origin: left top;
  }
  &:checked::before {
    transform: scale(1);
  }
}
</style>
