import React from 'react';
import Vue from 'vue'

import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.vue';
Meteor.startup(() => {
    new Vue({
        render: function (h) { return h(App) },
    }).$mount('#render-target')
});