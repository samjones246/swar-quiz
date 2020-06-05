<template>
    <div class="tile is-parent is-vertical">
        <div class="tile is-child">
            <center><h1 class="title">Select Mode:</h1></center>
        </div>
        <div class="tile is-parent">
            <div class="tile is-parent">
                <div class="tile is-child">
                    <a class="box is-primary" @click="next(0)">
                        <center> 
                            <h1 class="title is-4">Random</h1>
                            <p class="content">
                                20 random monsters will be selected from your chosen categories
                            </p>
                        </center>
                    </a>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child">
                    <a class="box" @click="next(1)">
                        <center> 
                            <h1 class="title is-4">All</h1>
                            <p class="content">
                                All monsters from your chosen categories will be selected in a random order
                            </p>
                        </center>
                    </a>
                </div>
            </div>
            <div class="tile is-parent">
                <div class="tile is-child">
                    <a class="box" @click="next(2)">
                        <center> 
                            <h1 class="title is-4">Timer</h1>
                            <p class="content">
                                How many monsters can you identify correctly in 1 minute?
                            </p>
                        </center>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModeSelect",
    methods: {
        next(mode){
            this.$emit("next", mode);
        }
    }
}
</script>