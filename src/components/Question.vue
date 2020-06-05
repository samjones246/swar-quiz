<template>
<div class="card">
  <header class="card-header">
    <p class="card-header-title">Question {{ questionNumber }}{{ mode==2 ? "" : " of "+totalQuestions}}:</p>
  </header>
  <div class="card-content">
    <div v-if="showAnswer">
      <div v-if="correct">
        <center>
          <h1 class="title is-4">Correct!</h1>
        </center>
      </div>
      <div v-else>
        <center>
          <h1 class="title is-4">Incorrect!</h1>
          <p class="content is-medium">It was {{ attribute }} {{ family }}</p>
        </center>
      </div>
    </div>
    <div v-else>
      <p class="content is-large">
        <center> Monster: <b>{{ name }}</b> </center>
      </p>
      <div class="level">
        <attribute-chooser class="level-item" :enabledAttributes="attributes" v-model="guess.attribute"></attribute-chooser>
        <family-chooser class="level-item" :monsters="monsters" v-model="guess.family"></family-chooser>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <template v-if="showAnswer">
      <a v-if="questionNumber!=totalQuestions" class="card-footer-item" @click="newMonster()">Next Question</a>
      <a v-else class="card-footer-item" @click="done()">Finish</a>
    </template>
    <template v-else>
      <p v-if="mode===2" class="card-footer-item">Score: {{ score }}</p>
      <p v-else class="card-footer-item">Score: {{ score }} / {{ questionNumber - 1}}</p>
      <a class="card-footer-item" @click="submit()">Confirm</a>
    </template>
  </footer>
</div>
</template>

<script>
import data from "../assets/data.json"
import FamilyChooser from "./FamilyChooser"
import AttributeChooser from "./AttributeChooser"
const monsters = data.monsters;
const attributes = data.attributes;
export default {
  name: 'Question',
  components: {
    FamilyChooser,
    AttributeChooser
  },
  data: function(){
    return {
      name: "",
      family: "",
      attribute: "",
      guess: {
        family: "",
        attribute: attributes[0]
      },
      grade: 2,
      questionNumber: 0,
      score: 0,
      monsters: [],
      questions: [],
      showAnswer: false
    }
  },
  props: {
    grades: Object,
    attributes: Object,
    mode: Number
  },
  computed: {
    totalQuestions: function(){
      if(this.mode == 0){
        return Math.min(20, this.questions.length);
      }
      if(this.mode == 1){
        return this.monsters.length;
      }else{
        return null;
      }
    }
  },
  methods: {
    getMonsters(){
      this.monsters = [];
      this.questions = [];
      for(var grade in this.grades){
        if(this.grades[grade]){
          this.monsters = this.monsters.concat(monsters[parseInt(grade)-2])
        }
      }
      var families = this.monsters;
      for(family of families){
        for(attribute of [0,1,2,3,4]){
          if(!this.attributes[attribute]){
            family.members[attribute] = null;
          }
          if(family.members.filter(m => m != null).length === 0){
            families = families.filter(f => f !== family)
          }
        } 
      }
      this.monsters = families;
      this.guess.family = families.sort((e1, e2) => e1.familyName.localeCompare(e2.familyName))[0].familyName
      for(var i=0;i<20;i++){
        if(families.length == 0){
          break
        }
        var family = families[Math.floor(Math.random() * Math.floor(families.length))];
        var validAttributes = [0,1,2,3,4].filter(i => family.members[i])
        shuffle(validAttributes)
        var attribute = validAttributes[0];
        this.questions.push({
          family: family.familyName,
          attribute: attributes[attribute],
          name: family.members[attribute]
        })
        family.members[attribute] = null;
        var depleted = true;
        for(var j=0;j<5;j++){
          if(family.members[j] != null){
            depleted = false;
          }
        }
        if(depleted){
          families = families.filter(f => f.familyName != family.familyName);
        }
      }
    },
    newMonster(){
      this.showAnswer = false;
      this.questionNumber++;
      var monster = this.questions[this.questionNumber-1]
      this.family = monster.family;
      this.attribute = monster.attribute;
      this.name = monster.name
    },
    submit(){
      this.correct = this.guess.family === this.family && this.guess.attribute === this.attribute;
      if(this.correct){
        this.score++;
      }else if(this.guess.family === this.family){
        this.score+=0.5
      }
      this.showAnswer = true;
    },
    done(){
      this.$emit("done", this.score);
    }
  },
  created: function(){
    this.getMonsters();
    this.newMonster();
  }
}
function shuffle(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
</script>