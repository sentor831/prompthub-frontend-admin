<template>
    <div class="redirect">

    </div>
</template>
<script>
export default {
    beforeCreate() {
        const { query } = this.$route
        const path = query.path
        this.$router.replace({ path: path })
    },
    mounted() { },
    render: function (h) {
        return h() // avoid warning message
    }
}
</script>