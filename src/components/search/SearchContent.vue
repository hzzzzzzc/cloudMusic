<template>
  <div class="searchContent" v-if="show">
    <div
      class="content"
      v-for="(song, index) in searchedData"
      :key="index"
      @click="playSong($event)"
      :data-idx="index"
    >
      <div class="name">{{ song.name }}</div>
      <div class="detail">
        <span>{{ song.album.name }}</span>
        <span v-for="(person, idx) in song.artists" :key="idx">{{
          person.name + `${idx === song.artists.length - 1 ? "-" : "/"}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "@/utils/throttle.js";
export default {
  props: {
    needThrottle: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      getMoreSearch: null,
      throttle: null,
    };
  },
  created() {
    if (!this.needThrottle) return;
    this.getMoreSearch = throttle(this.menu, 500);
  },
  computed: {
    searchedData() {
      return this.$store.state.searchedData;
    },
  },
  methods: {
    playSong(event) {
      this.$store.commit("playSong", [event.currentTarget.dataset.idx, 1]);
    },
    getSearchDetail(event) {
      this.$EventBus.$emit("getSearchDetail", event.target.dataset.keyword);
    },
    menu() {
      let scroll =
        this.getScrollTop() + this.getWindowHeight() - this.getScrollHeight();
      if (scroll > -25) {
        //25：距离底部多少像素开始触发
        this.$EventBus.$emit("getMoreSearch");
      }
    },
    getScrollTop() {
      //滚动条在Y轴上的滚动距离
      let documentScrollTop = 0;
      documentScrollTop = document.documentElement.scrollTop;
      return documentScrollTop;
    },
    getScrollHeight() {
      //文档的总高度
      let documentScrollHeight = 0;
      documentScrollHeight = document.documentElement.scrollHeight;
      return documentScrollHeight;
    },
    getWindowHeight() {
      //浏览器视口的高度
      let windowHeight = 0;
      windowHeight = document.documentElement.clientHeight;
      return windowHeight;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.needThrottle &&
        window.addEventListener("scroll", this.getMoreSearch);
    });
  },
  //离开删除绑定事件
  beforeDestroy() {
    this.needThrottle &&
      window.removeEventListener("scroll", this.getMoreSearch);
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 8vh;
  margin: 10px 0;
  /* font-size: 5vw; */
  border-bottom: 1px solid rgb(218, 213, 213);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.content .name {
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.searchContent {
  border-radius: 10px;
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
  background-color: #eee;
  border-radius: 15px;
}
.detail {
  width: 90%;
  margin-top: 10px;
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>