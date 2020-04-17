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
              <b-col class="form-labels">
                <label for="expense-name">Expense </label>
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
              <b-col class="form-labels">
                <label for="expense-value">Value</label>
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
              <b-col class="form-labels">
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
              <b-col class="form-labels">
                <label for="expense-date">Date</label>
              </b-col>
              <b-col>
                <b-row class="date-box">
                  <b-col>
                    <b-form-datepicker value-as-date button-only dropleft v-model="transaction.date"></b-form-datepicker>
                    <!-- <DatePicker
                    class="expense-date-picker"
                      id="expense-category"
                          v-model="transaction.date"
                          :popover="{ placement: 'bottom', visibility: 'click' }">
                          <button class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none date-button">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  class="w-4 h-4 fill-current"
                                  height="25px">
                                  <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                              </svg>
                          </button>
                      </DatePicker> -->
                  </b-col>
                </b-row>
                  <!-- <b-form-input
                    
                  type="text"
                  name="expense-date"
                  id="expense-category"
                  class="expense-date"
                  disabled
                  :placeholder="formattedDate"
                /> -->
              </b-col>
            </b-row>
            <!-- <b-row>
              <b-col class="form-labels">
                <label for="expense-spent-by" v-if="transaction.type==='expense'">Spent By</label>
                <label for="expense-spent-by" v-else>Earned By</label>
              </b-col>
              <b-col>
                <b-form-input
                  
                  type="text"
                  name="expense-spent-by"
                  id="expense-spent-by"
                  class="form-text-box"
                  v-model="transaction.to"
                />
              </b-col>
            </b-row> -->
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
        
        
        this.transaction.date = this.transaction.date.toISOString();
        this.transaction.created = Date.now();
        this.transaction.value = parseFloat(this.transaction.value, 10);

        if (this.edit) {
            await this.$dbService.Transaction.updateTransaction(
              this.transaction
            ).then( () => {
                this.transaction = {};
                this.$notify({
                    group: "success",
                    title: "Transaction Updated",
                    text: "Transaction updated"
                });
                this.$emit('updateClose');
            });
        } else {
            const key = await this.$dbService.Transaction.addTransaction(
              this.transaction
            ).then(value => {
              return value;
            });
            this.$notify({
              group: "success",
              title: "Transaction Saved",
              text: `Transaction saved with ID ${key}`
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
.transactions {
  padding: 1px;
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
.form-text-box {
  /* margin-left: 2px;
  background: white;
  border: orange 0.25px solid; */
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
  width: 50%;
  text-align: center;
}
.form-container-expense > input {
    border:solid 1px orange;
  }
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
</style>
