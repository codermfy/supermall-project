<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //创建BScroll对象
      this.scroll=new BScroll(this.$refs.wrapper,{
        //button不受这个影响，影响div，span等元素的点击
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      })
    //因为是异步请求，在图片还没被加载出来的时候，scroll就被创建
    //并且设定高度，导致无法进一步滑动，需要监听每张图片加载成功事件
    //通过refresh（）刷新scrollheight
    //2.实时监听滚动事件
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
      this.$emit('scroll',position)
    })
    this.scroll.on('pullingUp',()=>{
      // console.log("ssss")
      this.$emit('pullingUp')
    })
  },
  methods:{
    //预防被挂载前就调用以下函数，导致报错
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('111');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y:0
    }
  }
}
</script>

<style scoped>

</style>
