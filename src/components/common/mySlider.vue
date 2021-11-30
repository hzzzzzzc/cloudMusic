<template>
<div class="container">
  <slot name="title"></slot>
  <div class="slider">
      <slot name="content"></slot>
  </div>
</div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: rgb(199, 191, 191);
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.slider {
    display: flex ;
    width: 100vw; 
    overflow: scroll;
}
.slider::-webkit-scrollbar{
    display: none;   /*  隐藏滚动条 */
}
</style>