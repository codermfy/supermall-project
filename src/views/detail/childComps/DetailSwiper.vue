<template>
  <swiper class="swiperstyle" >
    <swiper-item v-for="item in topImages" >
      <img :src="item" alt="" >
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";
export default {
name: "DetailSwiper",
  props:{
  topImages:{
    type:Array,
    default(){
      return []
    }
  }
  },
  components:{
  SwiperItem,
    Swiper
  }
}
</script>

<style scoped>
.swiperstyle{
  height: 300px;
  overflow: hidden;
}
</style>
