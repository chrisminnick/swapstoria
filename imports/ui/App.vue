
<template>
  <div id="app">
    <div v-if="!$subReady.Things">Loading...</div>

    <Thing v-for="thing in getThings" :label="thing.text"/>

    <Thing label="some test STATIC text"/>

  </div>
</template>

<script>
import Thing from './components/Thing.vue';
import { Things } from '../api/things.js';
import { Meteor } from 'meteor/meteor';

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
  methods: {
      insertSomething: function() {
          const text = "test text";
          const quantity = 5;

          Meteor.call('things.insert', text, quantity);
          console.log('inserting data');
          //let things = Things.find({}, { sort: { createdAt: -1 } }).fetch();
          //console.log(JSON.stringify(things));
      }
  },
  meteor: {
    $subscribe: {
        'Things': []
    },
    getThings () {
          // Here you can use Meteor reactive sources
          // like cursors or reactive vars
          // as you would in a Blaze template helper
        let things = Things.find({}, { sort: { createdAt: -1 } }).fetch();
        console.log(JSON.stringify(things));
        return things;
      }

  },
    mounted: function() {
        this.insertSomething();
        console.log(this.$subReady.Things)

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
