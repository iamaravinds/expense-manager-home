<template>
  <div class="view-container">
      <div>
        <table class="expense-table-head">
            <tr class="table-head">
                <!-- <td class="table-head-data">Transaction Id</td> -->
                <td><div class="table-head-data">Type</div></td>
                <td><div class="table-head-data">Expense</div></td>
                <td><div class="table-head-data">Value</div></td>
                <td><div class="table-head-data">Category</div></td>
                <td><div class="table-head-data">Date</div></td>
                <td><div class="table-head-data">Spent By</div></td>
                <td><div class="table-head-data">Action</div></td>
            </tr>
        </table>
      </div>
    <ModalEditTransaction v-if="showModal" v-on:close="close" :editTransaction="editTransaction" :showModal="showModal"></ModalEditTransaction>
    <div class="expense-table">
      <table>
        <tr class="table-data" v-for="transaction in transactions" :key="transaction">
          <!-- <td ><div class="table-transaction-data">{{transaction.id}}</div></td> -->
          <td>
            <div
              class="table-transaction-data"
              :class=" [transaction.type==='expense' ? 'expense-text' : 'income-text']"
            >{{transaction.type==='expense' ? 'EXP' : 'INC' }}</div>
          </td>
          <td>
            <div class="table-transaction-data">{{transaction.expenseName}}</div>
          </td>
          <td>
            <div class="table-transaction-data">{{transaction.value}}</div>
          </td>
          <td>
            <div class="table-transaction-data">{{transaction.category}}</div>
          </td>
          <td>
            <div class="table-transaction-data">{{transaction.date}}</div>
          </td>
          <td>
            <div class="table-transaction-data">{{transaction.by}}</div>
          </td>
          <td>
            <div class="table-transaction-data">
              <Button class="edit-button" @click="showModalPop(transaction)">
                <img src="../assets/edit.png" alt="edit" height="10px" />
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ModalEditTransaction from "@/modals/ModalEditTransaction";
export default {
  name: "ViewRecords",
  components:{ ModalEditTransaction },
  data() {
    return {
      showModal: false,
      transactions: {},
      transactionArray:[],
      loading: true,
      editTransaction : null
    };
  },
  methods: {
      close(){
          this.showModal = false;
          this.editTransaction = null;
      },
    showModalPop(transaction){
        this.showModal = true;
        this.editTransaction= transaction;
        this.$modal.show('ModalEditTransaction');
    },
    getAllTransactions() {
      this.$dbService.Transaction.getAllTransaction(this.transactionsCallback);
    },
    transactionsCallback(snap) {
      this.loading = true;
      this.transactions = snap.val();
      Object.keys(this.transactions).forEach(transaction => {
        this.transactions[transaction].id = transaction;
      });
      this.loading = false;

    }
  },
  mounted() {
    console.log("View all data");
    this.getAllTransactions();
  }
};
</script>

<style scoped>
.view-container {
  padding: 1px;
}
.expense-table {
  padding: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  min-width: 276px;
  border-radius: 10px;
  width: 550px;
  overflow-y: auto;
  height: 300px;
}
.expense-table-head {
  padding: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  min-width: 276px;
  border-radius: 10px;
  width: 550px;
  overflow: hidden;
}
.table-head {
  padding: 1px;
}
.table-head-data {
    border-bottom: 0.5px solid lightgray;
    font-weight: bold;
    font-size: 12px;
    padding: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70px;
    font-size: 12px;
}
.table-data {
  padding: 1px;
}
.table-data:hover {
  background: #eee;
}
.table-transaction-data {
  padding: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 70px;
  font-size: smaller;
}
.edit-button {
  background: white;
  border: none;
}
.expense-text {
  color: red;
  font-weight: bold;
}
.income-text {
  color: green;
  font-weight: bold;
}
</style>