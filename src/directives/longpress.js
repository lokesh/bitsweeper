const PRESS_TIMEOUT = 250; // Longpress min in ms

export default {
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
};
