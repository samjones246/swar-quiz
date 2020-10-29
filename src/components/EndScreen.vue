<template>
<div class="card">
  <header class="card-header">
      <p class="card-header-title">Results</p>
  </header>
  <div class="card-content">
      <center>
      <h1 class="title">You got {{$store.state.score}} / 20 correct</h1>
      <h2 class="subtitle">Enter initials below to save score and view leaderboard</h2>
      </center>
      <br>
      <div class="field has-addons has-addons-centered">
        <div class="control">
            <input class="input" :class="{'is-danger':error}" type="text" placeholder="AAA" maxlength="3" style="text-transform: uppercase; width:3.5em" v-model="initials" :disabled="loading">
        </div>
        <div class="control">
            <button class="button" @click="submitScore()" :disabled="loading" :class="{'is-loading':loading}">Submit Score</button>
        </div>
      </div>
      <center><p class="help is-danger" v-if="error">Please enter your initials</p></center>
  </div>
  <footer class="card-footer">
      <a class="card-footer-item" @click="restart()">Restart</a>
  </footer>
</div>
</template>

<script>
import axios from "axios"
export default {
    name: "EndScreen",
    data(){
        return {
            initials: "",
            error: false,
            loading: false
        }
    },
    methods: {
        restart(){
            this.$router.push("/options")
        },
        submitScore(){
            if(this.initials.length < 2){
                this.error = true;
            }else{
                this.error = false;
                this.loading = true;
                axios.post(`https://samjo.co/api/scores/save`, {
                    initials: this.initials.toUpperCase(),
                    score: this.$store.state.score,
                    gradesMask: this.arrayToMask(Object.values(this.$store.state.selectedGrades)),
                    attributesMask: this.arrayToMask(Object.values(this.$store.state.selectedAttributes)),
                })
                .then(() => {
                    this.$router.push("/leaderboard")
                })
                .catch(error => {
                    console.log(error.message)
                    this.loading = false;
                })
            }
        },
        arrayToMask(array){
            var out = 0;
            for(let i=0;i<array.length;i++){
                if(array[i]){
                    out += 2**(i)
                }
            }
            return out;
        }
    }
}
</script>

<style scoped>
    .field .help {
        width: 100%;
    }

    .field.has-addons {
        flex-wrap: wrap;
    }
</style>