import Vue from 'vue'
import App from './App'

import http from './http'
import bar from './components/bar/bar.vue';

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.component('bar',bar)
App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount() 
