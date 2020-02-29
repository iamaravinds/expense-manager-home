<template>
    <MainLayout>
        <template slot="navBar"></template>
        <template slot="content">
            <b-container style="width:80%;">
                <h2>
                    Login
                </h2>
                <LoginForm/>
            </b-container>
        </template>
    </MainLayout>
</template>

<script>
import MainLayout from "@/layout/MainLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
export default {
  name: "Login",
    components: {
        MainLayout,
        LoginForm
    }
};
</script>

<style scoped>

</style>