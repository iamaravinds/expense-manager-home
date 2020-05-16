<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="routingPageData">Expense Manager Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item  v-if="getCurrentUser" to="/profile">Profile</b-nav-item>
        <b-nav-item :to="routingPageData" v-if="getCurrentUser" @click="signOut">Sign Out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name: 'Navbar',
    watch:{
      getCurrentUser: {
        immediate: true,
        handler() {
          this.updateRoutingPage()
          }
      }
    },
    props:{
      getCurrentUser:{
        type: Object,
        default: null
      }
    },
    data() {
      return {
        routingPageData:'/'
      }
    },
    methods: {
      async signOut() {
        const response = await this.$dbService.User.userSignOut();
        console.log(response);
        this.$router.push({ path: '/' });
      },
      updateRoutingPage() {
        if(this.getCurrentUser !== null) this.routingPageData = '/records';
        else this.routingPageData = '/';
    }
    }
}
</script>

<style>

</style>