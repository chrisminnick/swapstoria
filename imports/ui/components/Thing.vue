<template>
  <div>
    <h1>{{ label }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Thing',
  props: {
    label: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
