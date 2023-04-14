<template>
  <footer class="footer">
    <div class="container-fluid">
      <!-- <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{ path: '/admin' }">Dashboard</router-link>
          </li>
        </ul>
      </nav> -->
      <div class="copyright text-center">
        &copy; {{ year }}, Designed and Coded by WhenMeeting.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}

</script>
<style></style>
