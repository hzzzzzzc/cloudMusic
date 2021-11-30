import myAxios from './myAxios';

let getBanners = function (type = 1) {    // 获取banner数据
  return myAxios({
    url: '/banner',
    method: 'GET',
    params: {
      type
    }
  })
}
let getPersonalized = function (limit = 10) {   // 获取热门歌单数据
  return myAxios({
    url: '/personalized',
    method: 'GET',
    params: {
      limit,
    }
  })
}
let getNewSong = function () {   // 获取推荐电台数据
  return myAxios({
    url: '/personalized/newsong',
    method: 'GET',
  })
}

let getSuggestions = function (keywords, type = 'mobile') {
  return myAxios({
    url: '/search/suggest',
    method: 'GET',
    params: {
      keywords,
      type,
    }
  })
}

let getSearchMultimatch = function (keywords) {
  return myAxios({
    url: '/search/suggest',
    method: 'GET',
    params: {
      keywords,
    }
  })
}

let getRank = function () {
  return myAxios({
    url: '/toplist',
    method: 'GET',
  })
}

let getSearchDetail = function (keywords, limit = 10) {
  return myAxios({
    url: '/search',
    method: 'GET',
    params: {
      keywords,
      limit
    }
  })
}

let getSongUrl = function (id = 347230 , br = 999000) {
  return myAxios({
    url: '/song/url',
    method: 'GET',
    params: {
      id,
      br
    }
  })
}

let getPlayListDetail = function (id) {
  return myAxios({
    url: 'playlist/detail',
    method: 'GET',
    params: {
      id,
    }
  })
}

let getSongDetail = function (ids) {
  return myAxios({
    url: 'song/detail',
    method: 'GET',
    params: {
      ids,
    }
  })
}
export default {
  getBanners,
  getPersonalized,
  getNewSong,
  getSuggestions,
  getSearchMultimatch,
  getRank,
  getSearchDetail,
  getSongUrl,
  getPlayListDetail,
  getSongDetail,
}