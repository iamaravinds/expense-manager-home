<template>
  <div class="user-data-form-container">
      <b-container class="bv-example-row">
        <!-- <b-row>
            <b-col>Email</b-col>
            <b-col>{{userData.email}}</b-col>
            <div class="w-100"></div>
            <b-col>Phone</b-col>
            <b-col>
                <the-mask
                    :mask="mask"
                    :placeholder="mask"
                    v-model="user.phone">
                </the-mask>
            </b-col>
        </b-row> -->

        <b-table-simple borderless="borderless" responsive dark>
            <b-tbody>
            <b-tr>
                <b-th>Email</b-th>
                <b-td>{{userData.email}}</b-td>
            </b-tr>
            </b-tbody>
            <b-tbody>
            <b-tr>
                <b-th>Phone</b-th>
                <b-td> 
                    <the-mask
                    :mask="mask"
                    :placeholder="mask"
                    v-model="user.phone"
                    class="input-form"
                    >
                </the-mask>
                </b-td>
            </b-tr>
            </b-tbody>
        </b-table-simple>
        <button
          class="save-button"
          @click="save"
        >Save</button>
      </b-container>
  </div>
</template>

<script>
  import { TheMask } from 'vue-the-mask';

  const countriesData = {
    IN: {
      countryCode: '+91',
      mask: '+91 ##### #####'
    }
  };
export default {
    name: 'UserDataForm',
    components: {
        TheMask
    },
    props:{
        userData: {
            type: Object,
            required: true
        }
    },
    computed: {
      mask() {
        return countriesData.IN.mask;
      },
      countriesList() {
          return Object.keys(countriesData);
      }
    },
    data(){
        return {
            user: {
                country: 'IN'
            }
        }
    },
    mounted() {
        this.user = this.userData;
    },
    methods: {
        async save(){
            await this.$dbService.User.updateUserData(this.user.id, countriesData.IN.countryCode + this.user.phone);
            this.$bvToast.toast('Phone Number saved successfully', {
                title: 'Data saved',
                variant: 'primary',
                toaster: 'b-toaster-top-center',
                solid: true
            })
        }
    }

}
</script>

<style scoped>
.save-button{
  margin: 3px;
  border: 1px solid orange;
  border-radius: 3px;
  /* height: 25px; */
  width: 80px;
  background: white;
  cursor: pointer;
}
.save-button:hover {
  background: orange;
  color: white;
  font-weight: bold;
  border: 1px solid lightgray;
}
.input-form{
    border: none;
}
</style>