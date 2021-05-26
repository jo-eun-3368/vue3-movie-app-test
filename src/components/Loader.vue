<template>
  <div
    :style="{
      width:`${size}rem`, //사이즈에 별다른 값을 넣어주지 않을경우 부트스트랩에서 제공되는 사이즈대로
      height:`${size}rem`,
      zIndex
    }"
    :class="{
    absolute,
    fixed
    }"
    class="spinner-border text-primary"></div>
</template>

<script>



export default {
  props:{
    size:{
      type:Number,
      default:2
    },
    absolute:{
      type: Boolean,
      default: false
    },
    fixed:{
      type:Boolean,
      default:false
    },
    zIndex:{
      type:Number,
      default:0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border{
  margin:auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute{
    position: absolute;
  }
  &.fixed{
    position: fixed;
  }
}
</style>