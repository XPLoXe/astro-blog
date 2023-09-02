import { c as createAstro, b as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_c89a7039.mjs';
import 'clsx';
import { useSSRContext, onMounted, onUnmounted, ref, nextTick, mergeProps } from 'vue';
import confetti from 'canvas-confetti';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
/* empty css                                */import { _ as _export_sfc } from './game_65bbb5b7.mjs';
import { $ as $$Showcase } from './about_f0b10ba6.mjs';
import { a as $$Layout } from './_slug__73b7ba41.mjs';
import 'html-escaper';
/* empty css                          */import '@astrojs/internal-helpers/path';
/* empty css                           *//* empty css                           *//* empty css                            *//* empty css                           */
const _sfc_main = {
  __name: 'ToDoList',
  setup(__props, { expose: __expose }) {
  __expose();

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

const __returned__ = { newTodo, todos, addTodo, clearToDos, saveToDoLocally, removeTodo, completeToDo, fetchToDoLocally, get draggedIndex() { return draggedIndex }, set draggedIndex(v) { draggedIndex = v; }, handleDragStart, handleDragOver, handleDrop, triggerConfetti, ref, onMounted, onUnmounted, nextTick, get confetti() { return confetti } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "min-h-[37vh]" }, _attrs))
  }><div class="text-center mb-4"><input type="text"${
    ssrRenderAttr("value", $setup.newTodo)
  } placeholder="Add a new todo" class="border-b-2 border-purple-600 bg-purple-100 bg-opacity-0 rounded-t p-2 text-purple-600 focus:outline-none focus:bg-opacity-100"><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Add </button><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Clear All </button></div><ul><!--[-->`);
  ssrRenderList($setup.todos, (todo, index) => {
    _push(`<li class="drag-item"${
      ssrRenderAttr("draggable", true)
    }><div class="bg-white p-5 rounded-lg shadow-md mb-5 cursor-move flex justify-between items-center"><input type="checkbox" class="cursor-pointer glow-element"${
      (ssrIncludeBooleanAttr(todo.completed)) ? " checked" : ""
    }><span class="${
      ssrRenderClass({
              'line-through': todo.completed,
              'text-center': true,
              'flex-grow': true,
            })
    }">${
      ssrInterpolate(todo.text)
    }</span><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Remove <i class="fa-solid fa-trash"></i></button></div></li>`);
  });
  _push(`<!--]--></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/ToDoList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const ToDo = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const $$ToDoList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ToDoList;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "To Do List", "text": "Simply by crossing a 'to-do' off a list, your brain releases endorphins to keep you motivated throughout the day. Simple, yet powerful." })}${maybeRenderHead()}<section class="page-content"><div class="container">${renderComponent($$result2, "ToDo", ToDo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/ZZMisc/Astro/astro-blog/src/components/ToDoList.vue", "client:component-export": "default" })}</div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/to-do-list.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/to-do-list.astro";
const $$url = "/to-do-list";

export { $$ToDoList as default, $$file as file, $$url as url };
