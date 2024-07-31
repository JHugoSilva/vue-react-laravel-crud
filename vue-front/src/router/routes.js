const routes = [
  {
    path: "",
    name: "home",
    component: ()=> import("@/views/HomeView.vue"),
  },
  {
    path: "",
    component:()=> import("@/views/Auth/AuthView.vue"),
    children: [
      {
        path: "register",
        name: "register",
        component:()=> import("@/views/Auth/RegisterView.vue"),
        meta: { guest: true }
      },
      {
        path: "login",
        name: "login",
        component:()=> import("@/views/Auth/LoginView.vue"),
        meta: { guest: true }
      },
    ],
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import('@/views/Posts/PostsView.vue'),
    children: [
      {
        path: "create",
        name: "create",
        component: () => import('@/views/Posts/CreateView.vue'),
        meta: { auth: true }
      },
      {
        path: "post/:id",
        name: "show",
        props: true,
        component: () => import('@/views/Posts/ShowView.vue'),
        meta: { auth: true }
      },
      {
        path: "posts/update/:id",
        name: "update",
        props: true,
        component: () => import('@/views/Posts/UpdateView.vue'),
        meta: { auth: true }
      }
    ]
  }
];

export default routes;
