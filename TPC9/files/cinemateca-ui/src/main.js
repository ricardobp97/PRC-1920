import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
}).$mount("#app");
