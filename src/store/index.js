import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedAttributes: {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true
    },
    selectedGrades: {
      "2": true,
      "3": true,
      "4": true,
      "5": true
    },
    score: 0,
    initialised: false,
    families: null
  },
  mutations: {
    selectAttributes(state, attributes){
      state.selectedAttributes = attributes;
    },
    selectGrades(state, grades){
      state.selectedGrades = grades;
    },
    setScore(state, score){
      state.score = score;
    },
    init(state){
      state.initialised = true;
    },
    initFamilies(state, families){
      state.families = families;
    }
  },
  actions: {
  },
  modules: {
  }
})
