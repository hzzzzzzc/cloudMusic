<template>
  <div class="account-wrapper" @click="showDetails">
    <div class="account" ref="account">
      <img src="../images/default-account.jpg" alt="" />
    </div>
    <transition>
      <div class="image" v-show="isInList">
        <img src="../images/image.png" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotateDeg: 0,
      isInList: false,
    };
  },
  methods: {
    showDetails() {
      if (this.$route.path !== "/home") {
        this.$router.push("/home");
        this.rotate();
      }
      this.$emit("showDetails");
    },
    rotate() {
      this.rotateDeg += 180;
      this.$refs.account.style = `transform: rotate(${this.rotateDeg}deg)`;
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== "/home") {
        this.rotate();
        this.isInList = false;
        if (to.path === "/list") {
          this.isInList = true;
        }
      }
      if (from.path === "/list") {
        this.isInList = false;
      }
    },
  },
};
</script>
<style scoped>
.account-wrapper {
  width: 20vw;
  height: 20vw;
}
.account {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  overflow: hidden;
  margin: 2vw 0 2vw 4vw;
  transition: all 1s ease;
  z-index: 10000;
}
.account img {
  width: 100%;
  height: 100%;
}
.image {
  width: 80vw;
  height: 20vw;
  position: absolute;
  display: inline-block;
  top: 0;
  right: 0;
  transition: transform 1s ease;
  z-index: 999;
  overflow: hidden;
}
.image img {
  width: 100%;
  height: 100%;
}
.image.v-enter {
  transform: translateX(100%);
}
.image.v-leave-to {
  transform: translateX(100%);
}
</style>