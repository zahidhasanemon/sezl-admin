import { createRouter, createWebHistory } from "vue-router";

const routes = [
  //   {
  //     path: "/email/verify",
  //     name: "EmailVerify",
  //     component: () => import("./Pages/EmailVerification.vue"),
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
