<template>
  <div class="transactions">
    <form v-on:submit.prevent class="form-wrapper">
      <div class="heading">
        <input
          type="radio"
          name="record-type"
          id="income-radio"
          @change="transaction.type='income'"
        />
        <label for="income-radio">Income</label> |
        <input
          type="radio"
          name="record-type"
          id="expense-radio"
          @change="transaction.type='expense'"
          checked
        />
        <label for="expense-radio">Expense</label>
      </div>
      <div class="form-container-expense">
        <table class="form-data">
          <tr>
            <td class="form-labels">
              <label for="expense-name">Expense </label>
            </td>
            <td>
              <input
                type="text"
                name="expense-name"
                id="expense-name"
                class="form-text-box"
                v-model="transaction.expenseName"
              />
            </td>
          </tr>
          <tr>
            <td class="form-labels">
              <label for="expense-value">Value</label>
            </td>
            <td>
              <input
                type="number"
                name="expense-value"
                id="expense-value"
                class="form-text-box"
                v-model="transaction.value"
              />
            </td>
          </tr>
          <tr>
            <td class="form-labels">
              <label for="expense-category">Category</label>
            </td>
            <td>
              <input
                type="text"
                name="expense-category"
                id="expense-category"
                class="form-text-box"
                v-model="transaction.category"
              />
            </td>
          </tr>
          <tr>
            <td class="form-labels">
              <label for="expense-date">Date</label>
            </td>
            <td>
                <button>Today</button>
                <button>Yesterday</button>
                <DatePicker
                    v-model="transaction.date"
                    :popover="{ placement: 'bottom', visibility: 'click' }">
                    <button class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            class="w-4 h-4 fill-current"
                            height="15px">
                            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
                        </svg>
                    </button>
                </DatePicker>

            </td>
          </tr>
          <tr>
            <td class="form-labels">
              <label for="expense-spent-by" v-if="transaction.type==='expense'">Spent By</label>
              <label for="expense-spent-by" v-else>Earned By</label>
            </td>
            <td>
              <input
                type="text"
                name="expense-spent-by"
                id="expense-spent-by"
                class="form-text-box"
                v-model="transaction.by"
              />
            </td>
          </tr>
        </table>
        <div class="action-buttons">
          <div class="action-button">
            <button @click="saveData">Save</button>
          </div>
          <div class="action-button">
            <button>Cancel</button>
          </div>
          <div class="action-button">
            <button>Draft</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
export default {
  name: "Transactions",
  components: { DatePicker },
  data() {
    return {
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
    async saveData() {
      if (
        this.transaction.by &&
        this.transaction.category &&
        this.transaction.date &&
        this.transaction.expenseName &&
        this.transaction.value
      ) {
        console.log(this.transaction);
        let formatStr = this.transaction.date;
        formatStr = formatStr.toISOString();
        
        this.transaction.date = formatStr.substr(0,10)
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
.transactions {
  padding: 1px;
}
.heading {
  padding: 2%;
}

.form-text-box {
  margin-left: 2px;
}
.action-buttons {
  display: flex;
  padding: 1px;
  align-content: center;
  margin-top: 5px;
}

.action-button {
  padding: 1px;
  margin-left: 3px;
}
.form-container-expense {
  margin-left: auto;
  margin-right: auto;
  width: 14em;
}
.form-wrapper {
  border: 0.5px solid lightgray;
  border-radius: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  min-width: 276px;
  background: none;
  box-shadow: 4px 4px darkgray;
}
.form-labels {
  text-align: left;
}
.form-data {
  font-size: 12px;
  font-weight: bold;
}
</style>
