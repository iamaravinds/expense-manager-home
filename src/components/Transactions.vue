<template>
  <div class="transactions">
      <form v-on:submit.prevent>
          <div class="heading">
              <input type="radio" name="record-type" id="income-radio" @change="transaction.type='income'">
              <label for="income-radio">Income</label> |
              <input type="radio" name="record-type" id="expense-radio" @change="transaction.type='expense'">
              <label for="expense-radio">Expense</label>
          </div>
          <div class="form-container-expense">
              <table class="form-data">
                    <tr>
                        <td>
                            <label for="expense-name">Name</label>
                        </td>
                        <td>
                            <input type="text" name="expense-name" id="expense-name" class="form-text-box" v-model="transaction.expenseName">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="expense-value">Value</label>
                        </td>
                        <td>
                            <input type="number" name="expense-value" id="expense-value" class="form-text-box" v-model="transaction.value">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="expense-category">Category</label>
                        </td>
                        <td>
                            <input type="text" name="expense-category" id="expense-category" class="form-text-box" v-model="transaction.category">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="expense-date">Date</label>
                        </td>
                        <td>
                            <input type="date" name="expense-date" id="expense-date" class="form-text-box" v-model="transaction.date">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="expense-spent-by" v-if="transaction.type==='expense'">Spent By</label>
                            <label for="expense-spent-by" v-else>Earned By</label>
                        </td>
                        <td>
                            <input type="text" name="expense-spent-by" id="expense-spent-by" class="form-text-box" v-model="transaction.by">
                        </td>
                    </tr>
              </table>
              <div class="action-buttons">
                  <div class="action-button">
                    <button @click="saveData">
                        Save
                    </button>
                  </div>
                  <div class="action-button">
                    <button>
                        Cancel
                    </button>
                  </div>
                  <div class="action-button">
                    <button>
                        Draft
                    </button>
                  </div>
              </div>
          </div>
      </form>
  </div>
</template>

<script>
export default {
    name:'Transactions',
    data() {
        return {
            transaction:{
                type: 'expense'
            }
        }
    },
    methods:{
        saveData() {
            console.log(this.transaction);
        }
    }
}
</script>

<style scoped>
.transactions {
    border: 1px solid black;
    /* background: black;
    color: white; */
    border-radius: 1em;
    padding: 1em;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
}
.heading{
    padding: 2%
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
</style>
