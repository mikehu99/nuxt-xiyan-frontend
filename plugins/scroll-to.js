import Vue from 'vue';
import {scrollTo} from "@/utils/scroll-to";
let utils = {
  install(Vue) {
    Vue.prototype.scrollTo = scrollTo;
  }
}
Vue.use(utils);
