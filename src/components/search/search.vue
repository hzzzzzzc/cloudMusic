<template>
  <div class="search-wrapper">
    <div class="search">
      <input
        type="text"
        v-model="keyWords"
        placeholder="  🔍 search"
        @keyup.enter="getSearchDetail"
        @input="deb"
      />
    </div>
    <div class="suggest" v-show="hasSuggestions">
      <div
        class="content"
        v-for="(item, idx) in suggestions"
        :key="idx"
        @click="getSearchDetail($event)"
        :data-suggestion="item.keyword"
      >
        {{ item.keyword }}
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "@/utils/debounce.js";
export default {
  props: ["ifShow"],
  data() {
    return {
      keyWords: "",
      deb: null,
      suggestions: null,
      inSearchRoute: false,
      finding: "",
      limit: 10,
    };
  },
  created() {
    this.deb = debounce(this.getSuggestions, 800);
  },
  methods: {
    getSuggestions() {
      if (!this.keyWords) {
        this.$store.state.ifShow && this.$store.commit("changeIfShow");
      } else {
        let myKeyword = this.keyWords;
        this.$api.getSuggestions(this.keyWords).then((result) => {
          if (!result.data.result.allMatch) {
            this.suggestions = [{ keyword: "搜不到哦" }];
          } else {
            this.suggestions = result.data.result.allMatch;
          }

          if (this.finding === myKeyword) {
            // 如果搜索建议与正在搜索的一致，则不显示关联搜索
            return;
          }
          this.$store.state.ifShow || this.$store.commit("changeIfShow");
        });
      }
    },
    getMoreSearch() {
      this.limit += 10;
      this.$api.getSearchDetail(this.finding, this.limit).then((res) => {
        this.$store.commit("addSearchedData", [
          res.data.result.songs,
          this.finding,
        ]);
      });
    },
    getSearchDetail(event = null) {
      if (!this.keyWords) return;
      if(event){
        this.finding = event.currentTarget.dataset.suggestion || this.keyWords
        this.keyWords = this.finding
      }else{
        this.finding = this.keyWords; //  标记正在搜索的关键字
      }     
      this.limit = 10;
      this.$api.getSearchDetail(this.finding).then((res) => {
        // console.log(res.data.result.songs);
        this.$store.state.ifShow && this.$store.commit("changeIfShow"); // 使遮罩层显示或消失
        let index = this.$store.state.historySearch.indexOf(this.finding);
        if (index === 0) {
          return;
        } else if (index > 0) {
          this.$store.commit("changehistorySearch", index); // 如果存在搜索记录，则提前为第一个
        } else {
          this.$store.commit("addHistorySearch", this.finding); // 存储搜索记录
        }

        res.data.code === 200 &&
          this.$store.commit("addSearchedData", [
            res.data.result.songs,
            this.finding,
          ]); // 保存搜索数据
        document.documentElement.scrollTop = 0;
      });

      if (!this.inSearchRoute) {
        this.$router.push("/search");
        this.inSearchRoute = true;
      }
    },
  },
  computed: {
    hasSuggestions() {
      return this.$store.state.ifShow;
    },
  },
  mounted() {
    this.$EventBus.$on("getSearchDetail", (keyword) => {
      this.keyWords = keyword;
      this.getSearchDetail();
    });
    this.$EventBus.$on("getMoreSearch", () => {
      this.getMoreSearch();
    });
  },
  watch:{
    $route(to,from){
      if(to.path === '/search'){
        this.inSearchRoute = true;
        return
      }
      if(from.path === '/search'){
        this.inSearchRoute = false;
        this.keyWords = ''
      }
      
    }
  }
};
</script>

<style scoped>
.search-wrapper {
  width: 80vw;
  height: 20vw;
}
.search {
  width: 85%;
  height: 50%;
  margin: 5vw auto;
}
.search input {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.suggest > .content {
  width: 100vw;
  height: 7vh;
  background-color: #fff;
  list-style: none;
  line-height: 7vh;
}
</style>