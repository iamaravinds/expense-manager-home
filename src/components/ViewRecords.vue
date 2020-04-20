<template>
<b-container>
  <div class="view-container">
      <div v-if="transactionArray.length > 0">
        <!-- <b-table 
          striped 
          hover 
          :fields="fields" 
          :items="transactionArray" 
          :sticky-header="true" 
          :no-border-collapse="true"
          sort-icon-left
          responsive="sm"
        >
        </b-table> -->
        <div>Transaction History</div>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th >Expense</b-th>
            <b-th >Value</b-th>
            <b-th >Category</b-th>
            <b-th >Date</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          
          <b-tr v-for="field in transactionArray" :key="field"  
            :style="{ color: field.color}"
        >
            <b-td>{{field.expense}}</b-td>
            <b-td>{{field.value}}</b-td>
            <b-td>{{field.category}}</b-td>
            <b-td>{{dateFormatter(field.date)}}</b-td>
          </b-tr>
          
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="7" variant="secondary" class="text-right">
              Total Rows: <b>{{transactionArray.length}}</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
      </div>
      <div v-else class="empty-records">
        <div>What a Void!</div><div>No Records Yet</div>
      </div>
    <ModalEditTransaction v-if="showModal" v-on:close="close" :editTransaction="editTransaction" :showModal="showModal"></ModalEditTransaction>
    <div class="expense-table">
      <table v-if="false">
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
</b-container>
</template>

<script>
import ModalEditTransaction from "@/modals/ModalEditTransaction";
import { mapGetters } from 'vuex'
export default {
  name: "ViewRecords",
  components:{ ModalEditTransaction },
  computed:{
      ...mapGetters([
      'getCurrentUser'
      // ...
    ]),
    incOrExp(type){
      return type==='E'? "danger" : "success";
    },
    classObject(color) {
      return {
        color: color
      }
    },
    dateFormatter(){
      return date => `${new Date(date).getDate()}/${(new Date(date).getMonth()+1)}/${new Date(date).getFullYear()}`;
    }
    },
    watch:{
      getCurrentUser() {
        this.updateTransactionData();
      }
    },
  data() {
    return {
      showModal: false,
      transactions: {},
      transactionArray:[],
      loading: true,
      editTransaction : null,
      fields: [{key:'type', sortable:true}, 'expense', 'value', {key:'category', sortable:true}, {key:'date', sortable:true}],
      tableData: [{
        expenseName:null,
        value:null,
        category:null,
        date:null,
        by:null
      }]
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
      this.updateTransactionData();
      this.loading = false;

    },
    updateTransactionData() {
      this.transactionArray = [];
      if (this.transactions) {
        Object.keys(this.transactions).forEach(transaction => {
          
          if (this.getCurrentUser && this.transactions){
            if(this.transactions[transaction].by === this.getCurrentUser.id) {
             this.transactions[transaction].id = transaction;
              const pushObj = {
               type: this.transactions[transaction].type === 'expense' ? 'E': 'I',
               expense: this.transactions[transaction].expenseName,
               value: this.transactions[transaction].value,
               category: this.transactions[transaction].category,
               date: this.transactions[transaction].date,
               id: this.transactions[transaction].id,
               color: (this.transactions[transaction].type === 'expense') ? '#FD7272': '#0D8800'
             }
             this.transactionArray.push(pushObj)
             this.transactionArray.sort(function(a, b) {
                return b.date-a.date
            })
           }
          }
        });
      } else {
        console.log('No records');
      }
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
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

}
.expense-table {
  padding: 1px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  min-width: 276px;
  border-radius: 10px;
  /* width: 550px; */
  overflow-y: auto;
  height: 300px;
}
.expense-table-head {
  padding: 1px;
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
.empty-records{
  margin-top: 100px;
  text-align: center;
  font-size: 24px;
}
</style>