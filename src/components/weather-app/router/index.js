import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../HomeView.vue";
import CityView from "../CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/weather-app",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});

//targe the route before re enter
// router.beforeEach((to, from, next) => {
//   document.title = `${
//     to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
//   } | The Local Weather`;
//   next();
// });

export default router;
