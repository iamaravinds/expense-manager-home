<template>
  <div class="login">
    <header class="login-header">
        <h1>
            Login
        </h1>
    </header>
      <div class="login-form">
        <div class="form-elements">
            <span>Email :</span>
            <span><input type="text" v-model="user.email"></span>
        </div>
        <div class="form-elements">
            <span>Password :</span>
            <span><input type="password" v-model="user.password"></span>
        </div>
        <div class="form-buttons">
            <Button class="login-buttons" @click="login">Login</Button>
            <Button class="login-buttons">SignUp</Button>
        </div>
        <span class="form-forgot-password">
            Forgot Password?
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
};
</script>

<style scoped>
.login-form {
  padding: 1%;
  border:1px solid orangered;
  border-radius: 10px;
  width: 300px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  height: 130px;
  min-width: 302px;
}
.form-elements{
    padding: 2px;
    margin: 10px;
}
.form-buttons{
    padding: 2px;
    
}
.login-buttons{
    margin: 3px;
    border: 1px solid orange;
    border-radius: 3px;
    height: 25px;
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
.login-header{
    color: white;
    background: linear-gradient(to left, #f96, #ff5e62);
    width: 50%;
    margin: auto;
    min-width: 302px;
}
.login{
    margin: auto;
    min-width: 302px;   
    width: 50%;
    height: 300px;
    border: #ff5e62 1px solid;
    border-radius: 10px;
    padding: 2px;
}
</style>