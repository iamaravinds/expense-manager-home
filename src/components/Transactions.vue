<template>
  <b-container>
    <div class="transactions">
      <b-form  v-on:submit.prevent class="form-wrapper">
        <b-container class="heading">
          <b-form-radio-group
            v-model="transaction.type"
            :options="options"
            class="mb-3"
            value-field="item"
            text-field="name"
          ></b-form-radio-group>
        </b-container>
        <b-container class="form-container-expense">
          <b-container class="form-data">
            <b-row>
              <b-col sm="3" class="form-labels">
                <label for="expense-name">Title </label>
              </b-col>
              <b-col>
                <b-form-input
                  type="text"
                  name="expense-name"
                  id="expense-name"
                  class="form-text-box"
                  v-model="transaction.expenseName"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3" class="form-labels">
                <label for="expense-value">Amount</label>
              </b-col>
              <b-col>
                <b-form-input
                  
                  type="number"
                  name="expense-value"
                  id="expense-value"
                  class="form-text-box"
                  v-model="transaction.value"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3" class="form-labels">
                <label for="expense-category">Category</label>
              </b-col>
              <b-col>
                <b-form-input
                  
                  type="text"
                  name="expense-category"
                  id="expense-category"
                  class="form-text-box"
                  v-model="transaction.category"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3" class="form-labels">
                <label for="expense-date">Date</label>
              </b-col>
              <b-col>
                <b-row class="date-box">
                  <!-- <b-col> -->
                    <div class="date-align">
                      <b-form-datepicker value-as-date button-only dropleft v-model="transaction.date"></b-form-datepicker>
                    </div>
                  <!-- </b-col> -->
                </b-row>
                
              </b-col>
            </b-row>
          </b-container>
          
          <div class="action-buttons">
            <div class="action-button">
              <!-- <button @click="saveData">Save</button> -->
              <b-button @click="saveData" variant="primary">Save</b-button>
            </div>
            <div class="action-button">
              <b-button @click="clearData" variant="warning">Clear</b-button>
            </div>
          </div>
        </b-container>
      </b-form >
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: "Transactions",
  // components: { DatePicker },
  computed:{
     ...mapGetters([
      'getCurrentUser'
      // ...
    ])
  },
  data() {
    return {
      options:[{ item: 'income', name: 'Income' },
          { item: 'expense', name: 'Expense' }],
      transaction: {
        type: "expense"
      }
    };
  },
  props:{
      editTransaction: Object,
      edit: Boolean
  },
  methods: {
    clearData() {
      this.transaction = {
        type: "expense"
      };
    },
    async saveData() {
      if (
        
        this.transaction.category &&
        this.transaction.date &&
        this.transaction.expenseName &&
        this.transaction.value
      ) {
        this.transaction.by= this.getCurrentUser.id;
        console.log(this.transaction);
        
        
        this.transaction.date = this.transaction.date.getTime();
        this.transaction.created = Date.now();
        this.transaction.value = parseFloat(this.transaction.value, 10);

        if (this.edit) {
            await this.$dbService.Transaction.updateTransaction(
              this.transaction
            ).then( () => {
                this.transaction = {};
                this.$bvToast.toast('Please login to access your account', {
                  title: 'Transaction Updated',
                  variant: 'primary',
                  toaster: 'b-toaster-top-center',
                  solid: true
                })
                this.$emit('updateClose');
            });
        } else {
            await this.$dbService.Transaction.addTransaction(
              this.transaction
            ).then(() => {
              return this.$bvToast.toast('Transaction saved successfully' , {
                  title: 'Transaction Saved',
                  variant: 'primary',
                  toaster: 'b-toaster-top-center',
                  solid: true
                })
            });

        }
      } else {
        console.log("Error");

        this.$notify({
          group: "error",
          title: "Bad Input",
          text: "Please check the values properly"
        });
      }
    }
  },
  mounted(){
      if(this.editTransaction) {
          this.transaction = this.editTransaction;
      }
  }
};
</script>

<style scoped>
.transactions {
  padding: 1px;
}
#expense-date{
    display: none;
}
.expense-date{
  width: 70%;
  margin-right:10px ;
  background: white;
  border: none;
}
.expense-date-picker{
  width: 70%;
}

.heading {
  padding: 2%;
  text-align: center;
}
.date-button{
  background-color: white;
  border: none;
  height: 30px;
  width: 30px;
}

.action-buttons {
  display: flex;
  padding: 1px;
  align-content: center;
  margin-top: 5px;
}

.action-button {
  padding: 5px;
}
.form-container-expense {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  text-align: center;
}
/* .form-container-expense > input {
    border:solid 1px orange;
  } */
.form-wrapper {
  border: 0.5px solid lightgray;
  border-radius: 10px;
  /* width: 50%; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  min-width: 276px;
  background: none;
  box-shadow: 4px 4px darkgray;
}
.form-labels {
  text-align: justify;
  font-size: 16px;
}
.form-data {
  font-size: 12px;
  font-weight: bold;
}
.date-box{
  padding: 2px;
  height: 45px;
}
.date-align{
    position: relative;
    /* width: 100%; */
    padding-right: 15px;
    padding-left: 15px;
}
</style>
