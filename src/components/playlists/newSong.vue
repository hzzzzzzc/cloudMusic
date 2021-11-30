<template>
  <my-slider>
    <div slot="title" class="title">
      <div class="title-name">最新歌曲</div>
      <div class="title-detail">
        <button>更多</button>
      </div>
    </div>
    <div
      slot="content"
      v-for="(item, idx) in newSongs"
      :key="idx"
      class="songs"
      :class="idx === newSongs.length - 1 ? 'last' : ''"
    >
      <div
        class="singleSong"
        v-for="song in item"
        :key="song.picUrl"
        :data-id="song.id"
        :data-name="song.name"
        :data-artist= "song.song.artists[0].name"
        @click="playSong($event)"
      >
        <div class="songImg">
          <img :src="song.picUrl" alt="" />
        </div>
        <div class="songMesg">
          <div
            class="songName"
            :class="song.song.alias.length !== 0 ? '' : 'noneDesc'"
          >
            <span> {{ song.name }} - </span>
            <span
              >{{
                song.song.artists[0] ? song.song.artists[0].name : "未知歌手"
              }}
              {{
                song.song.artists[1] ? "/" + song.song.artists[1].name : null
              }}
              {{
                song.song.artists[2] ? "/" + song.song.artists[1].name : null
              }}</span
            >
          </div>
          <div class="songDesc">
            <span>{{ song.song.alias[0] }}</span>
          </div>
        </div>
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
  data() {
    return {
      newSongs: [[], [], []],
    };
  },
  created() {
    this.$api.getNewSong().then((res) => {
      let group = 0,
        tag = 0;
      res.data.result.slice(0, 9).map((result) => {
        this.newSongs[group].push(result);
        tag++;
        if (tag === 3) {
          group++;
          tag = 0;
        }
      });
    });
  },
  methods:{
    playSong(event){
      this.$store.commit('playSong', [event.currentTarget.dataset, 2])
    },
  },
};
</script>

<style scoped>
.songs {
  flex-basis: 30vw;
  margin: 0 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10vw;
  text-align: center;
  align-items: center;
}
img {
  width: 15vw;
  height: 15vw;
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
.title-name {
  margin-left: 10px;
}
.title-detail {
  margin-right: 10px;
}
.singleSong {
  width: 80vw;
  /* height: 30%; */
  display: flex;
  margin: 10px;
}
.songImg {
  flex-basis: 15vw;
  border-radius: 5px;
}
.songMesg {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}
.songDesc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
  margin-top: 5px;
}
.songs.last {
  margin-right: 12vw;
}
.songName.noneDesc {
  font-size: 6vw;
}
</style>