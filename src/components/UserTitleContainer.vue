<template>
  <div class="user-title-main-container">
    <div class="user-img-container">
        <img 
            class="user-img"
            src="@/assets/profile-pic.png"
            :alt="userData.firstName">
    </div>
    <div class="user-title-data">
        <div class="user-name">{{userData.fullName}}</div>
        <div class="user-id">@{{userData.id}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'UserTitleContainer',
    props:{
        userData: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.user-title-main-container {
    color: white;
}
.user-img-container{
    height: 150px;
    width: 150px;
    padding: 5px;
    border: 5px solid orange;
    border-radius: 25%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    transition: border 0.5s;
    background-color: #eee;
}
.user-img-container:hover{
    border: 5px solid red;
}

.user-img-container > .user-img{
    height: 130px;
    width: 130px;
}
.user-title-data > .user-name{
    font-size: 28px;
}
.user-title-data > .user-id {
    font-size: 18px;
    color: darkgrey;
}
</style>