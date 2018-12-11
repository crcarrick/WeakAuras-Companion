import Vue from "vue";
import Router from "vue-router";
import About from "@/components/UI/About.vue";
import Config from "@/components/UI/Config.vue";
import Dashboard from "@/components/UI/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/"
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/config",
      name: "config",
      component: Config
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
