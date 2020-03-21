<template>
    <div class="login-form">
        <b-form v-if="mode ==='signin'"> 
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
               <b-button variant="faded" class="login-buttons" @click="mode = 'signup'">SignUp</b-button>
            </b-form-group>
            <span class="form-forgot-password">
                Forgot Password?
            </span>
        </b-form>
        <b-form v-else>
            <b-form-group
                id="input-group-1"
                label="First Name:"
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
                label="Last Name:"
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
                label="email:"
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
                label="UserId:"
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
            <b-form-group
            label="Password:"
            id="input-group-2">
                <b-input type="password" id="text-password" aria-describedby="password-help-block" placeholder="password" v-model="newUser.password">
                </b-input>
                <b-form-text id="password-help-block">
                </b-form-text>
            </b-form-group>
            <b-form-group
                id="input-group-3">
               <b-button variant="faded" class="login-buttons" @click="mode = 'signin'">Login</b-button>
               <b-button variant="faded" class="login-buttons" @click="signUp">SignUp</b-button>
            </b-form-group>
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
        },
        newUser:{
            firstname:'',
            lastname:'',
            userId:'',
            email:'',
            password:''
        },
        mode: 'signin'
    };
  },
  methods: {
      login() {
          if(this.user.email === 'dev' && this.user.password === 'root') {
              this.$router.push({ path: '/records' })
          }
      },
      async signUp(){
          const signUpObj = {
                firstName: this.newUser.firstname,
                lastName:this.newUser.lastname,
                uid: this.newUser.userId,
                password: this.newUser.password,
                email:this.newUser.email
          }
         const response = await this.$dbService.User.signUp(signUpObj);
         if (response.result === "User Already Present") {
             this.$notify({
               group: "error",
               title: "User already present",
               text: "Please login to access your account"
             });
         } else if(response.result === 'error') {
            this.$notify({
               group: "error",
               title: "Error creating user",
               text: "Please check the inputs"
             });
         } else {
             this.$notify({
               group: "success",
               title: "User Created",
               text: "Please login now"
             });
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