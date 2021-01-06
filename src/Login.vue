<template>
  <div className = "container">
    <div className = "sign-in">
        <div className = "inner-sign-in">
            <div className = "title-outer">
                <div className = "title-inner">
                    <h1 className = "reg-title title">Tweeter</h1>
                    <span className = "slogan">Twitter, but not as good.</span>
                </div>
            </div>
            <div className = "form-outer">
                <form className = "sign-in-form" v-on:submit="submitForm">
                    <input @input="updateUsername" type="text" id="username" name="username" placeholder="Username" required/><br/>
                    <input @input="updatePassword" type="password" id="password" name="password" placeholder="Password" required/><br/>
                    <input type="submit" value="Login"/>
                    <div className = "wrongCreds">Sorry, incorrect username or password.</div>
                </form>
                <a className = "register-but" href="/register">Create an Account</a>
                <span className = "guestButton">Continue as Guest &gt;</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import loginService from '../services/login.js'
  export default {
    name: 'Login',
    data: function() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      updateUsername: function(event) {
        this.username = event.target.value
      },
      updatePassword: function(event) {
        this.password = event.target.value
      },
      async submitForm(e) {
        e.preventDefault()
        await loginService.login(this.state.username, this.state.password)
          .then(data => {
            console.log(data)
            this.$store.commit('change', {
              name: "loggedIn",
              value: true
            })
            this.$router.push('/home')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

