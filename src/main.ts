import { createApp, App } from 'vue';
import AppComponent from './App.vue';
import router from './router';
import Icon from './components/Icon/index';

import store from './store';

const components = [
  Icon,
];

const install = function (app: App) {
  components.forEach((component) => {
    app.use(component);
  });
  return app;
};
export {
  install,
  Icon,
};
export default {
  install,
};
createApp(AppComponent).use(store).use(router).mount('#app');
