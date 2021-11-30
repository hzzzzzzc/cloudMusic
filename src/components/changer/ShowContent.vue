<template>
  <div class="showContent" v-if="show">
    <div class="wrapper">
      <div
        class="content"
        v-for="(song, idx) in showData"
        :key="idx"
        :data-id="song.id"
        :data-name="song.al.name"
        :data-artist="song.ar[0].name"
        @click="playSong($event)"
      >
        <div class="img">
          <img :src="song.al.picUrl" alt="" />
        </div>
        <div class="desc">
          <span style="display: block" class="songName">{{
            song.al.name
          }}</span>
          <span class="author" v-for="(ar, idx) in song.ar" :key="idx">{{
            ar.name + `${idx === song.ar.length - 1 ? "" : "-"}`
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showData", "show", "a"],
  data() {
    return {
      startX: null,
      moveX: null,
      moved: 0,
    };
  },
  computed: {
    moveDistance() {
      console.log(this.viewWidth);
      return this.moved - this.startX;
    },
    viewWidth() {
      return window.innerWidth;
    },
  },
  methods: {
    playSong(event){
      this.$store.commit('playSong',[event.currentTarget.dataset, 2])
    }
    // transformDistance(e) {
    //   this.moveX = e.touches[0].pageX;
    // },
    // startTransform(e) {
    //   this.startX = e.touches[0].pageX;
    // },
    // endTransform() {
    //   console.log("end");
    //   // this.moved = e.changedTouches[0].pageX - this.startX
    //   console.log(this.moveDistance);
    //   if (this.moveDistance < -150) {
    //     if (this.moved === 2) return;
    //     console.log("该换页了");
    //     this.startX = 0;
    //     this.moveX = 0;
    //     this.$refs.curIdx.style = "transform: translateX(-100vw)";
    //     this.moved += -1;
    //   } else if (this.moveDistance > 150) {
    //     if (this.moved === 0) return;
    //     console.log("回到上一页");
    //     this.startX = 0;
    //     this.moveX = 0;
    //     this.$refs.curIdx.style = "transform: translateX(100vw)";
    //     this.moved += 1;
    //   } else {
    //     console.log("留在此页");
    //     this.startX = 0;
    //   this.moveX = 0;
    //   }
    // },
  },
};
</script>

<style scoped>
.showContent {
  display: flex;
  max-width: 100%;
  overflow: scroll;
}
.wrapper {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  flex-wrap: wrap;
  height: 66vw;
  transition: transform 1s ease;
}
.img {
  width: 20vw;
  height: 22vw;
  border-radius: 5px;
  overflow: hidden;
}
.img img {
  width: 90%;
  height: 90%;
}
.content {
  flex-shrink: 0;
  width: 95vw;
  height: 18vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 5vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
  display: flex;
  flex-direction: row;
}
.desc {
  margin-left: 2vw;
  /* display: inline-block; */
  height: 20vw;
  width: 50vw;
}
.songName {
  margin-top: 3vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.author {
  display: block;
  margin-top: 2vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.showContent::-webkit-scrollbar{
    display: none;   /*  隐藏滚动条 */
}
</style>
