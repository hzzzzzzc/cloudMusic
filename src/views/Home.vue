<template>
  <div class="mainContent">
    <div
      class="shadow"
      v-if="shallShdae"
      @touchmove.prevent
      @click="showMainContent"
    ></div>
    <div class="mainContent">
      <Copy :img="banner" v-if="canShow" />
      <Personalized :personalized="personalized" />
      <New-song />
      <Rank/>
    </div>
  </div>
</template>

<script>
import Copy from "../components/banners/copy.vue";
import Personalized from "../components/playlists/personalized.vue";
import NewSong from '../components/playlists/newSong.vue';
import Rank from '../components/playlists/rank.vue';
export default {
    components: {Copy,Personalized,NewSong,Rank},
data() {
    return {
      banner: [],
      canShow: false,
      personalized: [],
    };
  },
  methods: {
    showMainContent(){
      this.$store.commit('changeIfShow')
    }
  },
  computed: {
    shallShdae: {
      get: function(){
        return this.$store.state.ifShow
      }
    }
  },
  created() {
    // 在页面未渲染前获取banner数据
    this.$api
      .getBanners()
      .then((res) => {
        res.data.banners.map((pic) => {
          this.banner.push(pic.pic);
        });
        // console.log(res);
        this.canShow = true;
      })
      .catch((err) => {
        console.log(err);
      });

      this.$api
        .getPersonalized()
        .then((res) => { 
            // console.log(res);
          res.data.result.map((result) => {
            this.personalized.push(result);            
          });
        })
        .catch(console.log);
        // 
  },   
};
</script>

<style scoped>
.shadow {
  position: absolute;
  top: 20vw;
  width: 100%;
  height: 100%;
  opacity: 50%;
  background-color: #000;
  z-index: 98;
}
</style>