<template>
  <!-- Hamburger Button  -->
  <button
    id="menu-btn"
    @click="toggleMenu()"
    class="z-30 block sm:hidden focus:outline-none hamburger"
    :class="{ open: isBtn }"
  >
    <span class="hamburger-top"></span>
    <span class="hamburger-middle"></span>
    <span class="hamburger-bottom"></span>
  </button>

  <!-- Mobile Menu  -->
  <div
    class="fixed inset-0 z-20 flex-col items-center self-end w-full h-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest uppercase divide-y divide-purple-700 text-terciary opacity-90 bg-primary"
    id="menu"
    :class="{ hidden: isMenuHidden, flex: insMenuFlex }"
  >
    <!-- Mobile Menu Links -->
    <div
      class="flex-row items-center justify-between space-x-6 space-y-10 font-bold text-center transition sm:flex text-terciary lg:space-x-2"
    >
      <div>
        <a href="/" class="nav-btn"> Home</a>
      </div>

      <!-- Games Tab  -->
      <div class="py-1 outline-none group" tabindex="1">
        <div
          id="tools"
          class="flex items-center justify-center px-4 py-2 space-x-2 transition duration-500 border rounded-full cursor-pointer group group-hover:scale-110 group-focus:scale-110 group-focus:bg-gray-50 ease group-hover:bg-gray-50"
        >
          <div class="">Games</div>
          <!-- Arrow -->
          <div class="transition duration-500 group-hover:-rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                d="M1 1l8 8 8-8"
              ></path>
            </svg>
          </div>
        </div>
        <!-- Tab Inner Content -->
        <div
          class="z-10 flex flex-col space-y-8 overflow-hidden transition duration-500 bg-primary opacity-95 w-60 max-h-0 text-terciary group-hover:max-h-screen group-hover:p-6 group-focus:max-h-screen group-focus:p-6"
        >
          <a
            href="/game?search=https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/"
            class="w-auto p-3 duration-200 border-b-0 border-secondary hover:border-b-2 hover:scale-110"
            >Balls of Steel</a
          >
          <a
            href="/game?search=https://64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app/"
            class="p-3 duration-200 border-b-0 hover:border-b-2 hover:scale-110 border-secondary"
            >Clicky Crates</a
          >
        </div>
      </div>

      <!-- Tools Tab  -->
      <div class="py-1 outline-none group" tabindex="1">
        <div
          id="tools"
          class="flex items-center justify-center px-4 py-2 space-x-2 transition duration-500 border rounded-full cursor-pointer group group-hover:scale-110 ease group-hover:bg-gray-50 group-focus:scale-110 group-focus:bg-gray-50"
        >
          <div class="">Tools</div>
          <!-- Arrow -->
          <div
            class="transition duration-500 ease group-focus:-rotate-180 group-focus:text-purple-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
              <path
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                d="M1 1l8 8 8-8"
              ></path>
            </svg>
          </div>
        </div>
        <!-- Tab Inner Content -->
        <div
          class="z-10 flex flex-col space-y-8 overflow-hidden font-bold transition duration-500 w-60 bg-primary opacity-95 max-h-0 text-terciary group-hover:max-h-screen group-hover:p-6 group-focus:max-h-screen group-focus:p-6"
        >
          <a
            href="/to-do-list"
            class="w-auto p-3 duration-200 border-b-0 border-secondary hover:border-b-2 hover:scale-110"
            >To Do List</a
          >
          <a
            href="/habit-tracker"
            class="p-3 duration-200 border-b-0 hover:border-b-2 hover:scale-110 border-secondary"
            >Habit Tracker</a
          >
          <a
            href="/weather-app"
            target="_parent"
            class="p-3 duration-200 border-b-0 hover:border-b-2 hover:scale-110 border-secondary"
            >Weather App</a
          >
          <a
            href="/about#youtube-profile"
            class="p-3 duration-200 border-b-0 hover:border-b-2 hover:scale-110 border-secondary"
            >YouTube Profile</a
          >
        </div>
      </div>

      <div>
        <a href="/about" class="nav-btn"> About</a>
      </div>

      <div>
        <a href="/blog" class="nav-btn"> Blog</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isBtn = ref(false);
const isMenuHidden = ref(true);
const insMenuFlex = ref(false);

function toggleMenu() {
  console.log("clicked");
  isBtn.value = !isBtn.value;
  isMenuHidden.value = !isMenuHidden.value;
  insMenuFlex.value = !insMenuFlex.value;
}
</script>
