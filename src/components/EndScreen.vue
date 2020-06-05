<template>
<div class="card">
  <header class="card-header">
      <p class="card-header-title">Final Score</p>
  </header>
  <div class="card-content">
      <center>
      <h1 class="title">You got {{score}} / 20 correct</h1>
      </center>
  </div>
  <footer class="card-footer">
      <a class="card-footer-item" @click="restart()">Restart</a>
  </footer>
</div>
</template>

<script>
export default {
    name: "EndScreen",
    props: {
        score: Number
    },
    methods: {
        restart(){
            this.$emit("restart")
        }
    }
}
</script>