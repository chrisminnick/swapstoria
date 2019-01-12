<template>
  <div id="app">

    <Thing v-for="thing in things" :label="thing.title"/>

  </div>
</template>

<script>
    import Thing from './components/Thing.vue';
    import { Things } from '../imports/api/things.js';

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
    data() {
        return Things;
    },
    methods: {

    },
    mounted: function() {

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
