<template>
  <div class="change">
    <div
      class="show"
      v-for="(item, idx) in title"
      :key="idx"
      v-show="title.length"
      @click="changeShow($event)"
      :data-show="idx"
    ></div>
    <ShowContent :showContent="showContent"/>
  </div>
</template>

<script>
import ShowContent from "./ShowContent.vue"
export default {
  components: {ShowContent},
  // props: ["title", "content"],
  data() {
    return {
      title: [1,2,3],
      showContent: null
    };
  },
  methods: {
    changeShow(ev) {
      console.log(ev.target.dataset.show);
      this.showContent = this.title[Number(ev.target.dataset.show)]
    }
  },
  created(){
    console.log('mychange');
  }
};
</script>

<style scoped>
.change {
  width: 100%;
  height: 100px;
}
.show{
  display: inline-block;
  width: 100px;
  height: 50px;
  background-color: #000;
}
</style>