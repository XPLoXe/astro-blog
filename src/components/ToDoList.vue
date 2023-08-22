<template>
  <div>
    <div style="text-align: center; margin-bottom: 5%">
      <input
        type="text"
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
      />
      <button @click="addTodo">Add</button>
    </div>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <div class="card">
          <span :class="{ completed: todo.completed }">
            <input
              type="checkbox"
              v-model="todo.completed"
              style="margin-right: 10%"
            />
            <span class="text">{{ todo.text }} </span>

            <button @click="removeTodo(index)" style="margin-left: 10%">
              Remove
            </button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTodo = ref("");
const todos = ref([]);

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value, completed: false });
    newTodo.value = "";
    console.log("check");
  }
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};
</script>

<style>
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
</style>
