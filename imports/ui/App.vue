
<template>
  <div id="app">
    <Thing v-for="thing in things" v-bind:label="thing.text"/>
  </div>
</template>

<script>
import Thing from './components/Thing.vue';
import { Things } from '../api/things.js';
//const Things = [{text:"this is a thing"}];

export default {
  name: 'app',
  components: {
    Thing
  },
  computed: {
      filterThings: function (things) {

          // remove completed items from the array if hideCompleted is checked.
          if (this.hideCompleted) {
              things = things.filter(thing => !thing.checked);
          }

          // if the thing belongs to the current user, show the 'private' button
          return things.map((thing) => {
              const currentUserId = this.props.currentUser && this.props.currentUser._id;
              thing.showPrivateButton = thing.owner === currentUserId;
              return thing;
          });
      }
  },
  data: function(){
      let things = this.getThings(Things);
      console.log(things);
      return {things};
  },
  meteor: {
      getThings (Things) {
          var t = Things.find({}, { sort: { createdAt: -1 } }).fetch();
          return t;
      }
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
