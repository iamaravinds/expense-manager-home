<template>
<MainLayout>
    <template slot="navBar"></template>
    <template slot="content">
        <div>
            <div class="heading">
                Budget
            </div>
            <div class="table-container">
                <b-table-simple hover small caption-top responsive sticky-header sticky-footer>
                    <b-thead head-variant="dark">
                        <b-tr>
                            <b-th >Category</b-th>
                            <b-th >Sub-Category</b-th>
                            <b-th >Amount</b-th>
                        </b-tr>
                    </b-thead>
                    <div :style="{ color: 'white', 'font-weight': 'bold'}">
                        EXPENSES
                    </div>
                    
                    <b-tbody class="table-body">
                        <b-tr v-for="(category, index) in expenseObj" :key="index" :style="{ color: 'white'}">
                            <b-td>
                                <input 
                                    type="checkbox"
                                    :name="category.category + category.subcategory" 
                                    :id="category.category + category.subcategory"
                                    v-model="category.enabled"
                                    >
                            </b-td>

                            <b-td>{{category.category}}</b-td>
                            <b-td>{{category.subcategory}}</b-td>
                            <b-td><input type="number" class="txt-amount" :v-model="category.amount"></b-td>
                        </b-tr>
                    </b-tbody>

                </b-table-simple>
            </div>
            <div class="table-foot">
                <b-td colspan="1" class="text-right">
                Total Amount: <b>{{10}}</b>
                </b-td>
            </div>
        </div>
    </template>
  </MainLayout>
</template>

<script>
// import { mapGetters } from 'vuex'
import MainLayout from "@/layout/MainLayout.vue";
import CATEGORY from "@/constants.js"
export default {
    name: 'budget',
    components: {
      MainLayout,
    },
    data() {
        return {
            budgetObj : {},
            incomeObj : {},
            expenseObj : {}
        }
    },
    mounted() {
        // console.log(CATEGORY);
        let types = Object.keys(CATEGORY);
        types.forEach(type => {
            if (!this.budgetObj[type]) {
                this.budgetObj[type] = {}
            }
            Object.keys(CATEGORY[type]).forEach(cat => {
                this.budgetObj[type][cat] = CATEGORY[type][cat];
            });
        });
        this.incomeObj = this.budgetObj['income']
        this.expenseObj = []
        Object.keys(this.budgetObj['expense']).forEach(cat => {
            this.budgetObj['expense'][cat].forEach(subcat => {
                this.expenseObj.push(
                    {
                    category: cat,
                    subcategory: subcat,
                    enabled: false,
                    amount: 0
                    }
                );
            });
            
        });
        
    }
}
</script>

<style scoped>
/* .table-container{
    width: 100%;
    height: 750px;
    overflow-y: scroll;
} */
.table-body{
    margin-left:5px ;
}
.txt-amount {
    width: 100px;
    border-radius: 15px;
    border: none;
    background: lightgrey;
}
.table-foot{

}
</style>