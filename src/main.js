import { createApp } from 'vue'
import {
  DIFFICULTY_MEDIUM,
  THEME_1BIT,
} from '@/utils/constants';
import App from './App.vue'
import store from './store'
import longpress from './directives/longpress';

const app = createApp(App);


// Configure default state
store.dispatch('changeDifficulty', DIFFICULTY_MEDIUM);
store.dispatch('changeTheme', THEME_1BIT);

app.use(store);
app.directive('longpress', longpress);
app.mount('#app')

