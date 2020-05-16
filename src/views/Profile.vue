<template>
<MainLayout>
    <template slot="navBar"></template>
    <template slot="content">
      <b-container class="profile-container">
        <div>
          Welcome {{`${getCurrentUser.firstName} ${getCurrentUser.lastName}`}}
        </div>
      </b-container>
    </template>
  </MainLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLayout from "@/layout/MainLayout.vue";
export default {
    name: 'Profile',
      components: {
      MainLayout
    },
    computed:{
      ...mapGetters([
            'getCurrentUser'
        ]),
    },
}
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 30px;
}

</style>