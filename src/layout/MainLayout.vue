<template>
  <div class="main-layout">
    <slot name="navBar"><Navbar :getCurrentUser="getCurrentUser"/></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from "@/components/Navbar.vue";
export default {
    name: 'MainLayout',
    computed:{
      ...mapGetters([
      'getCurrentUser'
      // ...
    ]),
    },
    components:{
        Navbar
    }

}
</script>

<style scoped>
</style>