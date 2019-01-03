<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* 暂时 todo */
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  /* 暂时 */
  .app-container{
    margin-top:10px;
    margin-left:10px;
  }
</style>
