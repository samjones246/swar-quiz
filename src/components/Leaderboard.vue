<template>
    <div>
        <div class="content is-medium">
            <p>
            <strong>Grades: </strong>
            <span v-for="(val, grade) in grades" :key="grade" style="padding-right: 10px">
                <label class="checkbox">
                    <input type="checkbox" v-model="grades[grade]">
                    {{ grade }} Star
                </label>
            </span>
            </p>
            <p>
            <strong>Attributes: </strong>
            <span v-for="(val, attribute) in attributes" :key="attribute" style="padding-right: 10px">
                <label class="checkbox">
                    <input type="checkbox" v-model="attributes[attribute]">
                    {{ attributeNames[attribute] }}
                </label>
            </span>
            </p>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Initials</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in visibleScores" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ row.initials }}</td>
                    <td>{{ row.score }}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/options">Return to Quiz</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Leaderboard",
    computed: {
        visibleScores: function(){
            return this.scores.filter(e => {
                return this.arrayToMask(Object.values(this.attributes)) === e.attributesMask && this.arrayToMask(Object.values(this.grades)) === e.gradesMask;
            })
        }
    },
    data(){
        return {
            scores: [],
            grades: {
                "2": true,
                "3": true,
                "4": true,
                "5": true
            },
            attributes: {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true
            },
            attributeNames: [
                "Fire",
                "Water",
                "Wind",
                "Light",
                "Dark"
            ]
        }
    },
    created: function(){
        this.grades = this.$store.state.selectedGrades;
        this.attributes = this.$store.state.selectedAttributes;
        axios.get("https://samjo.co/api/scores")
        .then(result => {
            this.scores = result.data.sort((e1, e2) => e1.score > e2.score ? -1 : (e1.score < e2.score ? 1 : 0))
        })
    },
    methods: {
        maskToArray(mask){
            var bin = mask.toString(2).split("").reverse().join("");
            var out = []
            for(let i=0;i<bin.length;i++){
                out[i] = bin[i] === "1" ? true : false
            }
            return out;
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