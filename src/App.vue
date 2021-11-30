<template>
  <div id="app">
    <div class="header">
      <div class="wrapper">
        <Account @showDetails="showDetails" />
        <!--  用户账户组件  -->
        <Search />
        <!--  搜索栏组件  -->
      </div>
    </div>
    <router-view />
    <MusicPlayer :ifShowMusicPlayer="ifShowMusicPlayer" @showMusicPlayer="showMusicPlayer"/>
    <div class="backgroundImg" v-if="!ifShowMusicPlayer">
      <img src="./images/account-background.jpg" alt="">
    </div>
  </div>
</template>
<script>
import Account from './components/account.vue'
import MusicPlayer from './components/common/musicPlayer.vue'
import Search from './components/search/search.vue'

export default {
  components: {
    MusicPlayer,
    Search,
    Account
  },
  data(){
    return {
      ifShowMusicPlayer:false,
    }
  },
  methods: {
    showDetails() {
      console.log("爷永远喜欢大户爱");
    },
     showMusicPlayer(){
       this.ifShowMusicPlayer = true;
     }
  }
}
</script>
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

.app {
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.header {
  max-width: 100%;
  height: 20vw;
}
.header .wrapper {
  width: 100%;
  height: 20vw;
  position: fixed;
  top: 0;
  display: flex;
  flex: 1;
  z-index: 99;
  background-color: #eee;
}
.backgroundImg{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40vw;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}
.backgroundImg img {
  width: 100%;
  height: 100%;
}
</style>
