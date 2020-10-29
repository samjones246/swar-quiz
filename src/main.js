import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Question from "./components/Question"
import GradeSelect from "./components/GradeSelect"
import EndScreen from "./components/EndScreen"
import Leaderboard from "./components/Leaderboard"
const routes = [
  { path: '/leaderboard', component: Leaderboard },
  { path: '/quiz', component: Question},
  { path: '/options', component: GradeSelect},
  { path: '/results', component: EndScreen}
]
const router = new VueRouter({routes})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
