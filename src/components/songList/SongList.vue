<template>
  <div class="songList">
    <ListHeader :data="detail" :ifShow="hasDetail"/>
    <SearchContent :show="isSearched"/>
    <div class="preLoad" v-show="!isSearched">
      <div class="loading">
        <span>加载中</span>
      </div>
    </div>
  </div>
</template>

<script>
import ListHeader from '@/components/songList/ListHeader'
import SearchContent from "@/components/search/SearchContent";
export default {
  components: {
    SearchContent,
    ListHeader
  },
  data() {
      return {
          detail:null,
          hasDetail: false,  
          isSearched: false,       
      }
  },
  async created() {
    let details = await this.$api.getPlayListDetail(this.$store.state.playlistData)
    this.detail = details.data.playlist
    this.hasDetail = true
    let trackIds = details.data.playlist.trackIds.map(item => item.id).toString()
    let songs = await this.$api.getSongDetail(trackIds)
    let searchedData = songs.data.songs.map(item => ({
      name: item.name,
      artists: [...item.ar],
      album: item.al,
      id: item.id
    }))
    this.$store.commit('addSearchedData',[searchedData, null])
    this.isSearched = true
  }
};
</script>

<style scoped>
.songList {
  width: 100%;
}
.preLoad{
  width: 95%;
  height: 50vh;
  margin: 10px auto;
  background-color: #eee;
  border-radius: 10px;
}
.loading{
  position: relative;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
}
.loading span{
  font-weight: bolder;
  color: red;
  font-size: 15vw;
  line-height: 25vh;
}
</style>