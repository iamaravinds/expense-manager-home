<template>

  <div id="app">
    <notifications group="success" />
    <notifications group="error" />
    <notifications group="warn" />
      <router-view/>
  </div>
</template>

<style scoped>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   height: 100vh;
   background: #343a40;
   color: white;
}

</style>
