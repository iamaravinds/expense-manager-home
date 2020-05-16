<template>
<MainLayout>
    <template slot="navBar"></template>
    <template slot="content">
      <b-container class="profile-container" fluid>
        <UserContainer
        v-if="getCurrentUser"
        :userData="getCurrentUser"
        />
      </b-container>
    </template>
  </MainLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import MainLayout from "@/layout/MainLayout.vue";
import UserContainer from '@/components/UserContainer';
export default {
    name: 'Profile',
      components: {
      MainLayout,
      UserContainer
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