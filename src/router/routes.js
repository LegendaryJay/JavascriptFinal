const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: (to) => {
          console.log(to);
          return "timer";
        },
      },
      {
        path: "timer",
        component: () => import("pages/TimerPage.vue"),
        name: "timer",
        meta: {
          title: "Timer",
        },
      },
      {
        path: "tasks",
        component: () => import("pages/TasksPage.vue"),
        name: "tasks",
        meta: {
          title: "Tasks",
          requireLogin: true,
        },
      },
      {
        path: "edit-task/:id",
        component: () => import("pages/ModifyTask.vue"),
        name: "taskEdit",
        props: (route) => ({ taskId: route.params.id }),
        meta: {
          title: "Edit Task",
          requireLogin: true,
        },
      },
      {
        path: "new-task",
        component: () => import("pages/ModifyTask.vue"),
        name: "newTask",
        meta: {
          title: "New Task",
          requireLogin: true,
        },
      },
      {
        path: "planner",
        component: () => import("pages/PlannerPage.vue"),
        name: "planner",
        meta: {
          title: "Planner",
          requireLogin: true,
        },
      },
      {
        path: "options",
        component: () => import("pages/OptionsPage.vue"),
        name: "options",
        meta: {
          title: "Options",
        },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
export default routes;
