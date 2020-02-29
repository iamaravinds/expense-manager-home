<template>
<MainLayout>
  <template slot="content">
    <div class="records">
      <div>
        <b-tabs cache-lifetime="100" :options="{ useUrlFragment: false }">
          <b-tab title="Add Transactions" active>
            <Transactions />
          </b-tab>
          <b-tab title="View Records">
            <ViewRecords />
          </b-tab>
        </b-tabs>
      </div>
    </div>
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

<style>
.tabs-component {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding:  1em 0em;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding:  1em 0em;
  }
}
</style>