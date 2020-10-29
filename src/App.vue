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
          <router-view></router-view>
          <!--<grade-select v-if="phase===1" @begin="begin($event)"></grade-select>
          <question v-if="phase==2" :grades="grades" :attributes="attributes" :mode="mode" @done="done($event)"></question>
          <end-screen v-if="phase===3" :score="score" @restart="phase=1"></end-screen>
          <leaderboard :initGrades="grades" :initAttributes="attributes"></leaderboard>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    //ModeSelect
  },
  data: function(){
    return {
      phase: 1,
      mode: 0,
      grades: {
        "2": true,
        "3": true,
        "4": true,
        "5": true
      },
      attributes:{
        0: true,
        1: true,
        2: true,
        3: true, 
        4: true  
      },
      score: null,
    }
  },
  created: function(){
    if(this.$route.path !== "/options" && this.$route.path !== "/leaderboard"){
      this.$router.replace("/options")
    }
  },
  watch: {
    '$route.path': function(){
      if(this.$route.path !== "/options" && this.$route.path !== "/leaderboard" && !this.$store.state.initialised){
      this.$router.replace("/options")
      }
    }
  },
  methods: {
    begin(options) {
      this.grades = options.grades;
      this.attributes = options.attributes;
      //this.phase++;
      this.$router.push("/quiz")

    },
    setMode(mode){
      this.mode = mode;
      this.phase++;
    },
    done(score){
      this.score = score;
      this.phase = 3;
    }
  },
}
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
</style>
