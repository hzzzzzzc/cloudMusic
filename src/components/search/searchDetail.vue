<template>
  <div class="wrapper">
    <div class="historySearch">
      <div class="historyContent">历史记录</div>
      <div
        class="historyContent"
        v-for="(item, idx) in historySearch"
        :key="idx"
        @click="getSearchDetail($event)"
        :data-keyword="item"
      >
        {{ item }}
      </div>
    </div>
    <SearchContent :needThrottle="isScroll"/>
  </div>
</template>

<script>
import SearchContent from '@/components/search/SearchContent'
export default {
  components: {SearchContent},
  data() {
    return {
      isScroll: true,
    };
  },
  computed: {
    historySearch() {
      return this.$store.state.historySearch;
    },
  },
  methods: {
    getSearchDetail(event) {
      this.$EventBus.$emit("getSearchDetail", event.target.dataset.keyword);
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.historySearch {
  width: 100vw;
  height: 6vh;
  display: flex;
  overflow: scroll;
  align-items: center;
  background-color: #eee;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.historySearch::-webkit-scrollbar {
  display: none; /*  隐藏滚动条 */
}
.historyContent {
  max-width: 18vw;
  height: 60%;
  flex-shrink: 0;
  margin: 0 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>