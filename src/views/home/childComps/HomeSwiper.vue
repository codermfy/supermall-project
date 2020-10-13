<template>
  <div>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    SwiperItem,
    Swiper
  },
  data(){
    return {
      isemit:false
    }
  },
  methods:{
    imageload(){
      if(!this.isemit) {
        this.$emit('imageloaded')
        this.isemit=true
      }
    }
  }
}
</script>

<style scoped>

</style>
