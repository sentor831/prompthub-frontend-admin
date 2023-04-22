<template>
  <div class="wrapper">
    <side-bar title="PromptHub后台">
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link> -->
      <div @click="toManageUsers()">
        <sidebar-link to="/admin/users">
          <i class="nc-icon nc-circle-09"></i>
          <p>管理用户</p>
        </sidebar-link>
      </div>
      <div @click="toManageWorks()">
        <sidebar-link to="/admin/works">
          <i class="nc-icon nc-paper-2"></i>
          <p>管理作品</p>
        </sidebar-link>
      </div>
      <sidebar-link to="/admin/uncheck">
        <i class="nc-icon nc-notes"></i>
        <p>审核作品</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link> -->

      <!-- <template slot="bottom-links">
        <sidebar-link class="active" to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from './MobileMenu.vue'
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    page: 1
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    toManageWorks() {
      this.cookie.clearCookie('page')
      if (this.$route.path === '/admin/works') {
        this.$router.replace({
          path: '/redirect',
          query: {
            path: encodeURI('/admin/works')
          }
        })
      }
    },
    toManageUsers() {
      this.cookie.clearCookie('page')
      if (this.$route.path === '/admin/users') {
        this.$router.replace({
          path: '/redirect',
          query: {
            path: encodeURI('/admin/users')
          }
        })
      }
    },
  }
}

</script>
