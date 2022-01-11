import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import longpress from './directives/longpress';

const app = createApp(App);
app.use(store);
app.directive('longpress', longpress);
app.mount('#app')

