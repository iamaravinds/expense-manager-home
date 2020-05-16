<template>
<b-row>
    <b-col md="12" xs="12" sm="12"  >
        <div class="user-container">
            <div class="user-title-container">
                <UserTitleContainer
                    :userData="userData"
                />
            </div>
            <div class="user-details-container">
                <UserDataForm
                    :userData="userData"
                />

            </div>
        </div>
    </b-col>
</b-row>
</template>

<script>
import UserTitleContainer from '@/components/UserTitleContainer'
import UserDataForm from '@/forms/UserDataForm'
export default {
    name: 'UserContainer',
    props:{
        userData: {
            type: Object,
            required: true
        }
    },
    components:{
        UserTitleContainer,
        UserDataForm
    }
}
</script>

<style scoped>
.user-container{
    width: 100%;
    padding: 10px;
    text-align: center;
    
}

.user-title-container{
    padding: 10px;
    background-image: url("../assets/cover-image-default.jpg");
    border-radius: 20px;
    
}
.user-details-container{
    margin-top: 10px;
    padding: 10px;
    border: 2px solid #eee;
    border-radius: 20px;
}
</style>