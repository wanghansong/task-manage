import { createApp } from 'vue';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import './styles/index.scss';
import './permission';
import App from './App.vue';
import router from './router';
import { errorHandler } from './error';
import 'uno.css';
import 'animate.css';

// import { i18n } from "./i18n"

import TitleBar from './components/common/TitleBar.vue';
// import ColorIcon from './components/color-icon/index.vue';

const app = createApp(App);
const store = createPinia();
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);
app.use(store);
// app.use(i18n)
errorHandler(app);

// 全局引入 TitleBar 组件
app.component('TitleBar', TitleBar);
// app.component("ColorIcon", ColorIcon);

app.mount('#app');
