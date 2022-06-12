export default {
  install(Vue) {
    // 防止重复点击
    Vue.directive('preventReClick', {
      inserted(el, binding) {
        el.addEventListener('click', () => {
          if (el.tagName === 'DIV') {
            if (!el.classList.contains('disable-click')) {
              el.classList.add('disable-click');
              // el.parentElement.classList.add('disable-cursor');
              setTimeout(() => {
                el.classList.remove('disable-click');
                // el.parentElement.classList.remove('disable-cursor');
              }, binding.value || 1000)
            }
          } else {
            if (!el.disabled) {
              el.disabled = true;
              el.classList.add('button-disable');
              setTimeout(() => {
                el.disabled = false;
                el.classList.remove('button-disable');
              }, binding.value || 1000)
            }
          }
        })
      }
    })
  }
}
