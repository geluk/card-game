import Vue from 'vue';
import App from './App.vue';

import Game from './game/game';

Vue.config.productionTip = false;

const app = new Vue({
  render: (h) => h(App),
}).$mount('#app');
