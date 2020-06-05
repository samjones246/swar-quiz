<template>
    <div class="control">
        <div class="select is-medium">
            <select v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :disabled="attributes.length === 1">
                <option v-for="attribute in attributes" :key="attribute">
                    {{ attribute }}
                </option>
            </select>
        </div>
    </div>
</template>
<script>
import data from "../assets/data.json"
const attributes = data.attributes;
export default {
    computed: {
        attributes: function(){
            return attributes.filter((elem, index) => this.enabledAttributes[index])
        }
    },
    props: {
        value: String,
        enabledAttributes: Object
    }
}
</script>