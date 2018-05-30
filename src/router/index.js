import Vue from 'vue';
import Router from 'vue-router';
import Page1 from '@/pages/page1/index';
import Page2 from '@/pages/page2/index';
import Page3 from '@/pages/page3/index';
import Page4 from '@/pages/page4/index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Page1
    },
    {
      path: '/page2',
      name: 'Page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'Page3',
      component: Page3
    },
    {
      path: '/page4',
      name: 'Page4',
      component: Page4
    }
  ]
});
