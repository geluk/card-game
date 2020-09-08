import Vue from 'vue';
import App from './App.vue';

import Game from './game/game';

Vue.config.productionTip = false;

window.app = new Vue({
  render: (h) => h(App, {
    props: {
      message: 'a test message',
      game: new Game(),
    },
  }),
}).$mount('#app');
