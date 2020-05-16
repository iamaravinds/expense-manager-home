<template>
  <div class="login-form">

    <b-form v-if="mode ==='signin'" @submit.prevent>
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="user.uid"
          type="text"
          required
          placeholder="username"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password:"
        id="input-group-2"
      >
        <b-input
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
          placeholder="password"
          v-model="user.password"
        >
        </b-input>
        <b-form-text id="password-help-block">
        </b-form-text>
      </b-form-group>
      <b-form-group id="input-group-3">
        
        <div v-if="isLoading">
          <b-spinner type="grow" label="Spinning"></b-spinner>
          <b-spinner type="grow" label="Spinning"></b-spinner>
          <b-spinner type="grow" label="Spinning"></b-spinner>
        </div>
        <button
          v-else
          class="login-buttons"
          @click="signIn"
        >Login</button>

        <span
          class="form-signups"
          @click="mode = 'signup'"
        >Dont have an account yet?</span>
      </b-form-group>
      <!-- <span class="form-signups">
                Forgot Password?
            </span> -->
      <div
        v-if="!valid"
        class="form-error"
      >
        incorrect Username or password
      </div>
      
    </b-form>
    
    <b-form v-else @submit.prevent>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="newUser.firstname"
          type="text"
          required
          placeholder="First Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="newUser.lastname"
          type="text"
          required
          placeholder="Last Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="newUser.email"
          type="text"
          required
          placeholder="email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="newUser.userId"
          type="text"
          required
          placeholder="userId"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2">
        <b-input
          type="password"
          aria-describedby="password-help-block"
          placeholder="password"
          v-model="newUser.password"
        >
        </b-input>
        <b-form-text id="password-help-block">
        </b-form-text>
      </b-form-group>
      <b-form-group id="input-group-3">
        <button
          class="login-buttons"
          @click="signUp"
        >SignUp</button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>


import { generateHash } from "../helpers/utils";
export default {
  name: 'LoginForm',
  data () {
    return {
      user: {
        uid: '',
        password: ''
      },
      newUser: {
        firstname: '',
        lastname: '',
        userId: '',
        email: '',
        password: ''
      },
      mode: 'signin',
      valid: true,
      isLoading: false
    };
  },
  methods: {
    async signUp () {
      const signUpObj = {
        firstName: this.newUser.firstname,
        lastName: this.newUser.lastname,
        uid: this.newUser.userId,
        password: this.newUser.password,
        email: this.newUser.email
      }
      console.log(signUpObj);
      const response = await this.$dbService.User.signUp(signUpObj);
      if (response.result === "User Already Present") {
        this.$bvToast.toast('Please login to access your account', {
          title: 'User already present',
          variant: 'danger',
          toaster: 'b-toaster-top-center',
          solid: true
        })
      } else if (response.result === 'error') {
        this.$bvToast.toast('Please login to access your account', {
          title: 'Error creating user',
          variant: 'danger',
          toaster: 'b-toaster-top-center',
          solid: true
        })
      } else {
        this.$bvToast.toast('Please login to access your account', {
          title: 'User Created',
          variant: 'primary',
          toaster: 'b-toaster-top-center',
          solid: true
        })
      }
      this.mode = 'signin';
    },
    async signIn () {
      this.isLoading = true;
      if (this.user.password) {
        let hashedPassword = generateHash(this.user.password);
        const response = await this.$dbService.User.signIn(this.user.uid, hashedPassword, this.user.password);
        console.log('response', response);
        if (response === true) {
          this.$router.push({ path: '/records' });
        } else{
            this.$bvToast.toast('Please check the login credentials', {
              title: 'Incorrect Username or Password',
              variant: 'danger',
              toaster: 'b-toaster-top-center',
              solid: true
        });
        }
        this.isLoading = false;
      }
    }
  },
  created () { },
  mounted () {
    // console.log('store.state.user', this.$store.state.user);
    // if (this.$store.state.user) {
    //   this.$router.push({ path: '/records' });
    // }
  }
}
</script>

<style>
.login-form {
  padding: 1em;
  /* border: 1px orange solid; */
  box-shadow: 2px 2px 2px 2px #eee;
}
.login-buttons {
  margin: 3px;
  border: 1px solid orange;
  border-radius: 3px;
  /* height: 25px; */
  width: 80px;
  background: white;
  cursor: pointer;
}
.login-buttons:hover {
  background: orange;
  color: white;
  font-weight: bold;
  border: 1px solid lightgray;
}
.form-signups {
  padding: 1px;
  font-size: 14px;
  color: orangered;
  cursor: pointer;
}
.form-signups:hover {
  font-weight: bold;
}
.form-error {
  font-size: 12px;
  color: red;
  text-decoration: underline;
}
</style>