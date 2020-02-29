<template>
  <div class="main-layout">
    <slot name="navBar"><Navbar/></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
    name: 'MainLayout',
    components:{
        Navbar
    }

}
</script>

<style scoped>
</style>