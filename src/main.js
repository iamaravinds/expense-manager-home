import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
import config from './config';

Vue.config.productionTip = false
firebase.initializeApp(config.firebase);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
