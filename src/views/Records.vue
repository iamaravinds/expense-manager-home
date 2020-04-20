<template>
<MainLayout>
  <template slot="navBar"></template>
  <template slot="content">
    <b-container>
      <b-tabs cache-lifetime="100" :options="{ useUrlFragment: false }">
        <b-tab title="Add Transactions">
          <Transactions />
        </b-tab>
        <b-tab title="View Records">
          <ViewRecords />
        </b-tab>
      </b-tabs>
    </b-container>
  </template>
</MainLayout>
  
</template>

<script>
import Transactions from "@/components/Transactions.vue";
import ViewRecords from "@/components/ViewRecords.vue";
import MainLayout from "@/layout/MainLayout.vue";
export default {
  name: "Records",
  components: { Transactions, ViewRecords, MainLayout }
};
</script>
