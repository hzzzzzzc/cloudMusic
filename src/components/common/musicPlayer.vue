<template>
  <div class="player" v-if="ifShowMusicPlayer">
    <div class="pic">
      <img src="@/images/default-account.jpg" alt="" ref="pic" />
    </div>
    <div class="content">
      <div class="songState" @click="changeState" v-show="!isPlaying">
        <img src="@/images/play.png" alt="" />
      </div>
      <div class="songState" @click="changeState" v-show="isPlaying">
        <img src="@/images/stop.png" alt="" />
      </div>
      <div class="next" @click="toNext">
        <img src="@/images/toNext.png" alt="" />
      </div>
      <div class="desc" v-if="hasMsg">
        <span>{{ songDesc.name + "   " }}</span>
        <span v-for="(person, idx) in songDesc.artists" :key="idx">{{
          person.name + `${idx === songDesc.artists.length - 1 ? "" : "/"}`
        }}</span>
      </div>
    </div>
    <audio ref="audio" @ended="toNext">
      <source :src="songMsg.url" alt />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    ifShowMusicPlayer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      songMsg: null,
      isPlaying: false,
      songDesc: {
        name: "未知",
        artists: [
          {
            name: "未知",
          },
        ],
      },
      hasMsg: false,
    };
  },
  methods: {
    rotate() {
      this.$refs.pic.style.animation = "rotate360 5s linear infinite";
    },
    changeState() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
        this.$refs.pic.style.animationPlayState = "paused";
        this.isPlaying = false;
        return;
      }
      this.$refs.audio.play();
      this.$refs.pic.style.animationPlayState = "running";
      this.isPlaying = true;
    },
    toNext() {
      // this.isPlaying = false;
      console.log("播放下一首");
      this.$refs.pic.style.animation = null;
      this.$store.commit("toNextSong");
    },
    searchSong(val) {
      
      this.$api
        .getSongUrl(val.id || val)
        .then((res) => {
          this.songMsg = res.data.data[0];
        })
        .then(() => {
          this.$emit("showMusicPlayer");
          this.$nextTick(() => {
            this.$refs.audio.src = this.songMsg.url; // 改变audio资源
            this.$refs.audio.play(); // 播放歌曲
            this.$store.commit("addSong", val); // 将歌曲添加到表单
            this.isPlaying = true; // 将播放状态改为真
            this.$refs.pic.style.animationDuration = null
            this.rotate();
            this.songDesc = val; //
            this.hasMsg = true;
          });
        });
    },
  },
  mounted() {
    let sheet = document.styleSheets[0];
    var rules = `@Keyframes rotate360{
      100%{
        transform: rotateZ(360deg)
      }
    }`;
    sheet.insertRule(rules, 0);
  },
  computed: {
    curSong() {
      return this.$store.state.curSong;
    },
  },
  watch: {
    curSong(newVal) {
      if (newVal === null) return;
      this.searchSong(newVal);
    },
  },
};
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20vw;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.pic {
  width: 16vw;
  height: 16vw;
  border-radius: 50%;
  overflow: hidden;
  margin: 2vw 0 2vw 4vw;
}
.pic img {
  width: 100%;
  height: 100%;
  margin: auto;
}
.content {
  width: 80vw;
  height: 100%;
  display: flex;
  align-items: center;
}
.songState {
  margin: auto 3vw;
}
.next {
  margin-right: 3vw;
}
.content img {
  width: 8vw;
  height: 8vw;
}
.desc {
  max-width: 70vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>