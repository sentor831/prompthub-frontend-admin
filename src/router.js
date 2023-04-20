import Vue from 'vue';
import Router from 'vue-router';

import DashboardLayout from 'src/layout/DashboardLayout.vue'
// GeneralViews
import NotFound from 'src/pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/pages/Login.vue'
import Users from 'src/pages/Users.vue'
import Works from 'src/pages/Works.vue'
import Uncheck from 'src/pages/Uncheck.vue'
import WorkInfo from 'src/pages/WorkInfo.vue'
import UncheckInfo from 'src/pages/UncheckInfo.vue'
import Redirect from 'src/components/Redirect.vue'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: "login",
      component: Login,
    },
    {
      path: '/admin',
      component: DashboardLayout,
      redirect: '/admin/users',
      children: [
        {
          path: 'users',
          name: 'Users',
          component: Users
        },
        {
          path: 'works',
          name: 'Works',
          component: Works,
        },
        {
          path: 'works/info',
          name: 'Info',
          component: WorkInfo
        },
        {
          path: 'uncheck',
          name: 'Uncheck',
          component: Uncheck
        },
        {
          path: 'uncheck/info',
          name: 'UncheckInfo',
          component: UncheckInfo
        }
      ]
    },
    {
      path: '/redirect',
      component: Redirect
    },
    { path: '*', component: NotFound }
  ]
});
