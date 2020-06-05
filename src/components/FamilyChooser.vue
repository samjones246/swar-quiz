<template>
    <div class="control">
        <div class="select is-medium">
            <select v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
                <option v-for="family in families" :key="family">
                    {{ family }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FamilyChooser',
    props: {
        monsters: Array,
        value: String
    },
    computed: {
        families: function(){
            var out = []
            for(var family of this.monsters){
                if(!out.includes(family.familyName)){
                    out.push(family.familyName);
                }
            }
            out = out.sort()
            return out;
        }
    }
}
</script>