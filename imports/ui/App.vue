<template>
  <div id="app">
    <Thing label="First Thing"/>
    <Thing label="Second Thing"/>
    <Thing label="Third Thing"/>
  </div>
</template>

<script>
import Thing from './components/Thing.vue'


export default {
  name: 'app',
  components: {
    Thing
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
