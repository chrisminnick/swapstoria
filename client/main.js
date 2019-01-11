import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker);


import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.vue';

Meteor.startup(() => {
    new Vue({
        render: function (h) { return h(App) },
    }).$mount('#render-target')
});
