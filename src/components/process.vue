<template>
    <div class="progress">
        <div class="baseline"></div>
        <div class="stepLine" :style='{width:step}'></div>
    </div>
</template>

<script>
export default {
    props:['step'],
    data(){
        return {
            
        }
    },
    created(){
        // console.log(this.step)
    }
}
</script>
<style scoped>
.progress{
    position: relative;
    height:4px;
    width:95%;
}
.stepLine, .baseline{
    position: absolute;
    height:6px;
    border-radius: 3px;
}
.stepLine{
    background:rgba(64,158,255,1);
    z-index: 2;
}
.baseline{
    background:#d3d3d3;
    width:100%;
}
</style>

