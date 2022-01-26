import { createApp } from 'vue'
import mitt from 'mitt';

import {
  DIFFICULTY_EASY,
  THEME_EGA,
} from '@/utils/constants';
import App from './App.vue'
import store from './store'
import longpress from './directives/longpress';

/*
Mitt is used to create an event bus.
- this.emitter.emit('toggle', {x: 10, y: 20});
- this.emitter.on('toggle', coords => { });
 */
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

// Configure default state
store.dispatch('changeDifficulty', DIFFICULTY_EASY);
store.dispatch('changeTheme', THEME_EGA);

app.use(store);
app.directive('longpress', longpress);
app.mount('#app')

