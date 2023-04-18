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

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/users',
    children: [
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
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
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
