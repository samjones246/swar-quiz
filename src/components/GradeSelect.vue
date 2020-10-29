<template>
    <div class="card">
        <header class="card-header">
        </header>
        <div class="card-content">
            <h1 class="title">Which grades should be included?</h1>
            <div class="level content is-large">
                <div class="levelitem" v-for="(val, grade) in grades" :key="grade">
                    <label class="checkbox">
                        <input type="checkbox" v-model="grades[grade]">
                        {{ grade }} Star
                    </label>
                </div>
            </div>
            <h1 class="title">Which attributes should be included?</h1>
            <div class="level content is-large">
                <div class="levelitem" v-for="(val, attribute) in attributes" :key="attribute">
                    <label class="checkbox">
                        <input type="checkbox" v-model="attributes[attribute]">
                        {{ attributeNames[attribute] }}
                    </label>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <p v-if="Object.keys(grades).filter(g => grades[g]).length === 0" class="card-footer-item">Select at least one grade</p>
            <p v-else-if="Object.keys(attributes).filter(a => attributes[a]).length === 0" class="card-footer-item">Select at least one attribute</p>
            <a v-else class="card-footer-item" @click="begin()">Begin</a>
        </footer>
    </div>
</template>

<script>
export default {
    name: "GradeSelect",
    data: function(){
        return {
            grades: {
                "2":false,
                "3":false,
                "4":true,
                "5":true 
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
    methods: {
        begin() {
            this.$store.commit("selectAttributes", this.attributes);
            this.$store.commit("selectGrades", this.grades);
            this.$store.commit("init")
            this.$router.push("/quiz")
        }
    }
}
</script>