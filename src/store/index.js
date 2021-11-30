import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ifShow: false,
    historySearch: [],
    searchedData: [],
    finding: '',
    curSong: null,  // 此时播放的歌曲
    mySongList: [], // 收藏的歌曲
    mySongId: new Set(),
    curIdx: -1,
    playlistData: null,
  },
  mutations: {
    changeIfShow(){
      this.state.ifShow = !this.state.ifShow
    },
    addHistorySearch(state ,search){
      state.historySearch.unshift(search)
    },
    changehistorySearch(state, index){    
      state.historySearch.unshift(...state.historySearch.splice(index, 1))
    },
    addSearchedData(state,[data,finding]){
      if(state.finding === finding){
        state.searchedData = state.searchedData.concat(data)
      }else{
        state.finding === finding
        state.searchedData = data
      }
    }, 
    playSong(state, [idx, type]){   
      if(type === 1){
        state.curSong = state.searchedData[idx]
      }else if(type === 2){
        let obj = {}
        obj.id = idx.id
        obj.name = idx.name
        obj.artists = [{name: idx.artist}]
        state.curSong = obj      
      }     
    },
    toNextSong(state){
      state.curIdx = state.mySongList.indexOf(state.curSong)
      if(state.curIdx === state.mySongList.length - 1){
        state.curIdx = -1
      }
      state.curSong = state.mySongList[state.curIdx + 1]
    },
    addSong(state,song){
      if(!state.mySongId.has(song.id)){
        state.mySongList.unshift(song)
        state.mySongId.add(song.id)
      }   
    },
    sendPlaylistData(state,id){
      state.playlistData = id
    }
    
  },
  actions: {
  },
  modules: {
  }
})
