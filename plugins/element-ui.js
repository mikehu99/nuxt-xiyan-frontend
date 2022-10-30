import Vue from 'vue'
// ElementUI
import {Message,Button,Dialog,Card,Input,Popover,Popconfirm,Tooltip,Divider,Form,FormItem,Menu,MenuItem,Breadcrumb,BreadcrumbItem,Dropdown,DropdownItem,DropdownMenu,Skeleton,SkeletonItem,Empty,Upload} from 'element-ui';
import {Submenu,Switch} from 'element-ui';
// ,MessageBox,Button,Dialog,Card,Input,Popover,Popconfirm,Tooltip,
// Divider,Form,FormItem,Menu,MenuItem,Breadcrumb,BreadcrumbItem,Dropdown,
// DropdownItem,DropdownMenu,Skeleton,SkeletonItem,Empty,Upload);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Input);
Vue.use(Popover);
Vue.use(Popconfirm);
Vue.use(Tooltip);
Vue.use(Divider);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Empty);
Vue.use(Upload);
Vue.use(Submenu);
Vue.use(Switch);
Vue.prototype.$message = Message;
