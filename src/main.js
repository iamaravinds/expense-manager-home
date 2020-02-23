import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dbService from "./service/dbService";
import FirebaseService from './service/firebaseService'
import Notifications from 'vue-notification'
import Tabs from 'vue-tabs-component';

FirebaseService.init();
Vue.use(Notifications);
Vue.use(Tabs);
Vue.prototype.$dbService = dbService;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
