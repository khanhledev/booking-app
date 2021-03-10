<template>
  <div>
    <a
      style="margin:15% 50%"
      href="https://slack.com/oauth/v2/authorize?client_id=2337620625.421907403488&scope=users%3Aread%2Cusers%3Aread.email&user_scope=&redirect_uri=&state=&granular_bot_scope=1&single_channel=0&install_redirect=&tracked=1&team="
      ><img src="https://api.slack.com/img/sign_in_with_slack.png"
    /></a>
  </div>
</template>

<script>
export default {
  name: 'Index',
  async beforeCreate() {
    // Get local storage
    let token = this.$route.query.token
    if (!token) {
      token = localStorage.getItem('booking-token')
    }

    if (!token) {
      return
    }

    await fetch(`http://booking.vn/api/oauth.php?token=${token}`).then((response) => {
      response.json().then((data) => {
        if (!data.success) {
          return
        }

        localStorage.setItem('booking-token', token)
        this.$router.push({ path: '/home' })
      })
    })
  },
}
</script>
