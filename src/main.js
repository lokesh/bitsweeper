import { createApp } from 'vue'
import App from './App.vue'
import store from './store'


const PRESS_TIMEOUT = 350

// TODO: Unbind directive
// TODO: Move to dep file


const app = createApp(App);

app.use(store);

app.directive('longpress', {
  beforeMount(el, binding) {
    let { value } = binding;
    
    if (typeof value !== 'function') {
      console.warn(`Expect a function, got ${value}`)
      return
    }

    let pressTimer = null

    const start = e => {
      if (e.type === 'mousedown' && e.button !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    ['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start));
    ['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel));    
  }
})

app.mount('#app')

