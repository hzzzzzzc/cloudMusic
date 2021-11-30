<template>
  <my-slider>
      <div slot="title" class="title">
          <div class="title-name" >热门推荐</div> 
          <div class="title-detail">
              <button>更多</button>
          </div>
      </div>
    <div
      slot="content"
      v-for="item in personalized"
      :key="item.playCount"
      class="personalized"
      :data-id="item.id"
      @click="showSongList($event)"
    >
      <div class="img">
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="desc">
        <h2>{{ item.name }}</h2>
      </div>
    </div>
  </my-slider>
</template>

<script>
import mySlider from "../common/mySlider.vue";
export default {
  components: {
    mySlider,
  },
  props: ["personalized"],
  methods: {
    showSongList(ev){
      this.$store.commit('sendPlaylistData', ev.currentTarget.dataset.id);
      this.$router.push({path: '/list'})
    }
  }
};
</script>

<style scoped>
.personalized {
  flex-basis: 30vw;
  margin: 0 20px;
  
}
.title{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 10vw;
    text-align: center;
    align-items: center;
}
.img {
  width: 30vw;
  height: 30vw;
}
img {
  width: 100%;
  height: 100%;
}
h2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.title-name{
    margin-left: 10px;
}
.title-detail{
    margin-right: 10px;
}
</style>