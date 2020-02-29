<template>
    <div class="login-form">
        <b-form> 
            <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="user.email"
                type="text"
                required
                placeholder="username"
                ></b-form-input>
            </b-form-group>
            <b-form-group
            label="Password:"
            id="input-group-2">
                <b-input type="password" id="text-password" aria-describedby="password-help-block" placeholder="password" v-model="user.password">
                </b-input>
                <b-form-text id="password-help-block">
                </b-form-text>
            </b-form-group>
            <b-form-group
                id="input-group-3">
               <b-button variant="faded" class="login-buttons" @click="login">Login</b-button>
               <b-button variant="faded" class="login-buttons" >SignUp</b-button>
            </b-form-group>
            <span class="form-forgot-password">
                Forgot Password?
            </span>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
     data() {
    return {
        user:{
            email:'',
            password:''
        }
    };
  },
  methods: {
      login() {
          if(this.user.email === 'dev' && this.user.password === 'root') {
              this.$router.push({ path: '/records' })
          }
      }
  },
  created() {},
  mounted() {}
}
</script>

<style>
.login-form {
  padding: 1em;
  /* border: 1px orange solid; */
  box-shadow: 2px 2px #eee
}
.login-buttons{
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
.form-forgot-password{
    padding: 1px;
    font-size: 11px;
    color:orangered;
    cursor: pointer;
}
.form-forgot-password:hover{
    font-weight: bold;
}
</style>