<template>
  <div class="change">
    <div class="header">
      <div
        class="title"
        v-for="(album, idx) in albums"
        :key="idx"
        v-show="albums.length"
        @click="changeShow($event)"
        :data-show="idx"
        :class="idx === 2? 'right' : ''"
      >
        <span>{{ album.name }}</span>
      </div>
    </div>

    <ShowContent :showData="curContent" :show="hasContent" :a="a"/>
  </div>
</template>

<script>
import ShowContent from "../changer/ShowContent.vue";
export default {
  components: { ShowContent },
  data() {
    return {
        a: 'nmd',
      albums: [],
      albumContent: [],
      trackIds:[[],[],[]],
      curContent:null,
      hasContent:false,
    };
  },
  async created() {
    let data = await this.$api.getRank();
    let arr = data.data.list
      .slice(0, 3)
      .map((album) => this.$api.getPlayListDetail(album.id));
    let allRes = await Promise.all(arr);
    this.albums = allRes.map((album) => ({
      name: album.data.playlist.name,
      id: album.data.playlist.id,
      desc: album.data.playlist.description,
      trackIds: album.data.playlist.trackIds,
      tracks: album.data.playlist.tracks.slice(0,9)
    }));
    this.albums.forEach((album,idx) =>{
       album.trackIds.forEach(item => {
            this.trackIds[idx].push(item.id)
        })
    })
    this.curContent = this.albums[0].tracks
    this.hasContent = true
    // let secondArr = this.trackIds.map(trackIds => this.$api.getSongDetail(trackIds.toString()))
    // let allData = await Promise.all(secondArr)
    // console.log(allData);
  },
  methods: {
    changeShow(ev) {
        this.curContent  = this.albums[ev.currentTarget.dataset.show].tracks
    },
  },
};
</script>

<style scoped>
.change {
  width: 100%;
  height: 110vw;
  background-color: rgb(199, 191, 191);
  margin-top: 10px;
}
.title {
  display: inline-block;
  margin: 15px;
  border-right: 1px solid rgb(97, 94, 94);
  width: 15vw;
  height: 12vw;
  line-height: 12vw;
}
.right {
    border:0;
}
</style>