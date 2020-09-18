import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Toasted, {
  duration: 5000,
  position: 'bottom-center',
  className: 'toast-notification',
});

declare global {
  interface Window {
    app: Vue;
  }
}

window.app = new Vue({
  render: (h) => h(App),
}).$mount('#app');
