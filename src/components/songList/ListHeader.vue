<template>
  <div class="wrapper">
    <div class="listHeader" v-if="ifShow">
      <div class="img">
        <img :src="data.coverImgUrl" alt="" />
      </div>
      <div class="content words">
        <div class="desc">
          <span>{{ data.description }}</span>
        </div>
        <div class="author words">
          <span>{{ data.name }}</span>
        </div>
        <div class="tag words">
          <span v-for="(tag, idx) in data.tags" :key="idx">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="preLoad" v-show="!ifShow">
      <div class="img">
        <img src="@/images/default-account.jpg" alt="" />
      </div>
      <div class="content">
        <div class="desc">加载中</div>
        <div class="author">加载中</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "ifShow"],
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 0 auto;
}
.listHeader {
  width: 100%;
  height: 25vh;
  background-color: #eee;
  display: flex;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  align-items: center;
  /* justify-content: space-around; */
}
.preLoad {
  width: 100%;
  height: 25vh;
  background-color: #eee;
  display: flex;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  align-items: center;
  /* justify-content: space-around; */
}
.img {
  margin-left: 15px;
  height: 20vh;
  width: 20vh;
  border-radius: 15px;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
}
.content{
  max-width: 40vw;
  /* height: 10vh; */
  align-self: flex-start;
}
.words{
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
}
.desc{
  margin-top: 4vh;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.author{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 20px;
}
.tag{
  color: rgb(124, 55, 55);
}

</style>