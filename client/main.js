import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker);


import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.vue';
import { Things } from '../imports/api/things.js';

Meteor.startup(() => {
    //const text = "test text";
    //const quantity = 5;

    //Meteor.call('things.insert', text, quantity);
    //let things = Things.find({}, { sort: { createdAt: -1 } }).fetch();
    //console.log(JSON.stringify(things));

    new Vue({
        render: function (h) { return h(App) },
    }).$mount('#render-target')
});
