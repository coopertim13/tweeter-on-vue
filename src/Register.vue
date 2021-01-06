<template>
    <div className = "inner-sign-in">
            <div className = "title-outer">
                <div className = "title-inner">
                    <h1 className = "reg-title title">Tweeter</h1>
                    <span className = "slogan">Twitter, but not as good.</span>
                </div>
            </div>
            <div className = "form-outer">
                <form className = "sign-in-form register-form" v-on:submit="submitForm">
                    <div className = "register-head">Create an Account</div>
                    <div className = "name">
                        <input type="text" id="first-name" name="first-name" @input="updateFirstName" placeholder="First Name" required/><input type="text" id="last-name" name="last-name" @input="updateLastName" placeholder="Last Name" required/>
                    </div>
                    <div className = "name">
                        <input type="number" class = "form-age" name="age" @input="updateAge" placeholder="Age" required/><input type="email" class = "form-email" name="email" placeholder="Email" @input="updateEmail" required/>
                    </div>
                    <input type="text" id="username" name="username" @input="updateUsername" placeholder="Username" required/><br/>
                    <input type="password" id="password" name="password" @input="updatePassword" placeholder="Password" required/><br/>
                    <h3 className = "profile-pic-text">Select Profile Picture</h3>
                    <label>
                        <input type="radio" id = "dp-1" name="dp" @input="updateProfilePicture" required/>
                        <img className = "profile-picture-select" alt="dp-1" src="@/images/dp-1.png"/>
                    </label>
                    <label>
                        <input type="radio" id = "dp-2" name="dp" @input="updateProfilePicture"/>
                        <img className = "profile-picture-select" alt="dp-2" src="@/images/dp-2.png"/>
                    </label>
                    <label>
                        <input type="radio" id = "dp-3" name="dp" @input="updateProfilePicture"/>
                        <img className = "profile-picture-select" alt="dp-3" src="@/images/dp-3.png"/>
                    </label>
                    <label>
                        <input type="radio" id = "dp-4" name="dp" @input="updateProfilePicture"/>
                        <img className = "profile-picture-select" alt="dp-4" src="@/images/dp-4.png"/>
                    </label>
                    <label>
                        <input type="radio" id = "dp-5" name="dp" @input="updateProfilePicture"/>
                        <img className = "profile-picture-select" alt="dp51" src="@/images/dp-5.png">
                    </label>
                    <label>
                        <input type="radio" id = "dp-6" name="dp" @input="updateProfilePicture"/>
                        <img className = "profile-picture-select" alt="dp-6" src="@/images/dp-6.png"/>
                    </label>
                    <input type="submit" value="Register"/>
                    <div className = "wrongCreds userExists">Sorry, username already exists.</div>
                </form>
                <a className = "back-to-sign-in" href="/login">&lt; Back to Login</a>
            </div>
        </div>
</template>

<script>
  import registerService from '../services/register.js'
  export default {
    name: 'Register',
    data: function() {
      return {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        profile_picture: ''
      }
    },
    methods: {
      updateFirstName: function(event) {
        this.first_name = event.target.value
      },
      updateLastName: function(event) {
        this.last_name = event.target.value
      },
      updateAge: function(event) {
        this.age = event.target.value
      },
      updateEmail: function(event) {
        this.email = event.target.value
      },
      updateUsername: function(event) {
        this.username = event.target.value
      },
      updatePassword: function(event) {
        this.password = event.target.value
      },
      updateProfilePicture: function(event) {
        this.profile_picture = event.target.id
      },
      async submitForm(e) {
        e.preventDefault()
        await registerService.register(this.$store.getters.new_username, this.$store.getters.new_password,
                                        this.$store.getters.first_name, this.$store.getters.last_name,
                                        this.$store.getters.email, this.$store.getters.age,
                                        this.$store.getters.profile_picture)
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