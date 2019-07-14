import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';

import './assets/stylesheets/main.scss';

Vue.component('font-awesome-icon', FontAwesomeIcon);

document.addEventListener('DOMContentLoaded', () => {
  new Vue({ render: h => h(App) }).$mount('#app');
});
