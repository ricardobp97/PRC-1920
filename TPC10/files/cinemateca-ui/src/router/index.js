import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Página Principal",
        component: () => import("../views/Principal.vue"),
    },
    {
        path: "/filmes",
        name: "Página Principal",
        component: () => import("../views/Principal.vue"),
    },
    {
        path: "/filmes/:idFilme",
        name: "Consulta Filme",
        component: () => import("../views/ConsultaFilme.vue"),
    },
    {
        path: "/atores",
        name: "Atores",
        component: () => import("../views/Atores.vue"),
    },
    {
        path: "/atores/:idAtor",
        name: "Consulta Ator",
        component: () => import("../views/ConsultaAtor.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
