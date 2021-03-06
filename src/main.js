import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dbService from "./service/dbService";
import FirebaseService from './service/firebaseService'
import Notifications from 'vue-notification'
import Tabs from 'vue-tabs-component';
import VModal from 'vue-js-modal';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const firebase = FirebaseService.init();
firebase.auth.onAuthStateChanged(function(user) {
  console.log(user);
  
  if (user) {
     console.log('User is signed in.');
     store.dispatch('setCurrentUser',user)
    .then(() => {
      console.log("store.state.user in main.js ",store.state.user);
      // router.push({name:'Records'});
     });

  } else {
    store.dispatch('clearCurrentUser')
    .then(() => {
      console.log('No user is signed in.');
      // router.push({name:'Login'});
    });
  }
});


Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(Tabs);
Vue.use(VModal, { dialog: true });
Vue.prototype.$dbService = dbService;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
