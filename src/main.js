import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';

import './assets/stylesheets/main.scss';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);


import defaultStore from './store';

Vue.use(Vuex);

const store = new Vuex.Store(defaultStore);

document.addEventListener('DOMContentLoaded', () => {
  new Vue({ store, render: h => h(App) }).$mount('#app');
});
