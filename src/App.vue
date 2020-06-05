<template>
  <div id="app">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Summoner's War Monster Quiz</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <!--<mode-select v-if="phase===0" @next="setMode($event)"></mode-select>-->
          <grade-select v-if="phase===1" @begin="begin($event)"></grade-select>
          <question v-if="phase==2" :grades="grades" :attributes="attributes" :mode="mode" @done="done($event)"></question>
          <end-screen v-if="phase===3" :score="score" @restart="phase=1"></end-screen>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Question from "./components/Question"
import GradeSelect from "./components/GradeSelect"
import EndScreen from "./components/EndScreen"
//import ModeSelect from "./components/ModeSelect"
export default {
  name: 'App',
  components: {
    Question,
    GradeSelect,
    EndScreen,
    //ModeSelect
  },
  data: function(){
    return {
      phase: 1,
      mode: 0,
      grades: {
        "2": false
      },
      attributes:{},
      score: null
    }
  },
  methods: {
    begin(options) {
      this.grades = options.grades;
      this.attributes = options.attributes;
      this.phase++;
    },
    setMode(mode){
      this.mode = mode;
      this.phase++;
    },
    done(score){
      this.score = score;
      this.phase = 3;
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
</style>
