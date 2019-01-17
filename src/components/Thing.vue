<template>

    <tr>
      <td>{{ quantity }}</td>
      <td>{{ label }}</td>
    </tr>

</template>

<script>
export default {
  name: 'Thing',
  props: {
    quantity: Number,
    label: String
  },
  computedProperties: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
