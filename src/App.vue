<template>
  <div id="app">
    <form>
      <input type="text"
             placeholder="Type to add a new thing"
             id="thingToAdd"
             v-model="newThing" />
      <input
          type="number"
          ref="quantity"
          placeholder="How Many"
          v-model="newThingQuan"
      />
      <input type="submit" v-on:click="addThing" value="Swap It!" class="swap-button"/>
    </form>
    <table class="table table-striped">
      <tbody>
        <Thing v-for="thing in things.slice().reverse()" :quantity="thing.quantity" :label="thing.title" :key="thing.id"/>
      </tbody>
    </table>
  </div>

</template>

<script>
    import Thing from './components/Thing.vue';
    import { Things } from '../imports/api/things.js';

    var thingStorage = {
        fetch: function () {
            let things = Things.things; //replace with fetch?

            return things;
        },
        generateID: function () { // ok for now until we have a database

            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
        },
        save: function (things) {

        }
    };

    export default {
    name: 'app',
        components: {
        Thing
    },
    computed: {

        filterThings: function (things) {
        //this totally doesn't work yet, but it contains the logic that will need to work.

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
    data() {
        return {
            things:thingStorage.fetch(),
            newThing:'',
            newThingQuan:0
        };
    },
    methods: {
        addThing: function (event) {
            event.preventDefault();

            var value = this.newThing && this.newThing.trim();
            if (!value) {
                return
            }
            var quantity = parseInt(this.newThingQuan);
            let id = thingStorage.generateID();
            this.things.push({
                id: id,
                quantity: quantity,
                title: value
            });
            console.log("adding: " + id + " " + quantity + " " + value);

            this.newThing = '';
            this.newThingQuan = 0;
        },
        removeThing: function() {}
    },
    mounted: function() {
      //get data here?
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
  ul {
    list-style-position: inside;
    text-align: left;
    width: 300px;
    margin: 0 auto;
  }
</style>
