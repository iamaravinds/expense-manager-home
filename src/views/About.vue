<template>
  <MainLayout>
    <template slot="navBar"></template>
    <template slot="content">
      <b-container class="profile-container">
        <div class="about">
          <h3>Expense Manager Home edition</h3>
          <div>
            Developed by Aravind S
          </div>
          <div>
            <img
              src="@/assets/devil-0-per.png"
              alt="Aravind"
              class="developer-photo"
            >
          </div>
        </div>
        <div class="social-media-links">
          <a href="https://www.facebook.com/iamaravinds">Facebook</a> |
          <a href="https://twitter.com/Iamaravinds">Twitter</a> |
          <a href="https://www.linkedin.com/in/aravind1994/">LinkedIn</a>
        </div>
      </b-container>
    </template>
  </MainLayout>
</template>
<script>

import MainLayout from "@/layout/MainLayout.vue";
export default {
  name: "About",
  components: {
    MainLayout
  }
};
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 30px;
}
.developer-photo {
  margin-top: 10px;
  height: 100px;
  border-radius: 50%;
  border: lightgray solid 5px;
}

.developer-photo:hover {
  margin-top: 20px;
  margin-bottom: 20px;
  border: orange solid 10px;
  transition: 0.3s ease-in-out;
  transform: scale(1.2);
}

.social-media-links > a {
  margin-left: 10px;
}
.social-media-links > a:hover {
  color: orange;
  /* background: black; */
  /* border: 0.5px solid red; */
  border-radius: 5px;
  text-decoration: none;
  font-size: 20px;
  transition: 0.3s;
  transform: scale(1.5);
}
</style>