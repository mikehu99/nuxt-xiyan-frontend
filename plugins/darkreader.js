import Vue from 'vue';
import {disable as disableDarkMode, enable as enableDarkMode} from 'darkreader'
let utils = {
  install(Vue) {
    Vue.prototype.disableDarkMode = disableDarkMode;
    Vue.prototype.enableDarkMode = enableDarkMode
  }
}
Vue.use(utils);

