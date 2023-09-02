import { c as createAstro, b as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_c89a7039.mjs';
import 'clsx';
import { b as $$Card, a as $$Layout } from './_slug__73b7ba41.mjs';
import { $ as $$Showcase } from './about_f0b10ba6.mjs';
import { useSSRContext, mergeProps, ref, onMounted } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
/* empty css                                   */import { _ as _export_sfc } from './game_65bbb5b7.mjs';
import confetti from 'canvas-confetti';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
/* empty css                          *//* empty css                            *//* empty css                           *//* empty css                           *//* empty css                           */
const _sfc_main$1 = {
  props: { initialChecked: Boolean, rowIndex: Number, colIndex: Number },
  data() {
    return {
      isChecked: this.initialChecked,
    };
  },
  methods: {
    updateContent() {
      this.$emit("input");
    },
    toggleCheck() {
      this.isChecked = !this.isChecked;
      this.$emit(
        "update:checked",
        this.isChecked,
        this.rowIndex,
        this.colIndex
      );
    },
  },
};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<input${ssrRenderAttrs(mergeProps({
    type: "checkbox",
    checked: $data.isChecked
  }, _attrs))} data-v-841b3395>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Cell.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const CellApp = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1],['__scopeId',"data-v-841b3395"]]);

// Data

const _sfc_main = {
  __name: 'HabitTracker',
  setup(__props, { expose: __expose }) {
  __expose();

const newHabit = ref("");
const habits = ref([]);
const days = ref([
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
    "Are you sure you want to eliminate this Habit?"
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
    "Are you sure you want to clear ALL of your habits marks?"
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
    "Are you sure you want to ELIMINATE ALL of your habits?"
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
const triggerConfetti = () => {
  confetti({
    particleCount: 200,
    startVelocity: 50,
    spread: 360,
    origin: {
      x: 0.5,
      y: 0.5,
    },
    ticks: 300,
  });
};

const __returned__ = { newHabit, habits, days, updateCell, addHabit, saveHabitLocally, fetchHabitsLocally, removeConfirmation, removeHabit, clearAllConfirmation, clearHabits, removeAllConfirmation, removeAll, triggerConfetti, ref, onMounted, CellApp, get confetti() { return confetti } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="text-center mb-[5%]"><input type="text"${ssrRenderAttr("value", $setup.newHabit)} placeholder="Add a Habit to track" class="border-b-2 border-purple-600 bg-purple-100 bg-opacity-0 rounded-t p-2 text-purple-600 focus:outline-none focus:bg-opacity-100"><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Add Habit </button><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Clear All Checkboxes </button><button class="text-purple-600 border-[0.15em] border-purple-600 rounded-full px-4 py-2 transition duration-500 hover:bg-purple-600 hover:text-white"> Eliminate All Habits </button></div>`);
  if ($setup.habits.length > 0) {
    _push(`<div class="overflow-x-auto" style="${ssrRenderStyle({"max-width":"100%"})}"><table class="min-w-full divide-y divide-gray-200 whitespace-nowrap"><thead class="bg-gray-50"><tr><!--[-->`);
    ssrRenderList($setup.days, (day, colIndex) => {
      _push(`<td class="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase"><b>${ssrInterpolate(colIndex === 0 ? "Habit" : day)}</b></td>`);
    });
    _push(`<!--]--></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    ssrRenderList($setup.habits, (habit, rowIndex) => {
      _push(`<tr><td class="px-2 py-4"><b>${ssrInterpolate(habit.name)}</b></td><!--[-->`);
      ssrRenderList($setup.days, (cell, colIndex) => {
        _push(`<td class="px-2 py-4">`);
        if (colIndex < 31) {
          _push(ssrRenderComponent($setup["CellApp"], {
            class: "checkbox glow-element",
            initialChecked: habit.check.includes(colIndex + 1),
            rowIndex: rowIndex,
            colIndex: colIndex,
            "onUpdate:checked": $setup.updateCell
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (colIndex === 31) {
          _push(`<div class="cursor-pointer"><i class="fa-solid fa-trash text-red-500 hover:text-red-700"></i></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td>`);
      });
      _push(`<!--]--></tr>`);
    });
    _push(`<!--]--></tbody></table></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/HabitTracker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const HabitTrackerApp = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const $$HabitTracker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HabitTracker;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Habit Tracker" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "Habit Tracker", "text": "Here's a simple yet powerful tool I learned from James Clear's book 'Atomic Habits.' It involves marking the habits you want to integrate into your daily life and keeping track of them. We often forget to follow through with tasks, and this tool serves as a friendly and encouraging reminder." })}${maybeRenderHead()}<section class="page-content"><div class="container">${renderComponent($$result2, "Card", $$Card, {}, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "HabitTrackerApp", HabitTrackerApp, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/ZZMisc/Astro/astro-blog/src/components/HabitTracker.vue", "client:component-export": "default" })}` })}</div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/habit-tracker.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/habit-tracker.astro";
const $$url = "/habit-tracker";

export { $$HabitTracker as default, $$file as file, $$url as url };
