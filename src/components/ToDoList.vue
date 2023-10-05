<template>
  <div class="min-h-[37vh]">
    <!--Input-->
    <div class="text-center mb-4">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
        class="border-b-2 border-purple-600 bg-purple-100 bg-opacity-0 rounded-t p-2 text-purple-600 focus:outline-none focus:bg-opacity-100"
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

    <!-- To Do List -->
    <transition-group name="list" tag="ul">
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="drag-item"
        :draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver"
        @drop="handleDrop(index)"
      >
        <div
          class="bg-white p-5 rounded-lg shadow-md mb-5 cursor-move sm:flex items-center grid grid-cols-1"
        >
          <div class="flex sm:justify-center sm:flex-1">
            <!--check box-->
            <div class="mb-3 sm:mb-0 w-8 h-8 sm:flex-none">
              <input
                type="checkbox"
                class="cursor-pointer glow-element"
                @change="completeToDo(index)"
                :checked="todo.completed"
              />
            </div>

            <!--To Do-->
            <div class="mb-3 sm:mb-0 ml-4 w-auto sm:flex-1 grow text-center">
              <span
                :class="{
                  'line-through': todo.completed,
                }"
              >
                {{ todo.text }}
              </span>
            </div>
          </div>

          <!--Remove-->
          <div class="sm:ml-auto sm:mr-0 mx-auto sm:justify-end w-28 flex-none">
            <button
              @click="removeTodo(index)"
              class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"
            >
              Remove
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";
import { uid } from "uid";

onMounted(() => {
  console.log("Component mounted");
  fetchToDoLocally();
});
onUnmounted(() => {});

const newTodo = ref("");
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.unshift({ text: newTodo.value, completed: false, id: uid() });
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

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to /* .list-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 1s;
}

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
